"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { IconChevronDownBold } from "@/components/ui/icons";

const LINES = 3;

/* A testimonial's quote + its "اقرأ المزيد" toggle, inline at the end of the
   text. Closed, the quote is cut word by word until "… اقرأ المزيد" fits on
   its last allowed line — measured on an off-screen copy of the paragraph at
   the same width, re-checked on resize. Open, the full quote shows with
   "عرض أقل" right after it. A quote that fits whole gets no toggle at all. */
export default function TestimonialQuote({
  text,
  isOpen,
  onToggle,
  moreLabel,
  lessLabel,
}: {
  text: string;
  isOpen: boolean;
  onToggle: () => void;
  moreLabel: string;
  lessLabel: string;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  /** Closed preview: null = the whole quote fits, no toggle. */
  const [preview, setPreview] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || isOpen) return;

    const measure = () => {
      const width = el.clientWidth;
      if (!width || !el.parentElement) return;

      const probe = el.cloneNode(false) as HTMLParagraphElement;
      Object.assign(probe.style, {
        position: "absolute",
        visibility: "hidden",
        pointerEvents: "none",
        width: `${width}px`,
        display: "block",
        webkitLineClamp: "none",
        overflow: "visible",
      });
      el.parentElement.appendChild(probe);

      const lineHeight = parseFloat(getComputedStyle(probe).lineHeight) || 25;
      const maxHeight = lineHeight * LINES + 1;
      const plain = (() => {
        const tmp = document.createElement("div");
        tmp.innerHTML = text;
        return (tmp.textContent || "").replace(/\s+/g, " ").trim();
      })();

      probe.innerHTML = text;
      if (probe.scrollHeight <= maxHeight) {
        probe.remove();
        setPreview(null);
        return;
      }

      // a stand-in for the toggle (label + 16px chevron), so the fit accounts for its width
      const ctaHtml = `<span class="inc-testi-cta inc-testi-cta--inline"><span>${moreLabel}</span><svg width="16" height="16"></svg></span>`;
      const words = plain.split(" ");
      const fits = (n: number) => {
        probe.textContent = words.slice(0, n).join(" ") + "… ";
        probe.insertAdjacentHTML("beforeend", ctaHtml);
        return probe.scrollHeight <= maxHeight;
      };

      let lo = 0;
      let hi = words.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (fits(mid)) lo = mid;
        else hi = mid - 1;
      }
      probe.remove();
      setPreview(words.slice(0, lo).join(" ") + "…");
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, isOpen, moreLabel]);

  const toggle =
    preview !== null || isOpen ? (
      <>
        {" "}
        <button
          type="button"
          className="inc-testi-cta inc-testi-cta--inline"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span>{isOpen ? lessLabel : moreLabel}</span>
          <IconChevronDownBold />
        </button>
      </>
    ) : null;

  if (isOpen || preview === null) {
    return (
      <p className="inc-testi-text" ref={textRef}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
        {toggle}
      </p>
    );
  }

  return (
    <p className="inc-testi-text" ref={textRef}>
      {preview}
      {toggle}
    </p>
  );
}
