import "@/styles/media-skeleton.css";

/* Everything below the hero, as grey bars, until the payload lands.

   It renders inside the real section wrappers rather than a generic box, so
   each placeholder sits where its content will and the page's grounds (the
   grey stats panel, the olive process band) are already painted. The hero's
   own bars live in <MediaHero />, which always renders its frame — see the
   note there for why.

   Not every one of the twelve sections is mirrored: the long ones carry the
   page's height, so those are the ones drawn. What matters is that the scroll
   doesn't collapse to nothing and then snap back when the answer arrives. */

function Line({ width, className = "smk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The pill + heading + one-liner every section opens with. */
function Head({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <div className={"smk-head" + (align === "start" ? " smk-head-start" : "")}>
      <span className="smk-pill" />
      <Line width="min(420px, 80%)" className="smk-title" />
      <Line width="min(560px, 90%)" />
    </div>
  );
}

function Card({ height }: { height: number }) {
  return (
    <div>
      <span className="smk-block" style={{ height }} />
    </div>
  );
}

export default function MediaSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      {/* about — copy column beside the four-photo collage */}
      <section className="sm-about">
        <div className="container">
          <div className="sm-about-row">
            <div className="sm-about-copy">
              <Head align="start" />
              <Line width="100%" />
              <Line width="100%" />
              <Line width="70%" />
              <div className="smk-row" style={{ marginTop: 28 }}>
                <Card height={120} />
                <Card height={120} />
              </div>
            </div>
            <div className="sm-about-collage">
              <span className="smk-block" style={{ height: 422 }} />
            </div>
          </div>
        </div>
      </section>

      {/* stats — the soft-grey panel, heading included */}
      <section className="sm-stats">
        <div className="container">
          <div className="sm-stats-panel">
            <Head />
            <div className="smk-row">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ flex: "1 1 120px" }}>
                  <Line width="70%" className="smk-title" />
                  <Line width="90%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* services — one card of the deck */}
      <section className="sm-services">
        <div className="container">
          <Head />
          <span className="smk-block" style={{ height: 420 }} />
        </div>
      </section>

      {/* why — the card strip that bleeds past the container */}
      <section className="sm-why">
        <div className="container">
          <Head align="start" />
          <div className="smk-row">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} height={250} />
            ))}
          </div>
        </div>
      </section>

      {/* methodology — the six-step timeline */}
      <section className="sm-process">
        <div className="container">
          <Head />
          <div className="smk-row">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} height={170} />
            ))}
          </div>
        </div>
      </section>

      {/* works — the three drifting columns */}
      <section className="sm-works">
        <div className="container">
          <Head />
          <div className="smk-row">
            {[0, 1, 2].map((i) => (
              <Card key={i} height={430} />
            ))}
          </div>
        </div>
      </section>

      {/* audiences, then the booking block */}
      <section className="sm-sectors">
        <div className="container">
          <Head />
          <div className="smk-row">
            {[0, 1, 2].map((i) => (
              <Card key={i} height={380} />
            ))}
          </div>
        </div>
      </section>

      <section className="sm-consult">
        <div className="container">
          <div className="sm-consult-row">
            <div className="sm-consult-copy">
              <Head align="start" />
              <Line width="100%" />
              <Line width="80%" />
            </div>
            <span className="smk-block" style={{ height: 520 }} />
          </div>
        </div>
      </section>

      {/* packages, then the client quotes */}
      <section className="sm-packages">
        <div className="container">
          <Head />
          <div className="smk-row">
            {[0, 1, 2].map((i) => (
              <Card key={i} height={480} />
            ))}
          </div>
        </div>
      </section>

      <section className="sm-testi">
        <div className="container">
          <Head />
          <div className="smk-row">
            {[0, 1, 2].map((i) => (
              <Card key={i} height={320} />
            ))}
          </div>
        </div>
      </section>

      {/* faq — visual beside the questions */}
      <section className="sm-faq">
        <div className="container">
          <Head />
          <div className="sm-faq-row">
            <div className="sm-faq-visual">
              <span className="smk-block" style={{ height: 360 }} />
            </div>
            <div className="sm-faq-col">
              {[0, 1, 2, 3].map((i) => (
                <Line key={i} width="100%" className="smk-title" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
