"use client";
import { useEffect, useState } from "react";

/* A paginated list's current page, kept in the URL as `?page=N` (page 1 is
   the bare URL). Without it the page lived only in state, so opening an item
   on page 3 and pressing back reloaded the list on page 1 — and ScrollRestorer
   then put the visitor at the right height over the wrong cards.

   The URL is rewritten in place (replaceState): flipping pages doesn't add
   history entries, back still leaves the list. It is read after mount, not in
   the initial state, so the statically exported HTML (always page 1) hydrates
   cleanly. */
export function usePageParam(): [number, (page: number) => void] {
  const [page, setPageState] = useState(1);

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("page"));
    if (Number.isInteger(n) && n > 1) setPageState(n);
  }, []);

  const setPage = (next: number) => {
    setPageState(next);
    const url = new URL(window.location.href);
    if (next > 1) url.searchParams.set("page", String(next));
    else url.searchParams.delete("page");
    window.history.replaceState(window.history.state, "", url);
  };

  return [page, setPage];
}
