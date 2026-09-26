"use client";
/* Loads one creator's profile in the browser — same reasoning as
   ./use-creators-page (static export, so a build-time fetch would freeze the
   profile into the bundle until the next deploy).

   `loading` is what separates "the answer hasn't arrived" from "the answer was
   empty": both leave `page` null, but only the first should keep the skeleton
   on screen. A failed request ends the loading state like any other outcome,
   so an outage settles into a page that is just its hero. The error is logged,
   not surfaced. */

import { useEffect, useState } from "react";
import { fetchCreatorProfile, type CreatorProfilePage } from "./creator-profile";

export type CreatorProfileState = {
  page: CreatorProfilePage | null;
  loading: boolean;
};

export function useCreatorProfile(creator: string): CreatorProfileState {
  // true on the server and on the first client render alike, so the prerendered
  // HTML is the skeleton and hydration finds exactly what it expects
  const [state, setState] = useState<CreatorProfileState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ page: null, loading: true });

    fetchCreatorProfile(creator, controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        // The unmount aborted it — leave the state alone, nothing is watching.
        if (caught?.name === "AbortError") return;
        console.warn(`[creator ${creator}] no profile to show:`, caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, [creator]);

  return state;
}
