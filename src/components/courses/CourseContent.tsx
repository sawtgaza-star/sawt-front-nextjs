"use client";
/* The only data boundary on /courses/[id]: one request for the whole course
   (GET /pages/courses/{slug}) and one `lang` subscription, both handed down as
   props so the sections stay plain functions of their own block.

   The page has no copy of its own — every word about the course comes from
   the payload. So the first render, server prerender and hydration alike,
   shows the hero's frame with bars in it plus <CourseSkeleton />; they give
   way to the real thing when the response lands, or to a page that is just
   its hero if the request fails — see lib/api/use-course.

   <CourseHero /> is outside the loading branch on purpose: <IncubatorNav />
   lives inside it and its `.language-btn` is bound once by initTranslate().

   Layout: olive hero on top, then a [content | aside] grid — the aside is
   pulled up with a negative margin so the registration card floats over the
   hero, exactly as in the mock. */

import { useEffect } from "react";
import { localized } from "@/lib/api/pages";
import { useCourse } from "@/lib/api/use-course";
import { useLang } from "@/lib/use-lang";
import CourseHero from "./CourseHero";
import CourseRegisterCard from "./CourseRegisterCard";
import CourseShare from "./CourseShare";
import CourseGoals from "./CourseGoals";
import CourseModules from "./CourseModules";
import CourseOutcomes from "./CourseOutcomes";
import CoursePerks from "./CoursePerks";
import CourseRequirements from "./CourseRequirements";
import CourseSelection from "./CourseSelection";
import CourseTrainer from "./CourseTrainer";
import CourseSkeleton from "./CourseSkeleton";

export default function CourseContent({ slug }: { slug: string }) {
  const { course, loading } = useCourse(slug);
  const { lang } = useLang();

  const title = course ? localized(course.title, lang) : "";

  /* The export's <title> was baked at build time in Arabic; follow the
     reader's language once the course is known. */
  useEffect(() => {
    if (title) document.title = `${title} | Sawt Incubator`;
  }, [title]);

  const copy = course
    ? {
        title,
        category: localized(course.category?.name, lang),
        desc: localized(course.description, lang),
      }
    : null;

  return (
    <>
      <CourseHero copy={copy} loading={loading} />
      <main className="crs-body">
        <div className="container">
          {loading ? (
            <CourseSkeleton />
          ) : course ? (
            <div className="crs-layout">
              <div className="crs-content">
                <CourseGoals items={course.objectives} lang={lang} />
                <CourseModules items={course.modules} lang={lang} />
                <CourseOutcomes
                  before={course.outcomes?.before}
                  after={course.outcomes?.after}
                  lang={lang}
                />
                <CoursePerks items={course.benefits} lang={lang} />
                <CourseRequirements items={course.requirements} lang={lang} />
                <CourseSelection items={course.selection_steps} lang={lang} />
                <CourseTrainer trainer={course.trainer} lang={lang} />
              </div>
              <aside className="crs-aside">
                <CourseRegisterCard course={course} slug={slug} lang={lang} />
                <CourseShare />
              </aside>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
