"use client";
/* Loads /pages/about once, in the browser.

   The site is a static export, so fetching at build time would freeze the copy
   into the bundle until the next deploy; the request is made on mount instead
   and the sections render with whatever came back. The page owns no copy of its
   own, so there is nothing to show before that: <AboutSkeleton /> holds the
   layout while `loading` is true.

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep the skeleton
   on screen. A failed request ends the loading state like any other outcome, so
   an outage settles into an empty page rather than bars that shimmer forever.
   The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchAboutPage, type AboutPage } from "./pages";

export type AboutPageState = {
  page: AboutPage | null;
  loading: boolean;
};

export function useAboutPage(): AboutPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<AboutPageState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchAboutPage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[about] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
