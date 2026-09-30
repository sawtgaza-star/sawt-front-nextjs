"use client";
import { useEffect, useState } from "react";
import "@/styles/creators.css";
import "@/styles/content.css";
import LegacyInit from "@/components/LegacyInit";
import ContentHero from "@/components/content/ContentHero";
import ContentFilterBar from "@/components/content/ContentFilterBar";
import ContentGrid from "@/components/content/ContentGrid";
import MostWatchedSection from "@/components/content/MostWatchedSection";
import { ContentGridSkeleton } from "@/components/content/ContentSkeleton";
import { useContentPage } from "@/lib/api/use-content-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import {
  API_SORT,
  categoriesFromApi,
  reelsFromApi,
  sortReels,
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

  const reels = reelsFromApi(page?.reels?.items);
  const visible = sortReels(reels, sort);

  const rowTitle = localized(page?.reels?.title, lang);
  const rowViewMore = localized(page?.reels?.view_more, lang);

  // the empty-grid line mounts after the page was translated
  useEffect(() => {
    if (!reelsLoading) applyTranslations(getCurrentLang());
  }, [reelsLoading]);

  return (
    <div className="ct-page">
      <LegacyInit page="content" />
      <ContentHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        <section className="ct-grid-section">
          <div className="container">
            <ContentFilterBar
              categories={categories}
              active={category}
              onSelect={setCategory}
              sort={sort}
              onSortChange={setSort}
            />
            {reelsLoading ? (
              <ContentGridSkeleton />
            ) : (
              <ContentGrid reels={visible} />
            )}
          </div>
        </section>

        {(loading || reels.length > 0) && (
          <MostWatchedSection
            reels={reels}
            title={rowTitle}
            viewMore={rowViewMore}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}
