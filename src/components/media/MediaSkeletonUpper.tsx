import SkeletonText from "@/components/ui/SkeletonText";
import { SERVICE_THEMES, WHY_ACCENTS, cycle } from "./media-page-view";
import { SkButton, SkChip, SkHead } from "./MediaSkeletonParts";

/* The first five sections of /media while GET /pages/media is in flight —
   MediaAbout, MediaStats, MediaServices, MediaWhy and MediaProcess, element for
   element, with every string swapped for a <SkeletonText /> of the current
   copy's length and every upload left as its empty frame (`.smk-fill` paints
   it grey). Keep them in step with those components. */

const ABOUT = { pill: 6, title: 26, body: 180, cards: [[6, 74], [7, 77]] };
const STATS = { pill: 18, title: 14, sub: 34, items: [[4, 18], [2, 10], [3, 16], [3, 9], [4, 10]] };
const SERVICES = {
  pill: 7,
  title: 20,
  sub: 38,
  cta: 13,
  /** title, tags — the number, tagline and description are the same length on every card */
  cards: [[17, 27], [16, 41], [17, 41], [13, 41], [19, 41]],
  tagline: 21,
  description: 115,
};
const WHY = { pill: 16, title: 15, sub: 77, cards: [[18, 29], [11, 34], [10, 35], [12, 26], [18, 34]] };
const PROCESS = {
  pill: 8,
  title: 10,
  sub: 48,
  steps: [[10, 52], [14, 40], [11, 44], [16, 53], [17, 55], [20, 55]],
};

function About() {
  return (
    <section className="sm-about">
      <div className="container">
        <div className="sm-about-row">
          <div className="sm-about-copy">
            <SkHead align="start" pill={ABOUT.pill} title={ABOUT.title} />
            <p className="sm-about-desc">
              <SkeletonText chars={ABOUT.body} />
            </p>
            <div className="sm-about-cards">
              {ABOUT.cards.map(([title, text], index) => (
                <article
                  className={"sm-about-card " + (index ? "sm-about-mission" : "sm-about-vision")}
                  key={index}
                >
                  <h3>
                    <i className="sm-about-card-dot" aria-hidden="true"></i>
                    <span>
                      <SkeletonText chars={title} />
                    </span>
                  </h3>
                  <p>
                    <SkeletonText chars={text} />
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="sm-about-collage">
            <SkChip className="sm-chip-about" />
            <span className="sm-about-col sm-about-col-a">
              <span className="sm-about-img sm-about-img-1 smk-fill" />
              <span className="sm-about-img sm-about-img-2 smk-fill" />
            </span>
            <span className="sm-about-col sm-about-col-b">
              <span className="sm-about-img sm-about-img-3 smk-fill" />
              <span className="sm-about-img sm-about-img-4 smk-fill" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="sm-stats">
      <div className="container">
        <div className="sm-stats-panel">
          <SkHead pill={STATS.pill} title={STATS.title} sub={STATS.sub} />
          <div className="sm-stats-row">
            {STATS.items.map(([value, label], index) => (
              <div className="sm-stat" key={index}>
                <p className="sm-stat-value">
                  <SkeletonText chars={value} />
                </p>
                <p className="sm-stat-label">
                  <SkeletonText chars={label} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** MediaServicesSlider's deck, parked on the first card. */
function Services() {
  return (
    <section className="sm-services">
      <div className="container">
        <SkHead pill={SERVICES.pill} title={SERVICES.title} sub={SERVICES.sub} />
        <div className="sm-services-body">
          <div className="sm-services-rail">
            {SERVICES.cards.map((_, i) => (
              <button
                type="button"
                className={"sm-rail-tick" + (i === 0 ? " active" : "")}
                tabIndex={-1}
                key={i}
              ></button>
            ))}
          </div>
          <div className="sm-services-view">
            {SERVICES.cards.map(([title, tags], i) => (
              <div
                className="sm-svc-slide"
                key={i}
                data-state={i === 0 ? "current" : "next"}
                data-adj={i === 1 ? "1" : undefined}
                style={{ zIndex: i + 1 }}
              >
                <article
                  className={
                    "sm-svc sm-svc-" + cycle(SERVICE_THEMES, i) + (i % 2 === 1 ? " sm-svc-reverse" : "")
                  }
                >
                  <div className="sm-svc-copy">
                    <span className="sm-svc-num" aria-hidden="true">
                      <i></i>
                      <SkeletonText chars={2} />
                    </span>
                    <h3 className="sm-svc-title">
                      <SkeletonText chars={title} />
                    </h3>
                    <p className="sm-svc-tagline">
                      <SkeletonText chars={SERVICES.tagline} />
                    </p>
                    <div className="sm-svc-tags">
                      <span className="sm-svc-tag">
                        <SkeletonText chars={tags} />
                      </span>
                    </div>
                    <p className="sm-svc-desc">
                      <SkeletonText chars={SERVICES.description} />
                    </p>
                    <SkButton
                      className="sm-btn-green sm-svc-btn"
                      chars={SERVICES.cta}
                      icon="fa-arrow-left-long"
                    />
                  </div>
                  <div className="sm-svc-media smk-fill"></div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** MediaWhy — the set twice, as the looping strip renders it. */
function Why() {
  const cards = [...WHY.cards, ...WHY.cards];
  return (
    <section className="sm-why">
      <div className="container">
        <SkHead align="start" pill={WHY.pill} title={WHY.title} sub={WHY.sub} />
      </div>
      <div className="sm-why-strip">
        {cards.map(([title, description], index) => (
          <article
            className="sm-why-card"
            style={{ "--sm-why-accent": cycle(WHY_ACCENTS, index % WHY.cards.length) } as React.CSSProperties}
            key={index}
          >
            <i className="sm-why-dot" aria-hidden="true"></i>
            <span className="sm-why-icon">
              {/* an empty <svg>, so `.sm-why-icon svg` gives it the icon's box at
                  every breakpoint */}
              <svg className="smk-fill smk-why-icon" aria-hidden="true" />
            </span>
            <h3 className="sm-why-card-title">
              <SkeletonText chars={title} />
            </h3>
            <p className="sm-why-card-desc">
              <SkeletonText chars={description} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="sm-process">
      <span className="sm-process-glow sm-process-glow-a" aria-hidden="true"></span>
      <span className="sm-process-glow sm-process-glow-b" aria-hidden="true"></span>
      <div className="container">
        <SkHead pill={PROCESS.pill} title={PROCESS.title} sub={PROCESS.sub} />
      </div>
      <div className="sm-process-scroll">
        <div className="sm-process-track">
          <span className="sm-process-line" aria-hidden="true"></span>
          {PROCESS.steps.map(([title, description], i) => (
            <div className={"sm-process-step " + (i % 2 === 0 ? "sm-step-up" : "sm-step-down")} key={i}>
              <article className="sm-step-card">
                <span className="sm-step-watermark" aria-hidden="true"></span>
                <h3 className="sm-step-title">
                  <SkeletonText chars={title} />
                </h3>
                <p className="sm-step-desc">
                  <SkeletonText chars={description} />
                </p>
              </article>
              <span className="sm-step-node" aria-hidden="true"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MediaSkeletonUpper() {
  return (
    <>
      <About />
      <Stats />
      <Services />
      <Why />
      <Process />
    </>
  );
}
