import {
  IconClockCheck,
  IconHourglass,
  IconLayers,
  IconRatingStar,
} from "@/components/ui/icons";
import type { PopularCourse } from "./popular-courses-data";

const CHIP_ICONS = {
  duration: IconClockCheck,
  hours: IconHourglass,
  level: IconLayers,
} as const;

const STARS_TOTAL = 5;

/* One "دوراتنا الأكثر شهرة" card. Every block is optional so the same component
   covers the mock's three states (see popular-courses-data.ts). */
export default function CourseCard({ course }: { course: PopularCourse }) {
  return (
    <article
      className={`inc-course-card${course.featured ? " is-featured" : ""}`}
    >
      {/* full-card overlay link to the course detail page; the CTA sits above
          it (z-index) so it stays independently clickable */}
      <a
        className="inc-course-link"
        href={course.href}
        aria-label={course.title}
      ></a>

      {course.image && (
        <div className="inc-course-media">
          <img src={course.image} alt="" />
          {course.category && (
            <span className="inc-course-cat" data-i18n={course.categoryKey}>
              {course.category}
            </span>
          )}
          {course.soon && (
            <span className="inc-course-soon" data-i18n="inc_course_soon">
              قريبًا
            </span>
          )}
        </div>
      )}

      <div className="inc-course-body">
        {course.meta && (
          <div className="inc-course-meta">
            {course.meta.map((m) => {
              const Icon = CHIP_ICONS[m.icon];
              return (
                <span className="inc-course-chip" key={m.icon}>
                  <Icon />
                  <span data-i18n={m.valueKey}>{m.value}</span>
                </span>
              );
            })}
          </div>
        )}

        <h3 className="inc-course-title" data-i18n={course.titleKey}>
          {course.title}
        </h3>

        {course.rating !== undefined && (
          <div
            className="inc-course-rating"
            aria-label={`${course.rating} من ${STARS_TOTAL}`}
          >
            {Array.from({ length: STARS_TOTAL }, (_, i) => (
              <IconRatingStar key={i} filled={i < course.rating!} />
            ))}
          </div>
        )}

        {course.desc && (
          <p className="inc-course-desc" data-i18n={course.descKey}>
            {course.desc}
          </p>
        )}

        {course.tutor && (
          <div className="inc-course-tutor">
            <span className="inc-course-tutor-label" data-i18n="inc_course_tutor">
              المدرب:
            </span>
            <img
              className="inc-course-tutor-avatar"
              src={course.tutor.avatar}
              alt=""
            />
            <b data-i18n={course.tutor.nameKey}>{course.tutor.name}</b>
          </div>
        )}

        {course.cta && (
          <a className="inc-course-cta" href={course.cta.href}>
            <span data-i18n={course.cta.labelKey}>{course.cta.label}</span>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        )}
      </div>
    </article>
  );
}
