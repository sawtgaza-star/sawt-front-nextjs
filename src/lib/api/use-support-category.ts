"use client";
/* Loads GET /support/methods/category/{key} for the wizard on
   /support/checkout. The key comes from the `?method=` the method card put on
   the URL; it is read in an effect (not useSearchParams) because the page is a
   static export and must prerender without a Suspense boundary.

   No key, an unknown key (404) or an outage all end the same way: `page`
   null (no platforms to pick). `loading` is true until that is settled. */

import { useEffect, useState } from "react";
import { fetchSupportCategory, type SupportCategoryPage } from "./support-methods";

export type SupportCategoryState = {
  /** The key from the URL, "" until read / when absent. */
  method: string;
  page: SupportCategoryPage | null;
  loading: boolean;
};

export function useSupportCategory(): SupportCategoryState {
  const [state, setState] = useState<SupportCategoryState>({
    method: "",
    page: null,
    loading: true,
  });

  useEffect(() => {
    const method = (new URLSearchParams(window.location.search).get("method") || "").trim();
    if (!method) {
      setState({ method, page: null, loading: false });
      return;
    }
    setState({ method, page: null, loading: true });

    const controller = new AbortController();
    fetchSupportCategory(method, controller.signal)
      .then((page) => setState({ method, page, loading: false }))
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[support/checkout] category failed to load:", caught);
        setState({ method, page: null, loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
