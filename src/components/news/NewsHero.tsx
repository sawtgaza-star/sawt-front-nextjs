import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { NewsHeroSkeleton } from "./NewsSkeleton";

/* The key fields are optional: copy that comes from the API (GET /pages/blogs,
   GET /pages/stories) is already in the reader's language, and a `data-i18n`
   on text React owns is what makes applyTranslations() fight React — same rule
   as NewsCard. */
type Crumb = { titleKey?: string; title: string };
type Parent = { href: string; titleKey?: string; title: string };
type Hero = { titleKey?: string; title?: string; descKey?: string; desc?: string };

/* The breadcrumb tail of the listing pages. This is the ONE piece of copy the
   header still carries: neither payload sends a crumb for its own listing, so
   it stays site chrome with a `data-i18n` key, exactly as the creators header
   keeps "صناع المحتوى". Everything else below — the title and the standfirst —
   comes from the API, and until it lands the hero shows bars rather than copy
   that would be replaced a moment later. */
const NEWS_PARENT: Parent = {
  href: "/news",
  titleKey: "news_breadcrumb",
  title: "أخر الأخبار",
};

/* Breadcrumb hero for the news listing (/news). Reuses the about-page hero
   styling (about-* classes, style.css) and the same collage background — that
   is what the mock shows, only the breadcrumb tail differs.

   /news/[id] renders the same hero with `article` set: the listing crumb then
   becomes a link and the article's headline is the active tail.

   `parent` defaults to the news crumb; /stories passes its own. `hero` has no
   default — the pages pass the API's own title, description and collage, and
   `loading` puts bars in their place until it lands.

   The <header> shell is NOT conditional, for the same reason CreatorsHero's is
   not: <SiteNav /> lives inside it and initHeaderPin() (lib/legacy-main) wraps
   `.nav-face` + `.navbar` right after mount, so a header that appeared only
   once the payload landed would bring its nav up too late to be wrapped. */
const HERO_IMAGE = "/assets/images/WhoUs.jpg";

export default function NewsHero({
  article,
  parent = NEWS_PARENT,
  hero,
  image,
  loading = false,
}: {
  article?: Crumb;
  parent?: Parent | null;
  hero?: Hero;
  image?: string | null;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
  return (
    <header>
      <div
        className="about-header py-1"
        style={{ background: `url("${image || HERO_IMAGE}")` }}
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
          {loading ? (
            <NewsHeroSkeleton />
          ) : (
            <>
              {hero?.title ? (
                <h1 className="about-hero-title" data-i18n={hero.titleKey}>
                  {hero.title}
                </h1>
              ) : null}
              {hero?.desc ? (
                <p className="about-hero-desc" data-i18n={hero.descKey}>
                  {hero.desc}
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
