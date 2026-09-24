"use client";
import { useState } from "react";
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
import {
  reelsFromApi,
  sortReels,
  type CategoryValue,
  type SortValue,
} from "@/components/content/content-data";

/* The client boundary for /content: one request for the whole page (the API
   returns both blocks in a single payload), one `lang` subscription, and the
   category / sort state the filter bar drives.

   EVERYTHING ON THIS PAGE IS THE PAYLOAD'S
   ----------------------------------------
   The hero — backdrop, headline, lead and the fanned poster strip — and the
   reels: `reels.items` is the one list the API sends, so the grid under the
   filter bar and the "الأكثر مشاهدة" row below it are both drawn from it, the
   row also taking its heading and its "رؤية المزيد" label from that block.
   Nothing is bundled any more; while the request is in flight the grid is a
   skeleton, and if it comes back with no reels the page is hero + filter bar.

   The category pills are the exception: the payload has no category on a reel
   and no field for the pills at all, so they are chrome — the active one is
   styled, and the grid it sits above is the whole list either way. Filtering
   starts working the day a reel arrives carrying a category. */
export default function Page() {
  const { page, loading } = useContentPage();
  const { lang } = useLang();
  const [category, setCategory] = useState<CategoryValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const reels = reelsFromApi(page?.reels?.items);
  const visible = sortReels(reels, sort);

  const rowTitle = localized(page?.reels?.title, lang);
  const rowViewMore = localized(page?.reels?.view_more, lang);

  return (
    <div className="ct-page">
      <LegacyInit page="content" />
      <ContentHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        <section className="ct-grid-section">
          <div className="container">
            <ContentFilterBar
              active={category}
              onSelect={setCategory}
              sort={sort}
              onSortChange={setSort}
            />
            {loading ? <ContentGridSkeleton /> : <ContentGrid reels={visible} />}
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
