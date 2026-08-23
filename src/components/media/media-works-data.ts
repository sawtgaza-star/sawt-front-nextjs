import { MEDIA_PHOTOS } from "./media-photos";

/* The three vertical columns of the works wall. Each column loops its own list
   (media.css renders every list twice so the scroll is seamless); the middle
   column is the one the featured card sits on top of. */
export const WORK_COLUMNS: string[][] = [
  [MEDIA_PHOTOS.studio, MEDIA_PHOTOS.desk, MEDIA_PHOTOS.hall],
  [MEDIA_PHOTOS.desk, MEDIA_PHOTOS.crew, MEDIA_PHOTOS.stage],
  [MEDIA_PHOTOS.studio, MEDIA_PHOTOS.desk, MEDIA_PHOTOS.field],
];

/* Which tile carries the featured card — the middle column's first shot, so
   the caption travels with that photo instead of hovering over the wall. */
export const FEATURED_AT = { col: 1, shot: 0 };

/* The single project card that rides on that tile. */
export const FEATURED_WORK = {
  tag: "تطوير",
  tagKey: "sm_works_tag",
  date: "2026 أغسطس",
  dateKey: "sm_works_date",
  title: "خطة تسويقية ل متجر روبانا",
  titleKey: "sm_works_card_title",
  sub: "استراتيجية التسويق الرقمي (Digital Marketing Strategy) - 2026",
  subKey: "sm_works_card_sub",
};
