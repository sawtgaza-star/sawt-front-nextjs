"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import StoryCard from "@/components/stories/StoryCard";
import Pagination from "@/components/ui/Pagination";
import { ALL_STORIES, STORIES_PER_PAGE } from "@/components/stories/story-data";
import { STORIES_PARENT, STORIES_HERO } from "@/components/stories/story-chrome";

/* Full, paginated stories listing — the "عرض جميع القصص" target from the story
   article page. Same page as /news down to the CSS pair, the 3×3 grid and the
   pager; the cards are the home slider's poster `.rs-card` (StoryCard). */
export default function Page() {
  const totalPages = Math.ceil(ALL_STORIES.length / STORIES_PER_PAGE);
  const [page, setPage] = useState(1);

  const start = (page - 1) * STORIES_PER_PAGE;
  const pageItems = ALL_STORIES.slice(start, start + STORIES_PER_PAGE);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="news-page">
      <LegacyInit page="news" />
      <NewsHero parent={STORIES_PARENT} hero={STORIES_HERO} />
      <main>
        <section className="news-grid-section">
          <div className="container">
            <div className="news-grid stories-grid">
              {pageItems.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={goTo} />
          </div>
        </section>
      </main>
    </div>
  );
}
