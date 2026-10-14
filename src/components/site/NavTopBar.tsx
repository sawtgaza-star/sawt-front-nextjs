// @ts-nocheck
/* eslint-disable */
import { IconNavLogin, IconNavMic } from "@/components/ui/icons";
import NavSocialLinks from "./NavSocialLinks";
import NavNotifications from "./NavNotifications";
import NavSearch from "./NavSearch";
import NavUserMenu from "./NavUserMenu";

/* Top utility bar, above the main navbar (≥992px only — on smaller screens the
   phone header and drawer take over, see SiteNav / NavDrawer).
   RTL layout — first child renders on the RIGHT:

   guest:      [social links] ........ [En | تسجيل الدخول] [🔍] [ادعم صوت]
   signed in:  [social links] ... [En | أهلاً، أحمد ˅] [🔔] [🔍] [ادعم صوت]

   Both variants are rendered; `.nav-guest-only` / `.nav-authed-only` in
   style.css pick one off the `.sawt-authed` class that the pre-paint script in
   app/layout.tsx puts on <html>. See lib/auth-state.ts.

   Copy comes from `nav` (GET /layout/navbar, resolved by ./navbar-data) — the
   social row, the two CTAs, the search placeholder and the language label. */
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
          <span className="nav-top-divider" aria-hidden="true" />{" "}
          {loading ? (
            <span className="nsk-cta nav-guest-only" style={{ width: "128px" }} />
          ) : (
            <a className="nav-cta nav-cta-login nav-guest-only" href={nav.login.url}>
              {" "}
              <IconNavLogin /> <span>{nav.login.label}</span>{" "}
            </a>
          )}{" "}
          <NavUserMenu />{" "}
          <NavNotifications />{" "}
          {/* Icon + the field it opens beside itself — see NavSearch. */}
          <NavSearch placeholder={nav.searchPlaceholder} />{" "}
          {/* icon first == icon on the trailing (right) edge of the pill in RTL */}
          {loading ? (
            <span className="nsk-cta" style={{ width: "118px" }} />
          ) : (
            <a className="nav-cta nav-cta-support" href={nav.support.url}>
              {" "}
              <IconNavMic /> <span>{nav.support.label}</span>{" "}
            </a>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
