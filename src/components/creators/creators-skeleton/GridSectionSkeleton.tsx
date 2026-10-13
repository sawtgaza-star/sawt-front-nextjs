import SkeletonText from "@/components/ui/SkeletonText";
import { times } from "./sk-utils";

/* CreatorsGrid while GET /pages/creators is in flight: the same section,
   heading, grid and "عرض الكل" link, with each text swapped for a
   <SkeletonText /> (~1.25x the current copy: the bars run narrower than real
   text) and each card for a shimmer of the card's own 300px box. Keep it in step with CreatorsGrid. */

/** Character counts (~1.25x the current `grid` copy). */
const LEN = { title: 33, subtitle: 91, browse: 5 };

/** How many cards GET /pages/creators currently returns. */
const CARDS = 8;

/** The creator grid — the same five-column grid the cards arrive into. Also
    used by /creators/all while a page of the roster is in flight. */
export function CreatorsGridSkeleton({ count = CARDS }: { count?: number }) {
  return (
    <div className="cr-creators-grid" aria-busy="true" aria-hidden="true">
      {times(count).map((i) => (
        <div className="item" key={i}>
          <span className="sk-shimmer cr-card-ph" />
        </div>
      ))}
    </div>
  );
}

export default function GridSectionSkeleton() {
  return (
    <section className="content-section cr-grid-section">
      <div className="container position-relative">
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-right-top-creators-section"
          alt=""
        />
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-left-bottom-creators-section"
          alt=""
        />{" "}
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <SkeletonText chars={LEN.title} />
          </h2>
          <p className="cr-section-sub">
            <SkeletonText chars={LEN.subtitle} />
          </p>
        </div>
        <CreatorsGridSkeleton />
        <div className="text-center" style={{ marginTop: "50px" }}>
          <a className="px-4 py-2 fw-bold show-more-news">
            <SkeletonText chars={LEN.browse} />{" "}
            <i className="fa-solid fa-angle-left me-2 arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
