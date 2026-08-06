"use client";
import { useEffect, useState } from "react";
import { getCurrentLang, t } from "./translations";

/* Reactive language access for markup that mounts AFTER initTranslate() has
   run — the reel viewer's comment list and share sheet.

   The site-wide translator is DOM based: applyTranslations() walks
   [data-i18n] once per page load and once per toggle. Anything rendered later
   (a panel opened by a button) is never visited, so it would keep showing its
   Arabic fallback in English mode; and React would overwrite the translated
   text of a list it re-renders anyway. Those components render their strings
   through `tr()` instead and re-render on the `langchange` event that
   toggleLanguage() dispatches. Existing static markup keeps using data-i18n —
   nothing about the DOM-based flow changes. */
export function useLang() {
  // always "ar" on the server / first paint, exactly like the SSR markup
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    setLang(getCurrentLang());
    const onChange = () => setLang(getCurrentLang());
    document.addEventListener("langchange", onChange);
    return () => document.removeEventListener("langchange", onChange);
  }, []);

  /* `lang` is only here to force the re-render — t() itself reads the saved
     language, so the returned strings are always in the current one */
  return { lang, tr: (key: string) => t(key) };
}
