/* Local data for the "محتوانا" page.

   The hero's copy, its backdrop and its poster strip come from
   GET /pages/content (see lib/api/content) — HERO_SLIDES below is only the
   fallback the strip shows when the payload carries no posters.

   The reels are the API's too, now that it serves them: the bundled demo reel
   and the rows built out of it are gone, and `reelsFromApi` below is the one
   place the payload becomes cards. The category pills are the payload's too
   (`categoriesFromApi`); only the sort options are left local chrome, with
   their `data-i18n` keys. */

import { localized } from "@/lib/api/pages";
import {
  reelDetails,
  type ReelDetails,
} from "@/components/creators/creator-content/reel-data";
import type {
  ContentApiSort,
  ContentCategory,
  ContentReel,
} from "@/lib/api/content";
import { bySortOrder } from "./content-text";

/* hero coverflow fallback — the bundled poster, repeated enough times that the
   carousel can loop with nine of them on screen */
export const HERO_SLIDES = Array.from({ length: 20 }, () => "/assets/images/1.png");

/* Swiper's loop needs more slides than it shows at once, and the widest
   breakpoint shows nine; the API sends nine posters. So the strip repeats the
   payload until it is at least this long — the same trick HERO_SLIDES uses,
   and what keeps the fan turning instead of snapping back at the last poster. */
const MIN_HERO_SLIDES = 20;

/** The poster URLs the hero strip cycles, padded out for the loop. */
export function heroSlides(images: string[]): string[] {
  const posters = images.filter(Boolean);
  if (posters.length === 0) return HERO_SLIDES;
  const padded: string[] = [];
  while (padded.length < MIN_HERO_SLIDES) padded.push(...posters);
  return padded;
}

/** One filter pill, resolved for the current language. */
export type ContentCategoryPill = { value: string; label: string };

/* GET /pages/content's `categories` as pills: the name, then the reel count in
   brackets ("الاقتصاد (13)") — except on "all", which the design shows bare. */
export function categoriesFromApi(
  categories: ContentCategory[] | undefined,
  lang: string,
): ContentCategoryPill[] {
  return (categories || [])
    .map((c) => {
      const value = (c.slug || "").trim();
      const name = localized(c.name, lang);
      if (!value || !name) return null;
      const count = value === "all" || c.count == null ? "" : ` (${c.count})`;
      return { value, label: name + count };
    })
    .filter((c): c is ContentCategoryPill => c !== null);
}

export const SORT_OPTIONS = [
  { value: "newest", key: "content_sort_newest", label: "من الأحدث إلى الأقدم" },
  { value: "oldest", key: "content_sort_oldest", label: "من الأقدم إلى الأحدث" },
  { value: "views", key: "content_sort_views", label: "الأكثر مشاهدة" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/* The backend orders by date only; "views" asks for the latest and is then
   re-ordered on the page by `sortReels`. */
export const API_SORT: Record<SortValue, ContentApiSort> = {
  newest: "latest",
  oldest: "oldest",
  views: "latest",
};

/** One reel card. The card draws `id` + `video`; `details` is what the
    viewer shows (poster, caption, likes, comments); `views` / `publishedAt`
    only order the list. */
export type Reel = {
  id: number | string;
  video: string;
  details?: ReelDetails;
  /** what the "الأكثر مشاهدة" sort reads — see `reelsFromApi` */
  views?: number;
  /** ISO date, for the newest / oldest sorts */
  publishedAt?: string;
};

export function sortReels(list: Reel[], sort: SortValue): Reel[] {
  const copy = [...list];
  if (sort === "views") return copy.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  return copy.sort((a, b) =>
    sort === "newest"
      ? (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
      : (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""),
  );
}

/* The API's `reels.items` as cards this page can draw — the only source the
   grid and the "الأكثر مشاهدة" row have.

   Items arrive in the editor's order (`sort_order`). An item whose `video_url`
   is empty is dropped: Instagram serves no file for it, and the card would be
   a black rectangle with a play button that does nothing.

   `views` is the reel's own view count when the backend's token is scoped for
   insights and `likes` when it isn't — the payload nulls `views` in that case,
   and the sort labelled "الأكثر مشاهدة" would otherwise have nothing to order
   by. Neither number is rendered; this only decides the order. */
export function reelsFromApi(items: ContentReel[] | undefined): Reel[] {
  return bySortOrder(items)
    .map((item, index) => ({
      id: item.id ?? index,
      video: item.video_url || "",
      details: reelDetails(item),
      views: item.views ?? item.likes ?? undefined,
      publishedAt: item.posted_at ?? undefined,
    }))
    .filter((reel) => reel.video);
}
