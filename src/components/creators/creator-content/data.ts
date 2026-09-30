// @ts-nocheck
/* eslint-disable */

/* Shared bits of the reel viewer: the skip step and the info bar's shape.
   Everything the viewer shows comes from the API (see reel-data.ts). */

export const SKIP = 10; // seconds each rewind/forward jumps

/* What the reel viewer's info bar shows about who posted the reel — built by
   ReelModal from the reel itself (see reel-data.ts), or from the creator when
   a creator's profile opens the viewer. */
export type ReelMeta = {
  user: string;
  profile: string;
  avatar: string;
  caption: string;
  posted: string;
};
