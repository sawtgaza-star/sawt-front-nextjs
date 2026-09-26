import {
  IconClockCheck,
  IconHourglass,
  IconLocationPin,
} from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorEvent } from "@/lib/api/incubator-page";
import { PLACEHOLDER } from "./incubator-page-view";

/* One "استكشف أحدث فعالياتنا" card: photo with the orange date badge straddling
   its bottom edge, the date/time chips, title, excerpt and the venue row
   ("وجاهي، ندوة" — the API's `tags`). */
export default function EventCard({
  event,
  lang,
}: {
  event: IncubatorEvent;
  lang: string;
}) {
  const day = event.date_badge?.day;
  const month = localized(event.date_badge?.month, lang);
  const date = localized(event.date_label, lang);
  const time = localized(event.time_label, lang);
  const tags = localized(event.tags, lang);

  return (
    <article className="inc-event-card">
      <div className="inc-event-media">
        <img src={event.image_url || PLACEHOLDER.card} alt="" />
        {day ? (
          <span className="inc-event-badge">
            <b>{day}</b>
            <span>{month}</span>
          </span>
        ) : null}
      </div>

      <div className="inc-event-body">
        {date || time ? (
          <div className="inc-event-meta">
            {date ? (
              <span className="inc-event-chip">
                <IconClockCheck />
                <span>{date}</span>
              </span>
            ) : null}
            {time ? (
              <span className="inc-event-chip">
                <IconHourglass />
                <span>{time}</span>
              </span>
            ) : null}
          </div>
        ) : null}

        <h3 className="inc-event-title">{localized(event.title, lang)}</h3>
        <p className="inc-event-desc">{localized(event.description, lang)}</p>

        {tags ? (
          <div className="inc-event-type">
            <IconLocationPin />
            <b>{tags}</b>
          </div>
        ) : null}
      </div>
    </article>
  );
}
