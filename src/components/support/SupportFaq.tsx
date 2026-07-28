"use client";
import { useState } from "react";
import { IconChevronDownBold } from "@/components/ui/icons";
import { SUPPORT_FAQS } from "./support-faq-data";

/* "الأسئلة المتكررة" — accordion beside the student artwork. Mirrors the
   creators-page FAQ behaviour: one item open at a time, second one open by
   default (as shown in the mock). */
export default function SupportFaq() {
  const [open, setOpen] = useState<number>(1);

  return (
    <section className="sp-section sp-faq-section" style={{ paddingTop: 0 }}>
      <img
        src="/assets/images/leaf_cutout.png"
        className="sp-faq-leaf"
        alt=""
      />

      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span className="cr-highlight" data-i18n="support_faq_title">
              الأسئلة المتكررة
            </span>
          </h2>
        </div>

        <div className="sp-faq-row">
          <div className="sp-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>

          <div className="sp-faq-col">
            {SUPPORT_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"sp-faq-item" + (isOpen ? " sp-faq-open" : "")}
                  key={f.qKey}
                >
                  <button
                    type="button"
                    className="sp-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span data-i18n={f.qKey}>{f.q}</span>
                    <span className="sp-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="sp-faq-a">
                      <span className="sp-faq-a-bar" aria-hidden="true"></span>
                      <p className="sp-faq-a-text" data-i18n={f.aKey}>
                        {f.a}
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
