"use client";
/* Loads /pages/collaborate once, in the browser — same reasoning as
   ./use-creators-page: the site is a static export, so a build-time fetch
   would freeze the copy and the four types into the bundle until the next
   deploy.

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep the bars on
   screen. A failed request ends the loading state like any other outcome; the
   page then falls back to its built-in copy (see collaborate-types-data), so
   an outage still leaves the four flows reachable rather than a blank page.
   The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchCollaboratePage, type CollaboratePage } from "./collaborate";

export type CollaboratePageState = {
  page: CollaboratePage | null;
  loading: boolean;
};

export function useCollaboratePage(): CollaboratePageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<CollaboratePageState>({
    page: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchCollaboratePage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[collaborate] keeping the built-in content:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
