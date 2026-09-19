"use client";
/* Loads /pages/content once, in the browser — same reasoning as
   ./use-home-page and ./use-about-page: the site is a static export, so a
   build-time fetch would freeze the copy into the bundle until the next
   deploy.

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep the hero's
   bars on screen. A failed request ends the loading state like any other
   outcome, so an outage settles into a hero without copy rather than bars that
   shimmer forever. The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchContentPage, type ContentPage } from "./content";

export type ContentPageState = {
  page: ContentPage | null;
  loading: boolean;
};

export function useContentPage(): ContentPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<ContentPageState>({
    page: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchContentPage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[content] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
