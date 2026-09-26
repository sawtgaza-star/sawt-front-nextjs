import "@/styles/creators-skeleton.css";

/* What /support and /support/methods show while GET /pages/support is in
   flight. Rendered on the server as well: `loading` starts true on both sides,
   so this is what ships in the prerendered HTML and what hydration expects.
   Same base classes as the other pages' skeletons (creators-skeleton.css). */

/** The hero's title and description, inside the real .cr-hero container. */
export function SupportHeroSkeleton() {
  return (
    <div className="cr-sk-hero" aria-busy="true" aria-hidden="true">
      <span className="sk-line-title" style={{ width: "42%" }} />
      <span className="sk-line" style={{ width: "76%" }} />
    </div>
  );
}

/** A section head plus a content block, `count` times over. */
export function SupportBodySkeleton({ count = 2 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <section className="sp-section" key={i}>
          <div className="container">
            <div className="cr-sk-head">
              <span className="sk-line-title" style={{ width: "34%" }} />
              <span className="sk-line" style={{ width: "58%" }} />
            </div>
            <span
              className="sk-block"
              style={{ height: 320, borderRadius: 20 }}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
