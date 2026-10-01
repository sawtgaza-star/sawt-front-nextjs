"use client";
/* Holds the /pages/home payload for <HomeContent />.

   `initialPage` is the copy app/(main)/page.tsx fetched at BUILD time and
   baked into index.html. When it is there, the sections render from it on the
   server and on the first client render alike, so hydration matches and the
   visitor sees real content without waiting for any request.

   The browser still asks the API once on mount, because the baked copy is only
   as fresh as the last deploy. If the answer is the same payload, nothing
   happens. If it differs, `page` is replaced and `version` goes up, which
   re-runs HomeContent's widget boot; any carousel section whose block changed
   is remounted there, because Owl has rewritten its markup and React can't
   patch it in place (see contentKey in HomeContent).

   Without `initialPage` (the build couldn't reach the API) this is the old
   flow: `loading` stays true until the request settles, so <HomeSkeleton />
   holds the page. A failed request ends the loading state like any other
   outcome, so an outage settles into an empty page rather than bars that
   shimmer forever; with a baked copy, an outage simply keeps that copy. The
   error is logged, not surfaced. */

import { useEffect, useState } from "react";
import { fetchHomePage, type HomePage } from "./home";

export type HomePageState = {
  page: HomePage | null;
  loading: boolean;
  /** Bumped each time a fresher payload replaces the one already rendered. */
  version: number;
};

export function useHomePage(initialPage: HomePage | null = null): HomePageState {
  const [state, setState] = useState<HomePageState>({
    page: initialPage,
    loading: !initialPage,
    version: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const baked = initialPage ? JSON.stringify(initialPage) : null;

    fetchHomePage(controller.signal)
      .then((page) => {
        // Same content the build baked in — keep the DOM (and the carousels) as is.
        if (baked !== null && JSON.stringify(page) === baked) return;
        // The API emptied out since the build: keep the baked copy on screen.
        if (baked !== null && !page) return;
        setState((current) => ({
          page,
          loading: false,
          version: baked !== null ? current.version + 1 : current.version,
        }));
      })
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[home] no content to show:", caught);
        if (baked === null) setState({ page: null, loading: false, version: 0 });
      });

    return () => controller.abort();
    // `initialPage` is a build-time constant for this page — run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
