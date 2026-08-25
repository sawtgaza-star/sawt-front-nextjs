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
  yamal: "/assets/images/Yamal.png",
} as const;

/* The deck under the hero headline. It holds one photo per seat of the fan
   carousel — five visible seats plus the hidden one the cards loop through —
   so the list length is what sets the cycle (see MediaHeroFan). The first
   entry starts on the hidden seat, the second on the rightmost card.

   Each card also carries the service it stands for: that is the orange word
   the headline shows while the card sits in the focus seat, so photo and word
   always change together (see MediaHeroRotation). */
export const HERO_FAN = [
  { src: MEDIA_PHOTOS.field, key: "sm_hero_word_coverage", text: "التغطية الإعلامية" },
  { src: MEDIA_PHOTOS.hall, key: "sm_hero_word_consult", text: "الاستشارات" },
  { src: MEDIA_PHOTOS.studio, key: "sm_hero_word_photo", text: "التصوير الاحترافي" },
  { src: MEDIA_PHOTOS.crew, key: "sm_hero_word_video", text: "إنتاج الفيديوهات" },
  { src: MEDIA_PHOTOS.desk, key: "sm_hero_word_design", text: "التصميم الجرافيكي" },
  { src: MEDIA_PHOTOS.stage, key: "sm_hero_word_content", text: "صناعة المحتوى" },
];
