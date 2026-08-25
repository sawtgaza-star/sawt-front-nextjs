import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";
import type { MediaPageWork } from "./media-works-page-data";

/* One project in the /media/works grid: the still under the design's olive
   gradient, with the project card resting on its bottom edge. The card shows
   the title and the arrow at rest; hovering the tile brings up the tag chips
   and the project line under it (media.css). */
export default function MediaWorksTile({ work }: { work: MediaPageWork }) {
  return (
    <article className="sm-wp-tile">
      <img className="sm-wp-photo" src={work.photo} alt="" />
      <span className="sm-wp-veil" aria-hidden="true" />

      <div className="sm-wp-card">
        <div className="sm-wp-chips">
          <span className="sm-works-chip sm-works-chip-tag" data-i18n={work.tagKey}>
            {work.tag}
          </span>
          <span className="sm-works-chip sm-works-chip-date">
            <IconCalendarDays />
            <span data-i18n={work.dateKey}>{work.date}</span>
          </span>
        </div>

        <div className="sm-wp-card-body">
          <a
            className="sm-works-card-go"
            href={"/media/works/" + work.key}
            aria-label="عرض المشروع"
          >
            <IconChevronLeftSmall />
          </a>
          <div className="sm-wp-card-text">
            <h3 data-i18n={work.titleKey}>{work.title}</h3>
            <p data-i18n={work.subKey}>{work.sub}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
