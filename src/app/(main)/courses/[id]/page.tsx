/* incubator.css first: the hero reuses the incubator navbar (.inc-nav*), and
   every rule in that file is `inc-` namespaced so it can't touch `crs-`. */
import "@/styles/incubator.css";
import "@/styles/course.css";
import type { Metadata } from "next";
import LegacyInit from "@/components/LegacyInit";
import CourseContent from "@/components/courses/CourseContent";
import { fetchCourse, fetchCourseSlugs } from "@/lib/api/courses";
import { localized } from "@/lib/api/pages";

/* The segment is the course's slug — what GET /pages/courses lists and what
   the incubator's course cards link to.

   The build only reads the course list to learn which pages exist, because
   `output: 'export'` pre-lists every dynamic segment; a course added after the
   deploy therefore needs a rebuild before its URL exists. Same shape as
   /media/works/[slug]. */
export async function generateStaticParams() {
  try {
    const slugs = await fetchCourseSlugs();
    return slugs.map((id) => ({ id }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[courses] could not list courses for the export:", caught);
    return [];
  }
}

/* Tab title = the course name. This is the one place the build reads a
   course's content, and only for <head>; the page's own copy still comes from
   the browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const course = await fetchCourse(id);
    const title = localized(course?.title, "ar");
    const description = localized(course?.description, "ar");
    if (title) return { title: `${title} | Sawt Incubator`, description };
  } catch {
    // fall through to the incubator's own title
  }

  return { title: "حاضنة صوت | Sawt Incubator" };
}

/* /courses/[id] — course detail page. Server Component; every section's
   content comes from GET /pages/courses/{slug}, fetched in the browser by
   <CourseContent /> (static export: see lib/api/use-course). */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="crs-page">
      <LegacyInit page="courses" />
      <CourseContent slug={id} />
    </div>
  );
}
