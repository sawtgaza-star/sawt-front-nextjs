"use client";
/* An expert card's bio, clamped to a few lines with "عرض المزيد / عرض أقل".
   The toggle only appears when the text actually runs past the clamp —
   measured, since how many lines a bio takes depends on the card's width —
   and is re-checked on resize. Strings go through tr(): the bio arrives with
   the payload, after initTranslate() has walked the page. */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";

export default function ExpertBio({ text }: { text: string }) {
  const { tr } = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // measured while clamped; once opened the toggle stays to close it again
    const check = () => {
      if (!el.classList.contains("is-open")) {
        setOverflows(el.scrollHeight - el.clientHeight > 1);
      }
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <p ref={ref} className={"inc-expert-desc" + (open ? " is-open" : "")}>
        {text}
      </p>
      {overflows ? (
        <button
          type="button"
          className="inc-expert-more"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {tr(open ? "inc_expert_less" : "inc_expert_more")}
        </button>
      ) : null}
    </>
  );
}
