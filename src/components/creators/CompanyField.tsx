"use client";
/* A partner company's line of business (PartnerCompanies), clamped to three
   lines with "عرض المزيد / عرض أقل" — the same pattern as the incubator's
   ExpertBio. The toggle only appears when the text actually runs past the
   clamp (measured, and re-checked on resize).

   The card never changes height. Closed, "… عرض المزيد" sits ON the third
   line, right after the ellipsis (.cr-company-more-inline covers the clamp's
   own "…"). Open, the text keeps the same three-line box and scrolls inside
   it, with "عرض أقل" at the very end. Labels go through tr(): the card mounts
   after initTranslate() has walked the page. */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";

export default function CompanyField({ text }: { text: string }) {
  const { tr } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* More than three lines of text? Compared with three real line heights,
       not with clientHeight: a fractional line box (14px × 1.6) and the
       font's descenders make scrollHeight run a pixel or two past even a
       one-line field, which put the button on every card. */
    const check = () => {
      if (el.classList.contains("is-open")) return;
      const line = parseFloat(getComputedStyle(el).lineHeight) || 0;
      setOverflows(line > 0 && el.scrollHeight > line * 3 + line / 2);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const toggle = () => {
    // closing goes back to the first lines, not wherever the scroll was left
    if (open && ref.current) ref.current.scrollTop = 0;
    setOpen((current) => !current);
  };

  return (
    <span className="cr-company-field-wrap">
      <span ref={ref} className={"cr-company-field" + (open ? " is-open" : "")}>
        {text}
        {open ? (
          <>
            {" "}
            <button type="button" className="cr-company-more" aria-expanded onClick={toggle}>
              {tr("view_less")}
            </button>
          </>
        ) : null}
      </span>
      {overflows && !open ? (
        <button
          type="button"
          className="cr-company-more cr-company-more-inline"
          aria-expanded={false}
          onClick={toggle}
        >
          <span aria-hidden="true">… </span>
          {tr("view_more")}
        </button>
      ) : null}
    </span>
  );
}
