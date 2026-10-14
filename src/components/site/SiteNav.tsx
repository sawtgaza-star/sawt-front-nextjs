// @ts-nocheck
/* eslint-disable */
"use client";
import { useCallback, useState } from "react";
import { IconNavClose, IconNavMenu } from "@/components/ui/icons";
import { useNavbar } from "@/lib/api/use-navbar";
import { useLang } from "@/lib/use-lang";
import { resolveNavbar } from "./navbar-data";
import NavTopBar from "./NavTopBar";
import NavLinks from "./NavLinks";
import NavPills from "./NavPills";
import MobileSearchPanel from "./MobileSearchPanel";
import NavAccountAvatar from "./NavAccountAvatar";
import NavNotifications from "./NavNotifications";
import NavDrawer from "./NavDrawer";
import LogoutToast from "./LogoutToast";
import NewsletterConfirmToast from "./NewsletterConfirmToast";
import "@/styles/nav-skeleton.css";
import "@/styles/site-nav.css";

/* Shared top bar + navbar + phone drawer (canonical version, unified across pages).

   ≥992px: two rows in one white card — NavTopBar (socials, language, auth,
   search, ادعم صوت) over the logo / links / brand pills row.
   <992px: one row — logo, and [🔔 👤] (signed in) + the burger, which opens
   NavDrawer, which drops down under the card. The drawer replaced Bootstrap's collapse there,
   so #mainNav now only carries the desktop row.

   The client boundary is here for the same two reasons the footer's is: one
   request for the whole bar (GET /layout/navbar) and one `lang` subscription,
   both resolved into a plain view model by resolveNavbar() and handed down as
   props, so the pieces below stay plain functions. The endpoint is the only
   source of the bar's copy — nothing here shadows it, so a field the editor
   leaves empty renders empty. See ./navbar-data.

   Unlike the footer, the bar is NOT swapped for a skeleton wholesale: while
   the request is in flight the real structure is already on screen and only
   the text is drawn as bars (styles/nav-skeleton.css). legacy-main's
   initHeaderPin() lifts `.nav-face` and `<nav class="navbar">` out of <header>
   into a `.header-bar` wrapper as soon as the legacy chunk loads, which is
   before the response can land — so those two elements must be the same DOM
   nodes throughout and React must patch them in place rather than unmount and
   re-insert them into a parent they have since left. Same reason the language
   button and the search inputs are never remounted: initTranslate() and
   initSearch() bind to them once. */
export default function SiteNav() {
  const { lang } = useLang();
  const { data, loading } = useNavbar();
  const nav = resolveNavbar(data, lang);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <NavTopBar nav={nav} loading={loading} />
      <nav className="navbar navbar-expand-lg py-1">
        {" "}
        <div className="container bg-white py-1">
          {" "}
          {/* Plain <a>, not <Link>: SiteNav also renders under the `content`
              route group, which loads content.css instead of style.css — a
              soft navigation home would keep the wrong stylesheet.
              The logo is the API's `logo_url`; with none in the payload the
              <img> is skipped rather than rendered with an empty src. */}
          <a
            className="navbar-brand"
            href="/"
            style={{ marginRight: "0 !important" }}
          >
            {" "}
            {loading ? (
              <span className="nsk-logo" />
            ) : nav.logoUrl ? (
              <img src={nav.logoUrl} alt={nav.siteName} height="60" />
            ) : null}{" "}
          </a>{" "}
          {/* Desktop row only: Bootstrap's `.collapse` keeps it hidden below
              lg, where the drawer lists the same links. */}
          <div
            className="collapse navbar-collapse flex-column flex-lg-row align-items-start align-items-lg-center"
            id="mainNav"
          >
            {" "}
            <NavLinks links={nav.primary} loading={loading} />{" "}
            <NavPills pills={nav.pills} loading={loading} />{" "}
          </div>{" "}
          {/* Phone/tablet header actions — RTL, so they read [🔔] [👤] [☰]
              right-to-left at the far (left) end of the row. */}
          <div className="nav-bar-mobile d-lg-none">
            {" "}
            <NavNotifications className="nav-icon-btn nav-authed-only" />{" "}
            <a
              className="nav-round-btn nav-bar-avatar nav-authed-only"
              href="/account#profile"
              aria-label="حسابي"
              title="حسابي"
              data-i18n-title="nav_account"
            >
              {" "}
              <NavAccountAvatar />{" "}
            </a>{" "}
            <button
              type="button"
              className="nav-round-btn nav-burger"
              aria-label="القائمة"
              title="القائمة"
              data-i18n-title="nav_menu"
              aria-controls="navDrawer"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((current) => !current)}
            >
              {" "}
              {drawerOpen ? <IconNavClose /> : <IconNavMenu />}{" "}
            </button>{" "}
          </div>{" "}
          {/* Inside the card's container, so it drops down at exactly the
              card's width. */}
          <NavDrawer
            nav={nav}
            loading={loading}
            open={drawerOpen}
            onClose={closeDrawer}
          />{" "}
        </div>{" "}
      </nav>
      {/* Zero-height anchor: ≥768px the panel is absolutely positioned inside
          it, so opening the search overlays the hero instead of growing the
          header and pushing the page down. */}
      <div className="mobile-search-anchor">
        <MobileSearchPanel placeholder={nav.searchPlaceholder} />
      </div>
      {/* Renders nothing unless the visitor arrived here from the logout
          button; position:fixed, so its place in the tree doesn't matter. */}
      <LogoutToast />
      {/* Same idea for the newsletter's email-confirmation link: shows only
          when the URL carries ?newsletter=… (see the component). */}
      <NewsletterConfirmToast />
    </>
  );
}
