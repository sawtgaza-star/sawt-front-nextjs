import SkeletonText from "@/components/ui/SkeletonText";
import { IconCircleCheck } from "@/components/ui/icons";
import { SkProjectCta, SkProjectHead, SkTile } from "./MediaSkeletonParts";
import "@/styles/media-skeleton.css";

/* Everything below the banner while GET /pages/media/services/{slug} is in
   flight — MediaServiceGallery, MediaServiceIncludes, MediaServiceWorks and
   MediaProjectCta, in their own elements and classes, with the copy swapped
   for <SkeletonText /> and the stills left as empty frames. The counts are the
   current payload's (professional-photography); other services differ a little
   in copy, not in shape. The banner's own bars live in <MediaServiceHero />,
   which always renders its shell (see the note there). */
const SHOTS = 4;
const OPENING_SLIDE = 1;
const INCLUDES = { title: 16, body: 115, items: [42, 41, 39] };
const WORKS = { title: 16, items: 3, more: 10 };

function Pager({ dots }: { dots: number }) {
  return (
    <div className="sm-pager sm-pager-olive">
      <button type="button" className="sm-pager-arrow" tabIndex={-1}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <span className="sm-pager-dots">
        {Array.from({ length: dots }, (_, i) => (
          <button
            type="button"
            className={"sm-pager-dot" + (i === OPENING_SLIDE ? " active" : "")}
            tabIndex={-1}
            key={i}
          ></button>
        ))}
      </span>
      <button type="button" className="sm-pager-arrow" tabIndex={-1}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
    </div>
  );
}

export default function MediaServiceSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <section className="sm-sv-gallery">
        <div className="container">
          <SkProjectHead chars={17} dot="orange" />
        </div>
        <div className="sm-sv-track">
          {Array.from({ length: SHOTS }, (_, i) => (
            <figure className={"sm-sv-shot smk-fill" + (i === OPENING_SLIDE ? " active" : "")} key={i} />
          ))}
        </div>
        <Pager dots={SHOTS} />
      </section>

      <div className="container sm-sv-body">
        <section className="sm-sv-includes">
          <SkProjectHead chars={INCLUDES.title} dot="orange" />
          <p className="sm-sv-text">
            <SkeletonText chars={INCLUDES.body} />
          </p>
          <div className="sm-sv-features">
            {INCLUDES.items.map((chars, index) => (
              <span className="sm-sv-feature" key={index}>
                <IconCircleCheck />
                <span>
                  <SkeletonText chars={chars} />
                </span>
              </span>
            ))}
          </div>
        </section>

        <section className="sm-sv-works">
          <SkProjectHead chars={WORKS.title} dot="orange" />
          <div className="sm-sv-grid">
            {Array.from({ length: WORKS.items }, (_, i) => (
              <SkTile key={i} />
            ))}
          </div>
          <div className="sm-sv-more">
            <a className="sm-btn-outline" tabIndex={-1}>
              <span>
                <SkeletonText chars={WORKS.more} />
              </span>
            </a>
          </div>
        </section>
      </div>

      <SkProjectCta />
    </div>
  );
}
