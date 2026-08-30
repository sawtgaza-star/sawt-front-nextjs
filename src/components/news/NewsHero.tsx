import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

type Crumb = { titleKey: string; title: string };
type Parent = { href: string; titleKey: string; title: string };
type Hero = { titleKey: string; title: string; descKey: string; desc: string };

const NEWS_PARENT: Parent = {
  href: "/news",
  titleKey: "news_breadcrumb",
  title: "أخر الأخبار",
};

const NEWS_HERO: Hero = {
  titleKey: "news_hero_title",
  title: "صناع الأثر..الفريق خلف منصة صوت",
  descKey: "news_hero_desc",
  desc: "صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً لمن لا صوت له.",
};

/* Breadcrumb hero for the news listing (/news). Reuses the about-page hero
   styling (about-* classes, style.css) and the same collage background — that
   is what the mock shows, only the breadcrumb tail differs.

   /news/[id] renders the same hero with `article` set: the listing crumb then
   becomes a link and the article's headline is the active tail.

   `parent` / `hero` default to the news copy, so /news and /news/[id] are
   untouched; /stories/[slug] passes its own (and `parent: null`, since the
   stories live in a home-page section, not on a listing page of their own). */
export default function NewsHero({
  article,
  parent = NEWS_PARENT,
  hero = NEWS_HERO,
}: {
  article?: Crumb;
  parent?: Parent | null;
  hero?: Hero;
}) {
  return (
    <header>
      <div
        className="about-header py-1"
        style={{ background: 'url("/assets/images/WhoUs.jpg")' }}
      >
        <SiteNav />
        <div className="container about-hero text-center text-white">
          <nav className="about-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>
            {article ? (
              <>
                {parent && (
                  <>
                    <a href={parent.href} data-i18n={parent.titleKey}>
                      {parent.title}
                    </a>
                    <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>
                  </>
                )}
                <span
                  className="about-breadcrumb-active"
                  data-i18n={article.titleKey}
                >
                  {article.title}
                </span>
              </>
            ) : (
              parent && (
                <span
                  className="about-breadcrumb-active"
                  data-i18n={parent.titleKey}
                >
                  {parent.title}
                </span>
              )
            )}
          </nav>
          <h1 className="about-hero-title" data-i18n={hero.titleKey}>
            {hero.title}
          </h1>
          <p className="about-hero-desc" data-i18n={hero.descKey}>
            {hero.desc}
          </p>
        </div>
      </div>
    </header>
  );
}
