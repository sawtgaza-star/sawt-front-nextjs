// @ts-nocheck
/* eslint-disable */

/* Shared bits of the reel viewer: the skip step and the info bar's default
   metadata. The creator page's reels themselves come from the API (see
   CreatorContent). */

export const SKIP = 10; // seconds each rewind/forward jumps

/* What the reel viewer's info bar shows about who posted the reel. */
export type ReelMeta = {
  user: string;
  profile: string;
  avatar: string;
  caption: string;
  posted: string;
  likes?: number;
  comments?: number;
};

/* metadata shown in the reel viewer when the list opening it passes none
   (محتوانا) — static, no backend yet. A creator's own reels pass the creator
   instead (see ReelViewer's `meta`). */
export const REEL_META: ReelMeta = {
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
