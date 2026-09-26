"use client";

import { useState } from "react";
import { localized } from "@/lib/api/pages";
import type { IncubatorEvent, IncubatorEventCategory } from "@/lib/api/incubator-page";
import EventCard from "./EventCard";
import { sortItems } from "./incubator-page-view";

/* Client leaf of the events section: the category chips + the card row they
   filter. The chip keyed "all" shows everything; the others match an event's
   `category_key`. A chip reads "label (count)" as in the mock, the count
   being the API's. */
const ALL = "all";

export default function EventsExplorer({
  categories,
  items,
  lang,
}: {
  categories?: IncubatorEventCategory[];
  items: IncubatorEvent[];
  lang: string;
}) {
  const [active, setActive] = useState(ALL);

  const filters = sortItems(categories).filter((c) => localized(c.label, lang));
  const events = sortItems(items).filter(
    (event) => active === ALL || event.category_key === active,
  );

  return (
    <>
      {filters.length ? (
        <div className="inc-events-filters">
          {filters.map((filter, index) => {
            const key = filter.key || String(index);
            const label = localized(filter.label, lang);
            return (
              <button
                type="button"
                className={`inc-events-filter${key === active ? " is-active" : ""}`}
                onClick={() => setActive(key)}
                key={key}
              >
                {key === ALL || filter.count == null ? label : `${label} (${filter.count})`}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="inc-event-row">
        {events.map((event, index) => (
          <EventCard event={event} lang={lang} key={`${active}-${index}`} />
        ))}
      </div>
    </>
  );
}
