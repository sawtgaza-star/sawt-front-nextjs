"use client";
/* Loads one course in the browser — same reasoning as ./use-media-work
   (static export, so a build-time fetch would freeze the copy into the bundle
   until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty": both leave `course` null, but only the first should keep the
   skeleton on screen. A failed request ends the loading state like any other
   outcome, so an outage settles into a page that is just its hero. The error
   is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchCourse, type CourseDetail } from "./courses";

export type CourseState = {
  course: CourseDetail | null;
  loading: boolean;
};

export function useCourse(slug: string): CourseState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<CourseState>({ course: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ course: null, loading: true });

    fetchCourse(slug, controller.signal)
      .then((course) => setState({ course, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn(`[course ${slug}] no course to show:`, caught);
        setState({ course: null, loading: false });
      });

    return () => controller.abort();
  }, [slug]);

  return state;
}
