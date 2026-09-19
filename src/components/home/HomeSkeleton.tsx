import "@/styles/home-skeleton.css";

/* Everything the home page shows while GET /pages/home is in flight.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides, so this is what ships in index.html and what hydration expects.

   The hero's own bars and the stats bar live in <HeroHeader />, which always
   renders its <header> (SiteNav is in there — see the note on that file); the
   default export covers everything below it.

   None of the card rows here is an `.owl-carousel`. See home-skeleton.css. */

function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The centred head a section starts with: title + one or two lines under it. */
function Head({ titleWidth }: { titleWidth: string }) {
  return (
    <>
      <Line width={titleWidth} className="sk-line-title" />
      <Line width="55%" />
    </>
  );
}

/** A row of `count` card silhouettes, `col` wide each at the lg breakpoint. */
function CardRow({
  count,
  col,
  card = "sk-card",
}: {
  count: number;
  col: string;
  card?: string;
}) {
  return (
    <div className="row g-4">
      {Array.from({ length: count }, (_, i) => (
        <div className={col} key={i}>
          <span className={`sk-block ${card}`} />
        </div>
      ))}
    </div>
  );
}

/** The hero slide, held at its full 100vh while the photo is unknown. */
export function HeroSlideSkeleton() {
  return (
    <div className="carousel-item active sk-hero-slide" aria-busy="true" aria-hidden="true">
      <div className="sk-hero-copy sk-center text-center">
        <Line width="40%" />
        <Line width="60%" className="sk-line-title" />
        <Line width="80%" />
      </div>
    </div>
  );
}

/** The five figures of the stats bar, in the columns they will occupy. */
export function StatsBarSkeleton() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div className="col sk-stat" key={i} aria-busy="true" aria-hidden="true">
          <span className="sk-circle" />
          <Line width="60px" className="sk-line-title" />
          <Line width="80px" />
        </div>
      ))}
    </>
  );
}

export default function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      {/* who we are */}
      <section className="sout-section py-5">
        <div className="container">
          <div className="text-center sk-center" style={{ marginBottom: "70px" }}>
            <Head titleWidth="20%" />
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 mt-2 order-lg-2">
              <span className="sk-block sk-block-sout" />
            </div>
            <div className="col-lg-6 mt-5 order-lg-1">
              <Line width="70%" className="sk-line-title" />
              <Line width="100%" />
              <Line width="100%" />
              <Line width="85%" />
            </div>
          </div>
        </div>
      </section>

      {/* latest news */}
      <section className="latest-news py-5">
        <div className="container">
          <div className="text-center mb-5 sk-center">
            <Head titleWidth="35%" />
          </div>
          <CardRow count={3} col="col-12 col-md-6 col-lg-4" />
        </div>
      </section>

      {/* content creators */}
      <section className="content-section my-5">
        <div className="container">
          <div className="text-center mb-5 sk-center">
            <Head titleWidth="45%" />
          </div>
          <CardRow count={4} col="col-6 col-lg-3" card="sk-card-creator" />
        </div>
      </section>

      {/* platform sections */}
      <section className="platform-sections py-5">
        <div className="container">
          <div className="text-center mb-5 sk-center">
            <Head titleWidth="30%" />
          </div>
          <CardRow count={3} col="col-md-4" />
        </div>
      </section>

      {/* partners */}
      <section className="mt-3">
        <div className="container">
          <div className="text-center mb-4 sk-center">
            <Head titleWidth="35%" />
          </div>
          <CardRow count={5} col="col" card="sk-logo" />
        </div>
      </section>

      {/* real stories */}
      <section className="real-stories-section py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7 order-2 order-lg-2">
              <CardRow count={2} col="col-md-6" card="sk-card-story" />
            </div>
            <div className="col-lg-5 order-1 order-lg-1">
              <Line width="80%" className="sk-line-title" />
              <Line width="100%" />
              <Line width="70%" />
            </div>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="team-section text-center">
        <div className="container">
          <div className="sk-center">
            <Head titleWidth="30%" />
          </div>
          <CardRow count={4} col="col-6 col-lg-3" card="sk-card-team" />
        </div>
      </section>

      {/* join us */}
      <section className="join-us-section">
        <span className="sk-block sk-block-join" />
      </section>

      {/* reviews */}
      <section className="stories-section reviews-section">
        <div className="reviews-inner">
          <span className="sk-block sk-block-reviews" />
        </div>
      </section>
    </div>
  );
}
