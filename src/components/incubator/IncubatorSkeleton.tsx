/* Everything below the hero, as grey bars, until GET /pages/incubator lands.

   It renders inside the real section wrappers rather than a generic box, so
   each placeholder sits where its content will and the page's grounds (the
   gray courses band, the white why band) are already painted. Only the first
   sections are mirrored: what matters is that the scroll doesn't collapse to
   nothing and then snap back when the answer arrives. The bars themselves are
   styles/nav-skeleton.css's, which IncubatorNav already loads. */

function Head() {
  return (
    <div className="inc-section-head">
      <span className="nsk-line" style={{ display: "block", marginInline: "auto", width: "min(380px, 80%)", height: 28 }} />
      <span className="nsk-line" style={{ display: "block", marginInline: "auto", width: "min(560px, 90%)", marginTop: 14 }} />
    </div>
  );
}

function Block({ height }: { height: number }) {
  return <span className="nsk-block" style={{ display: "block", width: "100%", height }} />;
}

export default function IncubatorSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <section className="inc-why">
        <div className="container">
          <div className="inc-why-grid">
            <div className="inc-why-media">
              <Block height={420} />
            </div>
            <div className="inc-why-text">
              <span className="nsk-line" style={{ display: "block", width: "60%", height: 28 }} />
              <span className="nsk-line" style={{ display: "block", width: "100%", marginTop: 18 }} />
              <span className="nsk-line" style={{ display: "block", width: "90%", marginTop: 10 }} />
              <span className="nsk-line" style={{ display: "block", width: "70%", marginTop: 10 }} />
              <div className="inc-why-features" style={{ marginTop: 28 }}>
                {[0, 1, 2, 3].map((index) => (
                  <Block height={64} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inc-courses">
        <div className="container">
          <Head />
          <div className="inc-course-row">
            {[0, 1, 2].map((index) => (
              <Block height={420} key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
