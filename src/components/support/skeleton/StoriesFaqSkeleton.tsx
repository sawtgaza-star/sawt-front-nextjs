import SkeletonText from "./SkeletonCopy";
import { IconChevronDownBold, IconHeartOutline } from "@/components/ui/icons";
import SkeletonHead from "./SkeletonHead";

/* UntoldStories and SupportFaq while GET /pages/support is in flight — their
   real markup, every text a <SkeletonText /> of the current copy's length.
   The story covers are a transparent pixel in the real .rs-card-bg box (its
   aspect-ratio sizes it); the FAQ opens its second item, as the real one does. */

const PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
/** Character counts of the current `stories.items` copy. */
const STORIES = [
  { title: 13, full: 167 },
  { title: 13, full: 167 },
  { title: 10, full: 209 },
];
/** One dot per reachable slide on phones, where the pager shows (1 per view). */
const DOTS = STORIES.length;
/** `faq.items`: question lengths, and the answer of the open (second) one. */
const QUESTIONS = [18, 14, 28, 25, 32];
const OPEN = 1;
const OPEN_ANSWER = 71;

function NavButton({ className }: { className: string }) {
  return (
    <button type="button" tabIndex={-1} className={"sp-stories-nav " + className}>
      <svg width="24" height="24" viewBox="0 0 24 24" />
    </button>
  );
}

export function StoriesSkeleton() {
  return (
    <section className="sp-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SkeletonHead title={25} sub={74} />

        <div className="sp-stories-wrap">
          <NavButton className="sp-stories-prev" />
          <div className="sp-stories-viewport">
            <div className="sp-stories-track">
              {STORIES.map((story, i) => (
                <div className="sp-story-slide" key={i}>
                  <div className="rs-card">
                    <img className="rs-card-bg" src={PIXEL} alt="" />
                    <div className="rs-card-info">
                      <div className="rs-card-text">
                        <span className="rs-badge">
                          <SkeletonText chars={8} />
                        </span>
                        <h5 className="rs-card-title">
                          <SkeletonText chars={story.title} />
                        </h5>
                        <p className="rs-card-desc">
                          <SkeletonText chars={35} />
                        </p>
                        <p className="rs-card-full">
                          <SkeletonText chars={story.full} />
                        </p>
                      </div>
                      <a className="rs-arrow">
                        <i className="fa-solid fa-arrow-left"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <NavButton className="sp-stories-next" />
        </div>

        <div className="sp-stories-dots">
          {Array.from({ length: DOTS }, (_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              className={"sp-stories-dot" + (i === 0 ? " active" : "")}
            ></button>
          ))}
        </div>

        <div className="sp-stories-cta">
          <div className="sp-stories-strip">
            <div>
              <h3 className="sp-stories-strip-title">
                <SkeletonText chars={33} />
              </h3>
              <p className="sp-stories-strip-desc">
                <SkeletonText chars={40} />
              </p>
            </div>
            <a className="sp-btn-green">
              <span>
                <SkeletonText chars={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSkeleton() {
  return (
    <section className="sp-section sp-faq-section" style={{ paddingTop: 0 }}>
      <img src="/assets/images/leaf_cutout.png" className="sp-faq-leaf" alt="" />

      <div className="container">
        <SkeletonHead title={16} />

        <div className="sp-faq-row">
          <div className="sp-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>

          <div className="sp-faq-col">
            {QUESTIONS.map((chars, i) => (
              <div className={"sp-faq-item" + (i === OPEN ? " sp-faq-open" : "")} key={i}>
                <button type="button" tabIndex={-1} className="sp-faq-q">
                  <span>
                    <SkeletonText chars={chars} />
                  </span>
                  <span className="sp-faq-chevron">
                    <IconChevronDownBold />
                  </span>
                </button>
                {i === OPEN && (
                  <div className="sp-faq-a">
                    <span className="sp-faq-a-bar"></span>
                    <p className="sp-faq-a-text">
                      <SkeletonText chars={OPEN_ANSWER} />
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="sp-faq-more">
              <span className="sp-faq-more-icon">
                <IconHeartOutline />
              </span>
              <h3 className="sp-faq-more-title">
                <SkeletonText chars={14} />
              </h3>
              <p className="sp-faq-more-desc">
                <SkeletonText chars={43} />
              </p>
              <a className="sp-btn-green">
                <span>
                  <SkeletonText chars={10} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
