// @ts-nocheck
/* eslint-disable */
import {
  IconNavSearch,
  IconNavUserPlus,
  IconNavMic,
  IconNavAccount,
  IconNavBell,
} from "@/components/ui/icons";
import NavSocialLinks from "./NavSocialLinks";

/* Top utility bar, above the main navbar.
   RTL layout — first child renders on the RIGHT:

   guest:      [social links] ......... [En | search] [أنشئ الحساب] [ادعم صوت]
   signed in:  [social links] ... [En | 🔔 | 👤 | search] [ادعم صوت]

   Both variants are rendered; `.nav-guest-only` / `.nav-authed-only` in
   style.css pick one off the `.sawt-authed` class that the pre-paint script in
   app/layout.tsx puts on <html>. See lib/auth-state.ts. */
export default function NavTopBar() {
  return (
    <div className="container nav-face py-2 text-white border-bottom border-light border-opacity-25">
      {/* No inner `.container`: nesting one adds a second 12px gutter, which
          pushed [ادعم صوت] 12px in from the navbar's pills row below it. This
          row shares the outer container's content box, so both align. */}
      <div className="d-flex justify-content-between align-items-center">
        <NavSocialLinks />{" "}
        <div className="nav-top-actions d-flex align-items-center">
          {" "}
          {/* LTR island so the pair reads [🔍] [En] left-to-right, as in the design */}
          <div className="nav-top-utils">
            {" "}
            <button
              type="button"
              className="nav-search-btn"
              aria-label="بحث"
            >
              {" "}
              <IconNavSearch />{" "}
            </button>{" "}
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
            <button
              type="button"
              className="language-btn nav-lang-btn"
              aria-label="تغيير اللغة"
            >
              {" "}
              <span data-i18n="auth_lang_label">En</span>{" "}
            </button>{" "}
          </div>{" "}
          {/* icon first == icon on the trailing (right) edge of the pill in RTL */}
          <a className="nav-cta nav-cta-register nav-guest-only" href="/register">
            {" "}
            <IconNavUserPlus />{" "}
            <span data-i18n="register_account">أنشئ الحساب</span>{" "}
          </a>{" "}
          <a className="nav-cta nav-cta-support" href="/support">
            {" "}
            <IconNavMic /> <span data-i18n="nav_support">ادعم صوت</span>{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
