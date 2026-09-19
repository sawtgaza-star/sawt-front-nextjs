"use client";
/* Loads one service page in the browser — same reasoning as ./use-media-page
   (static export, so a build-time fetch would freeze the copy into the bundle
   until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty": both leave `page` null, but only the first should keep the skeleton
   on screen. A failed request ends the loading state like any other outcome,
   so an outage settles into a page that is just its banner. The error is
   logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchMediaService, type MediaServicePage } from "./media-service";

export type MediaServiceState = {
  page: MediaServicePage | null;
  loading: boolean;
};

export function useMediaService(service: string): MediaServiceState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<MediaServiceState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ page: null, loading: true });

    fetchMediaService(service, controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn(`[media service ${service}] no content to show:`, caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, [service]);

  return state;
}
