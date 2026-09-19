"use client";
// @ts-nocheck
/* eslint-disable */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Main navbar link list — `nav.primary` of GET /layout/navbar with the support
   CTA spliced in for the collapsed menu, resolved by ./navbar-data. The labels
   are the API's; the destinations are this site's own (ROUTE_BY_KEY there), and
   so is the choice of <Link> vs <a>: only / and /about share a stylesheet with
   every page that renders this bar, so everything else must reload — see
   CLAUDE.md, "CSS groups".

   Still a client leaf: it reads the current path to set the active class. */
export default function NavLinks({ links, loading }) {
  const pathname = usePathname();
  // Static export (output: 'export') serves every route as /team/index.html, so
  // in production usePathname() returns "/team/" and a strict === "/team" test
  // never matches — the active underline disappeared. Compare without the
  // trailing slash ("/" itself must keep it).
  const path = pathname?.replace(/\/+$/, "") || "/";
  const isActive = (href) => (path === href ? " active" : "");

  // Six rows, the length of the list the API sends once the support entry is in
  // — so the collapsed menu doesn't grow when the response lands.
  if (loading) {
    return (
      <ul
        className="navbar-nav mb-2 mb-lg-0 fw-bold"
        style={{ textAlign: "start" }}
      >
        {" "}
        {["44px", "48px", "52px", "40px", "56px", "78px"].map((width, index) => (
          <li className="nav-item ms-lg-3" key={index}>
            {" "}
            <span className="nav-link font-16">
              <span className="nsk-line" style={{ width }} />
            </span>{" "}
          </li>
        ))}{" "}
      </ul>
    );
  }

  return (
    <ul
      className="navbar-nav mb-2 mb-lg-0 fw-bold"
      style={{ textAlign: "start" }}
    >
      {" "}
      {links.map((link, index) => (
        <li
          className={"nav-item ms-lg-3" + (link.mobileOnly ? " d-lg-none" : "")}
          key={index}
        >
          {" "}
          {link.soft ? (
            <Link
              className={"nav-link font-16" + isActive(link.url)}
              href={link.url}
            >
              {link.label}
            </Link>
          ) : (
            <a
              className={"nav-link font-16" + isActive(link.url)}
              href={link.url}
            >
              {link.label}
            </a>
          )}{" "}
        </li>
      ))}{" "}
    </ul>
  );
}
