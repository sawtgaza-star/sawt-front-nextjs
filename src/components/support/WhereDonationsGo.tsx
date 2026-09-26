import { localized } from "@/lib/api/pages";
import type { SupportFundAllocation } from "@/lib/api/support";
import { resolveAllocations } from "./allocations-data";
import SupportSectionHead from "./SupportSectionHead";
import { splitPercentBadge } from "./support-text";
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
   followed by the transparency summary strip with the 100% donut.
   Copy and shares from GET /pages/support's `fund_allocation` block; the
   donut's arcs are the design's drawing and do not follow the shares. */
export default function WhereDonationsGo({
  data,
  lang = "ar",
}: {
  data?: SupportFundAllocation;
  lang?: string;
}) {
  const allocations = resolveAllocations(data?.items, lang);
  const badge = localized(data?.transparency?.badge, lang);
  const [badgeTotal, badgeCaption] = splitPercentBadge(badge);
  const summaryTitle = localized(data?.transparency?.title, lang);
  const summaryBody = localized(data?.transparency?.body, lang);

  return (
    <section className="sp-section" id="where-donations">
      <div className="container">
        <SupportSectionHead
          title={localized(data?.title, lang)}
          sub={localized(data?.subtitle, lang)}
          tailWords={1}
          fallback={{
            pre: "أين تذهب",
            preKey: "support_alloc_title_pre",
            hl: "تبرعاتكم؟",
            hlKey: "support_alloc_title_hl",
            sub: "كل دولار يُستثمر بمسؤولية — نُبلّغكم بكل تفصيلة لأن ثقتكم أمانة",
            subKey: "support_alloc_sub",
          }}
        />

        <div className="sp-alloc-row">
          {allocations.map((a) => {
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
                  <h3 className="sp-alloc-title" data-i18n={a.titleKey || undefined}>
                    {a.title}
                  </h3>
                  <p className="sp-alloc-desc" data-i18n={a.descKey || undefined}>
                    {a.desc}
                  </p>
                  <ul className="sp-alloc-list">
                    {a.items.map((item, i) => (
                      <li key={i}>
                        <span
                          className="sp-alloc-bullet"
                          style={{ backgroundColor: a.color }}
                        ></span>
                        <span data-i18n={item.key || undefined}>{item.text}</span>
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
              <strong className="sp-alloc-summary-total">
                {badge ? badgeTotal : "100%"}
              </strong>
              {badge ? (
                <span className="sp-alloc-summary-caption">{badgeCaption}</span>
              ) : (
                <span
                  className="sp-alloc-summary-caption"
                  data-i18n="support_alloc_summary_caption"
                >
                  موزّع بشفافية
                </span>
              )}
            </div>
          </div>

          <div className="sp-alloc-summary-main">
            {summaryTitle ? (
              <h3 className="sp-alloc-summary-title">{summaryTitle}</h3>
            ) : (
              <h3
                className="sp-alloc-summary-title"
                data-i18n="support_alloc_summary_title"
              >
                كل دولار له عنوان واضح
              </h3>
            )}
            {summaryBody ? (
              <p className="sp-alloc-summary-sub">{summaryBody}</p>
            ) : (
              <p
                className="sp-alloc-summary-sub"
                data-i18n="support_alloc_summary_sub"
              >
                نُصدر تقارير شهرية شاملة عن كيفية توزيع التبرعات — وبإمكانك طلب
                تقرير مفصّل في أي وقت.
              </p>
            )}
            <ul className="sp-alloc-summary-legend">
              {allocations.map((a) => (
                <li key={a.key}>
                  <span
                    className="sp-alloc-summary-dot"
                    style={{ backgroundColor: a.color }}
                  ></span>
                  <div>
                    <span
                      className="sp-alloc-summary-name"
                      data-i18n={a.titleKey || undefined}
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
