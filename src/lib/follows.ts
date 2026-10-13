"use client";
/* =========================================================
   Followed content creators, from the API (lib/api/profile).

   GET /auth/profile answers with the user AND the creators they follow, so
   one request (refreshProfile) feeds both /account and the follow button on
   a creator's page; concurrent callers share it. The list lives in memory
   here, and every change is announced on FOLLOWS_EVENT so all the hooks on
   the page stay in step.

   follow()/unfollow() update the list first and send the request after; a
   failure puts the server's list back (by refetching) and rethrows. A 401
   means the session is gone — the visitor is sent to sign in.
   ========================================================= */

import { useEffect, useState } from "react";
import { ApiError } from "./api/client";
import {
  fetchProfile,
  setFollow,
  type FollowedCreator,
  type ProfileUser,
} from "./api/profile";
import { clearSession, getToken, isLoggedIn, loginHref, setUser } from "./auth-state";

export type { FollowedCreator };

export const FOLLOWS_EVENT = "sawt:followschange";

let list: FollowedCreator[] = [];
let loaded = false;
let inflight: Promise<ProfileUser | null> | null = null;

function publish(next: FollowedCreator[]): void {
  list = next;
  document.dispatchEvent(new CustomEvent(FOLLOWS_EVENT));
}

/** Session expired or revoked: drop it and go sign in, coming back here. */
export function handleAuthError(error: unknown): boolean {
  if (error instanceof ApiError && error.isUnauthorized) {
    clearSession();
    window.location.href = loginHref();
    return true;
  }
  return false;
}

/** Fetches the profile (user + followed creators) once per page load, or
    again when `force`d. Resolves to the user, or null for a guest. */
export function refreshProfile(force = false): Promise<ProfileUser | null> {
  if (inflight && !force) return inflight;
  const token = getToken();
  if (!token) return Promise.resolve(null);

  inflight = fetchProfile(token)
    .then(({ user, following }) => {
      setUser(user);
      loaded = true;
      publish(following);
      return user;
    })
    .catch((error) => {
      inflight = null;
      if (handleAuthError(error)) return null;
      console.warn("[profile] could not load:", error);
      // settle the loading state on whatever list is held
      loaded = true;
      publish(list);
      return null;
    });
  return inflight;
}

export function isFollowing(uuid: string): boolean {
  return list.some((c) => c.uuid === uuid);
}

async function send(uuid: string, follow: boolean): Promise<void> {
  const token = getToken();
  if (!token) {
    clearSession();
    window.location.href = loginHref();
    return;
  }
  try {
    await setFollow(token, uuid, follow);
  } catch (error) {
    if (handleAuthError(error)) return;
    await refreshProfile(true);
    throw error;
  }
}

/** Newest first, like the tab lists them. */
export function follow(creator: FollowedCreator): Promise<void> {
  publish([creator, ...list.filter((c) => c.uuid !== creator.uuid)]);
  return send(creator.uuid, true);
}

export function unfollow(uuid: string): Promise<void> {
  publish(list.filter((c) => c.uuid !== uuid));
  return send(uuid, false);
}

/** The followed creators, kept current across components. Empty on the
    server and the first paint; `loaded` turns true once the API answered. */
export function useFollows(): { creators: FollowedCreator[]; loaded: boolean } {
  const [state, setState] = useState({ creators: list, loaded });

  useEffect(() => {
    const sync = () => setState({ creators: list, loaded });
    sync();
    document.addEventListener(FOLLOWS_EVENT, sync);
    if (isLoggedIn()) refreshProfile();
    return () => document.removeEventListener(FOLLOWS_EVENT, sync);
  }, []);

  return state;
}
