"use client";

import { useEffect, useRef, useState } from "react";
import NavSocialLinks from "@/components/site/NavSocialLinks";
import { resolveNavbar } from "@/components/site/navbar-data";
import { useNavbar } from "@/lib/api/use-navbar";
import { useLang } from "@/lib/use-lang";
import type { MediaNavView } from "./media-nav-data";

/* The phone menu of صوت ميديا's navbar: the burger in the nav card plus the
   panel it opens. The panel reads as the bottom half of the bar's own card —
   flush against it, same width and border, only the bottom corners rounded
   (the bar drops its own while the panel is up) — floating over the hero, with
   the page still showing around and under it. The body's scroll is locked
   while it is up so the card stays pinned to the bar it hangs from.

   It stays mounted and is hidden with visibility, not unmounted: the language
   button inside carries the legacy `.language-btn` class, which initTranslate()
   wires once on page load — a panel mounted later would never be wired.

   The section links, the language label and the green CTA are the same
   resolved GET /layout/media/navbar view MediaNav renders, handed down as a
   prop so the request is made once for the whole bar. */
export default function MediaNavMobile({
  base = "",
  nav,
  loading,
}: {
  base?: string;
  nav: MediaNavView;
  loading: boolean;
}) {
  /* The social row at the foot of the drawer is the site's, not this page's —
     the same GET /layout/navbar row SiteNav renders, which the media endpoint
     does not carry. This page uses MediaNav instead of SiteNav, so the request
     is made here. */
  const { lang } = useLang();
  const { data, loading: socialsLoading } = useNavbar();
  const site = resolveNavbar(data, lang);

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
        {/* the design stacks منهجيتنا first, so the bar's list is walked
            bottom-up (CSS column-reverse would break keyboard order) */}
        <ul className="sm-drawer-links">
          {loading
            ? ["62px", "58px", "54px", "90px"].map((width, index) => (
                <li key={index}>
                  <span className="sm-drawer-link">
                    <span className="nsk-line" style={{ width }} />
                  </span>
                </li>
              ))
            : [...nav.links].reverse().map((link) => (
                <li key={link.key}>
                  <a
                    className={
                      "sm-drawer-link" + (hash === link.href ? " is-active" : "")
                    }
                    href={base + link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
        </ul>

        <div className="sm-drawer-lang">
          {/* Neither of these two is in the payload, so they keep the
              dictionary: "اللغة" and the name of the language the toggle
              switches TO. */}
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
          {loading ? (
            /* `.sm-drawer-cta > a` is what shares the row, so the
               placeholder has to claim its half itself — 12px/15px/1 is the
               button's own 39px box, at its own 24px rounding. */
            <span
              className="nsk-cta"
              style={{ flex: "1 1 0", height: "39px", borderRadius: "24px" }}
            />
          ) : (
            <a
              className="sm-btn-green"
              href={nav.cta.href}
              onClick={() => setOpen(false)}
            >
              <span>{nav.cta.label}</span>
            </a>
          )}
          {/* Not in the payload either — the second CTA is this drawer's own. */}
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
            label={site.socialsLabel}
            socials={site.socials}
            loading={socialsLoading}
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
