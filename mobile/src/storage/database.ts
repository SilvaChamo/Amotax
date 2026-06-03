import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADMIN_PHONES,
  DEFAULT_DUE_AMOUNT,
  LOCAL_PREFS_KEY,
  STORAGE_KEY,
  ZONES_SEED,
} from "../config/constants";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  loadSharedAppDataFromSupabase,
  persistSharedAppDataToSupabase,
} from "./supabase-sync";
import type {
  Announcement,
  AppData,
  Due,
  Meeting,
  Member,
  MemberRegistrationKind,
  MeetingRsvp,
} from "../types";
import { createId } from "../utils/id";
import { normalizePhone } from "../utils/phone";
import { currentYearMonth } from "../utils/date";

function seedData(): AppData {
  return {
    config: {
      dueAmountMzn: DEFAULT_DUE_AMOUNT,
      associationName: "AMOTAX — Associação Moçambicana de Moto Tax",
    },
    zones: ZONES_SEED,
    members: [],
    dues: [],
    announcements: defaultAnnouncements(),
    meetings: [],
    rsvps: [],
    readAnnouncements: {},
  };
}

function defaultAnnouncements(): Announcement[] {
  const base = new Date();
  return [
    {
      id: "ann_welcome",
      title: "Bem-vindo ao aplicativo AMOTAX",
      body:
        "Esta é a fase piloto. Inscreva-se, pague a cota simbólica e fique atento aos convites de reunião da associação.",
      publishedAt: new Date(base.getTime() - 86400000 * 2).toISOString(),
      sendSms: false,
    },
    {
      id: "ann_cota",
      title: "Cota mensal disponível",
      body: "A cota do mês já está activa. Envie o comprovativo na área Cotas assim que efectuar o pagamento.",
      publishedAt: new Date(base.getTime() - 86400000).toISOString(),
      sendSms: true,
    },
    {
      id: "ann_reuniao",
      title: "Convocatória de reunião",
      body: "Fique atento à secção Reuniões para confirmar a sua presença nas assembleias da AMOTAX.",
      publishedAt: base.toISOString(),
      sendSms: false,
    },
  ];
}

function normalizeAppData(data: AppData): AppData {
  const existingIds = new Set(data.announcements.map((a) => a.id));
  const merged = [...data.announcements];
  for (const ann of defaultAnnouncements()) {
    if (!existingIds.has(ann.id)) merged.push(ann);
  }
  return {
    ...data,
    announcements: merged,
    readAnnouncements: normalizeReadAnnouncements(data),
    members: data.members.map((m) => ({
      ...m,
      registrationKind: m.registrationKind ?? "mototaxi",
    })),
  };
}

function normalizeReadAnnouncements(data: AppData): Record<string, string> {
  const map = { ...(data.readAnnouncements ?? {}) };
  for (const id of data.readAnnouncementIds ?? []) {
    if (!map[id]) map[id] = new Date(0).toISOString();
  }
  return map;
}

type LocalPrefs = {
  sessionPhone?: string;
  readAnnouncementIds?: string[];
  readAnnouncements?: Record<string, string>;
};

async function loadLocalPrefs(): Promise<LocalPrefs> {
  const raw = await AsyncStorage.getItem(LOCAL_PREFS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as LocalPrefs;
  } catch {
    return {};
  }
}

async function saveLocalPrefs(prefs: LocalPrefs): Promise<void> {
  await AsyncStorage.setItem(LOCAL_PREFS_KEY, JSON.stringify(prefs));
}

function applyLocalPrefs(data: AppData, prefs: LocalPrefs): AppData {
  return {
    ...data,
    sessionPhone: prefs.sessionPhone,
    readAnnouncements: normalizeReadAnnouncements({
      readAnnouncements: prefs.readAnnouncements,
      readAnnouncementIds: prefs.readAnnouncementIds,
    } as AppData),
  };
}

function stripLocalPrefs(data: AppData): AppData {
  const { sessionPhone: _s, readAnnouncementIds: _r, readAnnouncements: _ra, ...shared } =
    data;
  return { ...shared, readAnnouncements: {} };
}

