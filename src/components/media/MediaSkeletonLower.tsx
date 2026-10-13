import SkeletonText from "@/components/ui/SkeletonText";
import { IconChevronDownBold, IconChevronLeftSmall, IconRatingStar } from "@/components/ui/icons";
import { IconReviewQuote } from "./media-icons";
import { PACKAGE_TONES, cycle } from "./media-page-view";
import { SkHead } from "./MediaSkeletonParts";

/* The last three sections of /media while GET /pages/media is in flight —
   MediaPackages, MediaTestimonials and MediaFaq, element for element, with
   every string swapped for a <SkeletonText /> of the current copy's length.
   Keep them in step with those components. */

const PACKAGES = {
  pill: 7,
  /** the heading is split at its comma into ink + olive halves (splitHighlight) */
  title: 36,
  titleHl: 10,
  sub: 71,
  cta: 11,
  /** title, tagline, description, then [title, description] per feature */
  items: [
    [18, 25, 46, [[18, 26], [14, 23], [17, 23]]],
    [24, 25, 59, [[11, 21], [13, 11], [18, 14]]],
    [19, 35, 82, [[14, 26], [23, 23], [17, 23], [18, 24], [19, 20]]],
    [19, 24, 71, [[15, 23], [17, 23], [17, 19], [14, 22]]],
  ] as [number, number, number, number[][]][],
  dots: 2,
};
const TESTIMONIALS = {
  pill: 12,
  title: 22,
  sub: 71,
  /** name, role, quote */
  items: [[13, 13, 61], [12, 18, 61], [5, 11, 61]],
  /** the track opens on the second card (useSnapSlider's start) */
  active: 1,
  dots: 3,
};
const FAQ = {
  pill: 15,
  title: 24,
  sub: 29,
  /** question, answer */
  items: [[33, 47], [25, 24], [31, 73], [28, 73]],
  open: 2,
};
const STARS = 5;
const FILLED = 4;

function Pager({ dots, className = "sm-pager" }: { dots: number; className?: string }) {
  return (
    <div className={className}>
      <button type="button" className="sm-pager-arrow" tabIndex={-1}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <span className="sm-pager-dots">
        {Array.from({ length: dots }, (_, i) => (
          <button
            type="button"
            className={"sm-pager-dot" + (i === 0 ? " active" : "")}
            tabIndex={-1}
            key={i}
          ></button>
        ))}
      </span>
      <button type="button" className="sm-pager-arrow" tabIndex={-1}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
    </div>
  );
}

function Packages() {
  return (
    <section className="sm-packages">
      <div className="container">
        <SkHead pill={PACKAGES.pill} title={PACKAGES.title} titleHl={PACKAGES.titleHl} sub={PACKAGES.sub} />
        <div className="sm-pkg-track">
          {PACKAGES.items.map(([title, tagline, description, features], index) => (
            <article className={"sm-pkg sm-pkg-" + cycle(PACKAGE_TONES, index)} key={index}>
              <span className="sm-pkg-tab" aria-hidden="true"></span>
              <div className="sm-pkg-body">
                <h3 className="sm-pkg-title">
                  <SkeletonText chars={title} />
                </h3>
                <p className="sm-pkg-tagline">
                  <SkeletonText chars={tagline} />
                </p>
                <p className="sm-pkg-desc">
                  <SkeletonText chars={description} />
                </p>
                <ul className="sm-pkg-features">
                  {features.map(([name, detail], i) => (
                    <li key={i}>
                      <i aria-hidden="true"></i>
                      <span className="sm-pkg-feature-text">
                        <b>
                          <SkeletonText chars={name} />
                        </b>
                        <small>
                          <SkeletonText chars={detail} />
                        </small>
                      </span>
                    </li>
                  ))}
                </ul>
                <a className="sm-pkg-cta" tabIndex={-1}>
                  <span>
                    <SkeletonText chars={PACKAGES.cta} />
                  </span>
                  <IconChevronLeftSmall />
                </a>
              </div>
            </article>
          ))}
        </div>
        <Pager dots={PACKAGES.dots} />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="sm-testi">
      <div className="container">
        <SkHead pill={TESTIMONIALS.pill} title={TESTIMONIALS.title} sub={TESTIMONIALS.sub} />
      </div>
      <div className="sm-testi-track">
        {TESTIMONIALS.items.map(([name, role, quote], i) => (
          <article
            className={
              "sm-testi-card" +
              (i === TESTIMONIALS.active ? " active" : "") +
              (Math.abs(i - TESTIMONIALS.active) > 1 ? " is-far" : "")
            }
            key={i}
          >
            <span className="sm-testi-avatar">
              <span className="smk-fill smk-avatar" />
              <span className="sm-testi-quote-badge" aria-hidden="true">
                <IconReviewQuote />
              </span>
            </span>
            <div className="sm-testi-stars" aria-hidden="true">
              {Array.from({ length: STARS }, (_, s) => (
                <IconRatingStar key={s} filled={s < FILLED} />
              ))}
            </div>
            <p className="sm-testi-quote">
              <SkeletonText chars={quote} />
            </p>
            <b className="sm-testi-name">
              <SkeletonText chars={name} />
            </b>
            <span className="sm-testi-meta">
              <SkeletonText chars={role} />
            </span>
          </article>
        ))}
      </div>
      <Pager dots={TESTIMONIALS.dots} className="sm-pager sm-pager-olive" />
    </section>
  );
}

function Faq() {
  return (
    <section className="sm-faq">
      <div className="container">
        <SkHead pill={FAQ.pill} title={FAQ.title} sub={FAQ.sub} />
        <div className="sm-faq-row">
          {/* the section's own artwork, not the API's — shown as it is */}
          <div className="sm-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>
          <div className="sm-faq-col">
            {FAQ.items.map(([question, answer], i) => (
              <div className={"sm-faq-item" + (i === FAQ.open ? " sm-faq-open" : "")} key={i}>
                <button type="button" className="sm-faq-q" tabIndex={-1}>
                  <span>
                    <SkeletonText chars={question} />
                  </span>
                  <span className="sm-faq-chevron">
                    <IconChevronDownBold />
                  </span>
                </button>
                {i === FAQ.open ? (
                  <div className="sm-faq-a">
                    <span className="sm-faq-a-bar" aria-hidden="true"></span>
                    <p className="sm-faq-a-text">
                      <SkeletonText chars={answer} />
                    </p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediaSkeletonLower() {
  return (
    <>
      <Packages />
      <Testimonials />
      <Faq />
    </>
  );
}
