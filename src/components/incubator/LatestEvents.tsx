import { localized } from "@/lib/api/pages";
import type { IncubatorEventsContent } from "@/lib/api/incubator-page";
import EventsExplorer from "./EventsExplorer";
import IncubatorSectionHead from "./IncubatorSectionHead";

/* "استكشف أحدث فعالياتنا" — category filter chips over a three-up row of event
   cards on the page's gray band, from the API's `events` block. The chips and
   the row they filter live in EventsExplorer (client leaf).
   #inc-workshops is the anchor the navbar's "الورشات" link points at. */
export default function LatestEvents({
  data,
  lang,
}: {
  data?: IncubatorEventsContent;
  lang: string;
}) {
  if (!data || !Array.isArray(data.items) || !data.items.length) return null;

  return (
    <section className="inc-events" id="inc-workshops">
      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <EventsExplorer
          categories={data.categories}
          items={data.items}
          lang={lang}
        />
      </div>
    </section>
  );
}
