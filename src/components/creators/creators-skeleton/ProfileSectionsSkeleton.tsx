import SkeletonText from "@/components/ui/SkeletonText";
import { blank, times } from "./sk-utils";

/* CreatorContent and CreatorCollaborations while GET /pages/creators/{id} is
   in flight: their real markup — the reel slider's cards, the company list,
   the reel card and the quote card — with each text swapped for a
   <SkeletonText /> (~1.25x the current copy) and each picture for a shimmer
   of its box. Keep it in step with those two components. */

const CONTENT = { title: 9, more: 14, reels: 2 };
const COLLABS = { title: 18, description: 73, reelTitle: 11, company: 6 };
const COMPANIES = [6, 5, 4, 14];
/** The collaboration reel's proportions (the phone layout shows it whole). */
const REEL = { width: 370, height: 507 };

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
  return (
    <section className="cr-collabs-section">
      <div className="container">
        <div className="cr-collabs-grid">
          <div className="cr-collabs-intro">
            <h2 className="cr-collabs-title">
              <SkeletonText chars={COLLABS.title} />
            </h2>
            <p className="cr-collabs-desc">
              <SkeletonText chars={COLLABS.description} />
            </p>
          </div>

          {/* --m-order: the phone layout's stacking, as in CreatorCollaborations
              with the first company selected */}
          <ul className="cr-collabs-list">
            {COMPANIES.map((chars, i) => (
              <li key={i} style={{ "--m-order": i > 0 ? i + 2 : 1 } as React.CSSProperties}>
                <div className={"cr-collab-item" + (i === 0 ? " active" : "")}>
                  <span className="cr-collab-item-dot sk-shimmer"></span>
                  <span className="cr-collab-item-text">
                    <span className="cr-collab-item-name">
                      <SkeletonText chars={chars} />
                    </span>
                  </span>
                  <span className="cr-collab-item-status"></span>
                </div>
              </li>
            ))}
          </ul>

          <div className="cr-collabs-media" style={{ "--m-order": 2 } as React.CSSProperties}>
            <div className="review-reels cr-collabs-reel">
              <div className="reel-item">
                <div className="reel-media">
                  <video className="sk-shimmer" poster={blank(REEL.width, REEL.height)} />
                </div>
                <div className="reel-caption">
                  <p className="reel-title">
                    <SkeletonText chars={COLLABS.reelTitle} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cr-collabs-quote">
            <div className="cr-collab-quote-card">
              <div className="cr-collab-quote-head">
                <h4 className="cr-collab-quote-company">
                  <SkeletonText chars={COLLABS.company} />
                </h4>
                <div className="cr-collab-quote-stars">
                  {times(5).map((i) => (
                    <i key={i} className="fa-regular fa-star"></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
