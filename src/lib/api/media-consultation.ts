/* =========================================================
   صوت ميديا's booking form (base + error shape: ./client).

     GET  /pages/media/services/options → { data: [ { id, uuid, slug, name } ] }
     POST /pages/media/consultation     → 201 { message, data: { uuid, …,
                                                 service: { slug, title },
                                                 status, created_at } }

   The second write the marketing site makes, after the creator join. Same
   bargain as ./creators: `message` is the server's own wording of "we've got
   it, we'll be in touch" and the form shows it verbatim rather than built-in
   copy, so the backend can change what a visitor is told without a deploy;
   validation comes back as Laravel's 422 { message, errors: {field: […]} } in
   ApiError and is painted onto the fields it names.

   `service` is sent as the option's UUID — the stable id the options endpoint
   and the page payload both carry. The slug is what the option reads as in a
   URL, not what the endpoint matches on.
   ========================================================= */

import { API_BASE_URL, apiFetch } from "./client";
import { localized, type Localized } from "./pages";
import type { MediaOption } from "./media-page";

type Envelope<T> = { message?: string; data?: T };

/** One row of GET /pages/media/services/options. */
export type MediaServiceOption = {
  id?: number;
  uuid?: string | null;
  slug?: string | null;
  name?: Localized;
};

export async function fetchMediaServiceOptions(
  signal?: AbortSignal,
): Promise<MediaServiceOption[]> {
  const payload = await apiFetch<Envelope<MediaServiceOption[]>>(
    "/pages/media/services/options",
    { signal },
  );
  return Array.isArray(payload?.data) ? payload.data : [];
}

/* --- the write ----------------------------------------------------------- */

export type ConsultationRequest = {
  name: string;
  email: string;
  phone: string;
  country_code?: string;
  /** The chosen service's UUID. */
  service: string;
};

export type ConsultationResponse = {
  message?: string;
  data?: {
    uuid?: string;
    name?: string;
    email?: string;
    phone?: string;
    country_code?: string;
    /** Already resolved and already in one language — not a { ar, en } pair. */
    service?: { slug?: string | null; title?: string | null };
    status?: string;
    created_at?: string;
  };
};

/** Where the booking goes when the payload doesn't name it. */
export const CONSULTATION_PATH = "/pages/media/consultation";

/* The payload's `form.submit_path` is absolute from the host — "/api/v1/pages/
   media/consultation" — while apiFetch takes a path relative to API_BASE_URL,
   which already carries that prefix. So the base's own path is taken off the
   front before the endpoint is handed over; a `submit_path` that doesn't start
   with it is used as it came, and a missing one falls back to the constant
   above. The endpoint is the API's to move, not this file's to hardcode. */
export function consultationPath(submitPath?: string | null): string {
  const path = (submitPath || "").trim();
  if (!path.startsWith("/")) return CONSULTATION_PATH;

  let prefix = "";
  try {
    prefix = new URL(API_BASE_URL).pathname.replace(/\/+$/, "");
  } catch {
    prefix = API_BASE_URL.replace(/\/+$/, "");
  }

  if (prefix && prefix !== "/" && path.startsWith(prefix + "/")) {
    return path.slice(prefix.length);
  }
  return path;
}

export function submitConsultation(
  body: ConsultationRequest,
  path: string = CONSULTATION_PATH,
  signal?: AbortSignal,
): Promise<ConsultationResponse> {
  return apiFetch<ConsultationResponse>(path, { method: "POST", body, signal });
}

/* --- the dropdown -------------------------------------------------------- */

/** One <option>: the UUID the endpoint matches on, and what it reads as. */
export type ServiceChoice = { value: string; label: string };

/** The service list as the form needs it, from whichever source answered.

    The options endpoint is the list's own home; `form.services` in the /media
    payload is the same five services, already on screen when the page drew the
    form. So the endpoint's answer wins and the payload stands in until it
    lands — or for good, if that request fails. Either shape is matched on its
    UUID, with the slug as a last resort so an option is never valueless. */
export function serviceChoices(
  options: MediaServiceOption[] | undefined,
  fallback: MediaOption[] | undefined,
  lang: string,
): ServiceChoice[] {
  if (options?.length) {
    return options
      .map((option) => ({
        value: option.uuid || option.slug || "",
        label: localized(option.name, lang),
      }))
      .filter((choice) => choice.value);
  }

  return (fallback || [])
    .map((option) => ({
      value: option.uuid || option.value || option.slug || "",
      label: localized(option.label, lang),
    }))
    .filter((choice) => choice.value);
}
