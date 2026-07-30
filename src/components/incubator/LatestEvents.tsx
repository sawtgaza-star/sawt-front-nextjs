import EventsExplorer from "./EventsExplorer";

/* "استكشف أحدث فعالياتنا" — fifth section of /incubator: category filter chips
   over a three-up row of event cards, on the page's gray band. The chips and
   the row they filter live in EventsExplorer (client leaf); this wrapper and
   the heading stay server-rendered.
   #inc-workshops is the anchor the navbar's "الورشات" link points at. */
export default function LatestEvents() {
  return (
    <section className="inc-events" id="inc-workshops">
      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_events_title_pre">استكشف أحدث</span>{" "}
            <span className="inc-highlight" data-i18n="inc_events_title_hl">
              فعالياتنا
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_events_sub">
            أرقام حقيقية تعكس قوة مجتمعنا
          </p>
        </div>

        <EventsExplorer />
      </div>
    </section>
  );
}
