/* "ساعد طلاب في الانضمام للحاضنة" — the sponsorship section's three data sets:
   the 2×2 track cards, the "طلاب ينتظرون داعماً" list and the orange
   "أثر البرنامج" counters. Order is the mock's reading order, i.e. the first
   track is the top-right card in RTL.
   Every track in the mock shares the same duration/seats chips, so those two
   strings live in one pair of translation keys (inc_sponsor_weeks / _seats). */

export type SponsorTrack = {
  key: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  /* "تكفّل دورة … لطالب واحد ب 120$" */
  cta: string;
  ctaKey: string;
  /* every track sponsors through the same page — /support/methods, "اختر
     طريقة الدعم التي تناسبك" */
  href: string;
};

export type SponsorStudent = {
  key: string;
  name: string;
  nameKey: string;
  /* "التخصص · المحافظة" */
  meta: string;
  metaKey: string;
  /* the mock shows three avatar states: photo, initials, or the fallback icon */
  photo?: string;
  initials?: string;
};

export type ImpactRow = {
  key: string;
  value: string;
  label: string;
  labelKey: string;
};

export const SPONSOR_TRACKS: SponsorTrack[] = [
  {
    key: "field-journalism",
    title: "صحافة ميدانية",
    titleKey: "inc_sponsor_field_title",
    desc: "تدريب ميداني على التغطية الإخبارية في مناطق النزاع",
    descKey: "inc_sponsor_field_desc",
    cta: "تكفّل دورة صحافة ميدانية لطالب واحد ب 120$",
    ctaKey: "inc_sponsor_field_cta",
    href: "/support/methods",
  },
  {
    key: "podcast",
    title: "بودكاست وصوت",
    titleKey: "inc_sponsor_podcast_title",
    desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    descKey: "inc_sponsor_podcast_desc",
    cta: "تكفّل دورة بودكاست وصوت لطالب واحد ب 120$",
    ctaKey: "inc_sponsor_podcast_cta",
    href: "/support/methods",
  },
  {
    key: "creative-writing",
    title: "كتابة إبداعية",
    titleKey: "inc_sponsor_writing_title",
    desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    descKey: "inc_sponsor_writing_desc",
    cta: "تكفّل دورة كتابة إبداعية لطالب واحد ب 120$",
    ctaKey: "inc_sponsor_writing_cta",
    href: "/support/methods",
  },
  {
    key: "video",
    title: "إنتاج مرئي",
    titleKey: "inc_sponsor_video_title",
    desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    descKey: "inc_sponsor_video_desc",
    cta: "تكفّل دورة إنتاج مرئي لطالب واحد ب 120$",
    ctaKey: "inc_sponsor_video_cta",
    href: "/support/methods",
  },
];

export const SPONSOR_STUDENTS: SponsorStudent[] = [
  {
    key: "reem",
    name: "ريم س.",
    nameKey: "inc_sponsor_student_reem",
    meta: "إنتاج مرئي · خانيونس",
    metaKey: "inc_sponsor_student_reem_meta",
    photo: "/assets/images/1.png",
  },
  {
    key: "ahmad",
    name: "أحمد خ.",
    nameKey: "inc_sponsor_student_ahmad",
    meta: "صحافة ميدانية · غزة",
    metaKey: "inc_sponsor_student_ahmad_meta",
  },
  {
    key: "yousef",
    name: "يوسف م.",
    nameKey: "inc_sponsor_student_yousef",
    meta: "بودكاست وصوت · رفح",
    metaKey: "inc_sponsor_student_yousef_meta",
    initials: "AB",
  },
];

export const IMPACT_ROWS: ImpactRow[] = [
  {
    key: "stories",
    value: "340+",
    label: "قصة وثقت",
    labelKey: "inc_sponsor_impact_stories",
  },
  {
    key: "journalists",
    value: "12",
    label: "صحفيون ميدانيون",
    labelKey: "inc_sponsor_impact_journalists",
  },
  {
    key: "graduates",
    value: "47",
    label: "أتموا دوراتهم",
    labelKey: "inc_sponsor_impact_graduates",
  },
];
