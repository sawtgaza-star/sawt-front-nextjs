import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/news-skeleton.css";

/* What the news and stories pages show while their request is in flight.
   Server-rendered as well as client-rendered: `loading` starts true on both
   sides, so this is what ships in the exported HTML and what hydration expects.

   Every piece is the REAL component's markup — NewsHero's title/standfirst and
   crumb, NewsCard, StoryCard — with each text swapped for a <SkeletonText /> of
   the current copy's length (see FooterSkeleton). So every heading, clamp,
   margin and grid cell is the one the content arrives into, at every
   breakpoint, and nothing moves when it lands. Only the pictures and icons are
   blocks, sized like the real ones.

   Keep it in step with those components when their markup changes. */

/** Character counts of a hero's API copy; `crumb`/`parent` only on the article
    pages, whose breadcrumb tail (the headline) and parent link come from the
    payload too. */
export type HeroSkeletonLen = { title: number; desc: number; crumb?: number; parent?: number };

/* GET /pages/blogs and GET /pages/stories (hero), and the two articles'
   breadcrumbs — the articles carry their listing's hero. */
export const NEWS_HERO_LEN: HeroSkeletonLen = { title: 31, desc: 81 };
export const STORIES_HERO_LEN: HeroSkeletonLen = { title: 10, desc: 44 };
export const NEWS_ARTICLE_HERO_LEN: HeroSkeletonLen = { ...NEWS_HERO_LEN, crumb: 38, parent: 11 };
export const STORY_ARTICLE_HERO_LEN: HeroSkeletonLen = { ...STORIES_HERO_LEN, crumb: 45, parent: 10 };

/** Cards the listing endpoints currently return on their first page. */
export const NEWS_LISTING_COUNT = 3;
export const STORIES_LISTING_COUNT = 3;

/** The hero's title and standfirst — NewsHero's own h1/p. */
export function NewsHeroSkeleton({ len }: { len: HeroSkeletonLen }) {
  return (
    <>
      <h1 className="about-hero-title">
        <SkeletonText chars={len.title} />
      </h1>
      <p className="about-hero-desc">
        <SkeletonText chars={len.desc} />
      </p>
    </>
  );
}

/** An article's breadcrumb tail — the parent link and the headline. */
export function NewsCrumbSkeleton({ href, len }: { href: string; len: HeroSkeletonLen }) {
  return (
    <>
      <a href={href} tabIndex={-1} aria-hidden="true">
        <SkeletonText chars={len.parent ?? 11} />
      </a>
      <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>
      <span className="about-breadcrumb-active">
        <SkeletonText chars={len.crumb ?? 30} />
      </span>
    </>
  );
}

/* NewsCard's copy: the title and the excerpt are clamped (1 and 2 lines), so
   their size is fixed whatever the count; the date and "اقرأ المزيد" are one
   short line each. */
const CARD_LEN = { title: 38, desc: 123, date: 14, readMore: 11 };
const GREY = { color: "rgba(109, 109, 109, 1)" };
const OLIVE = { color: "rgba(76, 92, 55, 1)" };

/** NewsCard, with its picture as a block of the same box. */
export function NewsCardSkeleton() {
  return (
    <div className="item">
      <div className="card h-100 news-card">
        <span className="card-img-top nph-img" />
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <SkeletonText chars={CARD_LEN.title} />
          </h5>
          <p className="card-text font-md-18" style={{ fontWeight: "500", ...GREY }}>
            <span className="news-card-desc">
              <SkeletonText chars={CARD_LEN.desc} />
            </span>
          </p>
        </div>
        <div className="card-footer bg-white border-0 d-flex font-16 text-dark pb-3 fw-bold">
          <span>
            {/* IconCalendar's 1.2em box, without the glyph */}
            <i style={GREY}>
              <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" aria-hidden="true" />
            </i>{" "}
            <span style={GREY}>
              <SkeletonText chars={CARD_LEN.date} />
            </span>
          </span>
          <span className="readmore">
            <a tabIndex={-1} aria-hidden="true">
              <span style={OLIVE}>
                <SkeletonText chars={CARD_LEN.readMore} />
              </span>
              <i className="fa-solid fa-angle-left me-2 ms-1 arrow nph-glyph" style={OLIVE}></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

/* StoryCard's overlay copy. The poster sets the card's height (its
   aspect-ratio); the overlay sits on top of it, absolutely placed. */
const STORY_LEN = { badge: 8, title: 13, desc: 35 };

/** StoryCard, with its poster as a block of the same aspect-ratio. */
export function StoryCardSkeleton() {
  return (
    <div className="rs-card">
      <span className="rs-card-bg nph-block" />
      <div className="rs-card-info">
        <div className="rs-card-text">
          <span className="rs-badge">
            <SkeletonText chars={STORY_LEN.badge} />
          </span>
          <h5 className="rs-card-title">
            <SkeletonText chars={STORY_LEN.title} />
          </h5>
          <p className="rs-card-desc">
            <SkeletonText chars={STORY_LEN.desc} />
          </p>
        </div>
        <span className="rs-arrow" />
      </div>
    </div>
  );
}

/** The /news grid. */
export function NewsGridSkeleton({ count = NEWS_LISTING_COUNT }: { count?: number }) {
  return (
    <div className="news-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** The /stories grid — the page puts the bare `.rs-card` in each cell. */
export function StoriesGridSkeleton({ count = STORIES_LISTING_COUNT }: { count?: number }) {
  return (
    <div className="news-grid stories-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
