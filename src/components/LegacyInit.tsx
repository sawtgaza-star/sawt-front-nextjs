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

      if (["home", "about", "content", "creators"].includes(page)) {
        const { initMainScripts } = await import("@/lib/legacy-main");
        const { initSearch } = await import("@/lib/legacy-search");
        initMainScripts();
        initSearch();
      }
      if (page === "home") {
        const { initOwlSliders } = await import("@/lib/owl-sliders");
        await initOwlSliders();
      }
      // "انضم إلينا" join-modal logic (button + stepper) — home & creators both host it
      if (page === "home" || page === "creators") {
        const { initHomeInline } = await import("@/lib/legacy-home");
        initHomeInline();
      }
      if (page === "content") {
        const { initContentInline } = await import("@/lib/legacy-content");
        initContentInline();
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
    })();
  }, [page]);

  return null;
}
