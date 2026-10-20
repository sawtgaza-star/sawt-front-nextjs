"use client";
import { useEffect, useRef, useState } from "react";
import "@/styles/creators.css";
import "@/styles/content.css";
import LegacyInit from "@/components/LegacyInit";
import ContentHero from "@/components/content/ContentHero";
import ContentFilterBar from "@/components/content/ContentFilterBar";
import ContentAccountBar from "@/components/content/ContentAccountBar";
import ContentGrid from "@/components/content/ContentGrid";
import MostWatchedSection from "@/components/content/MostWatchedSection";
import { ContentGridSkeleton } from "@/components/content/ContentSkeleton";
import { useLoadedThumbs } from "@/components/content/use-loaded-thumbs";
import { useContentPage } from "@/lib/api/use-content-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import {
  API_SORT,
  categoriesFromApi,
  filterReels,
  reelsFromApi,
  sortReels,
  type HeroSlide,
  type SortValue,
} from "@/components/content/content-data";

/* The client boundary for /content: GET /pages/content, one `lang`
   subscription, and the category / sort state the filter bar drives.

   EVERYTHING ON THIS PAGE IS THE PAYLOAD'S
   ----------------------------------------
   The hero — backdrop, headline, lead and the fanned poster strip — the
   account bar, the filter pills and the reels. Nothing is bundled; while a
   request is in flight its part of the page is a skeleton.

   TWO LISTS, KEPT APART
   ---------------------
   - The FILTER section (pills + sort + grid) has its own request:
     `?category={slug}` and `?sort=latest|oldest`. The slug is also written
     into the page URL (`/content?category=economy`), so a filtered view can be
     shared or reloaded. "الأكثر مشاهدة" in the sort has no server sort, so it
     is ordered here (`sortReels`).
   - The "الأكثر مشاهدة" ROW below is its own, unfiltered request — every
     reel, ordered by views (likes when the payload has no view counts). A pick
     in the filter never reloads it, never empties it, never reorders it. The
     hero strip and the pills come from this same unfiltered answer.
   With the filter on "all" / newest the two would ask the same URL, so the
   grid then reuses the unfiltered answer instead of sending a second request. */
