import { localized } from "@/lib/api/pages";
import type { IncubatorCoursesContent } from "@/lib/api/incubator-page";
import CourseCard from "./CourseCard";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { toPopularCourse } from "./popular-courses-data";

/* "دوراتنا الأكثر شهرة" — three-up course row on the page's gray band, from
   the API's `courses` block. #inc-courses is the anchor the navbar's
   "الدورات" link and the hero CTA point at. */
export default function PopularCourses({
  data,
  lang,
}: {
  data?: IncubatorCoursesContent;
  lang: string;
}) {
  const items = Array.isArray(data?.items) ? data.items : [];
  if (!data || !items.length) return null;

  return (
    <section className="inc-courses" id="inc-courses">
      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="inc-course-row">
          {items.map((item, index) => {
            const course = toPopularCourse(item, lang, index);
            return <CourseCard course={course} key={course.key} />;
          })}
        </div>
      </div>
    </section>
  );
}
