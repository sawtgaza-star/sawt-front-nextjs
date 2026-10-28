import SkeletonText from "./SkeletonCopy";
import SkeletonHead from "./SkeletonHead";

/* SupportPartners while GET /pages/support is in flight
   — its real markup, every text a <SkeletonText /> of the current copy's
   length. The logo strip holds the API's one logo per group: its box is the
   size the marquee gives that image (.sp-sk-logo, support-skeleton.css). */

const LOGOS = 1;

export function PartnersSkeleton() {
  const group = Array.from({ length: LOGOS }, (_, i) => <span className="sp-sk-logo" key={i} />);
  return (
    <section className="sp-section">
      <div className="container">
        <SkeletonHead title={20} sub={67} />

        <div className="marquee">
          <div className="marquee-group">{group}</div>
          <div className="marquee-group">{group}</div>
        </div>

        <div className="sp-dark-cta">
          <div>
            <h3 className="sp-dark-cta-title">
              <SkeletonText chars={23} />
            </h3>
            <p className="sp-dark-cta-desc">
              <SkeletonText chars={103} />
            </p>
          </div>
          <a className="sp-btn-green sp-btn-light sp-btn-pill">
            <span>
              <SkeletonText chars={10} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
