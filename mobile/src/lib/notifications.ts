import type { Announcement, AppData } from "../types";

function readMap(data: AppData): Record<string, string> {
  const map = { ...(data.readAnnouncements ?? {}) };
  for (const id of data.readAnnouncementIds ?? []) {
    if (!map[id]) map[id] = new Date(0).toISOString();
  }
  return map;
}

export function countUnreadAnnouncements(data: AppData): number {
  const read = readMap(data);
  return data.announcements.filter((a) => !read[a.id]).length;
}

export function isAnnouncementUnread(data: AppData, id: string): boolean {
  return !readMap(data)[id];
}

export function getAnnouncementReadAt(data: AppData, id: string): string | undefined {
  return readMap(data)[id];
}

export function getUnreadAnnouncements(data: AppData): Announcement[] {
  const read = readMap(data);
  return data.announcements.filter((a) => !read[a.id]);
}

export function markAnnouncementsRead(
  data: AppData,
  ids: string[],
  readAt = new Date().toISOString(),
): AppData {
  const map = readMap(data);
  for (const id of ids) map[id] = readAt;
  const { readAnnouncementIds: _legacy, ...rest } = data;
  return { ...rest, readAnnouncements: map };
}

export function markAllAnnouncementsRead(data: AppData): AppData {
  return markAnnouncementsRead(
    data,
    data.announcements.map((a) => a.id),
  );
}

export function sortAnnouncementsNewestFirst(
  announcements: Announcement[],
): Announcement[] {
  return [...announcements].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function deliveryLabel(sendSms: boolean): string {
  return sendSms ? "SMS" : "App";
}
