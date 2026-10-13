import SkeletonText from "@/components/ui/SkeletonText";
import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";
import { IconSatisfactionMedal } from "./media-icons";

/* The pieces the Sawt Media skeletons repeat: the section head, the rating
   chip, the hero's ticker, the case-study head, the works tile and the closing
   banner — each the real component's markup with its text
   swapped for a <SkeletonText /> of the current copy's length, so it lays out
   exactly as the copy that replaces it. Keep them in step with
   MediaSectionHead, MediaSatisfactionChip, MediaTicker, MediaProjectHead,
   MediaWorksTile and MediaProjectCta. */

/** MediaSectionHead, by character count. */
export function SkHead({
  pill,
  title,
  titleHl,
  sub,
  align = "center",
}: {
  pill?: number;
  title?: number;
  titleHl?: number;
  sub?: number;
  align?: "center" | "start";
}) {
  return (
    <div className={"sm-head" + (align === "start" ? " sm-head-start" : "")}>
      {pill ? (
        <span className="sm-pill">
          <SkeletonText chars={pill} />
        </span>
      ) : null}
      {title ? (
        <h2 className="sm-head-title">
          <span>
            <SkeletonText chars={title} />
          </span>
          {titleHl ? (
            <>
              {" "}
              <span className="sm-head-hl">
                <SkeletonText chars={titleHl} />
              </span>
            </>
          ) : null}
        </h2>
      ) : null}
      {sub ? (
        <p className="sm-head-sub">
          <SkeletonText chars={sub} />
        </p>
      ) : null}
    </div>
  );
}

/** MediaSatisfactionChip — "98%" over "رضا العملاء". */
export function SkChip({ className, tilt = 0 }: { className: string; tilt?: 0 | 1 }) {
  return (
    <span className={"sm-chip " + className} aria-hidden="true">
      <span className="sm-chip-icon">
        <IconSatisfactionMedal tilt={tilt} />
      </span>
      <span className="sm-chip-text">
        <b>
          <SkeletonText chars={3} />
        </b>
        <small>
          <SkeletonText chars={11} />
        </small>
      </span>
    </span>
  );
}

/** MediaTicker, one item per hero phrase. */
export function SkTicker({ phrases }: { phrases: number[] }) {
  const group = (hidden: boolean) => (
    <div className="sm-ticker-group" aria-hidden={hidden || undefined}>
      {phrases.map((chars, index) => (
        <span className="sm-ticker-item" key={index}>
          <span>
            <SkeletonText chars={chars} />
          </span>
          <i className="sm-ticker-dot" aria-hidden="true"></i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="sm-ticker" aria-hidden="true">
      {group(false)}
      {group(true)}
    </div>
  );
}

/** A green CTA (`.sm-btn-green` + its angle), inert. */
export function SkButton({ className, chars, icon = "fa-angle-left" }: {
  className: string;
  chars: number;
  icon?: string;
}) {
  return (
    <a className={className} aria-hidden="true" tabIndex={-1}>
      <span>
        <SkeletonText chars={chars} />
      </span>
      <i className={"fa-solid " + icon}></i>
    </a>
  );
}

/** MediaProjectHead — the dot and the block's title. */
export function SkProjectHead({ chars, dot }: { chars: number; dot?: "olive" | "orange" }) {
  return (
    <h2 className="sm-pj-head">
      <span className={"sm-pj-dot" + (dot ? " sm-pj-dot-" + dot : "")} aria-hidden="true" />
      <span>
        <SkeletonText chars={chars} />
      </span>
    </h2>
  );
}

/** MediaWorksTile — the still as an empty frame, the card's copy as bars. */
export function SkTile() {
  return (
    <article className="sm-wp-tile smk-fill">
      <span className="sm-wp-veil" aria-hidden="true" />
      <div className="sm-wp-card">
        <div className="sm-wp-chips">
          <span className="sm-works-chip sm-works-chip-tag">
            <SkeletonText chars={5} />
          </span>
          <span className="sm-works-chip sm-works-chip-date">
            <IconCalendarDays />
            <span>
              <SkeletonText chars={11} />
            </span>
          </span>
        </div>
        <div className="sm-wp-card-body">
          <a className="sm-works-card-go" tabIndex={-1}>
            <IconChevronLeftSmall />
          </a>
          <div className="sm-wp-card-text">
            <h3>
              <SkeletonText chars={21} />
            </h3>
            <p>
              <SkeletonText chars={15} />
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** MediaProjectCta — the closing banner, headline, body and button as bars
    (the still under the olive wash is left out). */
export function SkProjectCta({ title = 24, body = 141, button = 12 }: {
  title?: number;
  body?: number;
  button?: number;
}) {
  return (
    <section className="sm-pj-cta">
      <div className="container">
        <div className="sm-pj-cta-card">
          <span className="sm-pj-cta-veil" aria-hidden="true" />
          <div className="sm-pj-cta-text">
            <h2 className="sm-pj-cta-title">
              <SkeletonText chars={title} />
            </h2>
            <p className="sm-pj-cta-desc">
              <SkeletonText chars={body} />
            </p>
            <a className="sm-btn-green sm-btn-lg" aria-hidden="true" tabIndex={-1}>
              <span>
                <SkeletonText chars={button} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
