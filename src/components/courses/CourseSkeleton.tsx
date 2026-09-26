/* The course body, as grey bars, until GET /pages/courses/{slug} lands.

   It renders inside the real layout grid rather than a generic box, so the
   registration card's placeholder already floats over the hero where the card
   will, and the scroll doesn't collapse to nothing and then snap back when the
   answer arrives. The bars are styles/nav-skeleton.css's, which IncubatorNav
   already loads. */

function Block({ height }: { height: number }) {
  return <span className="nsk-block" style={{ display: "block", width: "100%", height }} />;
}

function SectionHead() {
  return (
    <div className="crs-sec-head">
      <span className="nsk-line" style={{ width: 200, height: 24 }} />
    </div>
  );
}

export default function CourseSkeleton() {
  return (
    <div className="crs-layout" aria-busy="true" aria-hidden="true">
      <div className="crs-content">
        <section className="crs-section">
          <SectionHead />
          <div className="crs-goals-grid">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Block height={150} key={index} />
            ))}
          </div>
        </section>
        <section className="crs-section">
          <SectionHead />
          <div className="crs-modules">
            {[0, 1, 2, 3].map((index) => (
              <Block height={56} key={index} />
            ))}
          </div>
        </section>
      </div>
      <aside className="crs-aside">
        <div className="crs-reg">
          <div className="crs-reg-card">
            <Block height={380} />
          </div>
        </div>
      </aside>
    </div>
  );
}
