"use client";
/* Boots the ported legacy scripts on the client, per page — mirrors the
   original <script> tags each HTML page used to load. */
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { initTranslate } from "@/lib/translations";

// LegacyInit renders null, but it is still server-rendered — useLayoutEffect
// would warn there, so fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LegacyInit({ page }: { page: string }) {
  const pathname = usePathname();

  // Translate first, synchronously on hydration and BEFORE the browser paints:
  // the dictionary is a static import so it is already in the page chunk.
  // Waiting for the dynamic bootstrap/legacy chunks below made English visitors
  // read the Arabic fallback text for a few hundred ms on every navigation, and
  // a plain useEffect still let React paint one Arabic frame on client-side
  // (<Link>) navigation before the swap.
  // Keyed on the pathname, not on `page`: /team → /team/[id] is a <Link>
  // navigation between two pages that both pass page="team", so a `page`
  // dependency would leave the new markup in Arabic.
  useIsomorphicLayoutEffect(() => {
    initTranslate();
  }, [pathname, page]);

  useEffect(() => {
    (async () => {
      // Bootstrap JS (dropdowns, collapse, hero carousel via data-bs-ride)
      // @ts-ignore
      await import("bootstrap/dist/js/bootstrap.bundle.min.js");

      if (["home", "about", "creators", "team", "content", "support", "courses", "news"].includes(page)) {
        const { initMainScripts, initHeaderPin } = await import("@/lib/legacy-main");
        const { initSearch } = await import("@/lib/legacy-search");
        initMainScripts();
        initSearch();
        // Re-pin the header on every visit: each page mounts its own <header>,
        // so client-side navigation drops the wrapper + scroll listener that
        // the one-time-guarded initMainScripts built. See initHeaderPin.
        initHeaderPin();
      }
      if (page === "home") {
        const { initOwlSliders } = await import("@/lib/owl-sliders");
        await initOwlSliders();
      }
      // "انضم إلينا" join-modal logic (button + stepper) — home, creators & team host it
      if (page === "home" || page === "creators" || page === "team") {
        const { initHomeInline } = await import("@/lib/legacy-home");
        initHomeInline();
      }
      if (["login", "register", "forgot-password", "set-new-password"].includes(page)) {
        const { initLoginPage } = await import("@/lib/legacy-login");
        initLoginPage();
      }
      if (page === "code-verification") {
        const { initVerification } = await import("@/lib/legacy-verification");
        initVerification();
      }

      // translations last so they apply to any JS-rendered markup too
      initTranslate();

      // Replay the hero stat counters on every home visit — initMainScripts is
      // one-time-guarded, so it can't drive them on client-side navigation.
      if (page === "home") {
        const { runCounters, replayComments } = await import("@/lib/legacy-main");
        runCounters();
        replayComments();
      }
      // The incubator and صوت ميديا stat strips reuse the same counters.
      if (page === "incubator" || page === "media") {
        const { runCounters } = await import("@/lib/legacy-main");
        runCounters();
      }
    })();
  }, [page]);

  return null;
}
