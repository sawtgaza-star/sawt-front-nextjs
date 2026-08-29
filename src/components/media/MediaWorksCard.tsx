import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";
import type { MediaWork } from "./media-works-data";

/* A project caption, laid over the bottom of its own tile in the works wall.
   It lives inside `.sm-works-shot`, so it drifts with the column instead of
   hanging still over it, and media.css keeps it hidden until the tile is
   hovered. The wall renders every column three times for a seamless loop, so
   the repeat copies pass `duplicate` and are hidden from the a11y tree (and
   taken out of the tab order) to avoid announcing the project three times. */
export default function MediaWorksCard({
  work,
  duplicate,
}: {
  work: MediaWork;
  duplicate?: boolean;
}) {
  return (
    <article className="sm-works-card" aria-hidden={duplicate || undefined}>
      <div className="sm-works-card-tags">
        <span className="sm-works-chip sm-works-chip-tag" data-i18n={work.tagKey}>
          {work.tag}
        </span>
        <span className="sm-works-chip sm-works-chip-date">
          <IconCalendarDays />
          <span data-i18n={work.dateKey}>{work.date}</span>
        </span>
      </div>

      <div className="sm-works-card-body">
        <a
          className="sm-works-card-go"
          href={"/media/works/" + work.key}
          aria-label="عرض المشروع"
          tabIndex={duplicate ? -1 : undefined}
        >
          <IconChevronLeftSmall />
        </a>
        <div className="sm-works-card-text">
          <h3 data-i18n={work.titleKey}>{work.title}</h3>
          <p data-i18n={work.subKey}>{work.sub}</p>
        </div>
      </div>
    </article>
  );
}
