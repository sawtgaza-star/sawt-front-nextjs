import "@/styles/media-skeleton.css";

/* Everything below the banner, as grey bars, until the payload lands — the
   same bargain as MediaSkeleton, in this page's own section wrappers so the
   intro row and the tab body are already held open. The banner's own bars live
   in <MediaProjectHero />, which always renders its shell (see the note
   there). */

function Line({ width, className = "smk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

export default function MediaWorkSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <section className="sm-pj-intro">
        <div className="container">
          <div className="sm-pj-intro-row">
            <div className="sm-pj-intro-copy">
              <div className="smk-row" style={{ justifyContent: "flex-start" }}>
                <span className="smk-pill" style={{ width: "120px" }} />
                <span className="smk-pill" style={{ width: "80px" }} />
              </div>
              <Line width="min(360px, 70%)" className="smk-title" />
              <Line width="100%" />
              <Line width="85%" />
              <div className="smk-row" style={{ marginTop: 24 }}>
                <span className="smk-block" style={{ height: 96 }} />
                <span className="smk-block" style={{ height: 96 }} />
              </div>
            </div>
            <figure className="sm-pj-shot">
              <span className="smk-block" style={{ height: 380 }} />
            </figure>
          </div>
        </div>
      </section>

      <section className="sm-pj-body">
        <div className="container">
          <div className="sm-pj-tabs">
            {[0, 1, 2].map((i) => (
              <span key={i} className="smk-pill" style={{ width: "110px" }} />
            ))}
          </div>

          <div className="sm-pj-panel">
            <Line width="min(220px, 50%)" className="smk-title" />
            <Line width="100%" />
            <Line width="100%" />
            <Line width="70%" />
            <div className="smk-row" style={{ marginTop: 28 }}>
              <span className="smk-block" style={{ height: 200 }} />
              <span className="smk-block" style={{ height: 200 }} />
            </div>
            <div className="smk-row" style={{ marginTop: 28 }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="smk-block" style={{ height: 220 }} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
