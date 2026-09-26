"use client";
import { useEffect, useState } from "react";
import { SECTION_IDS, type IncubatorNavLink } from "./incubator-nav-data";

/* The incubator navbar's link list. Client leaf: the picked section carries the
   highlight — olive label + rule in the bar, grey plate under it in the phone
   drawer (see .inc-nav-links a.is-active in incubator.css).

   Click-driven on purpose, NOT a scroll-spy: the bar isn't sticky, it sits at
   the top of the hero and scrolls out of view with it, so the only time you see
   the highlight is back at the top — where a scroll-spy would just have reset it
   to the first section and wiped the choice you made.

   The labels are GET /layout/incubator/navbar's (see ./incubator-nav-data);
   while it is in flight the row is drawn as skeleton bars. */

export default function IncubatorNavLinks({
  links,
  loading,
}: {
  links: IncubatorNavLink[];
  loading: boolean;
}) {
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
  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const section = id ? document.getElementById(id) : null;
    // no such section — this is the /courses bar, let the href carry us over
    if (!section) return;

    event.preventDefault();
    setActive(id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    // replaceState, not the hash itself: setting location.hash would make the
    // browser jump the page instantly and cut the glide short
    history.replaceState(null, "", `#${id}`);
  };

  if (loading) {
    return (
      <ul className="inc-nav-links">
        {["86px", "52px", "56px"].map((width, index) => (
          <li key={index}>
            <span className="nsk-line" style={{ width }} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="inc-nav-links">
      {links.map((link, index) => (
        <li key={link.key || index}>
          <a
            className={link.id && active === link.id ? "is-active" : undefined}
            href={link.href}
            onClick={(event) => onLinkClick(event, link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
