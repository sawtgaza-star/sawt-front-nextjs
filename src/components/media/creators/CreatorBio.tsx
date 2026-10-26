"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { CC_COPY, pick } from "./media-creators-data";

/* The creator card's bio: clamped to three lines, with a green "… عرض المزيد"
   at the end of the last line when it is actually cut off, and "عرض أقل"
   after the text to fold it back. Open, it scrolls inside the card instead
   of stretching it. The parent keys it per creator. */
export default function CreatorBio({ text, lang }: { text: string; lang: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    // clipped only when at least half a line is hidden — Arabic glyphs poke a
    // pixel or two past the line box, which a 1px test took for overflow
    const measure = () => {
      const line = parseFloat(getComputedStyle(el).lineHeight) || 22;
      setClipped(el.scrollHeight - el.clientHeight > line / 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, open]);

  const toggle = (
    <button type="button" className="sm-cc-bio-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
      {pick(open ? CC_COPY.less : CC_COPY.more, lang)}
    </button>
  );

  /* closed: the button sits over the end of the last line, right after its
     "…"; open: it follows the text inline */
  return (
    <div className={"sm-cc-bio-wrap" + (open ? " is-open" : "")}>
      <p className="sm-cc-bio" ref={ref}>
        {text}
        {open ? <> {toggle}</> : null}
      </p>
      {clipped && !open ? <span className="sm-cc-bio-more">… {toggle}</span> : null}
    </div>
  );
}
