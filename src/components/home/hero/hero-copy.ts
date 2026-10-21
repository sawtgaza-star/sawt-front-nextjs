/* The home hero's text shaping and its reel picker. Its copy is the API's
   `hero` block (kicker, title, description, tagline, buttons); the only
   words of its own are the pager's screen-reader label. */

import type { HomeReviewReel } from "@/lib/api/home";
import { instagramIso, splitHeading } from "../home-text";

const PAGER_LABEL = { ar: "اعرض المقطع", en: "Show reel" };

export function pagerLabel(lang: string): string {
  return lang === "en" ? PAGER_LABEL.en : PAGER_LABEL.ar;
}

/** The title on two lines, the second in the accent colour. An editor's own
    line break wins; otherwise Arabic accents its last three words ("من غزة،
    حكايات" / "تستحق أن تُروى.", as designed) and English breaks after the
    first comma ("From Gaza," / "stories worth telling."). */
export function splitHeroTitle(title: string, lang: string): [string, string] {
  const text = title.trim();
  const broken = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (broken.length > 1) return [broken[0], broken.slice(1).join(" ")];
  if (lang === "en") {
    const comma = text.indexOf(",");
    if (comma > 0 && comma < text.length - 1) {
      return [text.slice(0, comma + 1), text.slice(comma + 1).trim()];
    }
  }
  return splitHeading(text, 3);
}

/** How many reels the hero stacks. */
export const HERO_REEL_COUNT = 3;

/** The newest reels with something to show (a poster or a file), newest
    first. Undated ones fall behind the dated ones, in the API's order. */
export function latestReels(reels: HomeReviewReel[] | undefined): HomeReviewReel[] {
  if (!Array.isArray(reels)) return [];
  const time = (reel: HomeReviewReel) => {
    const at = Date.parse(instagramIso(reel.posted_at));
    return Number.isFinite(at) ? at : -Infinity;
  };
  return reels
    .filter((reel) => reel.thumbnail || reel.video_url)
    .map((reel, index) => ({ reel, index }))
    .sort((a, b) => time(b.reel) - time(a.reel) || a.index - b.index)
    .slice(0, HERO_REEL_COUNT)
    .map((entry) => entry.reel);
}

/** "4:32" from a video's duration in seconds. */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  return `${minutes}:${String(total % 60).padStart(2, "0")}`;
}
