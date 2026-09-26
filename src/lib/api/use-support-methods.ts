"use client";
/* Loads GET /support/methods once, in the browser — same reasoning and same
   `loading` contract as ./use-support-page. A failed request ends the loading
   state with `page` null, and /support/methods falls back to its built-in
   copy and cards. */

import { useEffect, useState } from "react";
import { fetchSupportMethods, type SupportMethodsPage } from "./support-methods";

export type SupportMethodsState = {
  page: SupportMethodsPage | null;
  loading: boolean;
};

export function useSupportMethods(): SupportMethodsState {
  const [state, setState] = useState<SupportMethodsState>({ page: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchSupportMethods(controller.signal)
      .then((page) => setState({ page, loading: false }))
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[support/methods] keeping the built-in content:", caught);
        setState({ page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
