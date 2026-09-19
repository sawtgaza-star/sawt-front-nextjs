"use client";
/* Loads /pages/home once, in the browser — same reasoning as ./use-about-page
   (static export, so a build-time fetch would freeze the copy into the bundle
   until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep
   <HomeSkeleton /> on screen. A failed request ends the loading state like any
   other outcome, so an outage settles into an empty page rather than bars that
   shimmer forever. The error is logged, not surfaced.

   The wait matters more here than on /about: the home page's four Owl
   carousels can only be initialised once their items exist, so HomeContent
   re-runs the legacy boot when this flips to false. See the note there. */

import { useEffect, useState } from "react";
import { fetchHomePage, type HomePage } from "./home";

export type HomePageState = {
  page: HomePage | null;
  loading: boolean;
};

export function useHomePage(): HomePageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<HomePageState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchHomePage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[home] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
