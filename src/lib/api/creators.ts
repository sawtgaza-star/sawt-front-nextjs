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
};

export type CreatorJoinResponse = {
  message?: string;
  data?: CreatorJoinRequest & {
    uuid?: string;
    status?: string;
    created_at?: string;
  };
};

export function submitCreatorJoin(
  body: CreatorJoinRequest,
  signal?: AbortSignal,
): Promise<CreatorJoinResponse> {
  return apiFetch<CreatorJoinResponse>("/pages/creators/join", {
    method: "POST",
    body,
    signal,
  });
}
