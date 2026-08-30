// @ts-nocheck
/* eslint-disable */

/* Static data for the creator "المحتوى" section: category pills, the reel cards
   (all sharing one demo video), the skip step, and the reel-viewer metadata. */

export const CATEGORIES = [
  { key: "creator_content_cat_all", label: "الكل" },
  { key: "creator_content_cat_economy", label: "الاقتصاد (13)" },
  { key: "creator_content_cat_business", label: "المال والأعمال (13)" },
  { key: "creator_content_cat_war", label: "قصص الحرب (45)" },
  { key: "creator_content_cat_news", label: "الاخبار (13)" },
];

export const VIDEO = "/assets/videos/WhatsApp Video 2026-03-23 at 11.59.11 AM.mp4";

export const CARDS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  video: VIDEO,
}));

export const SKIP = 10; // seconds each rewind/forward jumps

/* metadata shown in the reel viewer (static — no backend yet) */
export const REEL_META = {
  user: "رنا الصالح",
  /* Where the name in the info bar leads. There is no per-creator data yet —
     /creators/[id] renders the same mock profile for every id — so it points at
     the same placeholder the cards' hover arrow uses. */
  profile: "/creators/1",
  avatar: "/assets/images/محمود زعيتر 2.png",
  caption:
    "لم نبدأ من فكرة خارقة أو خطة محكمة، بل من قرار بسيط: أن نكون حاضرين، نستمع، ونُعلن صوت غزة للعالم",
  posted: "منذ 22 ساعة",
  likes: 13,
  comments: 12,
};
