import "@/styles/team-skeleton.css";

/* What the team pages show while GET /pages/team is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in team.html and what hydration expects.

   The breadcrumb header itself is NOT part of it — TeamHero always renders
   (SiteNav lives inside it) and swaps its own copy for these bars. */

function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The hero's title, inside the real .cr-hero container. */
export function TeamHeroSkeleton() {
  return (
    <div className="team-sk-hero" aria-busy="true" aria-hidden="true">
      <Line width="70%" className="sk-line-title" />
    </div>
  );
}

/** The filter pills: the "الكل" pill plus four majors. */
export function TeamFiltersSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="team-filter" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <span
            className="sk-block team-sk-pill"
            style={{ width: i === 0 ? 70 : 110 }}
          />
        </li>
      ))}
    </ul>
  );
}

/** The roster grid: portrait boxes in the real five-column grid. */
export function TeamGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="team-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block team-sk-card" />
      ))}
    </div>
  );
}

/** The profile on /team/{uuid}: the copy column beside the portrait box, in
    the real two-column grid so the section keeps its height. */
export function TeamProfileSkeleton() {
  return (
    <section className="team-detail-section" aria-busy="true" aria-hidden="true">
      <div className="container">
        <div className="team-detail-grid">
          <div className="team-detail-info">
            <Line width="45%" className="sk-line-title" />
            <Line width="30%" />
            <Line width="25%" className="sk-line team-sk-gap" />
            <Line width="100%" />
            <Line width="100%" />
            <Line width="85%" />
            <Line width="40%" className="sk-line team-sk-gap" />
          </div>
          <div className="team-detail-photo">
            <span className="sk-block team-sk-portrait" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The "اعضاء الفريق" row on the detail page — the same cards, five of them. */
export function TeamMembersRowSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="team-members-row" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="sk-block team-sk-card" />
      ))}
    </div>
  );
}
