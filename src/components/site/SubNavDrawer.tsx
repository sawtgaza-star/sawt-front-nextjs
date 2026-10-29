"use client";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { socialIcon, socialMark } from "./social-icons";

export type SubNavDrawerLink = {
  key: string;
  label: string;
  href: string;
  active: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type SubNavDrawerSocial = {
  platform?: string | null;
  url?: string | null;
};

/* The phone menu of the sub-site bars (صوت ميديا, حاضنة صوت), dressed exactly
   like the main site's NavDrawer — same `.nav-drawer*` classes from
   styles/site-nav.css, which both bars already import: a separate rounded
   panel under the bar card, the links in a white card with the current one on
   an olive plate, the عربي | English switch, the bar's two CTAs and the
   socials row. Each bar keeps its own links, CTAs and socials.

   Always mounted, only hidden while closed: initTranslate() wires every
   `.language-btn` once, on the nodes that exist at page load. The parent must
   be `position: relative` — the panel hangs `top: calc(100% + 8px)` off it.

   `lockClass` goes on <html> while it is open, next to `nav-drawer-open`
   (which locks the page scroll): the bars use it to lift their stacking
   contexts over the sections below. */
export default function SubNavDrawer({
  id,
  open,
  onClose,
  togglerSelector,
  lockClass,
  links,
  loading,
  actions,
  socials,
  socialsLoading,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  togglerSelector: string;
  lockClass?: string;
  links: SubNavDrawerLink[];
  loading: boolean;
  /** the bar's CTA pair — `.nav-drawer-btn is-filled` / `is-outline` anchors */
  actions: ReactNode;
  socials: SubNavDrawerSocial[];
  socialsLoading: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Lock the page behind the menu; Escape or a tap outside it closes it (the
  // burger is left to its own toggle).
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("nav-drawer-open");
    if (lockClass) root.classList.add(lockClass);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element;
      if (rootRef.current?.contains(target)) return;
      if (target.closest?.(togglerSelector)) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      root.classList.remove("nav-drawer-open");
      if (lockClass) root.classList.remove(lockClass);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose, togglerSelector, lockClass]);

  return (
    <div
      className={"nav-drawer" + (open ? " is-open" : "")}
      id={id}
      ref={rootRef}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="nav-drawer-body">
        <div className="nav-drawer-card nav-drawer-list">
          <ul className="nav-drawer-links">
            {loading
              ? ["62px", "58px", "54px", "90px"].map((width, index) => (
                  <li key={index}>
                    <span className="nav-drawer-link">
                      <span className="nsk-line" style={{ width }} />
                    </span>
                  </li>
                ))
              : links.map((link) => (
                  <li key={link.key}>
                    <a
                      className={"nav-drawer-link" + (link.active ? " active" : "")}
                      href={link.href}
                      onClick={(event) => {
                        link.onClick?.(event);
                        onClose();
                      }}
                    >
                      <span>{link.label}</span>
                      <span className="nav-drawer-dot" aria-hidden="true" />
                    </a>
                  </li>
                ))}
          </ul>
        </div>

        <div className="nav-drawer-lang">
          <span data-i18n="nav_language">اللغة</span>
          {/* Two .language-btn halves: the CSS makes the current language's
              half the lit, unclickable one, so a tap on the other toggles. */}
          <div className="nav-lang-seg">
            <button type="button" className="language-btn nav-lang-seg-ar">
              عربي
            </button>
            <button type="button" className="language-btn nav-lang-seg-en">
              English
            </button>
          </div>
        </div>
      </div>

      <div className="nav-drawer-foot">
        <div className="nav-drawer-auth nav-drawer-actions">{actions}</div>
        <div className="nav-drawer-social">
          <span className="nav-drawer-follow nav-guest-only" data-i18n="nav_follow_us">
            تابعنا
          </span>
          <div className="nav-drawer-social-icons">
            {socialsLoading
              ? [0, 1, 2, 3, 4].map((index) => <span className="nsk-circle" key={index} />)
              : socials.map((social, index) => {
                  const Mark = socialMark(social.platform);
                  return (
                    <a
                      key={index}
                      href={social.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform || undefined}
                    >
                      {Mark ? <Mark /> : <i className={socialIcon(social.platform)}></i>}
                    </a>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
