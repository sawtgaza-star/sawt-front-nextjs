/* "دوراتنا الأكثر شهرة" — the card view model. Each item of GET /pages/incubator's
   `courses` block is turned into the shape CourseCard draws; each card
   declares which blocks it renders rather than every card looking alike:
   - a running course: photo + meta chips + rating, and on hover the
     description, trainer and "تفاصيل الكورس"
   - a coming-soon course (`is_coming_soon`): photo + "قريبًا" flag + copy +
     CTA, with the chips, rating and trainer revealed on hover

   `reveal` lists the blocks a card keeps hidden until it is hovered — at rest
   it looks exactly as above, on hover it fills out to the full detail set
   while the photo slides up to make room.

   `featured` (the mock's outlined, photo-less middle card) is unused; the type
   and its CSS are kept for when it's wanted again. */

import { localized } from "@/lib/api/pages";
import type { IncubatorCourse } from "@/lib/api/incubator-page";
import { isWaitlistCta, waitlistPath } from "@/lib/api/courses";
import { t } from "@/lib/translations";
import { PLACEHOLDER, courseHref } from "./incubator-page-view";

export type CourseMeta = {
  /* which chip icon to draw: total duration / weekly hours / level */
  icon: "duration" | "hours" | "level";
  value: string;
};

export type PopularCourse = {
  key: string;
  /* course detail page — the whole card is a link (overlay) */
  href: string;
  /* photo card vs the bordered, image-less featured card */
  featured?: boolean;
  image?: string;
  category?: string;
  /* renders the green "قريبًا" flag on the photo */
  soon?: boolean;
  title: string;
  meta?: CourseMeta[];
  /* filled stars out of five */
  rating?: number;
  desc?: string;
  tutor?: { name: string; avatar: string };
  cta?: { label: string; href: string };
  /* a coming-soon course's CTA posts the visitor to its waiting list instead
     of linking anywhere — the join endpoint, relative to the API base */
  waitlist?: { label: string; path: string };
  /* blocks that stay collapsed until the card is hovered */
  reveal?: CourseBlock[];
};

export type CourseBlock = "meta" | "rating" | "desc" | "tutor" | "cta";

export function toPopularCourse(
  course: IncubatorCourse,
  lang: string,
  index: number,
): PopularCourse {
  const href = courseHref(course.slug);
  const soon = Boolean(course.is_coming_soon);

  const meta: CourseMeta[] = [
    { icon: "duration" as const, value: (course.duration_hours || "").trim() },
    { icon: "hours" as const, value: (course.sessions_hours || "").trim() },
    { icon: "level" as const, value: localized(course.level, lang) },
  ].filter((chip) => chip.value);

  const tutorName = localized(course.trainer?.name, lang);
  const ctaLabel = localized(course.cta?.label, lang);
  const waitlist =
    course.uuid && isWaitlistCta(course.cta, soon)
      ? {
          label: ctaLabel || t("inc_course_waitlist_cta"),
          path: waitlistPath(course.uuid),
        }
      : undefined;
  const rating = Number(course.rating);

  return {
    key: course.uuid || course.slug || String(course.id ?? index),
    href,
    image: course.image_url || PLACEHOLDER.card,
    category: localized(course.category, lang) || undefined,
    soon,
    title: localized(course.title, lang),
    meta: meta.length ? meta : undefined,
    rating: Number.isFinite(rating) && rating > 0 ? Math.min(5, Math.round(rating)) : undefined,
    desc: localized(course.description, lang) || undefined,
    tutor: tutorName
      ? { name: tutorName, avatar: course.trainer?.avatar_url || PLACEHOLDER.person }
      : undefined,
    cta: ctaLabel && !waitlist ? { label: ctaLabel, href } : undefined,
    waitlist,
    reveal: soon ? ["meta", "rating", "tutor"] : ["desc", "tutor", "cta"],
  };
}
