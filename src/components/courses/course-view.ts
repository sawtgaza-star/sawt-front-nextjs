/* What GET /pages/courses/{slug} does NOT send: how the design draws it.
   Every word a visitor reads about the course comes from the payload
   (lib/api/courses); the fixed labels ("المدة:", "أهداف البرنامج"…) are the
   site's own and go through t(), because the sections mount after
   initTranslate() has walked the page. */

import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import { t } from "@/lib/translations";
import type { CourseDetail } from "@/lib/api/courses";

export { sortItems };

/** "2026-08-30T23:59:59+00:00" → "30/8/2026" — the mock's day/month/year,
    read in UTC so the date is the one the editor picked wherever the visitor
    is. "" for a missing or unparseable value. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
}

export type CourseMetaRow = { key: string; label: string; value: string };

/** The registration card's five labelled rows; a row the payload leaves empty
    is dropped rather than drawn with a blank value. */
export function courseMeta(course: CourseDetail, lang: string): CourseMetaRow[] {
  const schedule = course.schedule;
  const modules = schedule?.modules_count ?? course.modules?.length;
  const seats = schedule?.max_seats;

  return [
    { key: "duration", label: t("crs_meta_duration"), value: localized(schedule?.duration_label, lang) },
    { key: "regEnd", label: t("crs_meta_reg_end"), value: formatDate(schedule?.registration_ends_at) },
    { key: "start", label: t("crs_meta_start"), value: formatDate(schedule?.starts_at) },
    { key: "modules", label: t("crs_meta_modules"), value: modules ? String(modules) : "" },
    { key: "seats", label: t("crs_meta_seats"), value: seats ? String(seats) : "" },
  ].filter((row) => row.value);
}
