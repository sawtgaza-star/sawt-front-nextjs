/* "ساعد طلاب في الانضمام للحاضنة" — sponsorable incubator courses. */

import { localized } from "@/lib/api/pages";
import type { SupportPackage } from "@/lib/api/support";

export type Course = {
  key: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  weeks: number;
  seats: number;
  /* Full CTA sentence — one string (and one span) so it stays on a single line. */
  cta: string;
  ctaKey: string;
  /* Sponsorship price in $ — matches the figure inside `cta`, and is what the
     CTA hands to /support/methods. */
  amount: number;
};

export const COURSES: Course[] = [
  {
    key: "field-journalism",
    title: "صحافة ميدانية",
    titleKey: "support_course_field_title",
    desc: "تدريب ميداني على التغطية الإخبارية في مناطق النزاع",
    descKey: "support_course_field_desc",
    weeks: 8,
    seats: 6,
    cta: "تكفل دورة صحافة ميدانية لطالب واحد بـ 120$",
    ctaKey: "support_course_field_cta",
    amount: 120,
  },
  {
    key: "podcast",
    title: "بودكاست وصوت",
    titleKey: "support_course_podcast_title",
    desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    descKey: "support_course_podcast_desc",
    weeks: 8,
    seats: 6,
    cta: "تكفل دورة بودكاست وصوت لطالب واحد بـ 120$",
    ctaKey: "support_course_podcast_cta",
    amount: 120,
  },
  {
    key: "video",
    title: "إنتاج مرئي",
    titleKey: "support_course_video_title",
    desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    descKey: "support_course_video_desc",
    weeks: 8,
    seats: 6,
    cta: "تكفل دورة إنتاج مرئي لطالب واحد بـ 120$",
    ctaKey: "support_course_video_cta",
    amount: 120,
  },
];

/** One card as the section draws it — the API's package, or a built-in
    course (whose copy keeps its data-i18n keys). */
export type SponsorCard = {
  key: string;
  title: string;
  titleKey?: string;
  desc: string;
  descKey?: string;
  /** "8 أسابيع" in full from the API; built-in cards build it from `weeks`. */
  duration?: string;
  seatsLabel?: string;
  weeks?: number;
  seats?: number;
  cta: string;
  ctaKey?: string;
  amount: number;
};

/* GET /pages/support's `sponsor.packages`, resolved for one language; the
   built-in courses stand in when the API sent none. */
export function resolveSponsorCards(
  packages: SupportPackage[] | undefined,
  lang: string,
): SponsorCard[] {
  const resolved = (packages || [])
    .map((pkg, index): SponsorCard => {
      const price = Number(pkg.price);
      return {
        key: String(index),
        title: localized(pkg.title, lang),
        desc: localized(pkg.description, lang),
        duration: localized(pkg.duration, lang),
        seatsLabel: localized(pkg.seats, lang),
        cta: localized(pkg.cta?.label, lang),
        amount: Number.isFinite(price) && price > 0 ? price : 0,
      };
    })
    .filter((card) => card.title);

  return resolved.length ? resolved : COURSES;
}
