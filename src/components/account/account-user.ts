"use client";
/* The signed-in user as /account shows it: the stored session user
   (lib/auth-state), refreshed from GET /auth/profile when /account opens
   (lib/follows → refreshProfile, via useFollows) and replaced by the answer of
   POST /auth/profile after an edit. */

import { useCallback, useEffect, useState } from "react";
import {
  getSocialAvatar,
  getSocialProvider,
  getToken,
  getUser,
  setUser,
  USER_EVENT,
} from "@/lib/auth-state";
import { updateProfile, type ProfileUser } from "@/lib/api/profile";
import { ApiError } from "@/lib/api/client";

export type Gender = "" | "male" | "female";

export type AccountUser = {
  key: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  avatar: string | null;
  createdAt: string | null;
  followingCount: number | null;
};

/** What the "المعلومات الشخصية" form submits. */
export type AccountDraft = {
  name: string;
  phone: string;
  gender: Gender;
  /** A newly picked photo, or null to keep the current one. */
  avatarFile: File | null;
};

function readAccountUser(): AccountUser | null {
  const user = getUser() as ProfileUser | null;
  if (!user) return null;
  // has_avatar false → the API's generated placeholder: use the Google photo
  // a Google sign-in came with, else our silhouette
  const own = user.has_avatar === false ? null : (user.avatar_url ?? user.avatar ?? null);
  const avatar = own || getSocialAvatar();
  return {
    key: String(user.id ?? user.uuid),
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    gender: user.gender === "male" || user.gender === "female" ? user.gender : "",
    avatar,
    createdAt: user.created_at ?? null,
    followingCount: typeof user.following_count === "number" ? user.following_count : null,
  };
}

/** `undefined` until the browser has been read, then the user or null.
    `save` sends the edit and resolves once the API has accepted it; it
    rejects with the ApiError (field errors included) otherwise. */
export function useAccountUser() {
  const [user, setState] = useState<AccountUser | null | undefined>(undefined);

  useEffect(() => {
    const sync = () => setState(readAccountUser());
    sync();
    document.addEventListener(USER_EVENT, sync);
    return () => document.removeEventListener(USER_EVENT, sync);
  }, []);

  const save = useCallback(async (draft: AccountDraft) => {
    const current = readAccountUser();
    const token = getToken();
    if (!current || !token) throw new ApiError("انتهت الجلسة.", 401);
    const updated = await updateProfile(token, {
      name: draft.name,
      email: current.email,
      phone: draft.phone,
      gender: draft.gender,
      avatar: draft.avatarFile,
    });
    setUser(updated);
  }, []);

  return { user, save };
}

/** Whether "تغيير كلمة المرور" asks for the current password. Not for a
    Google/Facebook sign-in — that account may have none — unless the API says
    it does have one (`has_password`, from GET /auth/profile), in which case
    the API wants it. An email sign-in always has one. */
export function needsCurrentPassword(): boolean {
  const user = getUser() as ProfileUser | null;
  if (user?.has_password === false) return false;
  if (user?.has_password === true) return true;
  return !getSocialProvider();
}

/** After a password was set: the account has one from now on. */
export function markHasPassword(): void {
  const user = getUser() as ProfileUser | null;
  if (user && user.has_password !== true) setUser({ ...user, has_password: true } as ProfileUser);
}

/** "مارس 2026" / "March 2026" — the "في صوت منذ" line. */
export function memberSince(createdAt: string | null, lang: string): string {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(lang === "en" ? "en-US" : "ar-EG", {
    month: "long",
    year: "numeric",
  });
}

/** Fills `{name}`-style holes in a dictionary string. */
export function fill(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}
