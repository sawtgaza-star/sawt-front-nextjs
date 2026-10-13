import SkeletonText from "@/components/ui/SkeletonText";
import {
  IconArrowUpLeftSolid,
  IconChevronDownBold,
  IconQuoteMarks,
  IconRatingStar,
} from "@/components/ui/icons";
import { SkImg, SkSectionHead } from "./parts";
import { GRADS, JOIN, TESTI } from "./skeleton-data";

/* GraduatesPartners, IncubatorJoin and IncubatorTestimonials (+
   TestimonialsSlider) while loading — their markup, copy swapped for filler. */

function MarqueeGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {GRADS.names.map((chars, index) => (
        <span className="inc-grads-name" key={index}>
          <SkeletonText chars={chars} />
        </span>
      ))}
    </div>
  );
}

export function GradsSkeleton() {
  return (
    <section className="inc-grads">
      <div className="container">
        <SkSectionHead title={GRADS.head[0]} sub={GRADS.head[1]} />
      </div>
      <div className="marquee">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}

export function JoinSkeleton() {
  return (
    <section className="inc-join join-us-section position-relative">
      <div className="join-us-banner">
        <SkImg className="join-us-bg" />
        <div className="join-us-content text-center">
          <h2 className="join-us-title">
            <SkeletonText chars={JOIN.title} />
          </h2>
          <p className="join-us-desc">
            <SkeletonText chars={JOIN.desc} />
          </p>
          <a className="btn btn-dark-green join-us-btn incskel-media">
            <span>
              <SkeletonText chars={JOIN.button} />
            </span>
            <i className="fa-solid fa-angle-left arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="inc-testi">
      <div className="container">
        <div className="inc-testi-wrap">
          <div className="inc-testi-panel">
            <div className="inc-testi-copy">
              <h2 className="inc-testi-title">
                <SkeletonText chars={TESTI.title[0]} />
                <br />
                <span className="inc-highlight">
                  <SkeletonText chars={TESTI.title[1]} />
                </span>
              </h2>
              <p className="inc-testi-sub">
                <SkeletonText chars={TESTI.sub} />
              </p>
              <a className="inc-testi-btn incskel-media">
                <span>
                  <SkeletonText chars={TESTI.viewAll} />
                </span>
                <IconArrowUpLeftSolid />
              </a>
            </div>

            <div className="inc-testi-slider">
              <div className="inc-testi-track">
                {TESTI.cards.map((card, index) => (
                  <article className="inc-testi-card" key={index}>
                    <span className="inc-testi-avatar">
                      <SkImg />
                      <span className="inc-testi-quote-badge" aria-hidden="true">
                        <IconQuoteMarks />
                      </span>
                    </span>
                    <div className="inc-testi-stars" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, star) => (
                        <IconRatingStar key={star} filled />
                      ))}
                    </div>
                    <p className="inc-testi-text">
                      <SkeletonText chars={card.quote} />
                    </p>
                    <button type="button" className="inc-testi-cta" tabIndex={-1}>
                      <span>
                        <SkeletonText chars={TESTI.readMore} />
                      </span>
                      <IconChevronDownBold />
                    </button>
                    <b className="inc-testi-name">
                      <SkeletonText chars={card.name} />
                    </b>
                    <span className="inc-testi-meta">
                      <SkeletonText chars={card.role} />
                    </span>
                  </article>
                ))}
              </div>

              <div className="inc-testi-dots">
                <span className="inc-testi-dots-pill">
                  <button type="button" className="inc-testi-arrow inc-testi-arrow-next" tabIndex={-1}>
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  {[0, 1].map((dot) => (
                    <button
                      type="button"
                      className={"inc-testi-dot" + (dot === 0 ? " active" : "")}
                      tabIndex={-1}
                      key={dot}
                    ></button>
                  ))}
                  <button type="button" className="inc-testi-arrow inc-testi-arrow-prev" tabIndex={-1}>
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
