"use client";

import { useCallback, useEffect, useState } from "react";
import { IconNavClose, IconNavMenu } from "@/components/ui/icons";
import SubNavDrawer from "@/components/site/SubNavDrawer";
import { resolveNavbar } from "@/components/site/navbar-data";
import { useNavbar } from "@/lib/api/use-navbar";
import { useLang } from "@/lib/use-lang";
import type { MediaNavView } from "./media-nav-data";

/* The phone menu of صوت ميديا's navbar: the burger in the nav card (an × while
   open) plus the panel it opens — the main site's drawer look (SubNavDrawer),
   hanging under the card. `sm-drawer-open` on <html> lifts the stacking
   contexts between the card and the document so it floats over the hero and
   the sections below (see `.sm-drawer-open` in media.css).

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
  const close = useCallback(() => setOpen(false), []);

  /* which section link reads as current — the design highlights one row */
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <>
      <button
        className="sm-nav-toggler"
        type="button"
        aria-label="القائمة"
        aria-expanded={open}
        aria-controls="sm-nav-panel"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <IconNavClose /> : <IconNavMenu />}
      </button>

      {/* the design stacks منهجيتنا first, so the bar's list is walked
          bottom-up (CSS column-reverse would break keyboard order) */}
      <SubNavDrawer
        id="sm-nav-panel"
        open={open}
        onClose={close}
        togglerSelector=".sm-nav-toggler"
        lockClass="sm-drawer-open"
        loading={loading}
        links={[...nav.links].reverse().map((link) => ({
          key: link.key,
          label: link.label,
          href: base + link.href,
          active: hash === link.href,
        }))}
        actions={
          <>
            {loading ? (
              <span className="nsk-cta" style={{ flex: "1 1 0", height: "44px" }} />
            ) : (
              <a className="nav-drawer-btn is-filled" href={nav.cta.href} onClick={close}>
                <span>{nav.cta.label}</span>
              </a>
            )}
            {/* Not in the payload — the second CTA is this drawer's own. */}
            <a className="nav-drawer-btn is-outline" href="/media/contact" onClick={close}>
              <span data-i18n="sm_cta_consult">احجز استشارة</span>
            </a>
          </>
        }
        socials={site.socials}
        socialsLoading={socialsLoading}
      />
    </>
  );
}
