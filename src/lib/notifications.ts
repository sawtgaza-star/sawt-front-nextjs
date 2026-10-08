"use client";
/* =========================================================
   The bell's notifications — kept in the browser, per signed-in user.

   The API has no notifications endpoint yet, so the list is built from what
   the site itself knows happened: a sign-in (finishSignIn), a creator followed
   (CreatorProfileHero), plus two standing pointers the account starts with.
   Items store a dictionary key + params rather than text, so the panel renders
   them in whichever language is current. Replace readNotifications() and the
   writers with API calls once the backend has them.
   ========================================================= */

import { useEffect, useState } from "react";
import { getUser } from "./auth-state";

export type NotificationKind = "login" | "follow" | "updates" | "support";

export type SawtNotification = {
  id: string;
  kind: NotificationKind;
  /** Values for the `{name}`-style holes in the kind's text. */
  params?: Record<string, string>;
  /** Where clicking the item goes, if anywhere. */
  href?: string;
  at: number;
  read: boolean;
};

export const NOTIFICATIONS_EVENT = "sawt:notificationschange";

/** The list never grows past this — oldest drop off. */
const MAX_ITEMS = 30;

function storageKey(userId?: string | number): string | null {
  const id = userId ?? getUser()?.id ?? getUser()?.uuid;
  return id == null ? null : `sawt_notifications:${id}`;
}

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** What a brand-new account's bell starts with: already read, so the badge
    only ever counts something that actually happened. */
function seed(): SawtNotification[] {
  const at = Date.now();
  return [
    { id: makeId(), kind: "updates", href: "/content", at, read: true },
    { id: makeId(), kind: "support", href: "/support", at, read: true },
  ];
}

function load(key: string): SawtNotification[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}

function write(key: string, list: SawtNotification[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(list.slice(0, MAX_ITEMS)));
  } catch {
    /* storage disabled */
  }
  try {
    document.dispatchEvent(new CustomEvent(NOTIFICATIONS_EVENT));
  } catch {
    /* SSR guard */
  }
}

export function readNotifications(): SawtNotification[] {
  const key = storageKey();
  if (!key) return [];
  const list = load(key);
  if (list) return list;
  const fresh = seed();
  write(key, fresh);
  return fresh;
}

/** Prepend one unread item. `userId` lets finishSignIn write before the
    stored user is the one that just signed in. */
export function pushNotification(
  item: Pick<SawtNotification, "kind" | "params" | "href">,
  userId?: string | number,
): void {
  const key = storageKey(userId);
  if (!key) return;
  const list = load(key) ?? seed();
  write(key, [{ ...item, id: makeId(), at: Date.now(), read: false }, ...list]);
}

export function markAllRead(): void {
  const key = storageKey();
  if (!key) return;
  write(key, readNotifications().map((n) => ({ ...n, read: true })));
}

export function markRead(id: string): void {
  const key = storageKey();
  if (!key) return;
  write(key, readNotifications().map((n) => (n.id === id ? { ...n, read: true } : n)));
}

export function useNotifications(): SawtNotification[] {
  const [list, setList] = useState<SawtNotification[]>([]);

  useEffect(() => {
    const sync = () => setList(readNotifications());
    sync();
    document.addEventListener(NOTIFICATIONS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      document.removeEventListener(NOTIFICATIONS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return list;
}

/** "منذ 5 دقائق" / "5 minutes ago" — coarse, like the design's timestamps. */
export function timeAgo(at: number, lang: string): string {
  const minutes = Math.max(0, Math.floor((Date.now() - at) / 60000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const en = lang === "en";

  if (minutes < 1) return en ? "Just now" : "الآن.";
  if (minutes < 60) {
    if (en) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (minutes === 1) return "منذ دقيقة.";
    if (minutes === 2) return "منذ دقيقتين.";
    return `منذ ${minutes} ${minutes <= 10 ? "دقائق" : "دقيقة"}.`;
  }
  if (hours < 24) {
    if (en) return hours === 1 ? "An hour ago" : `${hours} hours ago`;
    if (hours === 1) return "منذ ساعة.";
    if (hours === 2) return "منذ ساعتين.";
    return `منذ ${hours} ${hours <= 10 ? "ساعات" : "ساعة"}.`;
  }
  if (days === 1) return en ? "Yesterday" : "أمس.";
  if (en) return `${days} days ago`;
  if (days === 2) return "منذ يومين.";
  return `منذ ${days} ${days <= 10 ? "أيام" : "يومًا"}.`;
}

