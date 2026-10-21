"use client";
import { useEffect, useRef, useState } from "react";
import { IconChevronDownBold } from "@/components/ui/icons";

/* A testimonial's quote + its "اقرأ المزيد" toggle. The toggle only renders
   when the text really runs past the 3-line clamp — measured off the clamped
   box (scrollHeight > clientHeight), re-checked on resize. While open the
   clamp is lifted, so the last closed measurement is kept until it closes. */
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
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || isOpen) return;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, isOpen]);

  return (
    <>
      <p className="inc-testi-text" ref={textRef}>
        {text}
      </p>

      {/* the mock's chevron control: it opens the quote past its 3-line
          clamp rather than navigating */}
      {overflows || isOpen ? (
        <button
          type="button"
          className="inc-testi-cta"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span>{isOpen ? lessLabel : moreLabel}</span>
          <IconChevronDownBold />
        </button>
      ) : null}
    </>
  );
}
