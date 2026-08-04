import CourseCountdown from "./CourseCountdown";
import type { Course } from "./course-data";

/* The white floating registration card — countdown, course facts and the
   subscribe CTA. An orange rounded tab (::before on .crs-reg) peeks out
   behind the card's top edge, as in the mock. */
export default function CourseRegisterCard({ course }: { course: Course }) {
  return (
    <div className="crs-reg">
      <div className="crs-reg-card">
        <p className="crs-reg-kicker" data-i18n="crs_reg_ends_in">
          ينتهي التسجيل في
        </p>
        <p className="crs-reg-title" data-i18n={course.titleKey}>
          {course.title}
        </p>

        <CourseCountdown deadline={course.registrationEndsAt} />

        <ul className="crs-reg-meta">
          {course.meta.map((row) => (
            <li key={row.key}>
              <span data-i18n={row.labelKey}>{row.label}</span>
              <b data-i18n={row.valueKey}>{row.value}</b>
            </li>
          ))}
        </ul>

        <a className="crs-btn-green" href="#">
          <span data-i18n="crs_subscribe">اشترك الآن</span>
          <i className="fa-solid fa-angle-left"></i>
        </a>
      </div>
    </div>
  );
}
