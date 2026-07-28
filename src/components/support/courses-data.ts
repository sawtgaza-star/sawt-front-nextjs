/* "ساعد طلاب في الانضمام للحاضنة" — sponsorable incubator courses. */

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
