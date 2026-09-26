"use client";
/* Loads /pages/support once, in the browser — same reasoning as
   ./use-collaborate-page: the site is a static export, so a build-time fetch
   would freeze the goal figures and the copy into the bundle until the next
   deploy.

   `loading` separates "the answer hasn't arrived" from "the answer was empty".
   A failed request ends the loading state like any other outcome; every
   section then falls back to its built-in copy, so an outage still leaves a
   working donation page. The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchSupportPage, type SupportPage } from "./support";

export type SupportPageState = {
  page: SupportPage | null;
  loading: boolean;
};

export function useSupportPage(): SupportPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<SupportPageState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchSupportPage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[support] keeping the built-in content:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
