"use client";
import { useEffect, useRef, useState } from "react";
import { IconFieldCaret } from "@/components/collaborate/collaborate-icons";
import { useLang } from "@/lib/use-lang";
import { SOCIAL_PLATFORMS } from "./creator-form-data";

/* Platform picker of a "روابط مواقع التواصل الاجتماعي" row.
   A native <select> draws its option list with the OS widget — the blue
   highlight and the system font ignore every rule in collaborate.css and the
   list spills over the fields underneath it. So this is the same button +
   panel pattern CollabCountrySelect uses, which the page can actually style.
   Labels go through tr() because the menu is built after initTranslate() has
   walked the DOM, so data-i18n would never reach it. */
export default function CollabPlatformSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (platform: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
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

  const selected =
    SOCIAL_PLATFORMS.find((p) => p.value === value) ?? SOCIAL_PLATFORMS[0];

  return (
    <div className={"cl-social-pick" + (open ? " is-open" : "")} ref={boxRef}>
      <button
        type="button"
        className="cl-social-pick-box"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="cl-social-brand" aria-hidden="true">
          <i className={selected.icon}></i>
        </span>
        <span className="cl-social-name">{tr(selected.labelKey)}</span>
        <span className="cl-social-caret" aria-hidden="true">
          <IconFieldCaret />
        </span>
      </button>

      <div
        className="cl-social-menu"
        role="listbox"
        dir={lang === "en" ? "ltr" : "rtl"}
      >
        {SOCIAL_PLATFORMS.map((p) => (
          <button
            type="button"
            key={p.value}
            className={
              "cl-social-option" + (p.value === selected.value ? " is-selected" : "")
            }
            role="option"
            aria-selected={p.value === selected.value}
            onClick={() => {
              onChange(p.value);
              setOpen(false);
            }}
          >
            <span className="cl-social-option-brand" aria-hidden="true">
              <i className={p.icon}></i>
            </span>
            <span className="cl-social-option-name">{tr(p.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
