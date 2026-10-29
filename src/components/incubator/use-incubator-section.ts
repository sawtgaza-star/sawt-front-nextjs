"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { SECTION_IDS } from "./incubator-nav-data";

/* Which incubator section the navbar highlights, shared by the bar's links
   (IncubatorNavLinks) and the phone drawer so both show the same pick.

   Click-driven on purpose, NOT a scroll-spy: the bar isn't sticky, it sits at
   the top of the hero and scrolls out of view with it, so the only time you see
   the highlight is back at the top — where a scroll-spy would just have reset it
   to the first section and wiped the choice you made. */
export function useIncubatorSection() {
  const [active, setActive] = useState<string>(SECTION_IDS[0]);

  /* Arriving with the section already in the URL — the same bar on /courses
     links back here as /incubator#inc-courses, and the hash survives a reload. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (SECTION_IDS.includes(id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Own the scroll instead of letting the href do it: a plain "/incubator#id"
  // can resolve to a different document under `output: 'export'` (/incubator
  // vs /incubator/) and reload the page, which would throw this state away.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = id ? document.getElementById(id) : null;
    // no such section — this is the /courses bar, let the href carry us over
    if (!section) return;

    event.preventDefault();
    setActive(id);
    // next frame: the phone drawer closes on the same click, and the page is
    // scroll-locked until it has
    requestAnimationFrame(() =>
      section.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
    // replaceState, not the hash itself: setting location.hash would make the
    // browser jump the page instantly and cut the glide short
    history.replaceState(null, "", `#${id}`);
  };

  return { active, goTo };
}
