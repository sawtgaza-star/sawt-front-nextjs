/* creators.css first: the listing's card/pager rules live there, and news.css
   overrides some of them. */
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import NewsShareCard from "@/components/news/detail/NewsShareCard";
import NewsArticleHead from "@/components/news/detail/NewsArticleHead";
import NewsGallery from "@/components/news/detail/NewsGallery";
import NewsBody from "@/components/news/detail/NewsBody";
import RelatedNews from "@/components/news/detail/RelatedNews";
import FooterNewsletterMobile from "@/components/site/footer/FooterNewsletterMobile";
import { getArticle } from "@/components/news/detail/news-article-data";
import { ALL_NEWS } from "@/components/news/news-data";

/* /news/[id] — the article behind a card's "اقرأ المزيد". Server Component;
   the share card, gallery and reel are the client leaves. Layout is the same
   [content | aside] grid the course page uses, only the other way round in
   size: the aside is the narrow share/donate column on the outside. */

/* `output: 'export'` needs every dynamic segment pre-listed. */
export function generateStaticParams() {
  return ALL_NEWS.map((item) => ({ id: String(item.id) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);

  return (
    <div className="news-page nws-detail">
      <LegacyInit page="news" />
      {/* The mock's last crumb is a fixed "اسم الخبر الأخير" label, not the
          article headline — keep it in sync with the design, not with `article`. */}
      <NewsHero
        article={{
          titleKey: "news_breadcrumb_article",
          title: "اسم الخبر الأخير",
        }}
      />
      <main className="nws-main">
        <div className="container">
          <div className="nws-layout">
            <div className="nws-content">
              <NewsArticleHead article={article} />
              <NewsGallery images={article.gallery} />
              <NewsBody article={article} />
            </div>
            <aside className="nws-aside">
              <NewsShareCard />
            </aside>
          </div>
        </div>
      </main>
      <RelatedNews />
      {/* the newsletter card sits between the article and the dark footer; it is
          `display: none` above 768px (style.css), so this is mobile-only */}
      <FooterNewsletterMobile />
    </div>
  );
}
