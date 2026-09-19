import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";

/** One project of the works wall, already resolved to the current language. */
export type WorkTile = {
  imageUrl: string | null;
  tag: string;
  date: string;
  title: string;
  category: string;
  href: string;
};

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
  work: WorkTile;
  duplicate?: boolean;
}) {
  return (
    <article className="sm-works-card" aria-hidden={duplicate || undefined}>
      <div className="sm-works-card-tags">
        {work.tag ? (
          <span className="sm-works-chip sm-works-chip-tag">{work.tag}</span>
        ) : null}
        {work.date ? (
          <span className="sm-works-chip sm-works-chip-date">
            <IconCalendarDays />
            <span>{work.date}</span>
          </span>
        ) : null}
      </div>

      <div className="sm-works-card-body">
        <a
          className="sm-works-card-go"
          href={work.href}
          aria-label="عرض المشروع"
          tabIndex={duplicate ? -1 : undefined}
        >
          <IconChevronLeftSmall />
        </a>
        <div className="sm-works-card-text">
          <h3>{work.title}</h3>
          <p>{work.category}</p>
        </div>
      </div>
    </article>
  );
}
