import SkeletonText from "@/components/ui/SkeletonText";
import { times } from "./sk-utils";

/* CreatorContent and CreatorCollaborations while GET /pages/creators/{id} is
   in flight: their real markup — the reel slider's cards, and the
   collaborations' heading and grid of cards — with each text swapped for a
   <SkeletonText /> (~1.25x the current copy) and each picture for a shimmer
   of its box. Keep it in step with those two components. */

const CONTENT = { title: 9, more: 14, reels: 2 };
const COLLABS = { title: 18, description: 73 };
const COMPANIES = [6, 5, 4, 14];

export function ContentDetailSkeleton() {
  return (
    <section className="cr-content-detail-section ">
      <div className="container position-relative">
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-left-top-creator-section"
          alt=""
        />
        <div className="cr-content-head">
          <h2 className="cr-content-title">
            <span className="cr-highlight">
              <SkeletonText chars={CONTENT.title} />
            </span>
          </h2>
          <a className="cr-content-more">
            <SkeletonText chars={CONTENT.more} />
          </a>
        </div>
        <div className="cr-content-slider">
          <div className="cr-content-track" dir="rtl">
            {times(CONTENT.reels).map((i) => (
              <div className="cr-content-card sk-shimmer" key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CollabsSkeleton() {
  // the layout of CreatorCollaborations: centered heading, then a grid of cards
  return (
    <section className="cr-collabs-strip-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <SkeletonText chars={COLLABS.title} />
          </h2>
          <p className="cr-section-sub">
            <SkeletonText chars={COLLABS.description} />
          </p>
        </div>
        <div className="cr-collab-cards">
          {COMPANIES.slice(0, 3).map((chars, i) => (
            <div className="cr-collab-card is-skeleton" key={i}>
              <span className="cr-collab-card-letter sk-shimmer" aria-hidden="true"></span>
              <div className="cr-collab-card-text">
                <h3 className="cr-collab-card-name">
                  <SkeletonText chars={chars} />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
