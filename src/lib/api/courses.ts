/* =========================================================
   حاضنة صوت's courses from the Sawt API (base + error shape: ./client).

     GET  /pages/courses                    → { data: { items: [...] },
                                                meta: { current_page, last_page, … } }
     GET  /pages/courses/{slug}             → { data: { uuid, slug, title, …,
                                                schedule, objectives, modules,
                                                outcomes, benefits, requirements,
                                                selection_steps, trainer, cta } }
     POST /pages/courses/{slug}/subscribe   → 201 { message, data: { …,
                                                confirmation: { … } } }
     POST /pages/courses/{uuid}/join        → 201 { message, data: { …,
                                                confirmation: { … } } }
                                              (Bearer token; no body)

   Same conventions as ./incubator-page: every text field is a { ar, en } pair
   picked per the current language (`localized`), and uploads are pulled back
   onto the host that serves them (`assetUrl`) once, on the way out of the
   fetch. The listing is only read at build time, to learn which course pages
   to pre-render; the incubator's cards come from GET /pages/incubator.
   ========================================================= */

import { apiFetch, apiPath } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { IncubatorCourse } from "./incubator-page";

type Envelope<T> = { message?: string; data?: T };
type Sorted = { sort_order?: number };

/* --- the listing --------------------------------------------------------- */

type CoursesListing = {
  data?: { items?: IncubatorCourse[] };
  meta?: { current_page?: number; last_page?: number };
};

/** Every page of GET /pages/courses — the listing is paginated (12 a page). */
export async function fetchCourses(signal?: AbortSignal): Promise<IncubatorCourse[]> {
  const items: IncubatorCourse[] = [];
  let page = 1;
  let last = 1;

  do {
    const payload = await apiFetch<CoursesListing>(`/pages/courses?page=${page}`, { signal });
    if (Array.isArray(payload?.data?.items)) items.push(...payload.data.items);
    last = Number(payload?.meta?.last_page) || 1;
    page += 1;
  } while (page <= last);

  return items;
}

/* `output: 'export'` pre-lists every dynamic segment, so the build has to know
   which courses exist. A course added in the admin therefore needs a rebuild
   before its URL exists, exactly as for /media/works/[slug]. */
export async function fetchCourseSlugs(): Promise<string[]> {
  const items = await fetchCourses();
  return items
    .map((item) => (item.slug || "").trim())
    .filter((slug): slug is string => Boolean(slug));
}

/* --- one course ---------------------------------------------------------- */

export type CourseTitledItem = Sorted & {
  icon_url?: string | null;
  title?: Localized;
  description?: Localized;
};

export type CourseLesson = {
  title?: Localized;
  /** Already formatted by the API ("15 دقيقة") — not localized. */
  duration?: string | null;
};

export type CourseModule = Sorted & {
  title?: Localized;
  lessons?: CourseLesson[];
};

export type CourseBenefit = Localized & { icon_url?: string | null };

export type CourseSocial = { platform?: string | null; url?: string | null };

export type CourseTrainer = {
  uuid?: string | null;
  name?: string | null;
  avatar_url?: string | null;
  title?: Localized;
  /** Years, as a string ("8"). */
  experience?: Localized;
  bio?: Localized;
  phone?: string | null;
  email?: string | null;
  socials?: CourseSocial[];
};

export type CourseCta = {
  key?: string | null;
  requires_auth?: boolean;
  method?: string | null;
  /** Absolute from the host — "/api/v1/pages/courses/{slug}/subscribe". */
  path?: string | null;
  label?: Localized;
};

export type CourseSchedule = {
  starts_at?: string | null;
  ends_at?: string | null;
  registration_ends_at?: string | null;
  duration_weeks?: number | null;
  duration_label?: Localized;
  modules_count?: number | null;
  max_seats?: number | null;
};

export type CourseDetail = {
  uuid?: string | null;
  slug?: string | null;
  title?: Localized;
  description?: Localized;
  delivery?: { mode?: string | null; label?: Localized };
  category?: { uuid?: string | null; slug?: string | null; name?: Localized };
  level?: { key?: string | null; label?: Localized };
  rating?: number | null;
  is_coming_soon?: boolean;
  schedule?: CourseSchedule;
  objectives?: CourseTitledItem[];
  modules?: CourseModule[];
  outcomes?: { before?: Localized[]; after?: Localized[] };
  benefits?: CourseBenefit[];
  requirements?: Localized[];
  selection_steps?: CourseTitledItem[];
  trainer?: CourseTrainer | null;
  cta?: CourseCta | null;
};

