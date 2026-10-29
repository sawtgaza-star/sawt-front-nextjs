"use client";

import { useCallback, useState } from "react";
import { IconNavClose, IconNavMenu } from "@/components/ui/icons";
import SubNavDrawer from "@/components/site/SubNavDrawer";
import { useIncubatorNavbar } from "@/lib/api/use-incubator-navbar";
import { useLang } from "@/lib/use-lang";
import { resolveIncubatorNav } from "./incubator-nav-data";
import IncubatorNavLinks from "./IncubatorNavLinks";
import IncubatorNavSocial from "./IncubatorNavSocial";
import { useIncubatorSection } from "./use-incubator-section";
import NavUserMenu from "@/components/site/NavUserMenu";
import "@/styles/nav-skeleton.css";
import "@/styles/nav-switch.css";
// the user menu's styles (.nav-user-*); every rule there is .nav-* scoped
import "@/styles/site-nav.css";

/* The incubator's own navbar — a white floating card over the hero gradient.
   Deliberately NOT SiteNav: the mock gives this page a reduced bar (back to
   the main platform + social on top, brand/links/support CTA below).
   Below lg the card shrinks to brand + burger (an × while open) and everything
   else moves into the phone drawer — the main site's drawer look, shared with
   صوت ميديا (site/SubNavDrawer).

   Its copy is GET /layout/incubator/navbar's alone (see ./incubator-nav-data).
   The client boundary is here so the request is made once for the bar and the
   drawer. As in MediaNav, only the TEXT is drawn as skeleton bars while it is
   in flight — the card and the `.language-btn` nodes stay mounted, since
   initTranslate() binds the AR/EN toggle to them once on page load. */
export default function IncubatorNav() {
  const { lang } = useLang();
  const { data, loading } = useIncubatorNavbar();
  const nav = resolveIncubatorNav(data, lang);
  const { active, goTo } = useIncubatorSection();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const social = (
    <IncubatorNavSocial
      label={nav.socialsLabel}
      socials={nav.socials}
      loading={loading}
    />
  );
  const cta = (className: string, link: typeof nav.join, width: string) =>
    loading ? (
      <span className="nsk-cta" style={{ width, height: "44px" }} />
    ) : (
      <a className={className} href={link.href}>
        {link.label}
      </a>
    );

  return (
    <div className="inc-nav-wrap">
      <div className="container">
        <div className="inc-nav">
          <div className="inc-nav-top">
            {/* back to the platform */}
            <div className="nav-switch">
              <a className="inc-nav-back" href={nav.back.href}>
                <i className="fa-solid fa-angle-right"></i>
                {loading ? (
                  <span className="nsk-line" style={{ width: "112px" }} />
                ) : (
                  <span>{nav.back.label}</span>
                )}
              </a>
            </div>

            {/* signed in: the site bar's [avatar · أهلاً ˅] menu, with
                تسجيل الخروج, just before the socials — hidden for guests by
                `.nav-authed-only`, and below lg (see incubator.css) */}
            <div className="inc-nav-top-end">
              <NavUserMenu />
              {social}
            </div>
          </div>

          <div className="inc-nav-main">
            {/* With no logo in the payload the <img> is skipped rather than
                rendered with an empty src. */}
            <a className="inc-nav-brand" href="/incubator">
              {loading ? (
                <>
                  <span
                    className="nsk-logo"
                    style={{ width: "38px", height: "38px" }}
                  />
                  <span className="nsk-line" style={{ width: "86px" }} />
                </>
              ) : (
                <>
                  {nav.logoUrl ? (
                    <img src={nav.logoUrl} alt={nav.siteName} />
                  ) : null}
                  <span>{nav.siteName}</span>
                </>
              )}
            </a>

            <button
              className="inc-nav-toggler"
              type="button"
              aria-label="القائمة"
              aria-expanded={open}
              aria-controls="inc-nav-panel"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <IconNavClose /> : <IconNavMenu />}
            </button>

            <div className="inc-nav-menu collapse" id="incNav">
              <IncubatorNavLinks
                links={nav.links}
                loading={loading}
                active={active}
                onLinkClick={goTo}
              />

              {/* RTL: first child sits on the right, so the group reads
                  [En] [انضم للحاضنة] [ادعم طلاب الحاضنة] right-to-left. */}
              <div className="inc-nav-actions">
                <button
                  type="button"
                  className="language-btn inc-nav-lang"
                  aria-label="تغيير اللغة"
                >
                  {loading ? (
                    <span className="nsk-lang" />
                  ) : (
                    <span>{nav.langLabel}</span>
                  )}
                </button>
                {cta("inc-nav-join", nav.join, "130px")}
                {cta("inc-nav-cta", nav.support, "170px")}
              </div>
            </div>

            <SubNavDrawer
              id="inc-nav-panel"
              open={open}
              onClose={close}
              togglerSelector=".inc-nav-toggler"
              lockClass="inc-drawer-open"
              loading={loading}
              links={nav.links.map((link, index) => ({
                key: link.key || String(index),
                label: link.label,
                href: link.href,
                active: !!link.id && active === link.id,
                onClick: (event) => goTo(event, link.id),
              }))}
              actions={
                <>
                  {cta("nav-drawer-btn is-filled", nav.join, "50%")}
                  {cta("nav-drawer-btn is-outline", nav.support, "50%")}
                </>
              }
              socials={nav.socials}
              socialsLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
