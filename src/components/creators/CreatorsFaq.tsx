"use client";
import { useState } from "react";
import { localized } from "@/lib/api/pages";
import type { CreatorsFaqContent } from "@/lib/api/creators-page";
import { bySortOrder, splitTail } from "./creators-text";

/* The accordion at the foot of /creators — the API's `faq` block, in the order
   the editor arranged the questions.

   The second question is the one the design shows expanded, so index 1 starts
   open (index 0 when the editor left only one). The mobile heading ("الأسئلة
   المتكررة") and the leaf are chrome — the API sends one title, which the
   desktop heading splits with the accent on its last two words. */
const FAQ_IMAGE = "/assets/images/Frame 1984080629.png";

export default function CreatorsFaq({
  data,
  lang = "ar",
}: {
  data?: CreatorsFaqContent;
  lang?: string;
}) {
  const items = bySortOrder(data?.items);
  // second question expanded by default, as in the design — this section is
  // only ever mounted once the payload has landed, so the count is known here
  const [open, setOpen] = useState<number>(items.length > 1 ? 1 : 0);

  const title = localized(data?.title, lang);
  const [titlePre, titleHl] = splitTail(title, 2);
  const subtitle = localized(data?.subtitle, lang);

  if (!title && !subtitle && !items.length) return null;

  return (
    <section className="cr-faq-section">
      <img
        src="/assets/images/leaf_cutout.png"
        className="cr-leaf cr-leaf-tl"
        alt=""
      />

      <div className="container">
        <div className="cr-section-head cr-section-head-qs">
          {/* Mobile mock uses a single stroked heading; the desktop title
             (2 spans) is hidden on mobile via CSS. */}
          <h2 className="cr-section-title cr-faq-title-mobile">
            <span className="cr-highlight" data-i18n="creators_faq_title_mobile">
              الأسئلة المتكررة
            </span>
          </h2>
          {title ? (
            <h2 className="cr-section-title cr-faq-title-desktop">
              <span>{titlePre}</span>{" "}
              <span className="cr-title-orange">{titleHl}</span>
            </h2>
          ) : null}
          {subtitle ? <p className="cr-section-sub">{subtitle}</p> : null}
        </div>

        <div className="cr-faq-row">
          <div className="cr-faq-col">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  className={"cr-faq-item" + (isOpen ? " cr-faq-open" : "")}
                  key={item.uuid || i}
                >
                  <button
                    type="button"
                    className="cr-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{localized(item.question, lang)}</span>
                    <i className="fa-solid fa-chevron-down cr-faq-chevron"></i>
                  </button>
                  {isOpen && (
                    <div className="cr-faq-a">{localized(item.answer, lang)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="cr-faq-visual">
            <div className="cr-faq-visual-wrap">
              <img src={data?.image_url || FAQ_IMAGE} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
