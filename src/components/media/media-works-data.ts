import { MEDIA_PHOTOS } from "./media-photos";

/* The works wall. Every tile is its own project: the photo plus the card that
   is revealed when the tile is hovered (media.css pauses that column's drift
   at the same moment, so the card can be read). The middle column's first
   tile keeps the card the design shows open. */
export type MediaWork = {
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

/* The three vertical columns of the wall. Each column loops its own list
   (MediaWorks renders every list twice so the scroll is seamless); the middle
   column drifts the other way. */
export const WORK_COLUMNS: MediaWork[][] = [
  [
    {
      key: "launch",
      photo: MEDIA_PHOTOS.studio,
      ...TAG_PHOTO,
      ...JUL,
      title: "تغطية إطلاق منصة صوت",
      titleKey: "sm_works_launch_title",
      sub: "تغطية الإطلاق (Launch Coverage) - 2026",
      subKey: "sm_works_launch_sub",
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
    },
  ],
  [
    /* the card the design shows open */
    {
      key: "rubana",
      photo: MEDIA_PHOTOS.desk,
      ...TAG_DEV,
      ...AUG,
      title: "خطة تسويقية ل متجر روبانا",
      titleKey: "sm_works_card_title",
      sub: "استراتيجية التسويق الرقمي (Digital Marketing Strategy) - 2026",
      subKey: "sm_works_card_sub",
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
    },
  ],
  [
    {
      key: "podcast",
      photo: MEDIA_PHOTOS.studio,
      ...TAG_VIDEO,
      ...JUL,
      title: "بودكاست حديث الشاشة",
      titleKey: "sm_works_podcast_title",
      sub: "إنتاج البودكاست (Podcast Production) - 2026",
      subKey: "sm_works_podcast_sub",
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
    },
  ],
];
