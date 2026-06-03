export type MemberStatus = "pending" | "active" | "rejected";

export type DueStatus = "pending" | "paid" | "waived" | "review";

export type RsvpResponse = "yes" | "no" | "maybe";

export interface Zone {
  id: string;
  name: string;
  province: string;
}

export interface Member {
  id: string;
  phone: string;
  name: string;
  zoneId: string;
  status: MemberStatus;
  memberNumber?: string;
  smsOptIn: boolean;
  licensePlate?: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Due {
  id: string;
  memberId: string;
  year: number;
  month: number;
  amountMzn: number;
  status: DueStatus;
  paidAt?: string;
  receiptUri?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  sendSms: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  startsAt: string;
  locationText: string;
  body: string;
}

export interface MeetingRsvp {
  meetingId: string;
  memberId: string;
  response: RsvpResponse;
  updatedAt: string;
}

export interface AppConfig {
  dueAmountMzn: number;
  associationName: string;
}

export interface AppData {
  config: AppConfig;
  zones: Zone[];
  members: Member[];
  dues: Due[];
  announcements: Announcement[];
  meetings: Meeting[];
  rsvps: MeetingRsvp[];
  sessionPhone?: string;
}
