"use client";
import NewsHero from "@/components/news/NewsHero";
import NewsShareCard from "./NewsShareCard";
import NewsArticleHead from "./NewsArticleHead";
import NewsGallery from "./NewsGallery";
import NewsBody from "./NewsBody";
import RelatedNews from "./RelatedNews";
import { NewsArticleSkeleton } from "@/components/news/NewsSkeleton";
import { blogCards } from "@/components/news/blog-cards";
import { blogArticle } from "./blog-article";
import { useBlog } from "@/lib/api/use-blogs";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

/* Everything /news/{uuid} shows, from GET /pages/blogs/{uuid}: the breadcrumb
   header, the article, and the "أخبار ذات صلة" strip — one request carries all
   three (`hero`, `blog`, `related`).

   The client boundary is here rather than on the page so the route file keeps
   its `generateStaticParams` / `generateMetadata`, which the static export
   needs. The header renders throughout, with the static hero copy until the
   payload's own arrives: SiteNav lives inside it, and a reader must never be
   left without the navbar while a request is in flight.

   An article that no longer exists (the uuid 404s) settles into the header
   with an empty page under it — the same outcome as an outage, and the same
   as everywhere else on the site: the error is logged, not surfaced. */
export default function NewsArticleContent({ uuid }: { uuid: string }) {
  const { data, loading } = useBlog(uuid);
  const { lang } = useLang();

  const hero = data?.hero;
  const heroTitle = localized(hero?.title, lang);
  const heroDesc = localized(hero?.description, lang);

  const blog = data?.blog;
  const article = blog ? blogArticle(blog, lang) : null;
  const crumb = localized(blog?.breadcrumb?.current, lang) || article?.title;
  const parentLabel = localized(blog?.breadcrumb?.news, lang);
  const related = blogCards(data?.related, lang);

  return (
    <>
      <NewsHero
        article={crumb ? { title: crumb } : undefined}
        parent={
          parentLabel ? { href: "/news", title: parentLabel } : undefined
        }
        hero={{ title: heroTitle, desc: heroDesc }}
        image={hero?.image_url}
        loading={loading}
      />
      <main className="nws-main">
        <div className="container">
          <div className="nws-layout">
            <div className="nws-content">
              {loading ? <NewsArticleSkeleton /> : null}
              {article ? (
                <>
                  <NewsArticleHead article={article} />
                  <NewsGallery images={article.gallery} />
                  <NewsBody article={article} />
                </>
              ) : null}
            </div>
            <aside className="nws-aside">
              <NewsShareCard />
            </aside>
          </div>
        </div>
      </main>
      {related.length ? <RelatedNews items={related} /> : null}
    </>
  );
}
