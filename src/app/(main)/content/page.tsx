"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/content.css";
import LegacyInit from "@/components/LegacyInit";
import ContentHero from "@/components/content/ContentHero";
import ContentFilterBar from "@/components/content/ContentFilterBar";
import ContentGrid from "@/components/content/ContentGrid";
import MostWatchedSection from "@/components/content/MostWatchedSection";
import { useContentPage } from "@/lib/api/use-content-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import {
  GRID_REELS,
  MOST_WATCHED_ROWS,
  reelsFromApi,
  sortReels,
  type CategoryValue,
  type SortValue,
} from "@/components/content/content-data";

/* The client boundary for /content: one request for the whole page (the API
   returns both blocks in a single payload), one `lang` subscription, and the
   category / sort state the filter bar drives.

   WHAT COMES FROM THE API AND WHAT DOESN'T
   ----------------------------------------
   The hero is entirely the payload's: backdrop, headline, lead and the fanned
   poster strip. The "الأكثر مشاهدة" rows take their heading and their
   "رؤية المزيد" label from it too.

   The reel cards do not, yet: the API answers `reels.items: []` with
   `status: "token_expired"`, so the bundled demo reels stay on screen — the
   grid, which the payload has no field for at all, and the two rows below it.
   `reelsFromApi` takes over the rows the moment real reels arrive, as one row
   (the payload carries one list). See lib/api/content and content-data. */
export default function Page() {
  const { page, loading } = useContentPage();
  const { lang } = useLang();
  const [category, setCategory] = useState<CategoryValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const visible = sortReels(
    category === "all"
      ? GRID_REELS
      : GRID_REELS.filter((r) => r.category === category),
    sort,
  );

  const apiReels = reelsFromApi(page?.reels?.items);
  const rows = apiReels.length
    ? [{ id: "most-watched", reels: apiReels }]
    : MOST_WATCHED_ROWS;

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
            <ContentGrid reels={visible} />
          </div>
        </section>

        {rows.map((row) => (
          <MostWatchedSection
            key={row.id}
            reels={row.reels}
            title={rowTitle}
            viewMore={rowViewMore}
            loading={loading}
          />
        ))}
      </main>
    </div>
  );
}
