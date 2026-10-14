// @ts-nocheck
/* eslint-disable */
"use client";
import { useEffect, useRef } from "react";
import {
  IconNavAccount,
  IconNavLogin,
  IconNavLogout,
  IconNavMic,
  IconNavSearch,
} from "@/components/ui/icons";
import { useAccountUser } from "@/components/account/account-user";
import { useLang } from "@/lib/use-lang";
import { socialMark } from "./social-icons";
import NavLinks from "./NavLinks";
import NavPills from "./NavPills";
import NavAccountAvatar from "./NavAccountAvatar";
import NavNotifications from "./NavNotifications";
import NavLogoutButton from "./NavLogoutButton";
import { firstName } from "./NavUserMenu";

/* Phone/tablet menu (<992px): drops down from under the header card, at the
   card's width, when the burger in SiteNav is tapped (the burger turns into
   the close button meanwhile). Top to bottom: welcome card (guest: sign-in / new account;
   signed in: avatar, greeting, bell) · search · links · the two brand pills ·
   language switch · [ادعم صوت] · socials (+ خروج when signed in).

   Always in the DOM, only slid out of view while closed: the ported scripts
   wire their elements once, on the nodes that exist when they run —
   legacy-search binds Enter on every `.search-input`, initTranslate() wires
   every `.language-btn` and translates every [data-i18n]. That is also why the
   static copy here is data-i18n rather than tr(): it is in the server markup,
   and tr() would render English on a hydrating client while the server sent
   Arabic. Only the greeting, which needs the user's name and so is never in
   the server markup, goes through tr(). */
export default function NavDrawer({ nav, loading, open, onClose }) {
  const { user } = useAccountUser();
  const { tr } = useLang();

  const rootRef = useRef(null);

  // Lock the page behind the menu; Escape or a tap outside it closes it (the
  // burger is left to its own toggle).
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("nav-drawer-open");
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event) => {
      const target = event.target;
      if (rootRef.current?.contains(target)) return;
      if (target.closest?.(".nav-burger, .nav-notif-panel")) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      root.classList.remove("nav-drawer-open");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose]);

  // The page behind is locked, so a match legacy-search scrolls to would sit
  // under the menu — close it as soon as a search is submitted.
  const onSearchKey = (event) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) onClose();
  };

  const hello = user ? tr("nav_hello").replace("{name}", firstName(user.name)) : "";

  return (
    <div
      className={"nav-drawer" + (open ? " is-open" : "")}
      id="navDrawer"
      ref={rootRef}
            aria-hidden={!open}
      inert={!open}
    >
      <div className="nav-drawer-body">
        {/* Guest: welcome + the auth pair */}
        <div className="nav-drawer-card nav-drawer-welcome nav-guest-only">
          <div className="nav-drawer-who">
            <span className="nav-drawer-avatar is-empty">
              <IconNavAccount />
            </span>
            <span className="nav-drawer-who-text">
              <strong data-i18n="nav_welcome_title">أهلاً بك في صوت</strong>
              <span data-i18n="nav_welcome_desc">
                سجّل دخولك لتحفظ المحتوى وتتابع الإشعارات
              </span>
            </span>
          </div>
          <div className="nav-drawer-auth">
            <a className="nav-drawer-btn is-filled" href={nav.login.url}>
              <IconNavLogin />
              <span>
                {loading ? <span className="nsk-line" style={{ width: "70px" }} /> : nav.login.label}
              </span>
            </a>
            <a className="nav-drawer-btn is-outline" href={nav.register.url}>
              <span>
                {loading ? <span className="nsk-line" style={{ width: "60px" }} /> : nav.register.label}
              </span>
            </a>
          </div>
        </div>

        {/* Signed in: who, a way to the profile, and the bell */}
        <div className="nav-drawer-card nav-drawer-user nav-authed-only">
          <a className="nav-drawer-who" href="/account#profile" onClick={onClose}>
            <span className="nav-drawer-avatar">
              <NavAccountAvatar />
            </span>
            <span className="nav-drawer-who-text">
              <strong>{hello}</strong>
              <span data-i18n="nav_view_profile">عرض الملف الشخصي</span>
            </span>
          </a>
          <NavNotifications className="nav-icon-btn" />
        </div>

        <div className="nav-drawer-search">
          <IconNavSearch />
          {/* Never remounted — initSearch() binds Enter on every
              `.search-input` once, on the nodes that exist then. */}
          <input
            type="text"
            className="form-control search-input"
            placeholder={nav.searchPlaceholder}
            onKeyDown={onSearchKey}
          />
        </div>

        <div className="nav-drawer-card nav-drawer-list">
          <NavLinks
            links={nav.primary}
            loading={loading}
            variant="drawer"
            onNavigate={onClose}
          />
        </div>

        <NavPills pills={nav.pills} loading={loading} />

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
        <a className="nav-drawer-support" href={nav.support.url}>
          <IconNavMic />
          <span>
            {loading ? <span className="nsk-line" style={{ width: "70px" }} /> : nav.support.label}
          </span>
        </a>
        <div className="nav-drawer-social">
          <span className="nav-drawer-follow nav-guest-only" data-i18n="nav_follow_us">
            تابعنا
          </span>
          <div className="nav-drawer-social-icons">
            {loading
              ? [0, 1, 2, 3, 4, 5].map((index) => (
                  <span className="nsk-circle" key={index} />
                ))
              : nav.socials.map((social, index) => {
                  const Icon = socialMark(social.platform);
                  return (
                    <a
                      href={social.url}
                      key={index}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                    >
                      {Icon ? <Icon /> : <i className={social.icon}></i>}
                    </a>
                  );
                })}
          </div>
          <NavLogoutButton className="nav-drawer-logout nav-authed-only">
            <IconNavLogout />
            <span data-i18n="nav_logout_short">خروج</span>
          </NavLogoutButton>
        </div>
      </div>
    </div>
  );
}
