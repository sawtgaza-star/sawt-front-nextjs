"use client";
import { useState } from "react";
import { IconChevronDownBold } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorFaqContent } from "@/lib/api/incubator-page";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { PLACEHOLDER, sortItems } from "./incubator-page-view";

/* "الأسئلة التي تدور ببالك؟" — the API's `faq` block. Same accordion as the
   support-page FAQ (one item open at a time; the third is open by default,
   as in the mock), with the thinking-student visual beside the questions and
   the leaf cutout in the section's bottom-left corner. */
export default function IncubatorFaq({
  data,
  lang,
}: {
  data?: IncubatorFaqContent;
  lang: string;
}) {
  const [open, setOpen] = useState<number>(2);

  const items = sortItems(data?.items);
  if (!data || !items.length) return null;

  return (
    <section className="inc-faq">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-faq-leaf"
        alt=""
      />

      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="inc-faq-row">
          <div className="inc-faq-visual">
            <img src={data.image_url || PLACEHOLDER.faq} alt="" />
          </div>

          <div className="inc-faq-col">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"inc-faq-item" + (isOpen ? " inc-faq-open" : "")}
                  key={i}
                >
                  <button
                    type="button"
                    className="inc-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{localized(f.question, lang)}</span>
                    <span className="inc-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="inc-faq-a">
                      <span className="inc-faq-a-bar" aria-hidden="true"></span>
                      <p className="inc-faq-a-text">
                        {localized(f.answer, lang)}
                      </p>
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
