import SkeletonText from "./SkeletonCopy";
import {
  IconHandStar,
  IconPeoplePair,
  IconTarget,
  IconVideoPlay,
} from "@/components/ui/icons";
import SkeletonHead from "./SkeletonHead";

/* SupportBanner and SupportCommunity while GET /pages/support is in flight —
   their real markup, every text a <SkeletonText /> of the current copy's
   length. The progress bar keeps its track; the fill waits for the figures. */

const FEATURES = [
  { Icon: IconPeoplePair, chars: 11 },
  { Icon: IconHandStar, chars: 19 },
  { Icon: IconVideoPlay, chars: 14 },
];
const BADGES = [
  { className: "sp-badge sp-badge-green", num: 5, label: 15 },
  { className: "sp-badge sp-badge-orange", num: 4, label: 8 },
];
/** The four goal figures: label and value ("$50,000", "65%"…). */
const STATS = [
  { label: 9, value: 7 },
  { label: 7, value: 7 },
  { label: 5, value: 7 },
  { label: 7, value: 3, green: true },
];

export function BannerSkeleton() {
  return (
    <section className="sp-section sp-banner-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="sp-banner">
          <div className="sp-banner-inner">
            <div className="sp-banner-text">
              <p className="sp-banner-eyebrow">
                <SkeletonText chars={18} />
              </p>
              <h2 className="sp-banner-title">
                <SkeletonText chars={29} />
              </h2>

              <div className="sp-banner-features">
                {FEATURES.map(({ Icon, chars }, i) => (
                  <div className="sp-banner-feature" key={i}>
                    <span className="sp-feature-icon">
                      <Icon />
                    </span>
                    <span>
                      <SkeletonText chars={chars} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="sp-banner-cta">
                <a className="sp-btn-green">
                  <SkeletonText chars={9} />
                </a>
                <a className="sp-btn-where">
                  <SkeletonText chars={17} />
                </a>
              </div>
            </div>

            <div className="sp-banner-media">
              <img src="/assets/images/tree.jpg" alt="" />
              {BADGES.map((badge, i) => (
                <div className={badge.className} key={i}>
                  <span className="sp-badge-num">
                    <SkeletonText chars={badge.num} />
                  </span>
                  <span className="sp-badge-label">
                    <SkeletonText chars={badge.label} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunitySkeleton() {
  return (
    <section className="sp-section sp-section-gray">
      <div className="container">
        <SkeletonHead title={16} sub={76} />

        <div className="sp-stats-card">
          <div className="sp-stats-row">
            {STATS.map((stat, i) => {
              const label = (
                <div className="sp-stat-label">
                  <span>
                    <SkeletonText chars={stat.label} />
                  </span>
                </div>
              );
              const value = (
                <div
                  className={
                    "sp-stat-value" +
                    (i === 0 ? " sp-stat-value-dark" : stat.green ? " sp-stat-value-green" : "")
                  }
                >
                  <SkeletonText chars={stat.value} />
                </div>
              );
              return i === 0 ? (
                <div className="sp-stat sp-stat-goal" key={i}>
                  <span className="sp-stat-badge">
                    <IconTarget />
                  </span>
                  <div className="sp-stat-goal-text">
                    {label}
                    {value}
                  </div>
                </div>
              ) : (
                <div className="sp-stat" key={i}>
                  {label}
                  {value}
                </div>
              );
            })}
          </div>

          <div className="sp-progress"></div>

          <p className="sp-progress-note">
            <SkeletonText chars={44} />
          </p>
        </div>

        <div className="sp-community-cta">
          <a className="sp-btn-green sp-btn-pill">
            <span>
              <SkeletonText chars={28} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
