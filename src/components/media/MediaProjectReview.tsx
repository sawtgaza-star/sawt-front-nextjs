import { localized } from "@/lib/api/pages";
import type { MediaWorkClient } from "@/lib/api/media-work";
import { IconRatingStar } from "@/components/ui/icons";
import { IconReviewQuote } from "./media-icons";
import MediaProjectHead from "./MediaProjectHead";

/* "رأي العميل" panel — the client's card on the right and the two scores the
   design draws as orange meters on the left.

   The card is the API's `client` block. The stars and the two meters are NOT
   in the payload, so they stay the design's own: every card in the mockups
   shows four filled stars, and the two meters are the fixed pair the artboard
   carries. They keep their `data-i18n` keys because they are still static
   markup — the day the API sends them, both constants go. */
const STARS = 5;
const FILLED = 4;

const BARS = [
  { key: "satisfaction", label: "رضا العميل", labelKey: "sm_pj_bar_satisfaction", pct: 96 },
  { key: "delivery", label: "جودة التسليم", labelKey: "sm_pj_bar_delivery", pct: 98 },
];

export default function MediaProjectReview({
  title,
  data,
  lang = "ar",
}: {
  /** The tab's own label — the heading the panel opens with. */
  title: string;
  data?: MediaWorkClient;
  lang?: string;
}) {
  return (
    <div className="sm-pj-panel">
      {title ? <MediaProjectHead title={title} /> : null}

      <div className="sm-pj-review">
        <article className="sm-pj-review-card">
          <span className="sm-pj-review-avatar">
            {data?.avatar_url ? <img src={data.avatar_url} alt="" /> : null}
          </span>
          {/* the peach disc the design tucks under the avatar's outer edge */}
          <span className="sm-pj-review-quote-badge" aria-hidden="true">
            <IconReviewQuote />
          </span>

          <div className="sm-pj-review-stars" aria-hidden="true">
            {Array.from({ length: STARS }, (_, s) => (
              <IconRatingStar key={s} filled={s < FILLED} />
            ))}
          </div>

          <p className="sm-pj-review-quote">{localized(data?.quote, lang)}</p>

          <b className="sm-pj-review-name">{data?.name}</b>
          <span className="sm-pj-review-meta">{localized(data?.role, lang)}</span>
        </article>

        <div className="sm-pj-bars">
          {BARS.map((bar) => (
            <div className="sm-pj-bar" key={bar.key}>
              <div className="sm-pj-bar-top">
                <span className="sm-pj-bar-label" data-i18n={bar.labelKey}>
                  {bar.label}
                </span>
                <span className="sm-pj-bar-pct">{bar.pct}%</span>
              </div>
              <span className="sm-pj-bar-track">
                <span className="sm-pj-bar-fill" style={{ width: bar.pct + "%" }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
