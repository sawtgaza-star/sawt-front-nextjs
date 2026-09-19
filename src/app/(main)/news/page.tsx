"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import NewsCard from "@/components/news/NewsCard";
import { NewsGridSkeleton } from "@/components/news/NewsSkeleton";
import Pagination from "@/components/ui/Pagination";
import { blogCards } from "@/components/news/blog-cards";
import { NEWS_PER_PAGE } from "@/components/news/news-data";
import { useBlogsList } from "@/lib/api/use-blogs";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

/* Full, paginated news listing — the "عرض جميع الأخبار" target from the home
   page slider. Breadcrumb hero + 3×3 grid of the shared NewsCard.

   Every word and image below the header comes from GET /pages/blogs, one
   request per page of nine. The pager is the API's: `meta.last_page` decides
   how many pages there are, so a click fetches rather than slices. The header
   itself renders throughout — SiteNav lives inside it — with the static hero
   copy until the payload's own arrives. */
export default function Page() {
  const [page, setPage] = useState(1);
  const { lang } = useLang();
  const { page: data, meta, loading } = useBlogsList(page, NEWS_PER_PAGE);

  const hero = data?.hero;
  const heroTitle = localized(hero?.title, lang);
  const heroDesc = localized(hero?.description, lang);
  const items = blogCards(data?.items, lang);
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
        hero={{ title: heroTitle, desc: heroDesc }}
        image={hero?.image_url}
        loading={loading}
      />
      <main>
        <section className="news-grid-section">
          <div className="container">
            {loading ? (
              <NewsGridSkeleton count={NEWS_PER_PAGE} />
            ) : (
              <div className="news-grid">
                {items.map((item) => (
                  <NewsCard key={item.id} item={item} />
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
