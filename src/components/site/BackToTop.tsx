"use client";
/* The round "back to top" arrow, on every page (rendered from the root
   layout). It shows once the visitor has scrolled past SHOW_AFTER and takes
   them straight back up. Bottom-right in RTL, bottom-left in LTR — clear of
   the footer's social icons (see back-to-top.css).

   Not the legacy #backToTop: lib/legacy-main grabs that id once, on the first
   page only, and drives it through style.display — this one keeps its own
   state, so it survives client-side navigation. */

import { useEffect, useState } from "react";
import "@/styles/back-to-top.css";
import { useLang } from "@/lib/use-lang";

const SHOW_AFTER = 300;

export default function BackToTop() {
  const { tr } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={"back-to-top" + (shown ? " is-shown" : "")}
      onClick={toTop}
      aria-label={tr("back_to_top")}
      title={tr("back_to_top")}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      {/* Two chevrons: at rest only the first shows, centred; on hover it
          rises and the second slides in under it (back-to-top.css). */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="back-to-top-chevron" d="M6 15l6-6 6 6" />
          <path className="back-to-top-chevron back-to-top-chevron-2" d="M6 15l6-6 6 6" />
        </g>
      </svg>
    </button>
  );
}
