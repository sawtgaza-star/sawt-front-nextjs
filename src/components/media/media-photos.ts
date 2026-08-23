/* The production stills the page reuses across the hero fan, the about
   collage, the service cards and the works wall. Hashed filenames are the
   Figma exports already sitting in public/assets/images. */
export const MEDIA_PHOTOS = {
  crew: "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg",
  studio: "/assets/images/bac7442160787c37131e5f9a31e3703041164e49.jpg",
  desk: "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg",
  hall: "/assets/images/WhoUs.jpg",
  stage: "/assets/images/join-img.jpg",
  field: "/assets/images/5771698600399277852.jpg",
} as const;

/* The deck under the hero headline. It holds one photo per seat of the fan
   carousel — five visible seats plus the hidden one the cards loop through —
   so the list length is what sets the cycle (see MediaHeroFan). The first
   entry starts on the hidden seat, the second on the rightmost card. */
export const HERO_FAN = [
  MEDIA_PHOTOS.field,
  MEDIA_PHOTOS.hall,
  MEDIA_PHOTOS.studio,
  MEDIA_PHOTOS.crew,
  MEDIA_PHOTOS.desk,
  MEDIA_PHOTOS.stage,
];
