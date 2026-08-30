"use client";
/* Top-bar search: the icon opens a field that grows out beside it, into the
   empty middle of the bar. It replaces the full-width card that used to drop
   under the header on ≥768px — the phone header icon (.mobile-nav-search)
   still opens that panel, which is the only place it is wanted now.

   The only interactive piece of the top bar besides the logout button, so it
   is its own client leaf and NavTopBar stays a Server Component.

   Searching itself is left to the ported script: it binds Enter on every
   `.search-input` on the page (lib/legacy-search.ts), which is why the field
   carries that class and no handler of its own — the same wiring the drawer's
   search box has. This component only owns the open/closed state.

   Strings come from tr(), not data-i18n: React re-renders this on every
   toggle, which would put the Arabic fallback back over what
   applyTranslations() had written into the placeholder. See lib/use-lang.ts. */

import { useEffect, useRef, useState } from "react";
import { IconNavSearch } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";
import "@/styles/nav-search.css";

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { tr } = useLang();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    /* Open, it covers part of the bar and takes the keyboard — so a click
       anywhere else, or Escape, puts it away again. */
    const onPointerDown = (event: PointerEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={"nav-search" + (open ? " is-open" : "")} ref={boxRef}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-search-btn"
        aria-label={tr("nav_search")}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <IconNavSearch />
      </button>
      {/* Always in the DOM — a field that is mounted only while open has no
          width to animate from, and legacy-search binds its Enter handler once,
          on the elements that exist then. */}
      <input
        ref={inputRef}
        type="text"
        className="nav-search-field search-input"
        placeholder={tr("search_placeholder")}
        aria-label={tr("nav_search")}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
      />
    </div>
  );
}
