"use client";
import { useState } from "react";
import { localized } from "@/lib/api/pages";
import { sortItems, type MediaFaqContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";
import { IconChevronDownBold } from "@/components/ui/icons";

/* "الأسئلة التي تدور ببالك؟" — the page's own pill heading over the incubator
   page's FAQ block: the thinking-student visual on the start side (right in
   RTL), the questions beside it, one open at a time (the third by default,
   as in the mock — or the last one when the editor has listed fewer).

   The questions are GET /pages/media's `faq` block; the illustration beside
   them is the section's artwork, positioned by media.css, not content the API
   knows about. */
const DEFAULT_OPEN = 2;

export default function MediaFaq({
  data,
  lang = "ar",
}: {
  data?: MediaFaqContent;
  lang?: string;
}) {
  const items = sortItems(data?.items);
  const [open, setOpen] = useState<number>(DEFAULT_OPEN);

  if (!data || !items.length) return null;

  const openIndex = Math.min(open, items.length - 1);

  return (
    <section className="sm-faq">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="sm-faq-row">
          <div className="sm-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>

          <div className="sm-faq-col">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div className={"sm-faq-item" + (isOpen ? " sm-faq-open" : "")} key={i}>
                  <button
                    type="button"
                    className="sm-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{localized(item.question, lang)}</span>
                    <span className="sm-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="sm-faq-a">
                      <span className="sm-faq-a-bar" aria-hidden="true"></span>
                      <p className="sm-faq-a-text">{localized(item.answer, lang)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
