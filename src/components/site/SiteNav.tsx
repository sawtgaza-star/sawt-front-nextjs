// @ts-nocheck
/* eslint-disable */
"use client";
import {
  IconGlobe,
  IconNavAccount,
  IconNavBell,
  IconChevronLeftSmall,
  IconNavUserPlus,
  IconNavMic,
} from "@/components/ui/icons";
import { useNavbar } from "@/lib/api/use-navbar";
import { useLang } from "@/lib/use-lang";
import { resolveNavbar } from "./navbar-data";
import NavTopBar from "./NavTopBar";
import NavLinks from "./NavLinks";
import NavPills from "./NavPills";
import NavSocialLinks from "./NavSocialLinks";
import MobileSearchPanel from "./MobileSearchPanel";
import NavLogoutButton from "./NavLogoutButton";
import LogoutToast from "./LogoutToast";
import "@/styles/nav-skeleton.css";

/* Shared top bar + navbar + mobile search (canonical version, unified across pages).

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

  return (
    <>
      <NavTopBar nav={nav} loading={loading} />
      <nav className="navbar navbar-expand-lg py-1">
        {" "}
        <div className="container bg-white py-1">
          {" "}
          <button
            className="btn mobile-nav-search d-lg-none p-0"
            type="button"
            aria-label="بحث"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="rgba(76, 92, 55, 1)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            {" "}
            <span className="navbar-toggler-icon d-none d-lg-inline-block"></span>{" "}
            <svg
              className="navbar-toggler-svg d-lg-none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              {" "}
              <path
                d="M14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H14ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H10C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4H20Z"
                fill="#484848"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <div
            className="collapse navbar-collapse flex-column flex-lg-row align-items-start align-items-lg-center"
            id="mainNav"
          >
            {" "}
            <NavLinks links={nav.primary} loading={loading} />{" "}
            <NavPills pills={nav.pills} loading={loading} />{" "}
            {/* The search field, the register/sign-in pair and the language
                toggle below only serve the collapsed (mobile) menu — on ≥lg
                their desktop counterparts live in NavTopBar. */}
            <div className="d-flex gap-2 nav-search-div d-lg-none">
              {" "}
              <div className="position-relative nav-search-div">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="fa fa-search position-absolute top-50 end-0 translate-middle-y me-3"
                >
                  {" "}
                  <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                  <path
                    fill="none"
                    stroke="rgba(145, 145, 145, 1)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
                  ></path>{" "}
                </svg>{" "}
                {/* Never remounted — initSearch() binds Enter on every
                    `.search-input` once, on the nodes that exist then. */}
                <input
                  type="text"
                  className="form-control custom-placeholder py-2 search-input"
                  placeholder={nav.searchPlaceholder}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="contact-info-nav small d-flex nav-guest-only">
              {" "}
              {loading ? (
                <>
                  {" "}
                  <span className="nsk-auth-btn" style={{ width: "96px" }} />{" "}
                  <span className="nsk-auth-btn" style={{ width: "104px" }} />{" "}
                </>
              ) : (
                <>
                  {" "}
                  <div className="register-btn">
                    {" "}
                    <a href={nav.register.url}>{nav.register.label}</a>{" "}
                  </div>{" "}
                  <div className="sign-in-btn">
                    {" "}
                    <a href={nav.login.url}>{nav.login.label}</a>{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
            {/* Same pair as the desktop top bar, for the collapsed menu. */}
            <div className="nav-mobile-account align-items-center gap-2 nav-authed-only">
              {" "}
              <a
                className="nav-icon-btn"
                href="#"
                aria-label="حسابي"
                title="حسابي"
                data-i18n-title="nav_account"
              >
                {" "}
                <IconNavAccount />{" "}
              </a>{" "}
              <a
                className="nav-icon-btn"
                href="#"
                aria-label="الإشعارات"
                title="الإشعارات"
                data-i18n-title="nav_notifications"
              >
                {" "}
                <IconNavBell />{" "}
                <span className="nav-bell-badge">10</span>{" "}
              </a>{" "}
              {/* The group itself is `.nav-authed-only`, so the button only
                  needs the plain icon styling. */}
              <NavLogoutButton className="nav-icon-btn" />{" "}
            </div>{" "}
            <div className="searchDiv d-flex d-lg-none align-items-center gap-2">
              {" "}
              <button
                type="button"
                className="language-btn nav-lang-btn"
                aria-label="تغيير اللغة"
              >
                {" "}
                <IconGlobe />{" "}
                <span>
                  {loading ? <span className="nsk-lang" /> : nav.langLabel}
                </span>{" "}
              </button>{" "}
            </div>{" "}
            {/* Phone-only tail of the drawer (<768px): language row, the CTA
                pair and the social links. On ≥768 the top bar owns all three
                and `.nav-mobile-extra` is display:none — see style.css. */}
            <div className="nav-mobile-extra">
              {" "}
              <div className="nav-mobile-lang">
                {" "}
                {/* Neither of these two is in the payload, so they keep the
                    dictionary: "اللغة" and the name of the language the toggle
                    switches TO. */}
                <span data-i18n="nav_language">اللغة</span>{" "}
                <button
                  type="button"
                  className="language-btn nav-mobile-lang-btn"
                  aria-label="تغيير اللغة"
                >
                  {" "}
                  <IconChevronLeftSmall />{" "}
                  <span data-i18n="nav_lang_switch">English</span>{" "}
                </button>{" "}
              </div>{" "}
              {/* RTL: first child sits on the right, as in the design */}
              <div className="nav-mobile-cta">
                {" "}
                {loading ? (
                  <>
                    {" "}
                    <span
                      className="nsk-cta"
                      style={{ width: "132px" }}
                    />{" "}
                    <span
                      className="nsk-cta"
                      style={{ width: "118px" }}
                    />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <a
                      className="nav-cta nav-cta-register nav-guest-only"
                      href={nav.register.url}
                    >
                      {" "}
                      <IconNavUserPlus /> <span>{nav.register.label}</span>{" "}
                    </a>{" "}
                    <a className="nav-cta nav-cta-support" href={nav.support.url}>
                      {" "}
                      <IconNavMic /> <span>{nav.support.label}</span>{" "}
                    </a>{" "}
                  </>
                )}{" "}
              </div>{" "}
              <div className="nav-mobile-social">
                {" "}
                <NavSocialLinks
                  label={nav.socialsLabel}
                  socials={nav.socials}
                  loading={loading}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
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
    </>
  );
}
