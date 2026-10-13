import SkeletonText from "@/components/ui/SkeletonText";
import {
  IconClockCheck,
  IconHourglass,
  IconLayers,
  IconRatingStar,
} from "@/components/ui/icons";
import { SkImg, SkSectionHead } from "./parts";
import { COURSES, WHY } from "./skeleton-data";

/* WhyIncubator and PopularCourses (+ CourseCard) while loading — their markup,
   copy swapped for filler. */

const CHIP_ICONS = [IconClockCheck, IconHourglass, IconLayers];

export function WhySkeleton() {
  return (
    <section className="inc-why">
      <div className="container">
        <div className="inc-why-grid">
          <div className="inc-why-media">
            <span className="inc-why-shape-green" aria-hidden="true"></span>
            <span className="inc-why-shape-peach" aria-hidden="true"></span>
            <span className="inc-why-dots" aria-hidden="true"></span>
            <SkImg className="inc-why-img" ratio={WHY.image} />
          </div>

          <div className="inc-why-text">
            <h2 className="inc-section-title inc-why-title">
              <SkeletonText chars={WHY.title} />
            </h2>
            <p className="inc-why-desc">
              <SkeletonText chars={WHY.desc} />
            </p>
            <div className="inc-why-features">
              {WHY.features.map(([title, desc], index) => (
                <div className="inc-why-feature" key={index}>
                  <span className="inc-why-feature-icon incskel-media" aria-hidden="true"></span>
                  <div className="inc-why-feature-body">
                    <h3 className="inc-why-feature-title">
                      <SkeletonText chars={title} />
                    </h3>
                    <p className="inc-why-feature-desc">
                      <SkeletonText chars={desc} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* A running course's card: photo + chips + rating at rest, the description,
   trainer and CTA in the collapsed reveal blocks (popular-courses-data). */
function CourseCardSkeleton({ card }: { card: (typeof COURSES.cards)[number] }) {
  return (
    <article className="inc-course-card">
      <div className="inc-course-inner">
        <div className="inc-course-media">
          <SkImg />
          <span className="inc-course-cat incskel-media">
            <SkeletonText chars={card.category} />
          </span>
        </div>

        <div className="inc-course-body">
          <div className="inc-course-meta">
            {card.chips.map((chars, index) => {
              const Icon = CHIP_ICONS[index];
              return (
                <span className="inc-course-chip" key={index}>
                  <Icon />
                  <span>
                    <SkeletonText chars={chars} />
                  </span>
                </span>
              );
            })}
          </div>

          <div className="inc-course-titlerow">
            <h3 className="inc-course-title">
              <SkeletonText chars={card.title} />
            </h3>
            <div className="inc-course-rating">
              {Array.from({ length: 5 }, (_, index) => (
                <IconRatingStar key={index} filled />
              ))}
            </div>
          </div>

          <div className="inc-course-reveal inc-course-reveal--desc">
            <p className="inc-course-desc">
              <SkeletonText chars={card.desc} />
            </p>
          </div>
          <div className="inc-course-reveal inc-course-reveal--tutor">
            <div className="inc-course-tutor">
              <span className="inc-course-tutor-label">
                <SkeletonText chars={card.tutorLabel} />
              </span>
              <SkImg className="inc-course-tutor-avatar" />
              <b>
                <SkeletonText chars={card.tutor} />
              </b>
            </div>
          </div>
          <div className="inc-course-reveal inc-course-reveal--cta">
            <a className="inc-course-cta incskel-media">
              <span>
                <SkeletonText chars={card.cta} />
              </span>
              <i className="fa-solid fa-angle-left"></i>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CoursesSkeleton() {
  return (
    <section className="inc-courses">
      <div className="container">
        <SkSectionHead title={COURSES.head[0]} sub={COURSES.head[1]} />
        <div className="inc-course-row">
          {COURSES.cards.map((card, index) => (
            <CourseCardSkeleton card={card} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
