import SkeletonText from "./SkeletonCopy";
import {
  IconCalendarDays,
  IconCheckMark,
  IconCircleCheck,
  IconDollarCircle,
  IconHeartOutline,
  IconRotate,
} from "@/components/ui/icons";
import SkeletonHead from "./SkeletonHead";

/* DonateSection + DonateForm while GET /pages/support is in flight: the same
   card, tabs, amount pills, fields and side column, every text a
   <SkeletonText /> of the current copy's length. The monthly tab is the one
   the API flags as default, so its renewal line is drawn too. */

/** Character counts of the current copy (`plans` / `impact` blocks). */
const TABS = [
  { Icon: IconHeartOutline, label: 10, sub: 18 },
  { Icon: IconCalendarDays, label: 4, sub: 16, active: true },
  { Icon: IconRotate, label: 4, sub: 13 },
];
const AMOUNTS = 4;
const PLEDGES = [30, 28, 25, 32];
const LEN = {
  title: 17,
  sub: 76,
  chooseAmount: 11,
  amount: 4,
  customAmount: 12,
  renew: 33,
  submit: 12,
  pledgeTitle: 13,
  quote: 64,
  author: 8,
  place: 11,
};

export default function DonateSkeleton() {
  return (
    <section className="sp-section sp-donate-section">
      <div className="container">
        <SkeletonHead title={LEN.title} sub={LEN.sub} />

        <div className="sp-donate-row">
          <div className="sp-donate-col-form">
            <div className="sp-donate-card">
              <div className="sp-tabs">
                {TABS.map(({ Icon, label, sub, active }, i) => (
                  <button
                    key={i}
                    type="button"
                    tabIndex={-1}
                    className={"sp-tab" + (active ? " active" : "")}
                  >
                    <i className="sp-tab-icon">
                      <Icon />
                    </i>
                    <span className="sp-tab-label">
                      <SkeletonText chars={label} />
                    </span>
                    <span className="sp-tab-sub">
                      <SkeletonText chars={sub} />
                    </span>
                  </button>
                ))}
              </div>

              <div className="sp-donate-body">
                <label className="sp-field-label">
                  <SkeletonText chars={LEN.chooseAmount} />
                </label>
                <div className="sp-amounts">
                  {Array.from({ length: AMOUNTS }, (_, i) => (
                    <button key={i} type="button" tabIndex={-1} className="sp-amount">
                      <SkeletonText chars={LEN.amount} />
                    </button>
                  ))}
                </div>

                <label className="sp-field-label">
                  <SkeletonText chars={LEN.customAmount} />
                </label>
                <div className="sp-custom-wrap">
                  <input className="sp-custom-input" readOnly tabIndex={-1} />
                  <span className="sp-custom-icon">
                    <IconDollarCircle />
                  </span>
                </div>

                <div className="sp-renew">
                  <span className="sp-renew-box">
                    <IconCheckMark />
                  </span>
                  <span>
                    <SkeletonText chars={LEN.renew} />
                  </span>
                </div>

                <button type="button" tabIndex={-1} className="sp-btn-green sp-btn-block">
                  <SkeletonText chars={LEN.submit} />
                </button>
              </div>
            </div>
          </div>

          <div className="sp-donate-col-side">
            <div className="sp-pledge">
              <h3 className="sp-pledge-title">
                <SkeletonText chars={LEN.pledgeTitle} />
              </h3>
              <ul className="sp-pledge-list">
                {PLEDGES.map((chars, i) => (
                  <li key={i}>
                    <i className="sp-pledge-check">
                      <IconCircleCheck />
                    </i>
                    <span>
                      <SkeletonText chars={chars} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="sp-quote">
              <blockquote className="sp-quote-text">
                <SkeletonText chars={LEN.quote} />
              </blockquote>
              <figcaption className="sp-quote-foot">
                <span className="sp-quote-logo">
                  <img src="/assets/images/swat.png" alt="" />
                </span>
                <div>
                  <div className="sp-quote-name">
                    <SkeletonText chars={LEN.author} />
                  </div>
                  <div className="sp-quote-place">
                    <SkeletonText chars={LEN.place} />
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
