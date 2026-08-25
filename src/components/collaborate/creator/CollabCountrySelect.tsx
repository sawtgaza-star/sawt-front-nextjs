"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconFieldCaret } from "@/components/collaborate/collaborate-icons";
import { COUNTRIES, type Country } from "@/lib/countries";
import { useLang } from "@/lib/use-lang";

/* Dial-code picker in the wizard's phone field — the same searchable
   flag + name + code menu the consult form and the join modal have, in this
   page's own `cl-` namespace so /collaborate doesn't have to pull in media.css.
   The flag glyphs come from flag-icons, loaded globally in the root layout. */
export default function CollabCountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (dial: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /* names follow the site language, and the menu is built after
     initTranslate() has walked the DOM — so it reads the language itself */
  const { lang, tr } = useLang();

  /* a click anywhere else, or Escape, puts the menu away */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const selected =
    COUNTRIES.find((co) => co.d === value) ?? COUNTRIES[0];
  const nameOf = (co: Country) => (lang === "en" ? co.e : co.n);

  /* the search matches either name, the dial code or the ISO2 code */
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (co) =>
        co.n.toLowerCase().includes(q) ||
        co.e.toLowerCase().includes(q) ||
        co.d.toLowerCase().includes(q) ||
        co.c.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className={"cl-country" + (open ? " is-open" : "")} ref={boxRef}>
      <button
        type="button"
        className="cl-country-box"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`fi fi-${selected.c} cl-country-flag`}></span>
        <span className="cl-country-code">{selected.d}</span>
        <span className="cl-country-caret" aria-hidden="true">
          <IconFieldCaret />
        </span>
      </button>

      <div className="cl-country-menu" dir={lang === "en" ? "ltr" : "rtl"}>
        <div className="cl-country-search">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("sm_form_country_search")}
          />
        </div>

        <div className="cl-country-list" role="listbox">
          {shown.map((co) => (
            <button
              type="button"
              key={co.c + co.d}
              className={
                "cl-country-option" + (co.d === selected.d ? " is-selected" : "")
              }
              role="option"
              aria-selected={co.d === selected.d}
              onClick={() => {
                onChange(co.d);
                setOpen(false);
                setQuery("");
              }}
            >
              <span className={`fi fi-${co.c} cl-country-option-flag`}></span>
              <span className="cl-country-option-name">{nameOf(co)}</span>
              <span className="cl-country-option-code">{co.d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
