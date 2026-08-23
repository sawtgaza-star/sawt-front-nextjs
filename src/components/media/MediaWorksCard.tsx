import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";
import { FEATURED_WORK } from "./media-works-data";

/* The featured-project caption, laid over the bottom of one tile in the works
   wall. It lives inside `.sm-works-shot`, so it drifts with the column instead
   of hanging still over it. The wall renders every column twice for a seamless
   loop, so the second copy passes `duplicate` and is hidden from the a11y tree
   (and taken out of the tab order) to avoid announcing the project twice. */
export default function MediaWorksCard({ duplicate }: { duplicate?: boolean }) {
  return (
    <article className="sm-works-card" aria-hidden={duplicate || undefined}>
      <div className="sm-works-card-tags">
        <span
          className="sm-works-chip sm-works-chip-tag"
          data-i18n={FEATURED_WORK.tagKey}
        >
          {FEATURED_WORK.tag}
        </span>
        <span className="sm-works-chip sm-works-chip-date">
          <IconCalendarDays />
          <span data-i18n={FEATURED_WORK.dateKey}>{FEATURED_WORK.date}</span>
        </span>
      </div>

      <div className="sm-works-card-body">
        <a
          className="sm-works-card-go"
          href="#sm-consult"
          aria-label="عرض المشروع"
          tabIndex={duplicate ? -1 : undefined}
        >
          <IconChevronLeftSmall />
        </a>
        <div className="sm-works-card-text">
          <h3 data-i18n={FEATURED_WORK.titleKey}>{FEATURED_WORK.title}</h3>
          <p data-i18n={FEATURED_WORK.subKey}>{FEATURED_WORK.sub}</p>
        </div>
      </div>
    </article>
  );
}
