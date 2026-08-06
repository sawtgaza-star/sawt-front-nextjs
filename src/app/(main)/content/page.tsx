"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/content.css";
import LegacyInit from "@/components/LegacyInit";
import ContentHero from "@/components/content/ContentHero";
import ContentFilterBar from "@/components/content/ContentFilterBar";
import ContentGrid from "@/components/content/ContentGrid";
import MostWatchedSection from "@/components/content/MostWatchedSection";
import FooterNewsletterMobile from "@/components/site/footer/FooterNewsletterMobile";
import {
  GRID_REELS,
  MOST_WATCHED_ROWS,
  sortReels,
  type CategoryValue,
  type SortValue,
} from "@/components/content/content-data";

export default function Page() {
  const [category, setCategory] = useState<CategoryValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const visible = sortReels(
    category === "all"
      ? GRID_REELS
      : GRID_REELS.filter((r) => r.category === category),
    sort,
  );

  return (
    <div className="ct-page">
      <LegacyInit page="content" />
      <ContentHero />
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

        {MOST_WATCHED_ROWS.map((row) => (
          <MostWatchedSection key={row.id} reels={row.reels} />
        ))}
      </main>
      {/* mobile-only newsletter card, directly above the footer (as on home) */}
      <FooterNewsletterMobile />
    </div>
  );
}
