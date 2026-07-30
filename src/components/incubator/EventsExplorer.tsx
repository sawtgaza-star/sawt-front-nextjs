"use client";

import { useEffect, useState } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import EventCard from "./EventCard";
import { EVENT_FILTERS, INC_EVENTS } from "./events-data";

/* Client leaf of the events section: the category chips + the card row they
   filter. "الكل" shows everything; the other chips match IncEvent.categories. */
export default function EventsExplorer() {
  const [active, setActive] = useState("all");

  /* the page's i18n mutates the DOM (data-i18n), so re-rendered cards come back
     with their Arabic fallback text — re-apply the current language after each
     filter change */
  useEffect(() => {
    applyTranslations(getCurrentLang());
  }, [active]);

  const events =
    active === "all"
      ? INC_EVENTS
      : INC_EVENTS.filter((e) => e.categories.includes(active));

  return (
    <>
      <div className="inc-events-filters">
        {EVENT_FILTERS.map((f) => (
          <button
            type="button"
            className={`inc-events-filter${f.key === active ? " is-active" : ""}`}
            onClick={() => setActive(f.key)}
            data-i18n={f.labelKey}
            key={f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="inc-event-row">
        {events.map((e) => (
          <EventCard event={e} key={e.key} />
        ))}
      </div>
    </>
  );
}
