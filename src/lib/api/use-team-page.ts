"use client";
/* Loads /pages/team in the browser — same reasoning as ./use-home-page and
   ./use-about-page: the site is a static export, so a build-time fetch would
   freeze the roster into the bundle until the next deploy.

   `useTeamPage` is the listing's; `useTeamMember` below is one profile, which
   the API answers with its own hero and its own "اعضاء الفريق" row, so
   /team/{uuid} makes exactly one request too.

   FILTERING IS A REQUEST, not a client-side `filter()`: `major` (a major's
   slug) is handed to the API and it answers with that specialty's members —
   see the note in ./team. Every pill press re-runs the effect and aborts the
   request for the pill the visitor just left.

   `page` is KEPT across a refetch, and only `loading` flips. That is what lets
   the listing hold the hero and the pill row still while the grid alone shows
   its bars — the payload's chrome doesn't change between filters, so redrawing
   it would be a flicker for nothing. "Nothing has arrived yet" is `!page`;
   "something is in flight" is `loading`.

   A failed request ends the loading state like any other outcome, so an outage
   settles into an empty roster rather than bars that shimmer forever. The
   error is logged, not surfaced. */

import { useEffect, useState } from "react";
import {
  fetchTeamMember,
  fetchTeamPage,
  type TeamMemberPage,
  type TeamPage,
} from "./team";

export type TeamPageState = {
  page: TeamPage | null;
  loading: boolean;
};

export function useTeamPage(major = ""): TeamPageState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<TeamPageState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true }));

    fetchTeamPage(major, controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn("[team] no content to show:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, [major]);

  return state;
}

export type TeamMemberState = {
  page: TeamMemberPage | null;
  loading: boolean;
};

/** One profile by uuid — the header, the member and the row below all arrive
    in this single response. A uuid the API doesn't know throws like any other
    failure and settles into the empty state. */
export function useTeamMember(uuid: string): TeamMemberState {
  const [state, setState] = useState<TeamMemberState>({
    page: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ page: null, loading: true });

    fetchTeamMember(uuid, controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[team] member unavailable:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, [uuid]);

  return state;
}
