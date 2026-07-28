import { IconCircleCheck } from "@/components/ui/icons";
import DonateForm from "./DonateForm";
import { PLEDGE_ITEMS } from "./donate-data";

/* "كيف تريد ان تدعم؟" — the donation box next to the "تبرعك يعني..."
   checklist and the Sawt team quote. Static shell; only the form is client. */
export default function DonateSection() {
  return (
    <section className="sp-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_donate_title_pre">كيف تريد ان</span>{" "}
            <span className="cr-highlight" data-i18n="support_donate_title_hl">
              تدعم؟
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="support_donate_sub">
            قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا
            وتطويرنا المستمر
          </p>
        </div>

        <div className="sp-donate-row">
          <div className="sp-donate-col-form">
            <DonateForm />
          </div>

          <div className="sp-donate-col-side">
            <div className="sp-pledge">
              <h3 className="sp-pledge-title" data-i18n="support_pledge_title">
                تبرعك يعني...
              </h3>
              <ul className="sp-pledge-list">
                {PLEDGE_ITEMS.map((item) => (
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
              <blockquote
                className="sp-quote-text"
                data-i18n="support_quote_text"
              >
                «كل تبرع يشجع فيه يعني قصة جديدة توصل للناس — قصة ما كانت
                تُسمع»
              </blockquote>
              <figcaption className="sp-quote-foot">

                                <span className="sp-quote-logo">
                  <img src="/assets/images/swat.png" alt="" />
                </span>

                
                <div>
                  <div
                    className="sp-quote-name"
                    data-i18n="support_quote_name"
                  >
                    فريق صوت
                  </div>
                  <div
                    className="sp-quote-place"
                    data-i18n="support_quote_place"
                  >
                    غزة، فلسطين
                  </div>
                </div>

              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
