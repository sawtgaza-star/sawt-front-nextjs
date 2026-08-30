"use client";
/* The "الرئيسية" crumb that opens every breadcrumb trail on the site.

   The site is three places under one roof — منصة صوت, حاضنة صوت and صوت ميديا
   — each with its own navbar and its own landing page. So "الرئيسية" means the
   home of whichever one the page belongs to, read off the path: a crumb on
   /media/works goes to /media, one on a course goes to /incubator, and
   everything else goes to `/`. Sending them all to `/` dropped a visitor out of
   the section they were reading, into a different navbar.

   Used by every hero's crumb (about, content, creators, courses, media, news,
   support, team, collaborate) — one place, so the rule is the same everywhere. */

import { usePathname } from "next/navigation";

/* Which landing page this path belongs to. Prefixes, not an exact list, so new
   routes under a section are covered as they are added:
     /media, /media/works/…, /media/services/…, /media/contact → صوت ميديا
     /incubator, /courses/…                                    → حاضنة صوت
     everything else                                           → منصة صوت */
export function sectionHome(pathname: string | null): string {
  const path = pathname || "/";
  if (path === "/media" || path.startsWith("/media/")) return "/media";
  if (
    path === "/incubator" ||
    path.startsWith("/incubator/") ||
    path.startsWith("/courses")
  ) {
    return "/incubator";
  }
  return "/";
}

export default function BreadcrumbHome() {
  /* Plain <a>, as every crumb here has always been and as the links in SiteNav
     are — see the CSS-groups convention in CLAUDE.md. */
  return (
    <a href={sectionHome(usePathname())} data-i18n="nav_home">
      الرئيسية
    </a>
  );
}
