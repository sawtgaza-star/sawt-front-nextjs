"use client";
import { useState } from "react";
import { IconChevronDownBold, IconHeartOutline } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { SupportFaqContent } from "@/lib/api/support";
import { resolveSupportFaqs } from "./support-faq-data";

/* "الأسئلة المتكررة" — accordion beside the student artwork. Mirrors the
   creators-page FAQ behaviour: one item open at a time, second one open by
   default (as shown in the mock). Questions, the side artwork and the
   contact card from GET /pages/support's `faq` block. */
export default function SupportFaq({
  data,
  lang = "ar",
}: {
  data?: SupportFaqContent;
  lang?: string;
}) {
  const [open, setOpen] = useState<number>(1);
  const faqs = resolveSupportFaqs(data?.items, lang);
  const title = localized(data?.title, lang);
  const moreTitle = localized(data?.cta?.title, lang);
  const moreBody = localized(data?.cta?.body, lang);
  const moreLabel = localized(data?.cta?.label, lang);

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
            {title ? (
              <span className="cr-highlight">{title}</span>
            ) : (
              <span className="cr-highlight" data-i18n="support_faq_title">
                الأسئلة المتكررة
              </span>
            )}
          </h2>
        </div>

        <div className="sp-faq-row">
          <div className="sp-faq-visual">
            <img
              src={data?.image_url || "/assets/images/Frame 1984080629.png"}
              alt=""
            />
          </div>

          <div className="sp-faq-col">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"sp-faq-item" + (isOpen ? " sp-faq-open" : "")}
                  key={i}
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

            {/* mobile mock only — "لديك سؤال آخر؟" contact card under the
                accordion; CSS keeps it hidden on desktop */}
            <div className="sp-faq-more">
              <span className="sp-faq-more-icon" aria-hidden="true">
                <IconHeartOutline />
              </span>
              {moreTitle ? (
                <h3 className="sp-faq-more-title">{moreTitle}</h3>
              ) : (
                <h3 className="sp-faq-more-title" data-i18n="support_faq_more_title">
                  لديك سؤال آخر؟
                </h3>
              )}
              {moreBody ? (
                <p className="sp-faq-more-desc">{moreBody}</p>
              ) : (
                <p className="sp-faq-more-desc" data-i18n="support_faq_more_desc">
                  فريقنا جاهز للإجابة — سنردّ عليك خلال ساعات
                </p>
              )}
              <a href="/#join" className="sp-btn-green">
                {moreLabel ? (
                  <span>{moreLabel}</span>
                ) : (
                  <span data-i18n="support_contact_us">تواصل معنا</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
