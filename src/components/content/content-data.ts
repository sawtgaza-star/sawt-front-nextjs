/* Static data for the "محتوانا" page: the hero coverflow thumbnails, the
   category pills, the sort options and the reel cards that feed the grid and
   the two "الأكثر مشاهدة" rows. No backend yet — every card points at the same
   demo reel, as the rest of the site does. */

export const VIDEO =
  "/assets/videos/WhatsApp Video 2026-03-23 at 11.59.11 AM.mp4";

/* hero coverflow — cycles the five reel posters 1.png … 5.png, repeated enough
   times that the carousel can loop with nine of them on screen */
export const HERO_SLIDES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  img: `/assets/images/1.png`,
}));

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
  id: number;
  video: string;
  category: ReelCategory;
  views: number;
  /* ISO date — only used to order the grid, never rendered */
  publishedAt: string;
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
  if (sort === "views") return copy.sort((a, b) => b.views - a.views);
  return copy.sort((a, b) =>
    sort === "newest"
      ? b.publishedAt.localeCompare(a.publishedAt)
      : a.publishedAt.localeCompare(b.publishedAt),
  );
}
