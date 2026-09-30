import "@/styles/about-skeleton.css";

/* Everything below the hero, as grey bars, until the payload lands.

   It renders inside the real section wrappers rather than a generic box, so
   each placeholder occupies the space its content will occupy and the page
   doesn't jump when the API answers. The hero's own bars live in <AboutHero />,
   which always renders its <header> (see the note there).

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides, so this is what ships in about.html and what hydration expects. */

function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The centred head every card section starts with: title + subtitle. */
function Head({ titleWidth }: { titleWidth: string }) {
  return (
    <>
      <Line width={titleWidth} className="sk-line-title" />
      <Line width="60%" />
      <Line width="45%" />
    </>
  );
}

/** One card: icon tile, title, three lines of copy. */
function CardBody() {
  return (
    <>
      <span className="sk-circle" />
      <Line width="55%" className="sk-line-title" />
      <Line width="100%" />
      <Line width="100%" />
      <Line width="70%" />
    </>
  );
}

export default function AboutSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      {/* intro */}
      <section>
        <div className="about-sec container" style={{ marginTop: 50, zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 about-sec-content" dir="rtl">
              <Line width="35%" className="sk-line-title" />
              <Line width="100%" />
              <Line width="100%" />
              <Line width="100%" />
              <Line width="80%" />
            </div>
            <div className="col-12 col-lg-6 mt-4 about-sec-img-col">
              <span className="sk-block sk-block-intro" />
            </div>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="core-values-section">
        <div className="container" dir="rtl">
          <div className="text-center core-values-head sk-center">
            <Head titleWidth="45%" />
          </div>
          <div className="row g-4 justify-content-center core-values-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div className="value-card">
                  <CardBody />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the platform */}
      <section className="about-the-platform">
        <div className="about-the-platform-card">
          <div className="about-the-platform-card-inner">
            <div className="row align-items-center g-0" dir="ltr">
              <div className="col-12 col-lg-5 about-the-platform-content">
                <Line width="70%" className="sk-line-title" />
                <Line width="100%" />
                <Line width="100%" />
                <Line width="100%" />
                <Line width="65%" />
              </div>
              <div className="col-12 col-lg-7 about-the-platform-visual">
                <span className="sk-block sk-block-platform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sawt story */}
      <section className="sawt-story-section">
        <div className="container" dir="rtl">
          <div className="text-center sawt-story-head sk-center">
            <Head titleWidth="30%" />
          </div>
          <div className="row g-4 justify-content-center sawt-story-grid">
            {[0, 1, 2].map((i) => (
              <div className="col-12 col-md-6 col-lg-4 sawt-story-grid-col" key={i}>
                <div className="sawt-story-card">
                  <CardBody />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* join us */}
      <section className="join-us-section">
        <span className="sk-block sk-block-join" />
      </section>
    </div>
  );
}

/** The hero's own bars — title + two lines of description, centred. */
export function AboutHeroSkeleton() {
  return (
    <div className="sk-center sk-hero" aria-busy="true" aria-hidden="true">
      <Line width="55%" className="sk-line-title" />
      <Line width="70%" />
      <Line width="50%" />
    </div>
  );
}
