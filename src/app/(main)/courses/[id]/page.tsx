import "@/styles/course.css";
import { notFound } from "next/navigation";
import LegacyInit from "@/components/LegacyInit";
import CourseHero from "@/components/courses/CourseHero";
import CourseRegisterCard from "@/components/courses/CourseRegisterCard";
import CourseShare from "@/components/courses/CourseShare";
import CourseGoals from "@/components/courses/CourseGoals";
import CourseModules from "@/components/courses/CourseModules";
import CourseOutcomes from "@/components/courses/CourseOutcomes";
import CoursePerks from "@/components/courses/CoursePerks";
import CourseRequirements from "@/components/courses/CourseRequirements";
import CourseSelection from "@/components/courses/CourseSelection";
import CourseTrainer from "@/components/courses/CourseTrainer";
import { COURSES } from "@/components/courses/course-data";

/* /courses/[id] — course detail page. Server Component; the countdown, share
   widget and modules accordion are the client leaves. The id picks the course
   out of COURSES (the incubator card slugs + the original mock course);
   unknown ids 404. Layout: olive hero on top, then a [content | aside] grid —
   the aside is pulled up with a negative margin so the registration card
   floats over the hero, exactly as in the mock. */
/* `output: 'export'` needs every dynamic segment pre-listed. */
export function generateStaticParams() {
  return Object.keys(COURSES).map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = COURSES[id];
  if (!course) notFound();

  return (
    <div className="crs-page">
      <LegacyInit page="courses" />
      <CourseHero course={course} />
      <main className="crs-body">
        <div className="container">
          <div className="crs-layout">
            <div className="crs-content">
              <CourseGoals courseId={id} />
              <CourseModules courseId={id} />
              <CourseOutcomes courseId={id} />
              <CoursePerks />
              <CourseRequirements />
              <CourseSelection />
              <CourseTrainer />
            </div>
            <aside className="crs-aside">
              <CourseRegisterCard course={course} />
              <CourseShare />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
