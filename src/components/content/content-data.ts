/* Local data for the "محتوانا" page.

   The hero's copy, its backdrop and its poster strip come from
   GET /pages/content (see lib/api/content) — HERO_SLIDES below is only the
   fallback the strip shows when the payload carries no posters.

   The reels are the API's too, now that it serves them: the bundled demo reel
   and the rows built out of it are gone, and `reelsFromApi` below is the one
   place the payload becomes cards. What is left local is chrome the payload
   has no field for at all — the category pills, their counts and the sort
   options — which keep their `data-i18n` keys. */

import type { ContentReel } from "@/lib/api/content";
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

export const CATEGORIES = [
  { value: "all", key: "content_cat_all", label: "الكل" },
  { value: "economy", key: "content_cat_economy", label: "الاقتصاد (13)" },
  { value: "war", key: "content_cat_war", label: "قصص الحرب (45)" },
  { value: "business", key: "content_cat_business", label: "المال والأعمال (13)" },
  { value: "news", key: "content_cat_news", label: "الاخبار (13)" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const SORT_OPTIONS = [
  { value: "newest", key: "content_sort_newest", label: "من الأحدث إلى الأقدم" },
  { value: "oldest", key: "content_sort_oldest", label: "من الأقدم إلى الأحدث" },
  { value: "views", key: "content_sort_views", label: "الأكثر مشاهدة" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** One reel card. Only `id` and `video` are drawn; the other two exist to
    order the list and are never rendered. */
export type Reel = {
  id: number | string;
  video: string;
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
      views: item.views ?? item.likes ?? undefined,
      publishedAt: item.posted_at ?? undefined,
    }))
    .filter((reel) => reel.video);
}
