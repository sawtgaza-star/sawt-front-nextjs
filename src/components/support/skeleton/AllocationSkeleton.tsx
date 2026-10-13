import SkeletonText from "./SkeletonCopy";
import { IconBookOpenOutline, IconLightbulbOutline, IconMicOutline } from "@/components/ui/icons";
import { ALLOCATIONS } from "../allocations-data";
import SkeletonHead from "./SkeletonHead";

/* WhereDonationsGo while GET /pages/support is in flight — the three cards
   and the transparency strip in their real markup, every text a
   <SkeletonText /> of the current copy's length. The cards keep the design's
   colours (they are the design's, not the payload's); the bars wait empty. */

const ICONS = [IconLightbulbOutline, IconMicOutline, IconBookOpenOutline];
/** Character counts of the current `fund_allocation` copy, card by card. */
const CARDS = [
  { title: 14, desc: 95 },
  { title: 16, desc: 72 },
  { title: 22, desc: 67 },
];
const BULLETS = [20, 19, 25];

export default function AllocationSkeleton() {
  return (
    <section className="sp-section">
      <div className="container">
        <SkeletonHead title={18} sub={63} />

        <div className="sp-alloc-row">
          {CARDS.map((card, i) => {
            const look = ALLOCATIONS[i];
            const Icon = ICONS[i];
            return (
              <article className="sp-alloc-card" key={i}>
                <span className="sp-alloc-bar" style={{ backgroundColor: look.color }}></span>
                <div className="sp-alloc-box" style={{ borderColor: look.color }}>
                  <div className="sp-alloc-head">
                    <span className="sp-alloc-icon" style={{ backgroundColor: look.tint }}>
                      <Icon />
                    </span>
                    <span className="sp-alloc-pct">
                      <SkeletonText chars={3} />
                    </span>
                  </div>
                  <h3 className="sp-alloc-title">
                    <SkeletonText chars={card.title} />
                  </h3>
                  <p className="sp-alloc-desc">
                    <SkeletonText chars={card.desc} />
                  </p>
                  <ul className="sp-alloc-list">
                    {BULLETS.map((chars, j) => (
                      <li key={j}>
                        <span
                          className="sp-alloc-bullet"
                          style={{ backgroundColor: look.color }}
                        ></span>
                        <span>
                          <SkeletonText chars={chars} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="sp-alloc-foot">
                    <div className="sp-alloc-track" style={{ backgroundColor: look.tint }}></div>
                    <p className="sp-alloc-foot-text">
                      <SkeletonText chars={22} />
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sp-alloc-summary">
          <div className="sp-alloc-summary-ring">
            <svg className="sp-alloc-summary-svg" width="192" height="202" viewBox="0 0 192 202" />
            <div className="sp-alloc-summary-hole">
              <strong className="sp-alloc-summary-total">
                <SkeletonText chars={4} />
              </strong>
              <span className="sp-alloc-summary-caption">
                <SkeletonText chars={13} />
              </span>
            </div>
          </div>

          <div className="sp-alloc-summary-main">
            <h3 className="sp-alloc-summary-title">
              <SkeletonText chars={22} />
            </h3>
            <p className="sp-alloc-summary-sub">
              <SkeletonText chars={86} />
            </p>
            <ul className="sp-alloc-summary-legend">
              {CARDS.map((card, i) => (
                <li key={i}>
                  <span
                    className="sp-alloc-summary-dot"
                    style={{ backgroundColor: ALLOCATIONS[i].color }}
                  ></span>
                  <div>
                    <span className="sp-alloc-summary-name">
                      <SkeletonText chars={card.title} />
                    </span>
                    <span className="sp-alloc-summary-share">
                      <SkeletonText chars={14} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
