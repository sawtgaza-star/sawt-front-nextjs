import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";

/** One tile's copy, already resolved to the reader's language — both callers
    (the /media/works listing and a service page's "نماذج من أعمالنا") get it
    from the API, so no `data-i18n` keys are carried here. */
export type TileWork = {
  photo: string;
  href: string;
  tag: string;
  date: string;
  title: string;
  sub: string;
};

/* One project in the /media/works grid: the still under the design's olive
   gradient, with the project card resting on its bottom edge. The card shows
   the title and the arrow at rest; hovering the tile brings up the tag chips
   and the project line under it (media.css). */
export default function MediaWorksTile({ work }: { work: TileWork }) {
  return (
    <article className="sm-wp-tile">
      <img className="sm-wp-photo" src={work.photo} alt="" />
      <span className="sm-wp-veil" aria-hidden="true" />

      <div className="sm-wp-card">
        <div className="sm-wp-chips">
          <span className="sm-works-chip sm-works-chip-tag">{work.tag}</span>
          <span className="sm-works-chip sm-works-chip-date">
            <IconCalendarDays />
            <span>{work.date}</span>
          </span>
        </div>

        <div className="sm-wp-card-body">
          <a
            className="sm-works-card-go"
            href={work.href}
            aria-label="عرض المشروع"
          >
            <IconChevronLeftSmall />
          </a>
          <div className="sm-wp-card-text">
            <h3>{work.title}</h3>
            <p>{work.sub}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
