"use client";
import { useState } from "react";
import { IconChevronDownBold, IconHeartOutline } from "@/components/ui/icons";
import { INCUBATOR_FAQS } from "./incubator-faq-data";

/* "الأسئلة التي تدور ببالك؟" — eighth section of /incubator. Same accordion as
   the support-page FAQ (one item open at a time; the third is open by default,
   as in the mock), with the thinking-student visual beside the questions and
   the leaf cutout in the section's bottom-left corner. */
export default function IncubatorFaq() {
  const [open, setOpen] = useState<number>(2);

  return (
    <section className="inc-faq">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-faq-leaf"
        alt=""
      />

      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_faq_title_pre">الأسئلة التي</span>{" "}
            <span className="inc-highlight" data-i18n="inc_faq_title_hl">
              تدور ببالك؟
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_faq_sub">
            أرقام حقيقية تعكس قوة مجتمعنا
          </p>
        </div>

        <div className="inc-faq-row">
          <div className="inc-faq-visual">
            <img src="/assets/images/Frame 1984080629.png" alt="" />
          </div>

          <div className="inc-faq-col">
            {INCUBATOR_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"inc-faq-item" + (isOpen ? " inc-faq-open" : "")}
                  key={f.qKey}
                >
                  <button
                    type="button"
                    className="inc-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span data-i18n={f.qKey}>{f.q}</span>
                    <span className="inc-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="inc-faq-a">
                      <span className="inc-faq-a-bar" aria-hidden="true"></span>
                      <p className="inc-faq-a-text" data-i18n={f.aKey}>
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* mobile mock only — "لديك سؤال آخر؟" contact card under the
                accordion; CSS keeps it hidden from sm up (same treatment as
                the support page's .sp-faq-more) */}
            <div className="inc-faq-more">
              <span className="inc-faq-more-icon" aria-hidden="true">
                <IconHeartOutline />
              </span>
              <h3
                className="inc-faq-more-title"
                data-i18n="support_faq_more_title"
              >
                لديك سؤال آخر؟
              </h3>
              <p
                className="inc-faq-more-desc"
                data-i18n="support_faq_more_desc"
              >
                فريقنا جاهز للإجابة — سنردّ عليك خلال ساعات
              </p>
              <a href="/#join" className="inc-btn-green">
                <span data-i18n="support_contact_us">تواصل معنا</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
