import "@/styles/creators-skeleton.css";

/* What /creators shows while GET /pages/creators is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in creators.html and what hydration expects.

   The breadcrumb header itself is NOT part of it — CreatorsHero always renders
   (SiteNav lives inside it) and swaps its own copy for these bars. */

export function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The hero's title and description, inside the real .cr-hero container. */
export function CreatorsHeroSkeleton() {
  return (
    <div className="cr-sk-hero" aria-busy="true" aria-hidden="true">
      <Line width="55%" className="sk-line-title" />
      <Line width="80%" />
    </div>
  );
}

/** A centred section head: title bar + subtitle. */
function Head({ titleWidth = "38%" }: { titleWidth?: string }) {
  return (
    <div className="cr-sk-head">
      <Line width={titleWidth} className="sk-line-title" />
      <Line width="52%" />
    </div>
  );
}

/** The creator grid — the same five-column grid the cards arrive into. */
export function CreatorsGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="cr-creators-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block cr-sk-card" />
      ))}
    </div>
  );
}

/** The collaboration panel + its three step cards — shared with the
    creator profile's skeleton, where the same section closes the page. */
export function CollabStepsSkeleton() {
  return (
    <section className="cr-collab-section">
      <div className="container">
        <Head titleWidth="44%" />
        <span className="sk-block cr-sk-flow" />
        <div className="cr-steps-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="sk-block cr-sk-step" />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Everything below the hero: grid, figures, join banner, companies, the
    collaboration panel and the FAQ, each in its real section wrapper. */
export default function CreatorsSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <section className="content-section cr-grid-section">
        <div className="container">
          <Head titleWidth="46%" />
          <CreatorsGridSkeleton />
        </div>
      </section>

      <section className="cr-stats-section">
        <div className="container">
          <Head />
          <div className="cr-stats-grid">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} className="sk-block cr-sk-stat" />
            ))}
          </div>
        </div>
      </section>

      <section className="join-us-section">
        <div className="container">
          <span className="sk-block cr-sk-join" />
        </div>
      </section>

      <section className="cr-companies-section">
        <div className="container">
          <Head titleWidth="52%" />
          <div className="cr-companies-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="sk-block cr-sk-company" />
            ))}
          </div>
        </div>
      </section>

      <CollabStepsSkeleton />

      <section className="cr-faq-section">
        <div className="container">
          <Head titleWidth="42%" />
          <div className="cr-faq-row">
            <div className="cr-faq-col">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="sk-block cr-sk-faq-q" />
              ))}
            </div>
            <div className="cr-faq-visual">
              <span className="sk-block cr-sk-faq-visual" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
