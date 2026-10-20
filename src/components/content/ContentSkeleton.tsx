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
const LEN = { rowHead: 8, rowTail: 6 };
/** The category pills the API sends now ("الكل", "الاقتصاد (3)", "السياسة (6)"). */
const PILLS = [4, 12, 11];
/** How many reels the API returns now. */
const REELS = 6;

/** The fanned poster strip — a client component of its own, since its
    blocks are posed from the viewport (see ./ContentPostersSkeleton). */
export { default as ContentPostersSkeleton } from "./ContentPostersSkeleton";

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

/** The row's heading, as MostWatchedSection renders it. */
export function MostWatchedTitleSkeleton() {
  return (
    <>
      <h2 className="ct-mw-title" aria-busy="true" aria-hidden="true">
        <span><SkeletonText chars={LEN.rowHead} /></span>{" "}
        <span className="cr-highlight"><SkeletonText chars={LEN.rowTail} /></span>
      </h2>
    </>
  );
}
