import CourseCard from "./CourseCard";
import { POPULAR_COURSES } from "./popular-courses-data";

/* "دوراتنا الأكثر شهرة" — three-up course row on the page's gray band.
   #inc-courses is the anchor the navbar's "الكورسات" link points at. */
export default function PopularCourses() {
  return (
    <section className="inc-courses" id="inc-courses">
      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_courses_title_pre">دوراتنا الأكثر</span>{" "}
            <span className="inc-highlight" data-i18n="inc_courses_title_hl">
              شهرة
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_courses_sub">
            دورات تدريبية شاملة، تعتمد على التطبيق والتنفيذ العملي، نبدأ معك من
            الصفر حتى تصل إلى الاحتراف لتؤهلك كل دورة لسوق العمل وتكون جاهزًا له.
          </p>
        </div>

        <div className="inc-course-row">
          {POPULAR_COURSES.map((c) => (
            <CourseCard course={c} key={c.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
