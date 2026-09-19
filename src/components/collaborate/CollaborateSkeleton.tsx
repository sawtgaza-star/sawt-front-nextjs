import "@/styles/creators-skeleton.css";

/* What /collaborate shows while GET /pages/collaborate is in flight. Server-
   rendered as well as client-rendered: `loading` starts true on both sides, so
   this is what ships in collaborate.html and what hydration expects.

   Same base classes as the other pages' skeletons (creators-skeleton.css) and
   the bars sit inside the REAL wrappers — .cr-hero for the hero copy,
   .cl-types-row for the picker — so the layout they hold is the layout the
   content arrives into and nothing jumps.

   The breadcrumb header itself is NOT part of it: <CollaborateHero /> always
   renders (SiteNav lives inside it) and swaps only its own copy for bars. */

/** The hero's title and description, inside the real .cr-hero container. */
export function CollaborateHeroSkeleton() {
  return (
    <div className="cr-sk-hero" aria-busy="true" aria-hidden="true">
      <span className="sk-line-title" style={{ width: "42%" }} />
      <span className="sk-line" style={{ width: "76%" }} />
    </div>
  );
}

/** The four option cards, in the grid they arrive into. */
export function CollaborateTypesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="cl-types-row" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block cl-sk-type" />
      ))}
    </div>
  );
}
