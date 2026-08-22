"use client";
// @ts-nocheck
/* eslint-disable */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Main navbar link list. Client leaf: reads the current path to set the active
   class (the only reason SiteNav needs the client boundary). */
export default function NavLinks() {
  const pathname = usePathname();
  // Static export (output: 'export') serves every route as /team/index.html, so
  // in production usePathname() returns "/team/" and a strict === "/team" test
  // never matches — the active underline disappeared. Compare without the
  // trailing slash ("/" itself must keep it).
  const path = pathname?.replace(/\/+$/, "") || "/";
  const isActive = (href) => (path === href ? " active" : "");
  return (
    <ul
      className="navbar-nav mb-2 mb-lg-0 fw-bold"
      style={{ textAlign: "start" }}
    >
      {" "}
      <li className="nav-item ms-lg-3">
        {" "}
        <Link
          className={"nav-link font-16" + isActive("/")}
          href="/"
          data-i18n="nav_home"
        >
          الرئيسية
        </Link>{" "}
      </li>{" "}
      <li className="nav-item ms-lg-3">
        {" "}
        <Link
          className={"nav-link font-16" + isActive("/about")}
          href="/about"
          target="_self"
          data-i18n="nav_about"
        >
          من نحن
        </Link>{" "}
      </li>{" "}
      <li className="nav-item ms-lg-3">
        {" "}
        <a
          className={"nav-link font-16" + isActive("/content")}
          href="/content"
          data-i18n="nav_content"
        >
          محتوانا
        </a>{" "}
      </li>{" "}
      <li className="nav-item ms-lg-3">
        {" "}
        <a
          className={"nav-link font-16" + isActive("/team")}
          href="/team"
          data-i18n="nav_team"
        >
          الفريق
        </a>{" "}
      </li>{" "}
      {/* ادعم صوت is a top-bar CTA on desktop (NavTopBar) — this entry only
          serves the collapsed menu, which is also why it sits above صناع
          المحتوى: that's the order the phone design lists them in.
          حاضنة صوت / صوت ميديا moved to NavPills. */}
      <li className="nav-item ms-lg-3 d-lg-none">
        {" "}
        <a
          className={"nav-link font-16" + isActive("/support")}
          href="/support"
          data-i18n="nav_support"
        >
          ادعم صوت
        </a>{" "}
      </li>{" "}
      <li className="nav-item ms-lg-3">
        {" "}
        <a
          className={"nav-link font-16" + isActive("/creators")}
          href="/creators"
          data-i18n="nav_creators"
        >
          صناع المحتوى
        </a>{" "}
      </li>{" "}
    </ul>
  );
}
