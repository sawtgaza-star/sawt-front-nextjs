/* =========================================================
   The signed-in user's own profile (base + error shape: ./client).

     GET    /auth/profile?page=N          (bearer) → { data: { user, following: [...] },
                                                       meta: { current_page, last_page,
                                                               per_page, total } }
     POST   /auth/profile                 (bearer, multipart) { name, email, phone,
                                                       gender, avatar? (file) } → { data: { user } }
     POST   /auth/password                (bearer) { current_password, password,
                                                       password_confirmation } → { message }
     POST   /pages/creators/{uuid}/follow (bearer)
     DELETE /pages/creators/{uuid}/follow (bearer)

   `following` is paginated (12 a page) and lists the creators the user
   follows. Its rows are read defensively (normalizeFollowed) since the
   creator payloads around the API name the same things differently
   (`avatar_url` / `avatar`, `followers_count` / `stats.followers`).
   ========================================================= */

import { apiFetch, ApiError } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { AuthUser } from "./auth";

type Envelope<T> = { message?: string; data?: T };

export type ProfileUser = AuthUser & {
  gender?: "male" | "female" | null;
  avatar_url?: string | null;
  has_avatar?: boolean;
  has_password?: boolean;
  following_count?: number;
};

export type FollowedCreator = {
  /** The profile route segment — /creators/{uuid}. */
  uuid: string;
  name: string;
  avatar: string | null;
  role?: Localized;
  followers?: number | null;
  videos?: number | null;
};

type PageMeta = { current_page?: number; last_page?: number; total?: number };

function num(value: unknown): number | null {
  const n = Number(value);
  return value === null || value === undefined || Number.isNaN(n) ? null : n;
}

/** One `following` row → what the card needs. Null for a row with no id. */
export function normalizeFollowed(row: any): FollowedCreator | null {
  const c = row?.creator && typeof row.creator === "object" ? row.creator : row;
  const uuid = c?.uuid ?? (c?.id != null ? String(c.id) : "");
  if (!uuid) return null;
  return {
    uuid: String(uuid),
    name: String(c.name ?? c.username ?? ""),
    avatar: assetUrl(c.avatar_url ?? c.avatar ?? null) || null,
    role: c.role,
    followers: num(c.followers_count ?? c.stats?.followers),
    videos: num(c.videos_count ?? c.stats?.videos),
  };
}

/** The user plus every creator they follow (all pages of `following`). */
export async function fetchProfile(
  token: string,
  signal?: AbortSignal,
): Promise<{ user: ProfileUser; following: FollowedCreator[] }> {
  const following: FollowedCreator[] = [];
  let user: ProfileUser | undefined;
  let page = 1;
  let last = 1;

  do {
    const payload = await apiFetch<
      Envelope<{ user?: ProfileUser; following?: unknown[] }> & { meta?: PageMeta }
    >(`/auth/profile?page=${page}`, { token, signal });
    user ??= payload?.data?.user;
    for (const row of payload?.data?.following ?? []) {
      const creator = normalizeFollowed(row);
      if (creator && !following.some((c) => c.uuid === creator.uuid)) following.push(creator);
    }
    last = Number(payload?.meta?.last_page) || 1;
    page += 1;
  } while (page <= last && page <= 50);

  if (!user) throw new ApiError("انتهت الجلسة.", 401);
  return { user, following };
}

export type ProfileInput = {
  name: string;
  email: string;
  phone: string;
  gender: "" | "male" | "female";
  /** A newly picked photo; omitted to keep the current one. */
  avatar?: File | null;
};

export async function updateProfile(token: string, input: ProfileInput): Promise<ProfileUser> {
  const body = new FormData();
  body.append("name", input.name);
  body.append("email", input.email);
  body.append("phone", input.phone);
  body.append("gender", input.gender);
  if (input.avatar) body.append("avatar", input.avatar);

  const payload = await apiFetch<Envelope<{ user?: ProfileUser }>>("/auth/profile", {
    method: "POST",
    body,
    token,
  });
  const user = payload?.data?.user;
  if (!user) throw new ApiError("حدث خطأ غير متوقع. حاول مرة أخرى.", 500);
  return user;
}

/** Returns the API's own confirmation message ("" if it sent none). */
export async function changePassword(
  token: string,
  // current_password is left out for an account that has none yet (social sign-in)
  input: { current_password?: string; password: string; password_confirmation: string },
): Promise<string> {
  const payload = await apiFetch<Envelope<unknown>>("/auth/password", {
    method: "POST",
    body: input,
    token,
  });
  return payload?.message ?? "";
}

export async function setFollow(token: string, uuid: string, follow: boolean): Promise<void> {
  await apiFetch<Envelope<unknown>>(`/pages/creators/${encodeURIComponent(uuid)}/follow`, {
    method: follow ? "POST" : "DELETE",
    token,
  });
}
