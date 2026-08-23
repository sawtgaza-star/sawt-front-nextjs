import { MEDIA_PHOTOS } from "./media-photos";

/* The five service cards, in the design's order. `theme` maps to the card's
   palette in media.css; the photo swaps sides on every other card (odd cards
   put the photo first — on the right in RTL — even cards put the copy first). */
export type MediaService = {
  key: string;
  num: string;
  title: string;
  titleKey: string;
  tagline: string;
  taglineKey: string;
  desc: string;
  descKey: string;
  tags: { key: string; text: string }[];
  photo: string;
  theme: "beige" | "olive-dark" | "olive-light" | "ink" | "peach";
};

/* every card carries the same chip row in the design */
const TAGS = [
  { key: "sm_svc_tag_drone", text: "Drone" },
  { key: "sm_svc_tag_branding", text: "Personal Branding" },
  { key: "sm_svc_tag_products", text: "تصوير المنتجات" },
  { key: "sm_svc_tag_events", text: "تصوير الفعاليات" },
];

const PHOTO_DESC =
  "نلتقط اللحظات التي تستحق أن تُرى. بعين خبيرة وأدوات احترافية، نحوّل كل لحظة إلى صورة تعكس جوهر ما تريد قوله للعالم.";
const VIDEO_DESC =
  "نصنع فيديوهات احترافية تحكي قصة علامتك التجارية بأسلوب إبداعي يجذب الانتباه ويحقق أهدافك التسويقية، من اللقطة الأولى حتى التسليم النهائي.";

export const MEDIA_SERVICES: MediaService[] = [
  {
    key: "photography",
    num: "01",
    title: "التصوير الاحترافي",
    titleKey: "sm_svc_photo_title",
    tagline: "كل صورة تحكي ألف كلمة",
    taglineKey: "sm_svc_tagline",
    desc: PHOTO_DESC,
    descKey: "sm_svc_photo_desc",
    tags: TAGS,
    photo: MEDIA_PHOTOS.studio,
    theme: "beige",
  },
  {
    key: "video",
    num: "02",
    title: "إنتاج الفيديوهات",
    titleKey: "sm_svc_video_title",
    tagline: "كل صورة تحكي ألف كلمة",
    taglineKey: "sm_svc_tagline",
    desc: PHOTO_DESC,
    descKey: "sm_svc_photo_desc",
    tags: TAGS,
    photo: MEDIA_PHOTOS.desk,
    theme: "olive-dark",
  },
  {
    key: "graphics",
    num: "03",
    title: "التصميم الجرافيكي",
    titleKey: "sm_svc_graphic_title",
    tagline: "كل صورة تحكي ألف كلمة",
    taglineKey: "sm_svc_tagline",
    desc: VIDEO_DESC,
    descKey: "sm_svc_video_desc",
    tags: TAGS,
    photo: MEDIA_PHOTOS.crew,
    theme: "olive-light",
  },
  {
    key: "content",
    num: "04",
    title: "صناعة المحتوى",
    titleKey: "sm_svc_content_title",
    tagline: "كل صورة تحكي ألف كلمة",
    taglineKey: "sm_svc_tagline",
    desc: VIDEO_DESC,
    descKey: "sm_svc_video_desc",
    tags: TAGS,
    photo: MEDIA_PHOTOS.crew,
    theme: "ink",
  },
  {
    key: "coverage",
    num: "05",
    title: "التغطية والاستشارات",
    titleKey: "sm_svc_coverage_title",
    tagline: "كل صورة تحكي ألف كلمة",
    taglineKey: "sm_svc_tagline",
    desc: "نغطي مؤتمراتك ومبادراتك ونعدّ تقاريرها الإعلامية، ونقدّم لك تدريبًا على صناعة المحتوى والظهور أمام الكاميرا، واستشارات لبناء حضورك الإعلامي.",
    descKey: "sm_svc_coverage_desc",
    tags: TAGS,
    photo: MEDIA_PHOTOS.crew,
    theme: "peach",
  },
];
