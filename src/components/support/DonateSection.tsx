import { IconCircleCheck } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { SupportImpactContent, SupportPlansContent } from "@/lib/api/support";
import DonateForm from "./DonateForm";
import SupportSectionHead from "./SupportSectionHead";
import { PLEDGE_ITEMS, resolveDonate } from "./donate-data";
import { currencySymbol } from "./support-text";

/* "كيف تريد ان تدعم؟" — the donation box next to the "تبرعك يعني..."
   checklist and the Sawt team quote. Copy from GET /pages/support's `plans`
   and `impact` blocks; each piece falls back to the built-in copy (with its
   data-i18n key) when the API leaves it empty. Only the form is interactive. */
export default function DonateSection({
  plans,
  impact,
  lang = "ar",
}: {
  plans?: SupportPlansContent;
  impact?: SupportImpactContent;
  lang?: string;
}) {
  const pledgeTitle = localized(impact?.title, lang);
  const pledges = (impact?.items || [])
    .map((item) => localized(item.text, lang))
    .filter(Boolean);
  const quote = localized(impact?.quote?.text, lang);
  const author = localized(impact?.quote?.author, lang);
  const place = localized(impact?.quote?.location, lang);

  return (
    <section className="sp-section sp-donate-section">
      <div className="container">
        <SupportSectionHead
          title={localized(plans?.title, lang)}
          sub={localized(plans?.description, lang)}
          fallback={{
            pre: "كيف تريد ان",
            preKey: "support_donate_title_pre",
            hl: "تدعم؟",
            hlKey: "support_donate_title_hl",
            sub: "قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا وتطويرنا المستمر",
            subKey: "support_donate_sub",
          }}
        />

        <div className="sp-donate-row">
          <div className="sp-donate-col-form">
            <DonateForm
              donate={resolveDonate(plans, lang)}
              symbol={currencySymbol(plans?.currency)}
            />
          </div>

          <div className="sp-donate-col-side">
            <div className="sp-pledge">
              {pledgeTitle ? (
                <h3 className="sp-pledge-title">{pledgeTitle}</h3>
              ) : (
                <h3 className="sp-pledge-title" data-i18n="support_pledge_title">
                  تبرعك يعني...
                </h3>
              )}
              <ul className="sp-pledge-list">
                {pledges.length
                  ? pledges.map((text, i) => (
                      <li key={i}>
                        <i className="sp-pledge-check">
                          <IconCircleCheck />
                        </i>
                        <span>{text}</span>
                      </li>
                    ))
                  : PLEDGE_ITEMS.map((item) => (
                      <li key={item.key}>
                        <i className="sp-pledge-check">
                          <IconCircleCheck />
                        </i>
                        <span data-i18n={item.key}>{item.text}</span>
                      </li>
                    ))}
              </ul>
            </div>

            <figure className="sp-quote">
              {quote ? (
                <blockquote className="sp-quote-text">«{quote}»</blockquote>
              ) : (
                <blockquote
                  className="sp-quote-text"
                  data-i18n="support_quote_text"
                >
                  «كل تبرع يشجع فيه يعني قصة جديدة توصل للناس — قصة ما كانت
                  تُسمع»
                </blockquote>
              )}
              <figcaption className="sp-quote-foot">
                <span className="sp-quote-logo">
                  <img src="/assets/images/swat.png" alt="" />
                </span>
                <div>
                  {author ? (
                    <div className="sp-quote-name">{author}</div>
                  ) : (
                    <div className="sp-quote-name" data-i18n="support_quote_name">
                      فريق صوت
                    </div>
                  )}
                  {place ? (
                    <div className="sp-quote-place">{place}</div>
                  ) : (
                    <div className="sp-quote-place" data-i18n="support_quote_place">
                      غزة، فلسطين
                    </div>
                  )}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
