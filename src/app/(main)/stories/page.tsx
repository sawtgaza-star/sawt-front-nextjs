"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import StoryCard from "@/components/stories/StoryCard";
import { NewsGridSkeleton } from "@/components/news/NewsSkeleton";
import Pagination from "@/components/ui/Pagination";
import { STORIES_PER_PAGE } from "@/components/stories/story-data";
import { storyCards } from "@/components/stories/story-cards";
import { STORIES_PARENT } from "@/components/stories/story-chrome";
import { useStoriesList } from "@/lib/api/use-stories";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

/* Full, paginated stories listing — the "عرض جميع القصص" target from the story
   article page. Same page as /news down to the CSS pair, the 3×3 grid and the
   pager; the cards are the home slider's poster `.rs-card` (StoryCard).

   Every word and image below the header comes from GET /pages/stories, one
   request per page. The pager is the API's: `meta.last_page` decides how many
   pages there are, so a click fetches rather than slices. The header itself
   renders throughout — SiteNav lives inside it — with the static hero copy and
   breadcrumb until the payload's own arrives. */
export default function Page() {
  const [page, setPage] = useState(1);
  const { lang } = useLang();
  const { page: data, meta, loading } = useStoriesList(page, STORIES_PER_PAGE);

  const hero = data?.hero;
  const heroTitle = localized(hero?.title, lang);
  const heroDesc = localized(hero?.description, lang);
  const items = storyCards(data?.items, lang);
  const totalPages = meta.last_page ?? 1;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="news-page">
      <LegacyInit page="news" />
      <NewsHero
        parent={STORIES_PARENT}
        hero={{ title: heroTitle, desc: heroDesc }}
        image={hero?.image_url}
        loading={loading}
      />
      <main>
        <section className="news-grid-section">
          <div className="container">
            {loading ? (
              <NewsGridSkeleton
                count={STORIES_PER_PAGE}
                className="news-grid stories-grid"
              />
            ) : (
              <div className="news-grid stories-grid">
                {items.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
            {totalPages > 1 ? (
              <Pagination page={page} totalPages={totalPages} onChange={goTo} />
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
