// @ts-nocheck
/* eslint-disable */
import {
  IconNavUserPlus,
  IconNavMic,
  IconNavAccount,
  IconNavBell,
} from "@/components/ui/icons";
import NavSocialLinks from "./NavSocialLinks";
import NavLogoutButton from "./NavLogoutButton";
import NavSearch from "./NavSearch";

/* Top utility bar, above the main navbar.
   RTL layout — first child renders on the RIGHT:

   guest:      [social links] ......... [En | search] [أنشئ الحساب] [ادعم صوت]
   signed in:  [social links] ... [En | 🔔 | 👤 | search] [ادعم صوت]

   Both variants are rendered; `.nav-guest-only` / `.nav-authed-only` in
   style.css pick one off the `.sawt-authed` class that the pre-paint script in
   app/layout.tsx puts on <html>. See lib/auth-state.ts.

   Copy comes from `nav` (GET /layout/navbar, resolved by ./navbar-data) — the
   social row, the two CTAs, the search placeholder and the language label. The
   account and notification buttons keep their data-i18n titles: those two are
   not in the payload. */
export default function NavTopBar({ nav, loading }) {
  return (
    <div className="container nav-face py-2 text-white border-bottom border-light border-opacity-25">
      {/* No inner `.container`: nesting one adds a second 12px gutter, which
          pushed [ادعم صوت] 12px in from the navbar's pills row below it. This
          row shares the outer container's content box, so both align. */}
      <div className="d-flex justify-content-between align-items-center">
        <NavSocialLinks
          label={nav.socialsLabel}
          socials={nav.socials}
          loading={loading}
        />{" "}
        <div className="nav-top-actions d-flex align-items-center">
          {" "}
          {/* LTR island so the pair reads [🔍] [En] left-to-right, as in the design */}
          <div className="nav-top-utils">
            {" "}
            {/* Icon + the field it opens beside itself — see NavSearch. */}
            <NavSearch placeholder={nav.searchPlaceholder} />{" "}
            {/* Signed-in only, still inside the LTR island so the row reads
                [🔍] [👤] [🔔] [En] left-to-right, as in the design. */}
            <a
              className="nav-icon-btn nav-authed-only"
              href="#"
              aria-label="حسابي"
              title="حسابي"
              data-i18n-title="nav_account"
            >
              {" "}
              <IconNavAccount />{" "}
            </a>{" "}
            <a
              className="nav-icon-btn nav-authed-only"
              href="#"
              aria-label="الإشعارات"
              title="الإشعارات"
              data-i18n-title="nav_notifications"
            >
              {" "}
              <IconNavBell />{" "}
              <span className="nav-bell-badge">10</span>{" "}
            </a>{" "}
            <NavLogoutButton />{" "}
            {/* Never remounted: initTranslate() wires every .language-btn once,
                so the button has to be the same node before and after the API
                answers — only the label inside it changes. */}
            <button
              type="button"
              className="language-btn nav-lang-btn"
              aria-label="تغيير اللغة"
            >
              {" "}
              <span>
                {loading ? <span className="nsk-lang" /> : nav.langLabel}
              </span>{" "}
            </button>{" "}
          </div>{" "}
          {/* icon first == icon on the trailing (right) edge of the pill in RTL */}
          {loading ? (
            <>
              {" "}
              <span className="nsk-cta" style={{ width: "132px" }} />{" "}
              <span className="nsk-cta" style={{ width: "118px" }} />{" "}
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
      </div>{" "}
    </div>
  );
}
