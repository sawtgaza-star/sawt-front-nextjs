import SkeletonText from "./SkeletonCopy";
import SkeletonHead from "./SkeletonHead";

/* SupportPartners and IncubatorCourses while GET /pages/support is in flight
   — their real markup, every text a <SkeletonText /> of the current copy's
   length. The logo strip holds the API's one logo per group: its box is the
   size the marquee gives that image (.sp-sk-logo, support-skeleton.css). */

/** Character counts of the current `sponsor.packages` copy. */
const COURSES = [
  { title: 13, desc: 50, cta: 41 },
  { title: 12, desc: 46, cta: 40 },
  { title: 10, desc: 46, cta: 38 },
  { title: 13, desc: 43, cta: 41 },
];
const LOGOS = 1;

export function PartnersSkeleton() {
  const group = Array.from({ length: LOGOS }, (_, i) => <span className="sp-sk-logo" key={i} />);
  return (
    <section className="sp-section">
      <div className="container">
        <SkeletonHead title={20} sub={67} />

        <div className="marquee">
          <div className="marquee-group">{group}</div>
          <div className="marquee-group">{group}</div>
        </div>

        <div className="sp-dark-cta">
          <div>
            <h3 className="sp-dark-cta-title">
              <SkeletonText chars={23} />
            </h3>
            <p className="sp-dark-cta-desc">
              <SkeletonText chars={103} />
            </p>
          </div>
          <a className="sp-btn-green sp-btn-light sp-btn-pill">
            <span>
              <SkeletonText chars={10} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function CoursesSkeleton() {
  return (
    <section className="sp-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SkeletonHead title={29} sub={83} />

        <div className="sp-course-row">
          {COURSES.map((course, i) => (
            <article className="sp-course-card" key={i}>
              <h3 className="sp-course-title">
                <SkeletonText chars={course.title} />
              </h3>
              <p className="sp-course-desc">
                <SkeletonText chars={course.desc} />
              </p>
              <div className="sp-course-meta">
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" />
                  <SkeletonText chars={8} />
                </span>
                <span>
                  <SkeletonText chars={7} />
                </span>
              </div>
              <a className="sp-btn-green sp-btn-block">
                <span>
                  <SkeletonText chars={course.cta} />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