export async function loadAppData(): Promise<AppData> {
  const prefs = await loadLocalPrefs();

  if (isSupabaseConfigured()) {
    const remote = await loadSharedAppDataFromSupabase();
    if (remote) {
      let merged = applyLocalPrefs(normalizeAppData(remote), prefs);
      if (merged.announcements.length === 0) {
        merged = normalizeAppData({ ...merged, announcements: defaultAnnouncements() });
        await persistSharedAppDataToSupabase(stripLocalPrefs(merged));
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  }

  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = seedData();
    await saveAppData(initial);
    return initial;
  }
  const parsed = JSON.parse(raw) as AppData;
  const normalized = normalizeAppData(parsed);
  if (JSON.stringify(normalized) !== JSON.stringify(parsed)) {
    await saveAppData(normalized);
  }
  return normalized;
}

export async function saveAppData(data: AppData): Promise<void> {
  const prefs: LocalPrefs = {
    sessionPhone: data.sessionPhone,
    readAnnouncements: normalizeReadAnnouncements(data),
  };
  await saveLocalPrefs(prefs);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  if (isSupabaseConfigured()) {
    await persistSharedAppDataToSupabase(stripLocalPrefs(data));
  }
}

export function nextMemberNumber(members: Member[]): string {
  const n = members.filter((m) => m.status === "active").length + 1;
  return `AMX-${String(n).padStart(5, "0")}`;
}

export function findMemberByPhone(data: AppData, phone: string): Member | undefined {
  const p = normalizePhone(phone);
  return data.members.find((m) => normalizePhone(m.phone) === p);
}

export function isAdminPhone(phone: string): boolean {
  const p = normalizePhone(phone);
  return ADMIN_PHONES.some((a) => normalizePhone(a) === p);
}

export async function ensureCurrentDue(data: AppData, memberId: string): Promise<AppData> {
  const { year, month } = currentYearMonth();
  const exists = data.dues.some(
    (d) => d.memberId === memberId && d.year === year && d.month === month,
  );
  if (exists) return data;
  const due: Due = {
    id: createId("due"),
    memberId,
    year,
    month,
    amountMzn: data.config.dueAmountMzn,
    status: "pending",
  };
  return { ...data, dues: [...data.dues, due] };
}

export async function registerMember(
  data: AppData,
  input: {
    phone: string;
    name: string;
    zoneId: string;
    province?: string;
    district?: string;
    municipality?: string;
    adminPost?: string;
    praca?: string;
    smsOptIn: boolean;
    licensePlate?: string;
    registrationKind: MemberRegistrationKind;
  },
): Promise<{ data: AppData; member: Member }> {
  const phone = normalizePhone(input.phone);
  const existing = findMemberByPhone(data, phone);
  if (existing) {
    return { data, member: existing };
  }
  const member: Member = {
    id: createId("mem"),
    phone,
    name: input.name.trim(),
    zoneId: input.zoneId,
    province: input.province,
    district: input.district,
    municipality: input.municipality,
    adminPost: input.adminPost,
    praca: input.praca,
    status: "pending",
    smsOptIn: input.smsOptIn,
    licensePlate: input.licensePlate?.trim(),
    registrationKind: input.registrationKind,
    createdAt: new Date().toISOString(),
    isAdmin: isAdminPhone(phone),
  };
  let next: AppData = { ...data, members: [...data.members, member] };
  next = await ensureCurrentDue(next, member.id);
  await saveAppData(next);
  return { data: next, member };
}

export async function activateMember(data: AppData, memberId: string): Promise<AppData> {
  const activeCount = data.members.filter((m) => m.status === "active").length;
  const number = `AMX-${String(activeCount + 1).padStart(5, "0")}`;
  let next: AppData = {
    ...data,
    members: data.members.map((m) =>
      m.id === memberId
        ? {
            ...m,
            status: "active" as const,
            memberNumber: m.memberNumber ?? number,
          }
        : m,
    ),
  };
  next = await ensureCurrentDue(next, memberId);
  await saveAppData(next);
  return next;
}

export async function rejectMember(data: AppData, memberId: string): Promise<AppData> {
  const next: AppData = {
    ...data,
    members: data.members.map((m) =>
      m.id === memberId ? { ...m, status: "rejected" as const } : m,
    ),
  };
  await saveAppData(next);
  return next;
}

export async function submitDueReceipt(
  data: AppData,
  dueId: string,
  receiptUri: string,
): Promise<AppData> {
  const next: AppData = {
    ...data,
    dues: data.dues.map((d) =>
      d.id === dueId ? { ...d, status: "review" as const, receiptUri } : d,
    ),
  };
  await saveAppData(next);
  return next;
}

export async function approveDue(data: AppData, dueId: string): Promise<AppData> {
  const next: AppData = {
    ...data,
    dues: data.dues.map((d) =>
      d.id === dueId
        ? { ...d, status: "paid" as const, paidAt: new Date().toISOString() }
        : d,
    ),
  };
  await saveAppData(next);
  return next;
}

export async function markDuePaid(data: AppData, dueId: string): Promise<AppData> {
  return approveDue(data, dueId);
}

export async function markAnnouncementsReadByIds(
  data: AppData,
  ids: string[],
): Promise<AppData> {
  const readAt = new Date().toISOString();
  const map = normalizeReadAnnouncements(data);
  for (const id of ids) map[id] = readAt;
  const { readAnnouncementIds: _legacy, ...rest } = data;
  const next = { ...rest, readAnnouncements: map };
  await saveAppData(next);
  return next;
}

export async function markAllAnnouncementsRead(data: AppData): Promise<AppData> {
  return markAnnouncementsReadByIds(
    data,
    data.announcements.map((a) => a.id),
  );
}

export async function addAnnouncement(
  data: AppData,
  input: { title: string; body: string; sendSms: boolean },
): Promise<AppData> {
  const ann: Announcement = {
    id: createId("ann"),
    title: input.title.trim(),
    body: input.body.trim(),
    publishedAt: new Date().toISOString(),
    sendSms: input.sendSms,
  };
  const next = { ...data, announcements: [ann, ...data.announcements] };
  await saveAppData(next);
  return next;
}

export async function addMeeting(
  data: AppData,
  input: { title: string; startsAt: string; locationText: string; body: string },
): Promise<AppData> {
  const meeting: Meeting = {
    id: createId("mtg"),
    title: input.title.trim(),
    startsAt: input.startsAt,
    locationText: input.locationText.trim(),
    body: input.body.trim(),
  };
  const next = { ...data, meetings: [meeting, ...data.meetings] };
  await saveAppData(next);
  return next;
}

export async function setRsvp(
  data: AppData,
  meetingId: string,
  memberId: string,
  response: MeetingRsvp["response"],
): Promise<AppData> {
  const others = data.rsvps.filter(
    (r) => !(r.meetingId === meetingId && r.memberId === memberId),
  );
  const rsvp: MeetingRsvp = {
    meetingId,
    memberId,
    response,
    updatedAt: new Date().toISOString(),
  };
  const next = { ...data, rsvps: [...others, rsvp] };
  await saveAppData(next);
  return next;
}

export async function setSession(data: AppData, phone: string | undefined): Promise<AppData> {
  const next = { ...data, sessionPhone: phone ? normalizePhone(phone) : undefined };
  await saveAppData(next);
  return next;
}
