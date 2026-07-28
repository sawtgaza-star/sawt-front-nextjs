import { ALLOCATIONS } from "./allocations-data";
import {
  IconBookOpenOutline,
  IconLightbulbOutline,
  IconMicOutline,
} from "@/components/ui/icons";

const ICONS = {
  lightbulb: IconLightbulbOutline,
  mic: IconMicOutline,
  book: IconBookOpenOutline,
};

/* Donut from the design: a full orange ring with the grey (25%) and green
   (35%) arcs stroked over it, round-capped. Traced from the design's SVG —
   keep the path data as-is. */
function AllocationRing() {
  return (
    <svg
      className="sp-alloc-summary-svg"
      width="192"
      height="202"
      viewBox="0 0 192 202"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="96" cy="106" r="86" stroke="#FF7420" strokeWidth="20" />
      <path
        d="M79.5 22C124.3 10.4393 182 45.4998 182 108.5"
        stroke="#7F7F7F"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M10.769 97.6789C11.1973 51.4133 71.3037 -2.35302 136.965 29.0949"
        stroke="#4C5C37"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* "أين تذهب تبرعاتكم؟" — three allocation cards, each with a coloured pill
   sitting behind its top edge and a progress bar sized to its percentage,
   followed by the transparency summary strip with the 100% donut. */
export default function WhereDonationsGo() {
  return (
    <section className="sp-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_alloc_title_pre">أين تذهب</span>{" "}
            <span className="cr-highlight" data-i18n="support_alloc_title_hl">
              تبرعاتكم؟
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="support_alloc_sub">
            كل دولار يُستثمر بمسؤولية — نُبلّغكم بكل تفصيلة لأن ثقتكم أمانة
          </p>
        </div>

        <div className="sp-alloc-row">
          {ALLOCATIONS.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <article className="sp-alloc-card" key={a.key}>
                <span
                  className="sp-alloc-bar"
                  style={{ backgroundColor: a.color }}
                ></span>
                <div className="sp-alloc-box" style={{ borderColor: a.color }}>
                  <div className="sp-alloc-head">
                    <span
                      className="sp-alloc-icon"
                      style={{ color: a.color, backgroundColor: a.tint }}
                    >
                      <Icon />
                    </span>
                    <span className="sp-alloc-pct" style={{ color: a.color }}>
                      {a.percent}%
                    </span>
                  </div>
                  <h3 className="sp-alloc-title" data-i18n={a.titleKey}>
                    {a.title}
                  </h3>
                  <p className="sp-alloc-desc" data-i18n={a.descKey}>
                    {a.desc}
                  </p>
                  <ul className="sp-alloc-list">
                    {a.items.map((item) => (
                      <li key={item.key}>
                        <span
                          className="sp-alloc-bullet"
                          style={{ backgroundColor: a.color }}
                        ></span>
                        <span data-i18n={item.key}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="sp-alloc-foot">
                    <div
                      className="sp-alloc-track"
                      style={{ backgroundColor: a.tint }}
                    >
                      <div
                        className="sp-alloc-fill"
                        style={{
                          width: `${a.percent}%`,
                          backgroundColor: a.color,
                        }}
                      ></div>
                    </div>
                    <p className="sp-alloc-foot-text">
                      {a.percent}%{" "}
                      <span data-i18n="support_alloc_of_total">
                        من إجمالي التبرعات
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sp-alloc-summary">

          <div className="sp-alloc-summary-ring">
            <AllocationRing />
            <div className="sp-alloc-summary-hole">
              <strong className="sp-alloc-summary-total">100%</strong>
              <span
                className="sp-alloc-summary-caption"
                data-i18n="support_alloc_summary_caption"
              >
                موزّع بشفافية
              </span>
            </div>
          </div>

          <div className="sp-alloc-summary-main">
            <h3
              className="sp-alloc-summary-title"
              data-i18n="support_alloc_summary_title"
            >
              كل دولار له عنوان واضح
            </h3>
            <p
              className="sp-alloc-summary-sub"
              data-i18n="support_alloc_summary_sub"
            >
              نُصدر تقارير شهرية شاملة عن كيفية توزيع التبرعات — وبإمكانك طلب
              تقرير مفصّل في أي وقت.
            </p>
            <ul className="sp-alloc-summary-legend">
              {ALLOCATIONS.map((a) => (
                <li key={a.key}>
                  <span
                    className="sp-alloc-summary-dot"
                    style={{ backgroundColor: a.color }}
                  ></span>
                  <div>
                    <span
                      className="sp-alloc-summary-name"
                      data-i18n={a.titleKey}
                    >
                      {a.title}
                    </span>
                    <span className="sp-alloc-summary-share">
                      {a.percent}%{" "}
                      <span data-i18n="support_alloc_summary_share">
                        من تبرعاتكم
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>




        </div>
      </div>
    </section>
  );
}
