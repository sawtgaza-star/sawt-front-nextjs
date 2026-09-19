"use client";
/* Loads /layout/footer once, in the browser — same reasoning as
   ./use-about-page (static export, so a build-time fetch would freeze the copy
   into the bundle until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `data` null, but only the first should keep
   <FooterSkeleton /> on screen. A failed request ends the loading state like
   any other outcome, so an outage settles into the footer's built-in copy
   rather than bars that shimmer forever. The error is logged, not surfaced.

   The request is made once per page load; the footer lives in the (main)
   layout, so it survives client-side navigation without refetching. */

import { useEffect, useState } from "react";
import { fetchFooter, type FooterContent } from "./layout";

export type FooterState = {
  data: FooterContent | null;
  loading: boolean;
};

export function useFooter(): FooterState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<FooterState>({ data: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchFooter(controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[footer] keeping the built-in content:", caught);
        setState({ data: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
