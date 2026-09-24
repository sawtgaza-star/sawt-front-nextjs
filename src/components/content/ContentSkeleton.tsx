import "@/styles/content-skeleton.css";

/* What /content shows while GET /pages/content is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in content.html and what hydration expects.

   The reel grid and the "الأكثر مشاهدة" row are in here too, now that their
   cards come from the payload rather than from a bundled demo reel — without
   them the page below the hero would be an empty white stretch until the
   request lands. */

function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The hero's headline and lead, inside the real .ct-hero container. */
export function ContentHeroSkeleton() {
  return (
    <div className="ct-sk-hero" aria-busy="true" aria-hidden="true">
      <Line width="65%" className="sk-line-title" />
      <Line width="100%" />
      <Line width="80%" />
    </div>
  );
}

/** The fanned poster strip: nine boxes the height of a slide. */
export function ContentPostersSkeleton() {
  return (
    <div className="ct-sk-posters" aria-busy="true" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="sk-block" />
      ))}
    </div>
  );
}

/** Reel-shaped boxes inside the REAL .ct-grid, so the columns the cards will
    land in are already the ones on screen. */
export function ContentGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="ct-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block ct-sk-card" />
      ))}
    </div>
  );
}

/** The same boxes for the horizontal row — rendered inside its real track. */
export function MostWatchedCardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block ct-sk-card" aria-hidden="true" />
      ))}
    </>
  );
}

/** One bar where a "الأكثر مشاهدة" heading will be. */
export function MostWatchedTitleSkeleton() {
  return <span className="ct-sk-mw-title" aria-busy="true" aria-hidden="true" />;
}
