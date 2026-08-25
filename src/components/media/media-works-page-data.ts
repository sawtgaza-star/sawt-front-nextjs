import { MEDIA_PHOTOS } from "./media-photos";

/* Data behind /media/works — the full portfolio the "شاهد المزيد من اعمالنا"
   button opens. Same project shape as the home wall (media-works-data.ts), so
   the nine projects that already live there keep their i18n keys; each entry
   also carries the two facets the sidebar filters on. */
export type WorkFacetId = string;

export type MediaPageWork = {
  key: string;
  photo: string;
  tag: string;
  tagKey: string;
  date: string;
  dateKey: string;
  title: string;
  titleKey: string;
  sub: string;
  subKey: string;
  /* id from SECTION_FILTER */
  section: WorkFacetId;
  /* id from SPECIALTY_FILTER */
  specialty: WorkFacetId;
};

/* tags and dates repeat across the projects, so they share their i18n keys */
const TAG_DEV = { tag: "تطوير", tagKey: "sm_works_tag" };
const TAG_PHOTO = { tag: "تصوير", tagKey: "sm_works_tag_photo" };
const TAG_VIDEO = { tag: "إنتاج", tagKey: "sm_works_tag_video" };
const TAG_DESIGN = { tag: "تصميم", tagKey: "sm_works_tag_design" };
const TAG_MARKET = { tag: "تسويق", tagKey: "sm_works_tag_market" };

const AUG = { date: "2026 أغسطس", dateKey: "sm_works_date" };
const JUL = { date: "2026 يوليو", dateKey: "sm_works_date_jul" };
const JUN = { date: "2026 يونيو", dateKey: "sm_works_date_jun" };
const MAY = { date: "2026 مايو", dateKey: "sm_works_date_may" };
const APR = { date: "2026 أبريل", dateKey: "sm_works_date_apr" };
const MAR = { date: "2026 مارس", dateKey: "sm_works_date_mar" };

export type WorkFilterGroup = {
  /* which field of MediaPageWork this group filters on */
  facet: "section" | "specialty";
  title: string;
  titleKey: string;
  options: { id: WorkFacetId; label: string; labelKey: string }[];
};

export const WORK_FILTERS: WorkFilterGroup[] = [
  {
    facet: "section",
    title: "القسم",
    titleKey: "sm_wp_filter_section",
    options: [
      { id: "photo", label: "تصوير", labelKey: "sm_wp_sec_photo" },
      { id: "design", label: "تصميم", labelKey: "sm_wp_sec_design" },
      { id: "digital", label: "منتجات رقمية", labelKey: "sm_wp_sec_digital" },
      { id: "coverage", label: "تغطية", labelKey: "sm_wp_sec_coverage" },
      { id: "video", label: "إنتاج فيديوهات", labelKey: "sm_wp_sec_video" },
      { id: "editing", label: "تحرير محتوى", labelKey: "sm_wp_sec_editing" },
      { id: "marketing", label: "تسويق رقمي", labelKey: "sm_wp_sec_marketing" },
      { id: "brand", label: "هوية بصرية", labelKey: "sm_wp_sec_brand" },
    ],
  },
  {
    facet: "specialty",
    title: "التخصص",
    titleKey: "sm_wp_filter_specialty",
    options: [
      { id: "web", label: "تصميم موقع الكتروني", labelKey: "sm_wp_spec_web" },
      { id: "app", label: "تصميم التطبيقات", labelKey: "sm_wp_spec_app" },
      { id: "dashboard", label: "تصميم لوحات التحكم", labelKey: "sm_wp_spec_dashboard" },
      { id: "ux", label: "تجربة المستخدم", labelKey: "sm_wp_spec_ux" },
      { id: "identity", label: "تصميم الهوية", labelKey: "sm_wp_spec_identity" },
      { id: "landing", label: "صفحة الهبوط", labelKey: "sm_wp_spec_landing" },
    ],
  },
];

