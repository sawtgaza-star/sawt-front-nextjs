/* Local data for the "محتوانا" page.

   The hero's copy, its backdrop and its poster strip come from
   GET /pages/content (see lib/api/content). Nothing is bundled: with no
   posters in the payload the strip is simply not drawn.

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

/* Swiper's loop needs more slides than it shows at once, and the widest
   breakpoint shows nine; the API sends nine posters. So the strip repeats the
   payload until it is at least this long — what keeps the fan turning instead of snapping back at the last poster. */
const MIN_HERO_SLIDES = 20;

/** One poster of the hero strip: its image, and the reel it stands for when
    it is a reel's thumbnail (a tap on it then scrolls to that reel). */
export type HeroSlide = { src: string; reelId?: string };

/** The posters the hero strip cycles, padded out for the loop. */
export function heroSlides(slides: HeroSlide[]): HeroSlide[] {
  const posters = slides.filter((slide) => slide.src);
  if (posters.length === 0) return [];
  const padded: HeroSlide[] = [];
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
  /** the reel's cover (`thumbnail`) — shown until the video has a frame */
  poster?: string;
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
export function reelsFromApi(
  items: ContentReel[] | undefined,
  categories: ContentCategory[] = [],
  lang = "ar",
): Reel[] {
  // a reel's category slugs → the pills' names (unknown slugs are dropped)
  const names = new Map(
    categories
      .filter((c) => c.slug && c.slug !== "all")
      .map((c) => [c.slug as string, localized(c.name, lang)]),
  );
  return bySortOrder(items)
    .map((item, index) => {
      const details = reelDetails(item);
      details.categoryLabels = details.categories
        .map((slug) => names.get(slug) || "")
        .filter(Boolean);
      return { item, index, details };
    })
    .map(({ item, index, details }) => ({
      id: item.id ?? index,
      video: item.video_url || "",
      poster: item.thumbnail || undefined,
      details,
      views: item.views ?? item.likes ?? undefined,
      publishedAt: item.posted_at ?? undefined,
    }))
    .filter((reel) => reel.video);
}
