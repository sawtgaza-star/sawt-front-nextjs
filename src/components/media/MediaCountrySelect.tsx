"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/lib/countries";
import { useLang } from "@/lib/use-lang";

/* The dial-code picker in the consult form's phone field — the same searchable
   flag + name + code menu the join modal has, written as a React leaf so the
   form around it can stay a Server Component. The value rides in a hidden
   input, so a future submit handler reads it off the form like any other field. */
export default function MediaCountrySelect({ name = "dial_code" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
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

  const selected = COUNTRIES[index];
  const nameOf = (co: Country) => (lang === "en" ? co.e : co.n);

  /* the search matches either name, the dial code or the ISO2 code */
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES.map((co, i) => ({ co, i }));
    return COUNTRIES.map((co, i) => ({ co, i })).filter(
      ({ co }) =>
        co.n.toLowerCase().includes(q) ||
        co.e.toLowerCase().includes(q) ||
        co.d.toLowerCase().includes(q) ||
        co.c.toLowerCase().includes(q),
    );
  }, [query]);

  const choose = (i: number) => {
    setIndex(i);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={"sm-country-select" + (open ? " is-open" : "")} ref={boxRef}>
      <button
        type="button"
        className="sm-country-box"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <i className="fa-solid fa-chevron-down sm-country-caret"></i>
        <span className="sm-country-code">{selected.d}</span>
        <span className={`fi fi-${selected.c} sm-country-flag`}></span>
      </button>

      <input type="hidden" name={name} value={selected.d} />

      <div className="sm-country-menu" dir={lang === "en" ? "ltr" : "rtl"}>
        <div className="sm-country-search">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("sm_form_country_search")}
          />
        </div>

        <div className="sm-country-list" role="listbox">
          {shown.map(({ co, i }) => (
            <button
              type="button"
              key={co.c + co.d}
              className={"sm-country-option" + (i === index ? " is-selected" : "")}
              role="option"
              aria-selected={i === index}
              onClick={() => choose(i)}
            >
              <span className={`fi fi-${co.c} sm-country-option-flag`}></span>
              <span className="sm-country-option-name">{nameOf(co)}</span>
              <span className="sm-country-option-code">{co.d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
