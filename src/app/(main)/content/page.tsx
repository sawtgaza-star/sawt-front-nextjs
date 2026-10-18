"use client";
import { useEffect, useRef, useState } from "react";
import "@/styles/creators.css";
import "@/styles/content.css";
import LegacyInit from "@/components/LegacyInit";
import ContentHero from "@/components/content/ContentHero";
import ContentFilterBar from "@/components/content/ContentFilterBar";
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
  reelsFromApi,
  sortReels,
  type HeroSlide,
  type SortValue,
} from "@/components/content/content-data";

/* The client boundary for /content: GET /pages/content for the whole page, one
   `lang` subscription, and the category / sort state the filter bar drives —
   changing either asks the API again (`?category=` / `?sort=`) for the reels.

   EVERYTHING ON THIS PAGE IS THE PAYLOAD'S
   ----------------------------------------
   The hero — backdrop, headline, lead and the fanned poster strip — and the
   reels: `reels.items` is the one list the API sends, so the grid under the
   filter bar and the "الأكثر مشاهدة" row below it are both drawn from it, the
   row also taking its heading and its "رؤية المزيد" label from that block.
   Nothing is bundled any more; while the request is in flight the grid is a
   skeleton, and if it comes back with no reels the page is hero + filter bar.

   The category pills are the payload's `categories`; picking one refetches
   with `?category={slug}`. The sort maps to the API's `latest` / `oldest`;
   "الأكثر مشاهدة" has no server sort, so it is ordered here (`sortReels`). */
export default function Page() {
  const { lang } = useLang();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortValue>("newest");
  const { page, loading, reelsLoading } = useContentPage({
    category,
    sort: API_SORT[sort],
  });

  const categories = categoriesFromApi(page?.categories, lang);

  // only reels whose cover loads are shown anywhere (see useLoadedThumbs)
  const { list: reels, pending } = useLoadedThumbs(
    reelsFromApi(page?.reels?.items, page?.categories, lang),
  );
  const visible = sortReels(reels, sort);
  // covers still on their way and none in yet: hold the skeletons
  const probing = pending > 0 && reels.length === 0;

  /* The hero strip fans out the reels' thumbnails. It keeps the list from the
     unfiltered first load, so picking a category below doesn't reshuffle the
     strip; once covers stop arriving it is fixed. */
  const heroReels = useRef<HeroSlide[]>([]);
  if (category === "all" && reels.length >= heroReels.current.length) {
    heroReels.current = reels
      .filter((reel) => reel.poster)
      .map((reel) => ({ src: reel.poster as string, reelId: String(reel.id) }));
  }

  /* A tap on a strip poster scrolls down to that reel's card. A reel the
     current category hides brings the grid back to "all" first, and the
     scroll happens once it is listed. */
  const [focus, setFocus] = useState<{ id: string; n: number } | null>(null);
  const [wanted, setWanted] = useState<string | null>(null);
  const selectReel = (id: string) => {
    if (reels.some((reel) => String(reel.id) === id)) {
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
    if (reels.some((reel) => String(reel.id) === id)) {
      deepLink.current = null;
      setOpen({ id, n: 1 });
    }
  }, [reelsLoading, reels]);

  useEffect(() => {
    if (wanted && !reelsLoading && reels.some((reel) => String(reel.id) === wanted)) {
      setFocus((f) => ({ id: wanted, n: (f?.n ?? 0) + 1 }));
      setWanted(null);
    }
  }, [wanted, reelsLoading, reels]);

  const rowTitle = localized(page?.reels?.title, lang);
  const rowViewMore = localized(page?.reels?.view_more, lang);

  // the empty-grid line mounts after the page was translated
  useEffect(() => {
    if (!reelsLoading && !probing) applyTranslations(getCurrentLang());
  }, [reelsLoading, probing]);

  return (
    <div className="ct-page">
      <LegacyInit page="content" />
      <ContentHero
        data={page?.hero}
        reelPosters={heroReels.current}
        onSelectReel={selectReel}
        lang={lang}
        loading={loading}
      />
      <main>
        <section className="ct-grid-section">
          <div className="container">
            <ContentFilterBar
              categories={categories}
              active={category}
              onSelect={setCategory}
              sort={sort}
              onSortChange={setSort}
              loading={loading}
            />
            {reelsLoading || probing ? (
              <ContentGridSkeleton />
            ) : (
              <ContentGrid
                reels={visible}
                message={page?.reels?.message || ""}
                focus={focus}
                open={open}
                onFocusDone={() => setFocus(null)}
                onOpenDone={() => setOpen(null)}
              />
            )}
          </div>
        </section>

        {(loading || probing || reels.length > 0) && (
          <MostWatchedSection
            reels={reels}
            title={rowTitle}
            viewMore={rowViewMore}
            loading={loading || probing}
          />
        )}
      </main>
    </div>
  );
}
