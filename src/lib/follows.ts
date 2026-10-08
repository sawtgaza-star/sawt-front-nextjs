"use client";
/* =========================================================
   Followed content creators — kept in the browser, per signed-in user.

   The API has no follow endpoint yet (verified: every /follow-shaped route
   404s), so "متابعة" on a creator's profile writes a snapshot of that creator
   here and /account's "صناع المحتوى" tab reads it back. The snapshot carries
   what the card needs (name, avatar, role, counts) so the tab renders without
   a request. When the backend grows a follow API, swap the bodies of
   follow()/unfollow()/readFollows() for calls — the hook's shape can stay.

   Keyed by user id so two accounts on one browser keep separate lists.
   ========================================================= */

import { useEffect, useState } from "react";
import type { Localized } from "./api/pages";
import { getUser } from "./auth-state";

export type FollowedCreator = {
  /** The profile route segment — /creators/{uuid}. */
  uuid: string;
  name: string;
  avatar: string | null;
  role?: Localized;
  followers?: number | null;
  videos?: number | null;
  followedAt: number;
};

export const FOLLOWS_EVENT = "sawt:followschange";

function storageKey(): string | null {
  const user = getUser();
  return user ? `sawt_follows:${user.id ?? user.uuid}` : null;
}

export function readFollows(): FollowedCreator[] {
  const key = storageKey();
  if (!key) return [];
  try {
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function write(list: FollowedCreator[]): void {
  const key = storageKey();
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* storage disabled — the follow just doesn't stick */
  }
  document.dispatchEvent(new CustomEvent(FOLLOWS_EVENT));
}

export function isFollowing(uuid: string): boolean {
  return readFollows().some((c) => c.uuid === uuid);
}

/** Newest first, like the tab lists them. A repeat follow refreshes the snapshot. */
export function follow(creator: Omit<FollowedCreator, "followedAt">): void {
  const rest = readFollows().filter((c) => c.uuid !== creator.uuid);
  write([{ ...creator, followedAt: Date.now() }, ...rest]);
}

export function unfollow(uuid: string): void {
  write(readFollows().filter((c) => c.uuid !== uuid));
}

/** The list, kept current across components and tabs. Empty on the server
    and the first paint, like everything else read from localStorage. */
export function useFollows(): FollowedCreator[] {
  const [list, setList] = useState<FollowedCreator[]>([]);

  useEffect(() => {
    const sync = () => setList(readFollows());
    sync();
    document.addEventListener(FOLLOWS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      document.removeEventListener(FOLLOWS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return list;
}
