"use client";
import { useState } from "react";
import MediaSectionHead from "./MediaSectionHead";
import { IconChevronDownBold } from "@/components/ui/icons";
import { MEDIA_FAQS } from "./media-faq-data";

/* "الأسئلة التي تدور ببالك؟" — the page's own pill heading over the incubator
   page's FAQ block: the thinking-student visual on the start side (right in
   RTL), the questions beside it, one open at a time (the third by default,
   as in the mock). */
export default function MediaFaq() {
  const [open, setOpen] = useState<number>(2);

  return (
    <section className="sm-faq">
      <div className="container">
        <MediaSectionHead
          pill="الأسئلة الشائعة"
          pillKey="sm_faq_pill"
          title="الأسئلة التي تدور ببالك؟"
          titleKey="sm_faq_title"
          sub="أرقام حقيقية تعكس قوة مجتمعنا"
          subKey="sm_faq_sub"
        />

        <div className="sm-faq-row">
          <div className="sm-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>

          <div className="sm-faq-col">
            {MEDIA_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"sm-faq-item" + (isOpen ? " sm-faq-open" : "")}
                  key={f.qKey}
                >
                  <button
                    type="button"
                    className="sm-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span data-i18n={f.qKey}>{f.q}</span>
                    <span className="sm-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="sm-faq-a">
                      <span className="sm-faq-a-bar" aria-hidden="true"></span>
                      <p className="sm-faq-a-text" data-i18n={f.aKey}>
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
