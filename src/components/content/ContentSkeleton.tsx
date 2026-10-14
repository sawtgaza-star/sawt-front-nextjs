import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/content-skeleton.css";

/* What /content shows while GET /pages/content is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in content.html and what hydration expects.

   Each piece is the real markup — the same elements and classes as
   ContentHero, HeroReelsSlider, ContentFilterBar and MostWatchedSection — with
   the copy swapped for a <SkeletonText /> and the posters / reels for shimmer
   blocks in the real slide / card boxes, so nothing moves when the payload
   lands. Keep it in step with those components when their markup changes. */

/** Character counts of the current copy (GET /pages/content), raised about a
    quarter for the longer copy since the filler runs narrower than Arabic. */
const LEN = { title: 32, desc: 155, rowHead: 8, rowTail: 6, viewMore: 11 };
/** The category pills the API sends now ("الكل", "الاقتصاد (3)", "السياسة (6)"). */
const PILLS = [4, 12, 11];
/** How many reels the API returns now. */
const REELS = 6;
/** HeroReelsSlider shows five posters across at its widest. */
const POSTERS = 5;

/** The hero's headline and lead — the same h1 + p as ContentHero renders. */
export function ContentHeroSkeleton() {
  return (
    <>
      <h1 className="cr-hero-title" aria-hidden="true">
        <SkeletonText chars={LEN.title} />
      </h1>
      <p className="cr-hero-desc ct-hero-desc" aria-hidden="true">
        <SkeletonText chars={LEN.desc} />
      </p>
    </>
  );
}

/** The fanned poster strip: HeroReelsSlider's swiper box with a flat row of
    slides in it (no Swiper instance — the widths are set in CSS). */
export function ContentPostersSkeleton() {
  return (
    <div className="swiper ct-hero-swiper" aria-busy="true" aria-hidden="true">
      <div className="swiper-wrapper ct-posters-row">
        {Array.from({ length: POSTERS }, (_, i) => (
          <div key={i} className="ct-hero-slide ct-poster-block sk-shimmer" />
        ))}
      </div>
    </div>
  );
}

/** The category pills of ContentFilterBar, label-less. */
export function ContentPillsSkeleton() {
  return (
    <>
      {PILLS.map((chars, i) => (
        <li key={i} aria-hidden="true">
          <button type="button" className="cr-content-tab" disabled tabIndex={-1}>
            <SkeletonText chars={chars} />
          </button>
        </li>
      ))}
    </>
  );
}

/** Reel-shaped boxes inside the REAL .ct-grid, so the columns the cards will
    land in are already the ones on screen. */
export function ContentGridSkeleton({ count = REELS }: { count?: number }) {
  return (
    <div className="ct-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="cr-content-card sk-shimmer" />
      ))}
    </div>
  );
}

/** The same boxes for the horizontal row — rendered inside its real track. */
export function MostWatchedCardsSkeleton({ count = REELS }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="cr-content-card sk-shimmer" aria-hidden="true" />
      ))}
    </>
  );
}

/** The row's heading and "رؤية المزيد" link, as MostWatchedSection renders them. */
export function MostWatchedTitleSkeleton() {
  return (
    <>
      <h2 className="ct-mw-title" aria-busy="true" aria-hidden="true">
        <span><SkeletonText chars={LEN.rowHead} /></span>{" "}
        <span className="cr-highlight"><SkeletonText chars={LEN.rowTail} /></span>
      </h2>
      <span className="ct-mw-more" aria-hidden="true">
        <SkeletonText chars={LEN.viewMore} />
      </span>
    </>
  );
}
