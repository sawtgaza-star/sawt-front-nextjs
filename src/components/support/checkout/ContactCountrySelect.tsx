"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/lib/countries";
import { useLang } from "@/lib/use-lang";

/* The WhatsApp field's dial-code picker on "التواصل" — the same searchable
   flag + name + code menu as the media consult form (MediaCountrySelect), but
   controlled: the chosen ISO2 code lives in CheckoutWizard with the rest of the
   contact details, so it survives the screen changes. */
export default function ContactCountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /* the menu is built after initTranslate() walked the DOM, so it reads the
     language itself */
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

  const selected = COUNTRIES.find((co) => co.c === value) ?? COUNTRIES[0];
  const nameOf = (co: Country) => (lang === "en" ? co.e : co.n);

  /* the search matches either name, the dial code or the ISO2 code */
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (co) =>
        co.n.toLowerCase().includes(q) ||
        co.e.toLowerCase().includes(q) ||
        co.d.includes(q) ||
        co.c.includes(q),
    );
  }, [query]);

  const choose = (iso: string) => {
    onChange(iso);
    setOpen(false);
    setQuery("");
  };

  return (
    <div
      className={"sp-country-select" + (open ? " is-open" : "")}
      ref={boxRef}
    >
      <button
        type="button"
        className="sp-country-box"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${nameOf(selected)} ${selected.d}`}
      >
        <span className={`fi fi-${selected.c} sp-country-flag`}></span>
        <span className="sp-country-code">{selected.d}</span>
        <i className="ri-arrow-down-s-line sp-country-caret"></i>
      </button>

      <div className="sp-country-menu" dir={lang === "en" ? "ltr" : "rtl"}>
        <div className="sp-country-search">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("sm_form_country_search")}
          />
        </div>

        <div className="sp-country-list" role="listbox">
          {shown.map((co) => (
            <button
              type="button"
              key={co.c}
              className={
                "sp-country-option" + (co.c === selected.c ? " is-selected" : "")
              }
              role="option"
              aria-selected={co.c === selected.c}
              onClick={() => choose(co.c)}
            >
              <span className={`fi fi-${co.c} sp-country-option-flag`}></span>
              <span className="sp-country-option-name">{nameOf(co)}</span>
              <span className="sp-country-option-code">{co.d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
