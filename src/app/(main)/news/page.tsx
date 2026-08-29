"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import NewsCard from "@/components/news/NewsCard";
import Pagination from "@/components/ui/Pagination";
import { ALL_NEWS, NEWS_PER_PAGE } from "@/components/news/news-data";

/* Full, paginated news listing — the "عرض جميع الأخبار" target from the home
   page slider. Breadcrumb hero + 3×3 grid of the shared NewsCard. */
export default function Page() {
  const totalPages = Math.ceil(ALL_NEWS.length / NEWS_PER_PAGE);
  const [page, setPage] = useState(1);

  const start = (page - 1) * NEWS_PER_PAGE;
  const pageItems = ALL_NEWS.slice(start, start + NEWS_PER_PAGE);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="news-page">
      <LegacyInit page="news" />
      <NewsHero />
      <main>
        <section className="news-grid-section">
          <div className="container">
            <div className="news-grid">
              {pageItems.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={goTo} />
          </div>
        </section>
      </main>
    </div>
  );
}
