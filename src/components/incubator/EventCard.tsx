import {
  IconClockCheck,
  IconHourglass,
  IconLocationPin,
} from "@/components/ui/icons";
import type { IncEvent } from "./events-data";

/* One "استكشف أحدث فعالياتنا" card: photo with the orange date badge straddling
   its bottom edge, the date/time chips, title, excerpt and the venue row. */
export default function EventCard({ event }: { event: IncEvent }) {
  return (
    <article className="inc-event-card">
      <div className="inc-event-media">
        <img src={event.image} alt="" />
        <span className="inc-event-badge">
          <b>{event.day}</b>
          <span data-i18n={event.monthKey}>{event.month}</span>
        </span>
      </div>

      <div className="inc-event-body">
        <div className="inc-event-meta">
          <span className="inc-event-chip">
            <IconClockCheck />
            <span data-i18n={event.dateKey}>{event.date}</span>
          </span>
          <span className="inc-event-chip">
            <IconHourglass />
            <span data-i18n={event.timeKey}>{event.time}</span>
          </span>
        </div>

        <h3 className="inc-event-title" data-i18n={event.titleKey}>
          {event.title}
        </h3>
        <p className="inc-event-desc" data-i18n={event.descKey}>
          {event.desc}
        </p>

        <div className="inc-event-type">
          <IconLocationPin />
          <b data-i18n={event.typeKey}>{event.type}</b>
        </div>
      </div>
    </article>
  );
}