/* Ten projects — the 5×2 grid the design shows. */
export const ALL_WORKS: MediaPageWork[] = [
  {
    key: "rubana",
    photo: MEDIA_PHOTOS.desk,
    ...TAG_DEV,
    ...AUG,
    title: "خطة تسويقية ل متجر روبانا",
    titleKey: "sm_works_card_title",
    sub: "استراتيجية التسويق الرقمي (Digital Marketing Strategy) - 2026",
    subKey: "sm_works_card_sub",
    section: "digital",
    specialty: "landing",
  },
  {
    key: "launch",
    photo: MEDIA_PHOTOS.studio,
    ...TAG_PHOTO,
    ...JUL,
    title: "تغطية إطلاق منصة صوت",
    titleKey: "sm_works_launch_title",
    sub: "تغطية الإطلاق (Launch Coverage) - 2026",
    subKey: "sm_works_launch_sub",
    section: "coverage",
    specialty: "ux",
  },
  {
    key: "identity",
    photo: MEDIA_PHOTOS.desk,
    ...TAG_DESIGN,
    ...JUN,
    title: "هوية بصرية لمقهى نُزل",
    titleKey: "sm_works_identity_title",
    sub: "تصميم الهوية البصرية (Brand Identity) - 2026",
    subKey: "sm_works_identity_sub",
    section: "brand",
    specialty: "identity",
  },
  {
    key: "conference",
    photo: MEDIA_PHOTOS.hall,
    ...TAG_VIDEO,
    ...MAY,
    title: "مؤتمر الإعلام الرقمي",
    titleKey: "sm_works_conference_title",
    sub: "إنتاج وتغطية المؤتمرات (Event Production) - 2026",
    subKey: "sm_works_conference_sub",
    section: "video",
    specialty: "ux",
  },
  {
    key: "film",
    photo: MEDIA_PHOTOS.crew,
    ...TAG_VIDEO,
    ...APR,
    title: "فيلم تعريفي لشركة أفق",
    titleKey: "sm_works_film_title",
    sub: "إنتاج الفيديوهات (Corporate Film) - 2026",
    subKey: "sm_works_film_sub",
    section: "video",
    specialty: "app",
  },
  {
    key: "campaign",
    photo: MEDIA_PHOTOS.stage,
    ...TAG_MARKET,
    ...MAR,
    title: "حملة رمضان لمطاعم السنابل",
    titleKey: "sm_works_campaign_title",
    sub: "إدارة الحملات الإعلانية (Ad Campaign) - 2026",
    subKey: "sm_works_campaign_sub",
    section: "marketing",
    specialty: "landing",
  },
  {
    key: "podcast",
    photo: MEDIA_PHOTOS.studio,
    ...TAG_VIDEO,
    ...JUL,
    title: "بودكاست حديث الشاشة",
    titleKey: "sm_works_podcast_title",
    sub: "إنتاج البودكاست (Podcast Production) - 2026",
    subKey: "sm_works_podcast_sub",
    section: "editing",
    specialty: "dashboard",
  },
  {
    key: "catalog",
    photo: MEDIA_PHOTOS.desk,
    ...TAG_PHOTO,
    ...JUN,
    title: "كتالوج منتجات مصنع النور",
    titleKey: "sm_works_catalog_title",
    sub: "تصوير المنتجات (Product Photography) - 2026",
    subKey: "sm_works_catalog_sub",
    section: "photo",
    specialty: "web",
  },
  {
    key: "field",
    photo: MEDIA_PHOTOS.field,
    ...TAG_PHOTO,
    ...MAY,
    title: "تغطية ميدانية لمبادرة زرع",
    titleKey: "sm_works_field_title",
    sub: "التغطية الإعلامية (Field Coverage) - 2026",
    subKey: "sm_works_field_sub",
    section: "coverage",
    specialty: "app",
  },
  {
    key: "store",
    photo: MEDIA_PHOTOS.crew,
    ...TAG_DEV,
    ...APR,
    title: "متجر إلكتروني لعلامة زهر",
    titleKey: "sm_works_store_title",
    sub: "تصميم وتطوير المتاجر (E-commerce Design) - 2026",
    subKey: "sm_works_store_sub",
    section: "design",
    specialty: "web",
  },
];
