/* =========================================================
   Creator applications (base + error shape: ./client).

     POST /pages/creators/join → 201 { message, data: { uuid, …, status } }

   The one write the marketing site makes. `message` is the server's own
   wording of "we've got it, we'll be in touch" — the join modal shows it
   verbatim rather than its built-in copy, so the backend can change what an
   applicant is told without a deploy.

   Validation comes back as Laravel's usual 422 { message, errors: {field: […]}}
   in ApiError; the modal paints those onto the fields it can name.
   ========================================================= */

import { apiFetch } from "./client";

/** `platform` is checked against the API's own list — instagram, facebook,
    twitter, tiktok, youtube, linkedin. The modal's select calls X "x", which
    the API rejects, so it is mapped on the way out (see lib/legacy-home). */
export type CreatorSocial = { platform: string; url: string };

export type CreatorJoinRequest = {
  full_name: string;
  phone: string;
  country_code?: string;
  email: string;
  content_types: string[];
  followers_count: number;
  content_bio: string;
  socials: CreatorSocial[];
  notes?: string;
  /** The "أنا لست روبوت" answer (lib/recaptcha), checked by the API. */
  recaptcha_token?: string | null;
  /** The optional photo from the modal's first step, already cropped square.
      With one the request goes as multipart; without, as JSON as before. */
  avatar?: File | null;
};

export type CreatorJoinResponse = {
  message?: string;
  data?: CreatorJoinRequest & {
    uuid?: string;
    status?: string;
    created_at?: string;
  };
};

/* Multipart in Laravel's bracket notation (content_types[0],
   socials[0][platform]), which it parses back into the same arrays the JSON
   body carries — so the validation rules see one shape either way. */
function toFormData(fields: Omit<CreatorJoinRequest, "avatar">, photo: File): FormData {
  const form = new FormData();
  const add = (key: string, value: unknown) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((item, i) => add(`${key}[${i}]`, item));
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => add(`${key}[${k}]`, v));
    } else {
      form.append(key, String(value));
    }
  };
  Object.entries(fields).forEach(([key, value]) => add(key, value));
  form.append("avatar", photo);
  return form;
}

export function submitCreatorJoin(
  body: CreatorJoinRequest,
  signal?: AbortSignal,
): Promise<CreatorJoinResponse> {
  const { avatar, ...json } = body;
  return apiFetch<CreatorJoinResponse>("/pages/creators/join", {
    method: "POST",
    body: avatar ? toFormData(json, avatar) : json,
    signal,
  });
}
