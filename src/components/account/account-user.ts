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
import {
  normalizeCollaborations,
  saveCollaborations as saveCollaborationsApi,
  updateProfile,
  type Collaboration,
  type ProfileUser,
} from "@/lib/api/profile";
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
  /** `is_content_creator` — shows the "ابرز التعاونات" tab. */
  isCreator: boolean;
  collaborations: Collaboration[];
};

/** What the "المعلومات الشخصية" form submits. */
export type AccountDraft = {
  name: string;
  phone: string;
  gender: Gender;
  /** A newly picked photo, or null to keep the current one. */
  avatarFile: File | null;
};

/** A content creator: the API's flag, or a creator role/type. Roles start as
    ["user"] and gain the creator one once an application is accepted — /account
    re-reads GET /auth/profile on every visit (lib/follows), so the "ابرز
    التعاونات" tab appears as soon as the role has changed. Roles are matched
    loosely ("content_creator", "creator", …) and may come as names or objects. */
function isContentCreator(user: ProfileUser): boolean {
  if (user.is_content_creator === true) return true;
  const roles: unknown[] = Array.isArray(user.roles) ? user.roles : [];
  const names = roles.map((role) =>
    typeof role === "string" ? role : String((role as { name?: unknown })?.name ?? ""),
  );
  return [...names, user.type ?? ""].some((name) => /creator/i.test(name));
}

function readAccountUser(): AccountUser | null {
  const user = getUser() as ProfileUser | null;
  if (!user) return null;
  // has_avatar false → the API's generated placeholder: use the Google photo
  // a Google sign-in came with, else our silhouette
  const own = user.has_avatar === false ? null : (user.avatar_url ?? user.avatar ?? null);
  // a content creator with no account photo: the one from their join
  // application, kept on the creator profile (GET /auth/profile → creator)
  const creatorPhoto = user.creator?.avatar_url ?? user.creator?.avatar ?? null;
  const avatar = own || creatorPhoto || getSocialAvatar();
  return {
    key: String(user.id ?? user.uuid),
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    gender: user.gender === "male" || user.gender === "female" ? user.gender : "",
    avatar,
    createdAt: user.created_at ?? null,
    followingCount: typeof user.following_count === "number" ? user.following_count : null,
    isCreator: isContentCreator(user),
    collaborations: normalizeCollaborations(user.collaborations),
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
    // POST /auth/profile answers with the bare user: keep what only
    // GET /auth/profile sends (the creator's collaborations and profile)
    const stored = getUser() as ProfileUser | null;
    const merged: ProfileUser = {
      ...updated,
      collaborations: updated.collaborations ?? stored?.collaborations,
      creator: updated.creator ?? stored?.creator,
    };
    setUser(merged);
  }, []);

  /** "ابرز التعاونات": the creator's whole list, through
      POST /auth/profile/collaborations. Resolves to the API's confirmation
      ("" if it sent none); rejects like `save`. */
  const saveCollaborations = useCallback(
    async (rows: { company_name: string; field: string }[]) => {
      const token = getToken();
      const stored = getUser() as ProfileUser | null;
      if (!stored || !token) throw new ApiError("انتهت الجلسة.", 401);
      const result = await saveCollaborationsApi(token, rows);
      const updated = result.user ?? stored;
      const merged: ProfileUser = {
        ...updated,
        // the API's echo when it sends one, else what was just saved
        collaborations: (result.collaborations as unknown[] | undefined) ?? rows,
        creator: updated.creator ?? stored.creator,
      };
      setUser(merged);
      return result.message;
    },
    [],
  );

  return { user, save, saveCollaborations };
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
