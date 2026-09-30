"use client";
/* Loads /pages/content in the browser — same reasoning as ./use-home-page and
   ./use-about-page: the site is a static export, so a build-time fetch would
   freeze the copy into the bundle until the next deploy.

   `loading` is the FIRST request only — what keeps the hero's bars on screen.
   A new category or sort asks again (`?category=` / `?sort=`); while that one
   is in flight `reelsLoading` is true and the hero stays as it is. A failed
   request ends the loading state like any other outcome, so an outage settles
   into a hero without copy rather than bars that shimmer forever. The error is
   logged, not surfaced. */

import { useEffect, useRef, useState } from "react";
import { fetchContentPage, type ContentPage, type ContentQuery } from "./content";

export type ContentPageState = {
  page: ContentPage | null;
  loading: boolean;
  reelsLoading: boolean;
};

export function useContentPage({ category, sort }: ContentQuery = {}): ContentPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<ContentPageState>({
    page: null,
    loading: true,
    reelsLoading: true,
  });
  const loaded = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    if (loaded.current) setState((s) => ({ ...s, reelsLoading: true }));

    fetchContentPage({ category, sort }, controller.signal)
      .then((page) => {
        loaded.current = true;
        setState((s) => ({
          // the hero never changes with the filter — keep the first one if a
          // later answer came back without it
          page: page ? { ...page, hero: page.hero ?? s.page?.hero } : s.page,
          loading: false,
          reelsLoading: false,
        }));
      })
      .catch((caught) => {
        // The unmount (or a newer pick) aborted it — nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[content] no content to show:", caught);
        loaded.current = true;
        setState((s) => ({
          page: s.page && { ...s.page, reels: { ...s.page.reels, items: [] } },
          loading: false,
          reelsLoading: false,
        }));
      });

    return () => controller.abort();
  }, [category, sort]);

  return state;
}
