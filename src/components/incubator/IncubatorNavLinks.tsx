"use client";
import { useEffect, useRef, useState } from "react";

/* The incubator navbar's link list. Client leaf: the underline follows the
   section you're on — it moves the moment you click one, and keeps itself in
   sync with the page while you scroll by hand. */

type NavLink = { id: string; key: string; label: string };

const LINKS: NavLink[] = [
  { id: "inc-about", key: "inc_nav_about", label: "عن الحاضنة" },
  { id: "inc-courses", key: "inc_nav_courses", label: "الدورات" },
  { id: "inc-workshops", key: "inc_nav_workshops", label: "الورشات" },
];

/* A section becomes "current" once its top passes this far down the viewport. */
const MARKER = 0.3;
/* How long the clicked link keeps the underline while the page glides there. */
const SCROLL_SETTLE_MS = 900;

export default function IncubatorNavLinks() {
  const [active, setActive] = useState<string>(LINKS[0].id);
  // While a click-driven scroll is in flight the clicked link owns the
  // underline, so the sections it glides past can't flicker it on the way.
  const lockRef = useRef(false);
  const lockTimer = useRef<number>(0);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const sync = () => {
      if (lockRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const line = atBottom ? window.innerHeight : window.innerHeight * MARKER;

      // last section whose top has passed the line wins; at the very bottom the
      // line drops to the viewport foot so the closing sections can win too
      let current = LINKS[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    // rAF-throttled: at most one measure per frame however fast the wheel spins
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };
    // taking over by hand hands the underline straight back to the scroll
    const release = () => {
      lockRef.current = false;
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(lockTimer.current), []);

  // Own the scroll instead of letting the href do it: a plain "/incubator#id"
  // can resolve to a different document under `output: 'export'` (/incubator
  // vs /incubator/) and reload the page, which would throw this state away.
  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const section = document.getElementById(id);
    if (!section) return; // no such section — let the browser follow the href

    event.preventDefault();
    setActive(id);
    lockRef.current = true;
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = false;
    }, SCROLL_SETTLE_MS);

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <ul className="inc-nav-links">
      {LINKS.map((link) => (
        <li key={link.id}>
          <a
            className={active === link.id ? "is-active" : undefined}
            href={`/incubator#${link.id}`}
            data-i18n={link.key}
            onClick={(event) => onLinkClick(event, link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
