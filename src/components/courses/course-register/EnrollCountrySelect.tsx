"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/lib/countries";
import { useLang } from "@/lib/use-lang";

/* The dial-code picker in the enrollment form's phone field.

   It wears the `join-country-*` classes rather than a set of its own: the
   join modal's box is the same control pixel for pixel, and style.css — which
   defines them — is loaded on this route (it is in the `(main)` group). The
   sibling pickers on the collaborate and media forms each carry their own
   namespace only because those pages load their own stylesheet instead.

   The chosen code rides in a hidden input as well as in `onChange`, so a form
   that later posts this can read it like any other field. */
export default function EnrollCountrySelect({
  value,
  onChange,
  name = "dial_code",
}: {
  value: string;
  onChange: (dialCode: string) => void;
  name?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /* names follow the site language; this panel mounts after initTranslate()
     has walked the DOM, so it reads the language itself — see lib/use-lang */
  const { lang, tr } = useLang();

  /* a click anywhere else, or Escape, puts the menu away */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // the modal closes on Escape too — this one is handled here
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey, true);
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

  const choose = (co: Country) => {
    onChange(co.d);
    setOpen(false);
    setQuery("");
  };

  return (
    <div
      className={"join-country-box crs-en-country" + (open ? " is-open" : "")}
      ref={boxRef}
    >
      <button
        type="button"
        className="crs-en-country-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={tr("crs_en_country")}
      >
        <i className="fa-solid fa-chevron-down join-country-caret"></i>
        <span className="join-country-code">{selected.d}</span>
        <span className={`fi fi-${selected.c} join-country-flag`}></span>
      </button>

      <input type="hidden" name={name} value={selected.d} />

      <div className="join-country-menu" dir={lang === "en" ? "ltr" : "rtl"}>
        <div className="join-country-search">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("crs_en_country_search")}
          />
        </div>

        <div className="join-country-list" role="listbox">
          {shown.map((co) => (
            <button
              type="button"
              key={co.c + co.d}
              className={
                "join-country-option" +
                (co.d === selected.d && co.c === selected.c ? " is-selected" : "")
              }
              role="option"
              aria-selected={co.c === selected.c}
              onClick={() => choose(co)}
            >
              <span className={`fi fi-${co.c} join-country-option-flag`}></span>
              <span className="join-country-option-name">{nameOf(co)}</span>
              <span className="join-country-option-code">{co.d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
