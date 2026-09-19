"use client";
/* Loads /pages/creators once, in the browser — same reasoning as
   ./use-home-page and ./use-team-page: the site is a static export, so a
   build-time fetch would freeze the roster and the copy into the bundle until
   the next deploy.

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty" — both leave `page` null, but only the first should keep
   <CreatorsSkeleton /> on screen. A failed request ends the loading state like
   any other outcome, so an outage settles into an empty page rather than bars
   that shimmer forever. The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import {
  fetchAllCreators,
  fetchCreatorsPage,
  type CreatorsListPage,
  type CreatorsMeta,
  type CreatorsPage,
} from "./creators-page";

export type CreatorsPageState = {
  page: CreatorsPage | null;
  loading: boolean;
};

export function useCreatorsPage(): CreatorsPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<CreatorsPageState>({
    page: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchCreatorsPage(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[creators] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}

export type CreatorsListState = {
  page: CreatorsListPage | null;
  meta: CreatorsMeta;
  loading: boolean;
};

/** One page of /creators/all. Re-runs on every pager click; the in-flight
    request for the page the visitor just left is aborted. */
export function useAllCreators(page: number, perPage?: number): CreatorsListState {
  const [state, setState] = useState<CreatorsListState>({
    page: null,
    meta: {},
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true }));

    fetchAllCreators({ page, perPage }, controller.signal)
      .then((result) =>
        setState({ page: result.page, meta: result.meta, loading: false }),
      )
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[creators] no roster to show:", caught);
        setState({ page: null, meta: {}, loading: false });
      });

    return () => controller.abort();
  }, [page, perPage]);

  return state;
}
