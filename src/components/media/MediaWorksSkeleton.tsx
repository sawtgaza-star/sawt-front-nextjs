import "@/styles/media-skeleton.css";

/* The sidebar and the project grid as grey bars, until the payload lands — the
   same bargain as MediaSkeleton, in this page's own `.sm-wp-layout` so the two
   columns are already in place. The banner's own bars live in
   <MediaWorksHero />, which always renders its shell (see the note there). */

function Panel({ rows }: { rows: number }) {
  return (
    <section className="sm-wp-panel">
      <div className="sm-wp-panel-head">
        <span className="smk-line" style={{ width: "88px", height: "18px" }} />
      </div>
      <ul className="sm-wp-opts">
        {Array.from({ length: rows }, (_, i) => (
          <li key={i}>
            <span className="smk-line" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MediaWorksSkeleton() {
  return (
    <section className="sm-wp-body" aria-busy="true" aria-hidden="true">
      <div className="container">
        <div className="sm-wp-layout">
          <aside className="sm-wp-side">
            <Panel rows={5} />
            <Panel rows={3} />
          </aside>

          <div className="sm-wp-grid">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="smk-block" style={{ height: 320 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
