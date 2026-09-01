"use client";

import { useEffect, useRef, useState } from "react";
import NavSocialLinks from "@/components/site/NavSocialLinks";
import { resolveNavbar } from "@/components/site/navbar-data";
import { useNavbar } from "@/lib/api/use-navbar";
import { useLang } from "@/lib/use-lang";
import { MEDIA_NAV_LINKS } from "./media-nav-data";

/* The phone menu of صوت ميديا's navbar: the burger in the nav card plus the
   panel it opens. The panel reads as the bottom half of the bar's own card —
   flush against it, same width and border, only the bottom corners rounded
   (the bar drops its own while the panel is up) — floating over the hero, with
   the page still showing around and under it. The body's scroll is locked
   while it is up so the card stays pinned to the bar it hangs from.

   It stays mounted and is hidden with visibility, not unmounted: the language
   button inside carries the legacy `.language-btn` class, which initTranslate()
   wires once on page load — a panel mounted later would never be wired.

   Only this leaf is a Client Component; MediaNav itself stays on the server. */
export default function MediaNavMobile({ base = "" }: { base?: string }) {
  /* The social row at the foot of the drawer is the site's, not this page's —
     the same GET /layout/navbar row SiteNav renders. This page uses MediaNav
     instead of SiteNav, so the request is made here. */
  const { lang } = useLang();
  const { data, loading } = useNavbar();
  const nav = resolveNavbar(data, lang);

  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);

  /* which section link reads as current — the design highlights one row */
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    /* The class lifts every stacking context between the card and the document
       so it floats over the hero instead of under it (see `.sm-drawer-open` in
       media.css), and drops `.sm-page`'s `overflow-x: clip` — the clip is there
       for the hero's bleeding glows and must not trim the card. Safe because
       the locked body is what clips the page meanwhile. */
    document.documentElement.classList.add("sm-drawer-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    /* the page stays visible around the card, so a tap outside it is the
       natural way to dismiss it — the burger is excluded or its own click
       would reopen what this just closed */
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (drawerRef.current?.contains(t)) return;
      if (togglerRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);

    return () => {
      body.style.overflow = prev;
      document.documentElement.classList.remove("sm-drawer-open");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={togglerRef}
        className="sm-nav-toggler"
        type="button"
        aria-label="القائمة"
        aria-expanded={open}
        aria-controls="sm-nav-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <BurgerIcon />
      </button>

      <div
        ref={drawerRef}
        id="sm-nav-panel"
        className={"sm-drawer" + (open ? " is-open" : "")}
        aria-label="القائمة"
      >
        {/* the design stacks منهجيتنا first, so the shared list is walked
            bottom-up (CSS column-reverse would break keyboard order) */}
        <ul className="sm-drawer-links">
          {[...MEDIA_NAV_LINKS].reverse().map((l) => (
            <li key={l.key}>
              <a
                className={
                  "sm-drawer-link" + (hash === l.href ? " is-active" : "")
                }
                href={base + l.href}
                data-i18n={l.key}
                onClick={() => setOpen(false)}
              >
                {l.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm-drawer-lang">
          <span data-i18n="sm_lang_label">اللغة</span>
          {/* `.language-btn` is what initTranslate() binds the AR/EN toggle to */}
          <button
            type="button"
            className="language-btn sm-drawer-lang-btn"
            aria-label="تغيير اللغة"
          >
            <span data-i18n="sm_lang_value">English</span>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>

        <div className="sm-drawer-cta">
          <a
            className="sm-btn-green"
            href="/media/contact"
            onClick={() => setOpen(false)}
          >
            <span data-i18n="sm_cta_start">ابدأ مشروعك</span>
          </a>
          <a
            className="sm-btn-outline"
            href="/media/contact"
            onClick={() => setOpen(false)}
          >
            <span data-i18n="sm_cta_consult">احجز استشارة</span>
          </a>
        </div>

        <div className="sm-drawer-social">
          <NavSocialLinks
            label={nav.socialsLabel}
            socials={nav.socials}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

function BurgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H14ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H10C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4H20Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
