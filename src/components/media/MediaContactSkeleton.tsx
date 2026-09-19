import { MEDIA_PHOTOS } from "./media-photos";
import "@/styles/media-skeleton.css";

/* "لنبدأ العمل سويا" as grey bars, until the payload lands — the same bargain
   as MediaSkeleton, in this page's own `.sm-ct-row` so the still and the copy
   column are already where they will stay.

   The photo is the design's own, not the payload's (see MediaContactSection),
   so it is drawn for real from the first paint and only the words are bars.
   The banner's own bars live in <MediaContactHero />. */
export default function MediaContactSkeleton() {
  return (
    <section className="sm-ct-body" aria-busy="true">
      <div className="container">
        <div className="sm-ct-row">
          <figure className="sm-ct-photo">
            <img src={MEDIA_PHOTOS.crew} alt="" />
          </figure>

          <div className="sm-ct-copy" aria-hidden="true">
            <span className="smk-title" style={{ width: "min(280px, 70%)" }} />
            <span className="smk-line" style={{ width: "100%", marginTop: "18px" }} />
            <span className="smk-line" style={{ width: "88%", marginTop: "10px" }} />

            <div className="sm-ct-cards" style={{ margin: "26px 0" }}>
              {[0, 1].map((i) => (
                <span key={i} className="smk-block" style={{ height: 92 }} />
              ))}
            </div>

            <span
              className="smk-line"
              style={{ width: "220px", height: "41px", borderRadius: "100px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
