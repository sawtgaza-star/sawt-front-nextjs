import SkeletonText from "@/components/ui/SkeletonText";
import { blank } from "./sk-utils";

/* CreatorsFaq while GET /pages/creators is in flight: the same headings,
   question rows (the second one open, as the real accordion starts) and image
   panel, with each text swapped for a <SkeletonText /> and the picture for a
   blank <img> of the current image's proportions. Keep it in step with
   CreatorsFaq. */

/** Character counts (~1.25x the current `faq` copy) and the image's size. */
const LEN = { mobileTitle: 20, title: 45, subtitle: 54, answer: 165 };
const QUESTIONS = [40, 40, 40, 40];
const OPEN = 1;
const IMAGE = { width: 614, height: 618 };

export default function FaqSkeleton() {
  return (
    <section className="cr-faq-section">
      <div className="container">
        <div className="cr-section-head cr-section-head-qs">
          <h2 className="cr-section-title cr-faq-title-mobile">
            <SkeletonText chars={LEN.mobileTitle} />
          </h2>
          <h2 className="cr-section-title cr-faq-title-desktop">
            <SkeletonText chars={LEN.title} />
          </h2>
          <p className="cr-section-sub">
            <SkeletonText chars={LEN.subtitle} />
          </p>
        </div>

        <div className="cr-faq-row">
          <div className="cr-faq-col">
            {QUESTIONS.map((chars, i) => (
              <div className={"cr-faq-item" + (i === OPEN ? " cr-faq-open" : "")} key={i}>
                <div className="cr-faq-q">
                  <span>
                    <SkeletonText chars={chars} />
                  </span>
                  <i className="fa-solid fa-chevron-down cr-faq-chevron"></i>
                </div>
                {i === OPEN ? (
                  <div className="cr-faq-a">
                    <SkeletonText chars={LEN.answer} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="cr-faq-visual">
            <div className="cr-faq-visual-wrap">
              <img className="sk-shimmer" src={blank(IMAGE.width, IMAGE.height)} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
