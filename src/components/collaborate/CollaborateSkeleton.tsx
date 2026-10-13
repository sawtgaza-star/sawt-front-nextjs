import SkeletonText from "@/components/ui/SkeletonText";

/* What /collaborate shows while GET /pages/collaborate is in flight. Server-
   rendered as well as client-rendered: `loading` starts true on both sides, so
   this is what ships in collaborate.html and what hydration expects.

   Both parts are the real markup — the hero's h1/p and CollaborateTypeCard's
   label/head/h3/p, with the same classes — with each text swapped for a
   <SkeletonText /> of the current copy's length. So every line wraps where the
   copy will, at every breakpoint, and nothing moves when the payload lands.
   Only the icon tile and the radio dot stay as the empty boxes they draw.

   The breadcrumb header itself is NOT part of it: <CollaborateHero /> always
   renders (SiteNav lives inside it) and swaps only its own copy. Keep this in
   step with CollaborateHero and CollaborateTypeCard when their markup changes. */

/** Character counts of the current copy (GET /pages/collaborate), raised a
    little where the filler's glyphs run narrower than the real text's. */
const HERO = { title: 10, desc: 90 };
const TYPES = [
  { title: 10, desc: 70 },
  { title: 14, desc: 71 },
  { title: 16, desc: 77 },
  { title: 9, desc: 68 },
];

/** The hero's title and description, inside the real .cr-hero container. */
export function CollaborateHeroSkeleton() {
  return (
    <>
      <h1 className="cr-hero-title" aria-busy="true" aria-hidden="true">
        <SkeletonText chars={HERO.title} />
      </h1>
      <p className="cr-hero-desc" aria-hidden="true">
        <SkeletonText chars={HERO.desc} />
      </p>
    </>
  );
}

/** The option cards, in the grid they arrive into. */
export function CollaborateTypesSkeleton() {
  return (
    <div
      className="cl-types-row"
      style={{ pointerEvents: "none" }}
      aria-busy="true"
      aria-hidden="true"
    >
      {TYPES.map((type, i) => (
        <div className="cl-type" key={i}>
          <input type="radio" className="cl-type-input" disabled tabIndex={-1} />
          <span className="cl-type-head">
            <span className="cl-type-icon" />
            <span className="cl-type-dot" />
          </span>
          <h3 className="cl-type-title">
            <SkeletonText chars={type.title} />
          </h3>
          <p className="cl-type-desc">
            <SkeletonText chars={type.desc} />
          </p>
        </div>
      ))}
    </div>
  );
}
