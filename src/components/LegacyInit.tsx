"use client";
/* Boots the ported legacy scripts on the client, per page — mirrors the
   original <script> tags each HTML page used to load. */
import { useEffect } from "react";

export default function LegacyInit({ page }: { page: string }) {
  useEffect(() => {
    (async () => {
      // Bootstrap JS (dropdowns, collapse, hero carousel via data-bs-ride)
      // @ts-ignore
      await import("bootstrap/dist/js/bootstrap.bundle.min.js");

      const { initTranslate } = await import("@/lib/translations");

      if (["home", "about", "creators", "team", "content", "support"].includes(page)) {
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
      // The incubator stats strip reuses the exact same counter animation.
      if (page === "incubator") {
        const { runCounters } = await import("@/lib/legacy-main");
        runCounters();
      }
    })();
  }, [page]);

  return null;
}
