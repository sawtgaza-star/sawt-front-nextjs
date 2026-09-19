"use client";
/* Loads the news feed in the browser — same reasoning as ./use-home-page: the
   site is a static export, so a build-time fetch would freeze the copy into
   the bundle until the next deploy. The build only reads the feed to learn
   which /news/{uuid} pages exist (see fetchAllBlogUuids).

   `loading` separates "the answer hasn't arrived" from "the answer was empty":
   both leave the data null, but only the first keeps the skeleton on screen. A
   failed request ends the loading state like any other outcome, so an outage —
   or a uuid that no longer exists — settles into an empty page rather than
   bars that shimmer forever. The error is logged, not surfaced. */

import { useEffect, useState } from "react";
import {
  fetchBlog,
  fetchBlogs,
  type BlogDetailPage,
  type BlogsListPage,
  type BlogsMeta,
} from "./blogs";

export type BlogsListState = {
  page: BlogsListPage | null;
  meta: BlogsMeta;
  loading: boolean;
};

/** One page of /news. Re-runs on every pager click; the in-flight request for
    the page the reader just left is aborted. */
export function useBlogsList(page: number, perPage?: number): BlogsListState {
  const [state, setState] = useState<BlogsListState>({
    page: null,
    meta: {},
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true }));

    fetchBlogs({ page, perPage }, controller.signal)
      .then((result) =>
        setState({ page: result.page, meta: result.meta, loading: false }),
      )
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[news] no content to show:", caught);
        setState({ page: null, meta: {}, loading: false });
      });

    return () => controller.abort();
  }, [page, perPage]);

  return state;
}

export type BlogState = { data: BlogDetailPage | null; loading: boolean };

/** One article by uuid — the hero, the article itself and its related cards
    all arrive in this single response. */
export function useBlog(uuid: string): BlogState {
  const [state, setState] = useState<BlogState>({ data: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true });

    fetchBlog(uuid, controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[news] article unavailable:", caught);
        setState({ data: null, loading: false });
      });

    return () => controller.abort();
  }, [uuid]);

  return state;
}
