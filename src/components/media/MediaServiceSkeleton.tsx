import "@/styles/media-skeleton.css";

/* Everything below the banner, as grey bars, until the payload lands — the
   same bargain as MediaSkeleton, in this page's own section wrappers so the
   coverflow's height and the three-tile row are already held open. The
   banner's own bars live in <MediaServiceHero />, which always renders its
   shell (see the note there). */

function Line({ width, className = "smk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

function Head() {
  return <Line width="min(260px, 60%)" className="smk-title" />;
}

export default function MediaServiceSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      {/* the coverflow */}
      <section className="sm-sv-gallery">
        <div className="container">
          <Head />
          <span className="smk-block" style={{ height: 420 }} />
        </div>
      </section>

      <div className="container sm-sv-body">
        {/* ماذا تشمل الخدمة */}
        <section className="sm-sv-includes">
          <Head />
          <Line width="100%" />
          <Line width="90%" />
          <div className="smk-row" style={{ marginTop: 24 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="smk-block" style={{ height: 52 }} />
            ))}
          </div>
        </section>

        {/* نماذج من أعمالنا */}
        <section className="sm-sv-works">
          <Head />
          <div className="smk-row">
            {[0, 1, 2].map((i) => (
              <span key={i} className="smk-block" style={{ height: 320 }} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
