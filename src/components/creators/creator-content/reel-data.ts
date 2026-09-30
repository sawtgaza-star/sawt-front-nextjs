/* What the reel viewer shows about one reel — all of it from the API.

   Reels are the platform's Instagram posts, mirrored by the backend, and every
   list that opens the viewer (محتوانا's grid and "الأكثر مشاهدة" row, a
   creator's "المحتوى") gets them in one shape:
     { caption, username, permalink, likes, comments_count, comment_items,
       posted_at, … }
   `reelDetails` turns that into what the info bar, the action rail and the
   comments sheet draw. There is no endpoint to like or comment on a reel (the
   numbers are Instagram's), so the visitor's own like / save / comment stay
   in the page's memory on top of these — see reel-social.ts. */

import type { Localized } from "@/lib/api/pages";
import { localized } from "@/lib/api/pages";

/** One entry of a reel's `comment_items`. The backend has not sent one yet,
    so the field names Instagram's API uses are accepted alongside the usual
    ones. */
export type ApiReelComment = {
  id?: string | number | null;
  username?: string | null;
  user?: string | null;
  text?: string | null;
  comment?: string | null;
  timestamp?: string | null;
  created_at?: string | null;
  like_count?: number | null;
  likes?: number | null;
  avatar?: string | null;
  avatar_url?: string | null;
};

/** The fields of an API reel the viewer reads. */
export type ApiReelSocial = {
  caption?: string | Localized | null;
  username?: string | null;
  permalink?: string | null;
  likes?: number | null;
  comments_count?: number | null;
  comment_items?: ApiReelComment[] | null;
  posted_at?: string | null;
};

export type ReelComment = {
  id: string;
  user: string;
  text: string;
  /** ISO date — shown as "منذ …" */
  time: string;
  avatar: string;
  likes: number;
};

export type ReelDetails = {
  caption: string;
  username: string;
  permalink: string;
  likes: number;
  /** Instagram's total — may be more than `comments` holds */
  commentsCount: number;
  comments: ReelComment[];
  /** ISO date */
  postedAt: string;
};

/** Stand-in picture for an account the API sends no avatar for. */
export const DEFAULT_AVATAR = "/assets/images/person.png";

/* Instagram captions arrive with bidi isolate marks, tabs and blank lines —
   noise in a two-line caption. */
export function cleanCaption(raw: string): string {
  return raw
    .replace(/[⁦-⁩‪-‮]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function count(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function commentsFromApi(
  items: ApiReelComment[] | null | undefined,
): ReelComment[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((c, i) => ({
      id: String(c.id ?? i),
      user: (c.username || c.user || "").trim(),
      text: (c.text || c.comment || "").trim(),
      time: c.timestamp || c.created_at || "",
      avatar: c.avatar_url || c.avatar || DEFAULT_AVATAR,
      likes: count(c.like_count ?? c.likes),
    }))
    .filter((c) => c.text);
}

export function reelDetails(item: ApiReelSocial, lang = "ar"): ReelDetails {
  const caption =
    typeof item.caption === "string" ? item.caption : localized(item.caption, lang);
  const comments = commentsFromApi(item.comment_items);
  return {
    caption: cleanCaption(caption || ""),
    username: (item.username || "").trim(),
    permalink: item.permalink || "",
    likes: count(item.likes),
    commentsCount: Math.max(count(item.comments_count), comments.length),
    comments,
    postedAt: item.posted_at || "",
  };
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

/** "منذ 22 ساعة" / "22 hours ago" for an ISO date; "" when there is none.
    Latin digits in Arabic too, like the rest of the site. */
export function timeAgo(iso: string, lang: string): string {
  const then = Date.parse(iso);
  if (!iso || Number.isNaN(then)) return "";
  const seconds = Math.round((then - Date.now()) / 1000);
  const format = new Intl.RelativeTimeFormat(
    lang === "en" ? "en" : "ar-u-nu-latn",
    { numeric: "auto" },
  );
  const [unit, size] = UNITS.find(([, s]) => Math.abs(seconds) >= s) ?? ["second", 1];
  const text = format.format(Math.round(seconds / size), unit);
  // Intl words the Arabic past as "قبل …"; the design says "منذ …"
  return lang === "en" ? text : text.replace(/^قبل /, "منذ ");
}
