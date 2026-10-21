/* =========================================================
   The signed-in user's own profile (base + error shape: ./client).

     GET    /auth/profile?page=N          (bearer) → { data: { user, following: [...] },
                                                       meta: { current_page, last_page,
                                                               per_page, total } }
     POST   /auth/profile                 (bearer, multipart) { name, email, phone,
                                                       gender, avatar? (file) } → { data: { user } }
     POST   /auth/profile/collaborations  (bearer, JSON) { collaborations: [{ company_name,
                                                       field }] } → { message, data: { user } }
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
  /** A content creator's "ابرز التعاونات" (`is_content_creator`), raw — read
      through normalizeCollaborations. GET /auth/profile may send it on the
      user or beside it (`data.collaborations`); fetchProfile keeps it here
      either way, so the stored user carries it. */
  collaborations?: unknown[];
  /** A content creator's own creator profile, when GET /auth/profile sends it
      (on the user or beside it) — its photo is the one uploaded with the join
      application, which the account itself doesn't get. */
  creator?: { avatar_url?: string | null; avatar?: string | null } | null;
};

/** One of the creator's past collaborations — the same `company_name` /
    `field` pair the join modal sends (lib/api/creators). */
export type Collaboration = { companyName: Localized | string; field: Localized | string };

/** Read defensively, like normalizeFollowed. Accepts a plain list or one
    wrapped as `{ items: [...] }`, and rows in any of the shapes the API uses:
    GET /auth/profile's ({ uuid, company: { uuid, name, field } }), the join
    form's ({ company_name, field }) or the public creator profile's
    ({ company: { name, category: [...] } }); rows without a company are
    dropped. */
export function normalizeCollaborations(list: unknown): Collaboration[] {
  const rows = Array.isArray(list)
    ? list
    : Array.isArray((list as { items?: unknown })?.items)
      ? (list as { items: unknown[] }).items
      : [];
  const out: Collaboration[] = [];
  for (const row of rows as any[]) {
    if (!row || typeof row !== "object") continue;
    const company = row.company && typeof row.company === "object" ? row.company : null;
    const companyName = row.company_name ?? company?.name ?? row.company ?? row.name ?? "";
    if (!companyName) continue;
    const category = Array.isArray(company?.category) ? company.category[0] : company?.category;
    // GET /auth/profile: { uuid, company: { uuid, name, field } }
    const field =
      row.field ?? company?.field ?? row.field_name ?? row.category ?? category ?? "";
    out.push({ companyName, field });
  }
  return out;
}

/** Wherever GET /auth/profile puts a creator's collaborations: on the user,
    beside it, or inside the creator profile (either side). */
function findCollaborations(data: any): unknown {
  const user = data?.user;
  const candidates = [
    user?.collaborations,
    data?.collaborations,
    user?.creator?.collaborations,
    user?.content_creator?.collaborations,
    data?.creator?.collaborations,
    data?.content_creator?.collaborations,
  ];
  return candidates.find((c) => normalizeCollaborations(c).length) ?? candidates.find((c) => c != null);
}

export type FollowedCreator = {
  /** The profile route segment — /creators/{uuid}. */
  uuid: string;
  name: string;
  avatar: string | null;
  role?: Localized;
  followers?: number | null;
  videos?: number | null;
  /** The card's bio line — the creator's `experience_excerpt`. */
  excerpt?: Localized;
  verified?: boolean;
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
    excerpt: c.experience_excerpt,
    verified: c.is_verified === true,
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
      Envelope<{
        user?: ProfileUser;
        following?: unknown[];
        collaborations?: unknown[];
        creator?: ProfileUser["creator"];
        content_creator?: ProfileUser["creator"];
      }> & {
        meta?: PageMeta;
      }
    >(`/auth/profile?page=${page}`, { token, signal });
    if (!user && payload?.data?.user) {
      const collaborations = findCollaborations(payload.data);
      const u = payload.data.user as ProfileUser & { content_creator?: ProfileUser["creator"] };
      const creator =
        u.creator ?? u.content_creator ?? payload.data.creator ?? payload.data.content_creator;
      user = {
        ...u,
        ...(collaborations != null ? { collaborations: collaborations as unknown[] } : {}),
        ...(creator && typeof creator === "object" ? { creator } : {}),
      };
    }
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

/** A creator's "ابرز التعاونات" — the whole list replaces the saved one (an
    empty list clears it). Resolves to the user the API answers with, its
    collaborations read wherever the response puts them (findCollaborations),
    and the API's own confirmation ("" if it sent none). */
export async function saveCollaborations(
  token: string,
  collaborations: { company_name: string; field: string }[],
): Promise<{ user: ProfileUser | null; collaborations: unknown; message: string }> {
  const payload = await apiFetch<Envelope<{ user?: ProfileUser; collaborations?: unknown[] }>>(
    "/auth/profile/collaborations",
    { method: "POST", body: { collaborations }, token },
  );
  return {
    user: payload?.data?.user ?? null,
    collaborations: findCollaborations(payload?.data),
    message: payload?.message ?? "",
  };
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
