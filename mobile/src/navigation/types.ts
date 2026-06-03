export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Notifications: undefined;
  Otp: { phone: string; mode: "login" | "register" };
};

export type MainTabParamList = {
  Home: undefined;
  Announcements: undefined;
  Meetings: undefined;
  Profile: undefined;
};

export type AdminStackParamList = {
  AdminHome: undefined;
  AdminMembers: undefined;
  AdminAnnouncement: undefined;
  AdminMeeting: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Dues: undefined;
  MemberCard: undefined;
  Admin: undefined;
};
