import type { Announcement, AppData } from "../types";

export function countUnreadAnnouncements(data: AppData): number {
  const read = new Set(data.readAnnouncementIds ?? []);
  return data.announcements.filter((a) => !read.has(a.id)).length;
}

export function isAnnouncementUnread(data: AppData, id: string): boolean {
  const read = new Set(data.readAnnouncementIds ?? []);
  return !read.has(id);
}

export function getUnreadAnnouncements(data: AppData): Announcement[] {
  const read = new Set(data.readAnnouncementIds ?? []);
  return data.announcements.filter((a) => !read.has(a.id));
}

export function markAnnouncementsRead(data: AppData, ids: string[]): AppData {
  const merged = new Set([...(data.readAnnouncementIds ?? []), ...ids]);
  return { ...data, readAnnouncementIds: [...merged] };
}

export function markAllAnnouncementsRead(data: AppData): AppData {
  return markAnnouncementsRead(
    data,
    data.announcements.map((a) => a.id),
  );
}

export function excerptNotificationBody(body: string, maxLen = 110): string {
  const t = body.trim().replace(/\s+/g, " ");
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen).trim()}…`;
}

export function sortAnnouncementsNewestFirst(
  announcements: Announcement[],
): Announcement[] {
  return [...announcements].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
