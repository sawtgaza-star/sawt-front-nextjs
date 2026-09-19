"use client";
/* Loads the stories feed in the browser — same reasoning as ./use-blogs: the
   site is a static export, so a build-time fetch would freeze the copy into
   the bundle until the next deploy.

   `loading` separates "the answer hasn't arrived" from "the answer was empty":
   both leave the data null, but only the first keeps the skeleton on screen. A
   failed request ends the loading state like any other outcome, so an outage
   settles into an empty page rather than bars that shimmer forever. The error
   is logged, not surfaced. */

import { useEffect, useState } from "react";
import {
  fetchStories,
  fetchStory,
  type StoriesListPage,
  type StoriesMeta,
  type StoryDetailPage,
} from "./stories";

export type StoriesListState = {
  page: StoriesListPage | null;
  meta: StoriesMeta;
  loading: boolean;
};

/** One page of /stories. Re-runs on every pager click; the in-flight request
    for the page the reader just left is aborted. */
export function useStoriesList(page: number, perPage?: number): StoriesListState {
  const [state, setState] = useState<StoriesListState>({
    page: null,
    meta: {},
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true }));

    fetchStories({ page, perPage }, controller.signal)
      .then((result) =>
        setState({ page: result.page, meta: result.meta, loading: false }),
      )
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[stories] no content to show:", caught);
        setState({ page: null, meta: {}, loading: false });
      });

    return () => controller.abort();
  }, [page, perPage]);

  return state;
}

export type StoryState = { data: StoryDetailPage | null; loading: boolean };

/** One story by uuid — the hero, the story itself and its related cards all
    arrive in this single response. */
export function useStory(uuid: string): StoryState {
  const [state, setState] = useState<StoryState>({ data: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true });

    fetchStory(uuid, controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[stories] story unavailable:", caught);
        setState({ data: null, loading: false });
      });

    return () => controller.abort();
  }, [uuid]);

  return state;
}
