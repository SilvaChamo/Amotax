import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  activateMember,
  addAnnouncement,
  addMeeting,
  approveDue,
  findMemberByPhone,
  isAdminPhone,
  loadAppData,
  registerMember,
  rejectMember,
  setRsvp,
  setSession,
  submitDueReceipt,
} from "../storage/database";
import { DEMO_GUEST_PHONE } from "../config/constants";
import type { AppData, Member, RsvpResponse } from "../types";
import { normalizePhone } from "../utils/phone";

type AppContextValue = {
  data: AppData | null;
  loading: boolean;
  refresh: () => Promise<void>;
  sessionMember: Member | null;
  isAdmin: boolean;
  login: (phone: string) => Promise<Member | null>;
  enterAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  register: (input: {
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
  }) => Promise<Member>;
  activate: (memberId: string) => Promise<void>;
  reject: (memberId: string) => Promise<void>;
  submitReceipt: (dueId: string, uri: string) => Promise<void>;
  approveDuePayment: (dueId: string) => Promise<void>;
  createAnnouncement: (title: string, body: string, sendSms: boolean) => Promise<void>;
  createMeeting: (
    title: string,
    startsAt: string,
    location: string,
    body: string,
  ) => Promise<void>;
  respondMeeting: (meetingId: string, response: RsvpResponse) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const loaded = await loadAppData();
    setData(loaded);
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const sessionMember = useMemo(() => {
    if (!data?.sessionPhone) return null;
    return findMemberByPhone(data, data.sessionPhone) ?? null;
  }, [data]);

  const isAdmin = useMemo(() => {
    if (!data?.sessionPhone) return false;
    const m = findMemberByPhone(data, data.sessionPhone);
    return Boolean(m?.isAdmin || isAdminPhone(data.sessionPhone));
  }, [data]);

  const login = useCallback(
    async (phone: string) => {
      if (!data) return null;
      const p = normalizePhone(phone);
      let member = findMemberByPhone(data, p);
      if (!member && isAdminPhone(p)) {
        const { member: reg } = await registerMember(data, {
          phone: p,
          name: "Administrador AMOTAX",
          zoneId: "maputo-centro",
          smsOptIn: true,
        });
        const activated = await activateMember(
          { ...data, members: [...data.members, reg] },
          reg.id,
        );
        member = activated.members.find((m) => m.id === reg.id)!;
        member = { ...member, isAdmin: true };
        const withAdmin = {
          ...activated,
          members: activated.members.map((m) =>
            m.id === reg.id ? { ...m, isAdmin: true, status: "active" as const } : m,
          ),
        };
        await setSession(withAdmin, p);
        setData(withAdmin);
        return withAdmin.members.find((m) => m.id === reg.id)!;
      }
      if (!member) return null;
      const next = await setSession(data, p);
      setData(next);
      return findMemberByPhone(next, p)!;
    },
    [data],
  );

  const enterAsGuest = useCallback(async () => {
    if (!data) return;
    const phone = normalizePhone(DEMO_GUEST_PHONE);
    let current = data;
    let member = findMemberByPhone(current, phone);
    if (!member) {
        const { data: next, member: reg } = await registerMember(current, {
        phone,
        name: "Visitante (piloto)",
        zoneId: "maputo-cidade:kampfumo:posto-baixa",
        province: "Maputo Cidade",
        district: "KaMpfumo",
        adminPost: "Posto Baixa",
        praca: "Praça da Independência",
        smsOptIn: false,
      });
      current = await activateMember(next, reg.id);
      member = current.members.find((m) => m.id === reg.id)!;
    } else if (member.status !== "active") {
      current = await activateMember(current, member.id);
      member = current.members.find((m) => m.id === member!.id)!;
    }
    const next = await setSession(current, phone);
    setData(next);
  }, [data]);

  const logout = useCallback(async () => {
    if (!data) return;
    const next = await setSession(data, undefined);
    setData(next);
  }, [data]);

  const register = useCallback(
    async (input: {
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
    }) => {
      if (!data) throw new Error("Sem dados");
      const { data: next, member } = await registerMember(data, input);
      const withSession = await setSession(next, input.phone);
      setData(withSession);
      return member;
    },
    [data],
  );

  const activate = useCallback(
    async (memberId: string) => {
      if (!data) return;
      const next = await activateMember(data, memberId);
      setData(next);
    },
    [data],
  );

  const reject = useCallback(
    async (memberId: string) => {
      if (!data) return;
      const next = await rejectMember(data, memberId);
      setData(next);
    },
    [data],
  );

  const submitReceipt = useCallback(
    async (dueId: string, uri: string) => {
      if (!data) return;
      const next = await submitDueReceipt(data, dueId, uri);
      setData(next);
    },
    [data],
  );

  const approveDuePayment = useCallback(
    async (dueId: string) => {
      if (!data) return;
      const next = await approveDue(data, dueId);
      setData(next);
    },
    [data],
  );

  const createAnnouncement = useCallback(
    async (title: string, body: string, sendSms: boolean) => {
      if (!data) return;
      const next = await addAnnouncement(data, { title, body, sendSms });
      setData(next);
    },
    [data],
  );

  const createMeeting = useCallback(
    async (title: string, startsAt: string, location: string, body: string) => {
      if (!data) return;
      const next = await addMeeting(data, {
        title,
        startsAt,
        locationText: location,
        body,
      });
      setData(next);
    },
    [data],
  );

  const respondMeeting = useCallback(
    async (meetingId: string, response: RsvpResponse) => {
      if (!data || !sessionMember) return;
      const next = await setRsvp(data, meetingId, sessionMember.id, response);
      setData(next);
    },
    [data, sessionMember],
  );

  const value: AppContextValue = {
    data,
    loading,
    refresh,
    sessionMember,
    isAdmin,
    login,
    enterAsGuest,
    logout,
    register,
    activate,
    reject,
    submitReceipt,
    approveDuePayment,
    createAnnouncement,
    createMeeting,
    respondMeeting,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp fora de AppProvider");
  return ctx;
}
