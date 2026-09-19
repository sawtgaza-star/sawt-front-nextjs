import "@/styles/content-skeleton.css";

/* What /content shows while GET /pages/content is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in content.html and what hydration expects.

   Only the hero and the row headings are here. The reel grid below draws the
   bundled demo reels — the API has no field for it yet (see content-data) — so
   it is on screen from the first paint and needs no placeholder. */

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

/** One bar where a "الأكثر مشاهدة" heading will be. */
export function MostWatchedTitleSkeleton() {
  return <span className="ct-sk-mw-title" aria-busy="true" aria-hidden="true" />;
}
