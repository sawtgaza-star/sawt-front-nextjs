"use client";
/* Loads /pages/incubator once, in the browser — same reasoning as ./use-about-page
   (static export, so a build-time fetch would freeze the copy into the bundle
   until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep the skeleton
   on screen. A failed request ends the loading state like any other outcome, so
   an outage settles into a page that is just its hero rather than bars that
   shimmer forever. The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchIncubatorPage, type IncubatorPage } from "./incubator-page";

export type IncubatorPageState = {
  page: IncubatorPage | null;
  loading: boolean;
};

export function useIncubatorPage(): IncubatorPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<IncubatorPageState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchIncubatorPage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[incubator] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
