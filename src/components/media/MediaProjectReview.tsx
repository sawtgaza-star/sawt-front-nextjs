import { IconRatingStar } from "@/components/ui/icons";
import { IconReviewQuote } from "./media-icons";
import MediaProjectHead from "./MediaProjectHead";
import type { MediaProject } from "./media-project-data";

/* "رأي العميل" panel — the client's card on the right and the two scores the
   design draws as orange meters on the left. */
export default function MediaProjectReview({ project }: { project: MediaProject }) {
  const { review } = project;

  return (
    <div className="sm-pj-panel">
      <MediaProjectHead title="رأي العميل" titleKey="sm_pj_tab_review" />

      <div className="sm-pj-review">
        <article className="sm-pj-review-card">
          <span className="sm-pj-review-avatar">
            <img src={review.photo} alt="" />
          </span>
          {/* the peach disc the design tucks under the avatar's outer edge */}
          <span className="sm-pj-review-quote-badge" aria-hidden="true">
            <IconReviewQuote />
          </span>

          <div className="sm-pj-review-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, s) => (
              <IconRatingStar key={s} filled={s < review.rating} />
            ))}
          </div>

          <p className="sm-pj-review-quote" data-i18n={review.quoteKey}>
            {review.quote}
          </p>

          <b className="sm-pj-review-name" data-i18n={review.nameKey}>
            {review.name}
          </b>
          <span className="sm-pj-review-meta" data-i18n={review.metaKey}>
            {review.meta}
          </span>
        </article>

        <div className="sm-pj-bars">
          {review.bars.map((bar) => (
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
