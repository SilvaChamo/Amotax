import {
  DEFAULT_DUE_AMOUNT,
  ZONES_SEED,
} from "../config/constants";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import type {
  Announcement,
  AppConfig,
  AppData,
  Due,
  Meeting,
  MeetingRsvp,
  Member,
} from "../types";

type MemberRow = {
  id: string;
  phone: string;
  name: string;
  zone_id: string;
  province: string | null;
  district: string | null;
  municipality: string | null;
  admin_post: string | null;
  praca: string | null;
  status: Member["status"];
  member_number: string | null;
  sms_opt_in: boolean;
  license_plate: string | null;
  created_at: string;
  is_admin: boolean;
};

function rowToMember(r: MemberRow): Member {
  return {
    id: r.id,
    phone: r.phone,
    name: r.name,
    zoneId: r.zone_id,
    province: r.province ?? undefined,
    district: r.district ?? undefined,
    municipality: r.municipality ?? undefined,
    adminPost: r.admin_post ?? undefined,
    praca: r.praca ?? undefined,
    status: r.status,
    memberNumber: r.member_number ?? undefined,
    smsOptIn: r.sms_opt_in,
    licensePlate: r.license_plate ?? undefined,
    createdAt: r.created_at,
    isAdmin: r.is_admin,
  };
}

function memberToRow(m: Member): MemberRow {
  return {
    id: m.id,
    phone: m.phone,
    name: m.name,
    zone_id: m.zoneId,
    province: m.province ?? null,
    district: m.district ?? null,
    municipality: m.municipality ?? null,
    admin_post: m.adminPost ?? null,
    praca: m.praca ?? null,
    status: m.status,
    member_number: m.memberNumber ?? null,
    sms_opt_in: m.smsOptIn,
    license_plate: m.licensePlate ?? null,
    created_at: m.createdAt,
    is_admin: Boolean(m.isAdmin),
  };
}

export async function loadSharedAppDataFromSupabase(): Promise<AppData | null> {
  if (!isSupabaseConfigured()) return null;

  const sb = getSupabase();

  const [configRes, membersRes, duesRes, annRes, mtgRes, rsvpRes] = await Promise.all([
    sb.from("amotax_config").select("*").eq("id", "default").maybeSingle(),
    sb.from("amotax_members").select("*"),
    sb.from("amotax_dues").select("*"),
    sb.from("amotax_announcements").select("*").order("published_at", { ascending: false }),
    sb.from("amotax_meetings").select("*").order("starts_at", { ascending: false }),
    sb.from("amotax_rsvps").select("*"),
  ]);

  const errors = [
    configRes.error,
    membersRes.error,
    duesRes.error,
    annRes.error,
    mtgRes.error,
    rsvpRes.error,
  ].filter(Boolean);
  if (errors.length) {
    console.warn("[amotax] Supabase load:", errors[0]?.message);
    return null;
  }

  const cfg = configRes.data;
  const config: AppConfig = {
    dueAmountMzn: cfg?.due_amount_mzn ?? DEFAULT_DUE_AMOUNT,
    associationName:
      cfg?.association_name ?? "AMOTAX — Associação Moçambicana de Moto Tax",
  };

  const members = ((membersRes.data ?? []) as MemberRow[]).map(rowToMember);
  const dues: Due[] = (duesRes.data ?? []).map((d) => ({
    id: d.id,
    memberId: d.member_id,
    year: d.year,
    month: d.month,
    amountMzn: d.amount_mzn,
    status: d.status,
    paidAt: d.paid_at ?? undefined,
    receiptUri: d.receipt_uri ?? undefined,
  }));
  const announcements: Announcement[] = (annRes.data ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    publishedAt: a.published_at,
    sendSms: a.send_sms,
  }));
  const meetings: Meeting[] = (mtgRes.data ?? []).map((m) => ({
    id: m.id,
    title: m.title,
    startsAt: m.starts_at,
    locationText: m.location_text,
    body: m.body,
  }));
  const rsvps: MeetingRsvp[] = (rsvpRes.data ?? []).map((r) => ({
    meetingId: r.meeting_id,
    memberId: r.member_id,
    response: r.response,
    updatedAt: r.updated_at,
  }));

  return {
    config,
    zones: ZONES_SEED,
    members,
    dues,
    announcements,
    meetings,
    rsvps,
    readAnnouncementIds: [],
  };
}

export async function persistSharedAppDataToSupabase(data: AppData): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const sb = getSupabase();

  const configRow = {
    id: "default",
    due_amount_mzn: data.config.dueAmountMzn,
    association_name: data.config.associationName,
    updated_at: new Date().toISOString(),
  };

  const { error: configErr } = await sb.from("amotax_config").upsert(configRow);
  if (configErr) {
    console.warn("[amotax] Supabase config:", configErr.message);
    return false;
  }

  const tables: { error: { message: string } | null }[] = [];

  if (data.members.length) {
    tables.push(
      await sb.from("amotax_members").upsert(data.members.map(memberToRow)),
    );
  }
  if (data.dues.length) {
    tables.push(
      await sb
        .from("amotax_dues")
        .upsert(
          data.dues.map((d) => ({
            id: d.id,
            member_id: d.memberId,
            year: d.year,
            month: d.month,
            amount_mzn: d.amountMzn,
            status: d.status,
            paid_at: d.paidAt ?? null,
            receipt_uri: d.receiptUri ?? null,
          })),
        ),
    );
  }
  if (data.announcements.length) {
    tables.push(
      await sb
        .from("amotax_announcements")
        .upsert(
          data.announcements.map((a) => ({
            id: a.id,
            title: a.title,
            body: a.body,
            published_at: a.publishedAt,
            send_sms: a.sendSms,
          })),
        ),
    );
  }
  if (data.meetings.length) {
    tables.push(
      await sb
        .from("amotax_meetings")
        .upsert(
          data.meetings.map((m) => ({
            id: m.id,
            title: m.title,
            starts_at: m.startsAt,
            location_text: m.locationText,
            body: m.body,
          })),
        ),
    );
  }
  if (data.rsvps.length) {
    tables.push(
      await sb
        .from("amotax_rsvps")
        .upsert(
          data.rsvps.map((r) => ({
            meeting_id: r.meetingId,
            member_id: r.memberId,
            response: r.response,
            updated_at: r.updatedAt,
          })),
        ),
    );
  }

  const err = tables.find((t) => t.error)?.error;
  if (err) {
    console.warn("[amotax] Supabase persist:", err.message);
    return false;
  }
  return true;
}
