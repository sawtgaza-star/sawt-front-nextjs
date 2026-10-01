"use client";
import { useEffect } from "react";

/* Icon-font stylesheets that only a few screens need. They used to be <link>s
   in the root layout, so every page — the home page included — waited on two
   extra CDN round-trips (jsdelivr) before its first paint, for icons it never
   showed on load.

   Rendered by the components that draw those icons instead. React 19 hoists a
   `<link rel="stylesheet" precedence>` into <head> (prerendered pages get it
   in their static HTML), loads each href once however many components render
   it, and holds back the markup that needs it until it has loaded, so no icon
   paints unstyled. The app's own `.fi` overrides are scoped to outrank these
   rules (see style.css / media.css / support.css), so load order is moot. */

export const FLAG_ICONS_CSS =
  "https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css";
export const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css";

/** `fi fi-xx` country flags — for markup that shows them as soon as it renders. */
export function FlagIconsCss() {
  return <link rel="stylesheet" href={FLAG_ICONS_CSS} precedence="default" />;
}

/** `ri-*` icons (support checkout). */
export function RemixiconCss() {
  return <link rel="stylesheet" href={REMIXICON_CSS} precedence="default" />;
}

/** For icons that sit in closed UI — the join modal's country picker: appends
    the sheet after hydration, so it never blocks the page's first paint and is
    in long before anyone opens the dialog. */
export function DeferredStylesheet({ href }: { href: string }) {
  useEffect(() => {
    if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
  return null;
}
