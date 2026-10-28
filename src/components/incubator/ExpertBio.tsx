"use client";
/* An expert card's bio, clamped to a few lines with "عرض المزيد / عرض أقل".
   The toggle only appears when the text actually runs past the clamp —
   measured, since how many lines a bio takes depends on the card's width —
   and is re-checked on resize. Strings go through tr(): the bio arrives with
   the payload, after initTranslate() has walked the page.

   The card never changes height. Closed, "… عرض المزيد" sits ON the last
   line, right after the ellipsis (it covers the clamp's own "…" — see
   .inc-expert-more-inline). Open, the bio keeps the same three-line box and
   scrolls inside it, with "عرض أقل" at the very end of the text. */

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

  const toggle = () => {
    // closing goes back to the first lines, not wherever the scroll was left
    if (open && ref.current) ref.current.scrollTop = 0;
    setOpen((current) => !current);
  };

  return (
    <div className="inc-expert-bio">
      <p ref={ref} className={"inc-expert-desc" + (open ? " is-open" : "")}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
        {open ? (
          <>
            {" "}
            <button type="button" className="inc-expert-more" aria-expanded onClick={toggle}>
              {tr("inc_expert_less")}
            </button>
          </>
        ) : null}
      </p>
      {overflows && !open ? (
        <button
          type="button"
          className="inc-expert-more inc-expert-more-inline"
          aria-expanded={false}
          onClick={toggle}
        >
          <span aria-hidden="true">… </span>
          {tr("inc_expert_more")}
        </button>
      ) : null}
    </div>
  );
}