/** Every upload URL pointed at the host that actually serves it. */
function withAssetUrls(course: CourseDetail): CourseDetail {
  const icons = <T extends { icon_url?: string | null }>(list: T[] | undefined) =>
    Array.isArray(list) ? list.map((item) => ({ ...item, icon_url: assetUrl(item.icon_url) })) : list;

  return {
    ...course,
    objectives: icons(course.objectives),
    benefits: icons(course.benefits),
    selection_steps: icons(course.selection_steps),
    trainer: course.trainer && {
      ...course.trainer,
      avatar_url: assetUrl(course.trainer.avatar_url),
    },
  };
}

export async function fetchCourse(
  slug: string,
  signal?: AbortSignal,
): Promise<CourseDetail | null> {
  const payload = await apiFetch<Envelope<CourseDetail>>(
    `/pages/courses/${encodeURIComponent(slug)}`,
    { signal },
  );
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* --- the subscription ---------------------------------------------------- */

export type CourseSubscribeRequest = {
  full_name: string;
  phone: string;
  phone_country_code: string;
  email: string;
  academic_level: string;
  attended_similar_course?: boolean;
  goals_interests?: string;
  join_goal: string;
  additional_notes?: string;
};

export type CourseConfirmation = {
  /** Already in one language (Arabic) — not a { ar, en } pair. */
  title?: string | null;
  subtitle?: string | null;
  user_name?: string | null;
  course_name?: Localized;
  course_status?: { key?: string | null; label?: Localized };
  email_notice?: string | null;
  email_masked?: string | null;
  cta?: { key?: string | null; label?: Localized; path?: string | null; url?: string | null };
};

export type CourseSubscribeResponse = {
  message?: string;
  data?: {
    uuid?: string;
    status?: string;
    full_name?: string;
    email_masked?: string;
    created_at?: string;
    confirmation?: CourseConfirmation;
  };
};

/** Where a subscription goes when the course payload doesn't name it. */
export function subscribePath(slug: string, ctaPath?: string | null): string {
  return apiPath(ctaPath, `/pages/courses/${encodeURIComponent(slug)}/subscribe`);
}

export function subscribeToCourse(
  path: string,
  body: CourseSubscribeRequest,
  token?: string | null,
): Promise<CourseSubscribeResponse> {
  return apiFetch<CourseSubscribeResponse>(path, { method: "POST", body, token });
}

/* --- the waiting list ---------------------------------------------------- */

/* A coming-soon course takes names instead of subscriptions: "انضم لقائمة
   الانتظار" posts the signed-in visitor to the course's waiting list — no
   form, the account is the application. The answer has the subscription's
   shape (message + `confirmation`), so the same confirmation pane shows it. */

/** True when a course's CTA is the waiting list rather than the subscription
    form — a coming-soon course, a `*wait*` key, or an endpoint ending /join. */
export function isWaitlistCta(
  cta: { key?: string | null; path?: string | null } | null | undefined,
  isComingSoon?: boolean,
): boolean {
  const key = (cta?.key || "").toLowerCase();
  if (key === "subscribe" || key === "details") return Boolean(isComingSoon);
  return Boolean(isComingSoon) || key.includes("wait") || /\/join\/?$/.test(cta?.path || "");
}

/** The waiting-list endpoint — the CTA's own path when it names one, else
    built from the course's uuid (what the endpoint matches on). */
export function waitlistPath(uuid: string, ctaPath?: string | null): string {
  const fallback = `/pages/courses/${encodeURIComponent(uuid)}/join`;
  const path = (ctaPath || "").trim();
  return /\/join\/?$/.test(path) ? apiPath(path, fallback) : fallback;
}

export function joinWaitlist(
  path: string,
  token: string | null,
): Promise<CourseSubscribeResponse> {
  return apiFetch<CourseSubscribeResponse>(path, { method: "POST", token });
}
