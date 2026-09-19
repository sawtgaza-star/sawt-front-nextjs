/* Local data for the "محتوانا" page.

   The hero's copy, its backdrop and its poster strip now come from
   GET /pages/content (see lib/api/content) — HERO_SLIDES below is only the
   fallback the strip shows when the payload carries no posters.

   Everything else here is still local, for two different reasons:

   - the category pills, their counts and the sort options have no field in the
     payload at all, so they stay chrome with their `data-i18n` keys;
   - the reel cards are the bundled demo reel, because the API answers
     `reels.items: []` with `status: "token_expired"`. `reelsFromApi` below is
     what takes over the moment real ones arrive. */

import type { ContentReel } from "@/lib/api/content";

export const VIDEO =
  "/assets/videos/WhatsApp Video 2026-03-23 at 11.59.11 AM.mp4";

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

export const CATEGORIES = [
  { value: "all", key: "content_cat_all", label: "الكل" },
  { value: "economy", key: "content_cat_economy", label: "الاقتصاد (13)" },
  { value: "war", key: "content_cat_war", label: "قصص الحرب (45)" },
  { value: "business", key: "content_cat_business", label: "المال والأعمال (13)" },
  { value: "news", key: "content_cat_news", label: "الاخبار (13)" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
export type ReelCategory = Exclude<CategoryValue, "all">;

export const SORT_OPTIONS = [
  { value: "newest", key: "content_sort_newest", label: "من الأحدث إلى الأقدم" },
  { value: "oldest", key: "content_sort_oldest", label: "من الأقدم إلى الأحدث" },
  { value: "views", key: "content_sort_views", label: "الأكثر مشاهدة" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export type Reel = {
  id: number | string;
  video: string;
  /* the three below are optional because an API reel carries no category, and
     may carry neither a view count nor a date — only the demo rows always do */
  category?: ReelCategory;
  views?: number;
  /* ISO date — only used to order the grid, never rendered */
  publishedAt?: string;
};

const CYCLE: ReelCategory[] = ["economy", "war", "business", "news", "war"];

/* one helper so the grid and both rows are built the same way */
function reels(count: number, offset: number): Reel[] {
  return Array.from({ length: count }, (_, i) => {
    const n = offset + i;
    return {
      id: n,
      video: VIDEO,
      category: CYCLE[n % CYCLE.length],
      views: 5200 - n * 137,
      publishedAt: `2026-07-${String(24 - (n % 24)).padStart(2, "0")}`,
    };
  });
}

/* the filtered 5-per-row grid */
export const GRID_REELS = reels(10, 0);

/* the two horizontal rows under the grid — both titled "الأكثر مشاهدة" */
export const MOST_WATCHED_ROWS = [
  { id: "most-watched-1", reels: reels(8, 10) },
  { id: "most-watched-2", reels: reels(8, 18) },
];

export function sortReels(list: Reel[], sort: SortValue): Reel[] {
  const copy = [...list];
  if (sort === "views") return copy.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  return copy.sort((a, b) =>
    sort === "newest"
      ? (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
      : (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""),
  );
}

/* The API's `reels.items` as cards this page can draw.

   `items` is empty today (`status: "token_expired"`), so this returns nothing
   and the caller keeps MOST_WATCHED_ROWS on screen. It reads whichever of the
   URL fields the payload turns out to use — see the note on ContentReel in
   lib/api/content — and drops an item with no playable file, which would
   otherwise render as a black card with a play button that does nothing. */
export function reelsFromApi(items: ContentReel[] | undefined): Reel[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => ({
      id: item.uuid ?? item.id ?? index,
      video: item.video_url || item.media_url || "",
      views: typeof item.views === "number" ? item.views : undefined,
      publishedAt: item.published_at ?? undefined,
    }))
    .filter((reel) => reel.video);
}
