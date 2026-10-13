import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/team-skeleton.css";

/* What the team pages show while GET /pages/team (or /pages/team/{uuid}) is
   in flight. Server-rendered as well as client-rendered: `loading` starts true
   on both sides, so this is what ships in team.html and what hydration
   expects.

   Each placeholder is the real markup — the same elements with the same
   classes as TeamHero, TeamListing, TeamMemberCard, TeamMemberProfile and
   TeamMembersSection — with each text swapped for a <SkeletonText /> (~1.25x
   the current copy; the bars run narrower than real text). The portrait boxes
   need nothing more: .team-member-photo already paints its own shimmer under
   the photo. So the page keeps about the shape the content arrives into.
   Keep it in step with those components.

   The breadcrumb header itself is NOT part of it — TeamHero always renders
   (SiteNav lives inside it) and swaps its own copy for TeamHeroSkeleton. */

/** How many members / majors GET /pages/team currently returns. */
const MEMBERS = 7;
const PILLS = [{ name: 5 }, { name: 6, count: 4 }, { name: 6, count: 4 }, { name: 6, count: 4 }, { name: 14, count: 4 }];
/** The "اعضاء الفريق" row on a profile: the related members it lists. */
const RELATED = 5;

/** The hero's title, in the real element. */
export function TeamHeroSkeleton() {
  return (
    <h1 className="cr-hero-title" aria-hidden="true">
      <SkeletonText chars={24} />
    </h1>
  );
}

/** The filter pills: the "الكل" pill plus the majors with their counts. */
export function TeamFiltersSkeleton() {
  return (
    <ul className="team-filter" aria-busy="true" aria-hidden="true">
      {PILLS.map((pill, i) => (
        <li key={i}>
          <button type="button" className={"team-tab" + (i === 0 ? " active" : "")} tabIndex={-1}>
            <span>
              <SkeletonText chars={pill.name} />
            </span>
            {pill.count ? (
              <span className="team-tab-count">
                <SkeletonText chars={pill.count} />
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** One member card: the portrait box (its shimmer is team.css's own). */
function CardSkeleton() {
  return (
    <article className="team-member-card">
      <div className="team-member-photo" />
    </article>
  );
}

/** The roster grid: portrait boxes in the real five-column grid. */
export function TeamGridSkeleton({ count = MEMBERS }: { count?: number }) {
  return (
    <div className="team-grid" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** The profile on /team/{uuid}: name, role, experience badge and the works
    button, laid out as the loaded card (TeamMemberProfile with `has-bg`): one
    rounded shimmering card, text on the start side, the mic's empty box on
    the other — the real backdrop is the API's `mic_background_url`. */
export function TeamProfileSkeleton() {
  return (
    <section className="team-detail-section" aria-busy="true" aria-hidden="true">
      <img src="/assets/images/leaf_cutout.png" className="team-detail-branch" alt="" />
      <div className="container">
        <div className="team-detail-grid has-bg is-skeleton">
          <div className="team-detail-info">
            <div className="team-detail-head">
              <div className="team-detail-identity">
                <h1 className="team-detail-name">
                  <SkeletonText chars={15} />
                </h1>
                <p className="team-detail-role">
                  <SkeletonText chars={6} />
                </p>
              </div>
              <p className="team-detail-experience">
                <i className="fa-solid fa-star"></i>
                <span>
                  <SkeletonText chars={21} />
                </span>
              </p>
            </div>
            <span className="team-detail-work-btn">
              <span>
                <SkeletonText chars={30} />
              </span>
              <i className="fa-solid fa-chevron-left"></i>
            </span>
          </div>
          <div className="team-detail-photo" />
        </div>
      </div>
    </section>
  );
}

/** The "اعضاء الفريق" heading on the detail page. */
export function TeamMembersTitleSkeleton() {
  return (
    <h2 className="team-members-title" aria-hidden="true">
      <SkeletonText chars={15} />
    </h2>
  );
}

/** The "اعضاء الفريق" row on the detail page — the same cards. */
export function TeamMembersRowSkeleton({ count = RELATED }: { count?: number }) {
  return (
    <div className="team-members-row" aria-busy="true" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** The row's "عرض الكل" link. */
export function TeamMembersMoreSkeleton() {
  return (
    <div className="team-members-more" aria-hidden="true">
      <a>
        <span>
          <SkeletonText chars={10} />
        </span>
        <i className="fa-solid fa-angle-left"></i>
      </a>
    </div>
  );
}