export default function Page() {
  const { lang } = useLang();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortValue>("newest");

  /* The slug lives in the URL too. It is read after mount (the page is
     prerendered, so the first render must be "all" to hydrate) and written
     back on every pick with replaceState — other params (`?reel=`) are kept. */
  const urlRead = useRef(false);
  useEffect(() => {
    if (!urlRead.current) {
      urlRead.current = true;
      const slug = new URLSearchParams(window.location.search).get("category");
      if (slug && slug !== category) {
        setCategory(slug);
        return;
      }
    }
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.replaceState(window.history.state, "", url);
  }, [category]);

  // the unfiltered answer: hero, pills, account, and the "الأكثر مشاهدة" row
  const { page, loading } = useContentPage();
  // the filter's own answer — skipped while it would be the same request
  const filtered = category !== "all" || API_SORT[sort] !== "latest";
  const gridQuery = useContentPage({
    category,
    sort: API_SORT[sort],
    skip: !filtered,
  });
  const gridPage = filtered ? gridQuery.page : page;
  const reelsLoading = filtered ? gridQuery.reelsLoading : loading;

  // a slug the payload doesn't list (an old or mistyped link) falls back to "all"
  const slugs = page?.categories?.map((c) => c.slug).join(",");
  useEffect(() => {
    if (slugs && category !== "all" && !slugs.split(",").includes(category)) {
      setCategory("all");
    }
  }, [slugs, category]);

  /* The hero strip and the "الأكثر مشاهدة" row show only reels whose cover
     loads (see useLoadedThumbs) — a dead cover in a carousel is an empty box.
     The GRID shows exactly what the API returned for the slug, so it always
     matches the pill's count; a reel whose Instagram link expired is drawn
     with a placeholder and links out to Instagram (see ReelThumbCard). */
  const all = useLoadedThumbs(
    reelsFromApi(page?.reels?.items, page?.categories, lang, page?.reels?.account),
  );
  const gridReels = reelsFromApi(
    gridPage?.reels?.items,
    page?.categories,
    lang,
    page?.reels?.account,
  );
  // the API already narrowed the list to the slug; the local match only
  // guards against a stale answer drawn for a moment under the new pill
  const visible = sortReels(filterReels(gridReels, category), sort);
  // covers still on their way and none in yet: hold the row's skeletons
  const rowProbing = all.pending > 0 && all.list.length === 0;

  const heroReels: HeroSlide[] = all.list
    .filter((reel) => reel.poster)
    .map((reel) => ({ src: reel.poster as string, reelId: String(reel.id) }));
  const mostViewed = sortReels(all.list, "views");

  // the pills carry the API's own counts — the grid lists every reel they count
  const categories = categoriesFromApi(page?.categories, lang);

  /* A tap on a strip poster scrolls down to that reel's card. A reel the
     current category hides brings the grid back to "all" first, and the
     scroll happens once it is listed. */
  const [focus, setFocus] = useState<{ id: string; n: number } | null>(null);
  const [wanted, setWanted] = useState<string | null>(null);
  const selectReel = (id: string) => {
    if (visible.some((reel) => String(reel.id) === id)) {
      setFocus((f) => ({ id, n: (f?.n ?? 0) + 1 }));
    } else {
      setWanted(id);
      setCategory("all");
    }
  };
  /* A shared reel link (`/content?reel={id}`, what the viewer's share sheet
     copies) opens that reel in the viewer once it is listed. */
  const [open, setOpen] = useState<{ id: string; n: number } | null>(null);
  const deepLink = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (deepLink.current === undefined) {
      deepLink.current = new URLSearchParams(window.location.search).get("reel");
    }
    const id = deepLink.current;
    if (!id || reelsLoading) return;
    if (visible.some((reel) => String(reel.id) === id)) {
      deepLink.current = null;
      setOpen({ id, n: 1 });
    }
  }, [reelsLoading, visible]);

  useEffect(() => {
    if (wanted && !reelsLoading && visible.some((reel) => String(reel.id) === wanted)) {
      setFocus((f) => ({ id: wanted, n: (f?.n ?? 0) + 1 }));
      setWanted(null);
    }
  }, [wanted, reelsLoading, visible]);

  const rowTitle = localized(page?.reels?.title, lang);

  // the empty-grid line mounts after the page was translated
  useEffect(() => {
    if (!reelsLoading) applyTranslations(getCurrentLang());
  }, [reelsLoading]);

  return (
    <div className="ct-page">
      <LegacyInit page="content" />
      <ContentHero
        data={page?.hero}
        reelsBlock={page?.reels}
        reelPosters={heroReels}
        onSelectReel={selectReel}
        lang={lang}
        loading={loading}
      />
      <main>
        <section className="ct-grid-section">
          <div className="container">
            {!loading && (
              <ContentAccountBar
                account={page?.reels?.account}
                total={
                  Number(page?.reels?.account?.media_count) ||
                  page?.categories?.find((c) => c.slug === "all")?.count
                }
              />
            )}
            <ContentFilterBar
              categories={categories}
              active={category}
              onSelect={setCategory}
              sort={sort}
              onSortChange={setSort}
              loading={loading}
            />
            {reelsLoading ? (
              <ContentGridSkeleton />
            ) : (
              <ContentGrid
                reels={visible}
                message={gridPage?.reels?.message || ""}
                focus={focus}
                open={open}
                onFocusDone={() => setFocus(null)}
                onOpenDone={() => setOpen(null)}
              />
            )}
          </div>
        </section>

        {(loading || rowProbing || mostViewed.length > 0) && (
          <MostWatchedSection
            reels={mostViewed}
            title={rowTitle}
            loading={loading || rowProbing}
          />
        )}
      </main>
    </div>
  );
}
