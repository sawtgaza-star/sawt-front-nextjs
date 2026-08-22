import SiteNav from "@/components/site/SiteNav";

type Crumb = { titleKey: string; title: string };

/* Breadcrumb hero for the news listing (/news). Reuses the about-page hero
   styling (about-* classes, style.css) and the same collage background — that
   is what the mock shows, only the breadcrumb tail differs.

   /news/[id] renders the same hero with `article` set: the listing crumb then
   becomes a link and the article's headline is the active tail. */
export default function NewsHero({ article }: { article?: Crumb }) {
  return (
    <header>
      <div
        className="about-header py-1"
        style={{ background: 'url("/assets/images/WhoUs.jpg")' }}
      >
        <SiteNav />
        <div className="container about-hero text-center text-white">
          <nav className="about-breadcrumb" aria-label="breadcrumb">
            <a href="/" data-i18n="nav_home">
              الرئيسية
            </a>
            <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>
            {article ? (
              <>
                <a href="/news" data-i18n="news_breadcrumb">
                  أخر الأخبار
                </a>
                <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>
                <span
                  className="about-breadcrumb-active"
                  data-i18n={article.titleKey}
                >
                  {article.title}
                </span>
              </>
            ) : (
              <span className="about-breadcrumb-active" data-i18n="news_breadcrumb">
                أخر الأخبار
              </span>
            )}
          </nav>
          <h1 className="about-hero-title" data-i18n="news_hero_title">
            صناع الأثر..الفريق خلف منصة صوت
          </h1>
          <p className="about-hero-desc" data-i18n="news_hero_desc">
            صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً
            لمن لا صوت له.
          </p>
        </div>
      </div>
    </header>
  );
}
