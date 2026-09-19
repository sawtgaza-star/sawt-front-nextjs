"use client";
/* Loads /layout/media/navbar once, in the browser — same reasoning as
   ./use-navbar (static export, so a build-time fetch would freeze the copy
   into the bundle until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `data` null, but only the first should keep the bar's
   placeholders on screen. A failed request ends the loading state like any
   other outcome, so an outage settles into an empty bar rather than shimmer
   that never stops. The error is logged, not surfaced.

   One request per page load. MediaNav is mounted by each /media page's own
   hero rather than by a shared layout, so a navigation between two of them
   does refetch — the response is small and the browser cache covers the
   repeat. */

import { useEffect, useState } from "react";
import { fetchMediaNavbar, type MediaNavbarContent } from "./layout";

export type MediaNavbarState = {
  data: MediaNavbarContent | null;
  loading: boolean;
};

export function useMediaNavbar(): MediaNavbarState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the placeholder bar and hydration finds exactly what it expects
  const [state, setState] = useState<MediaNavbarState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchMediaNavbar(controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[media navbar] the bar stays empty:", caught);
        setState({ data: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
