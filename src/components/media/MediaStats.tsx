import MediaSectionHead from "./MediaSectionHead";
import { MEDIA_STATS } from "./media-stats-data";

/* "أرقام نفخر بها" — the whole section sits inside one soft-gray rounded
   panel, heading included. */
export default function MediaStats() {
  return (
    <section className="sm-stats">
      <div className="container">
        <div className="sm-stats-panel">
          <MediaSectionHead
            pill="صوت ميديا  في ارقام"
            pillKey="sm_stats_pill"
            title="أرقام نفخر بها"
            titleKey="sm_stats_title"
            sub="أرقام تعكس ثقة عملائنا وجودة عملنا"
            subKey="sm_stats_sub"
          />

          <div className="sm-stats-row">
            {MEDIA_STATS.map((s) => (
              <div className="sm-stat" key={s.key}>
                {/* .counter → animated by the shared runCounters() */}
                <p className="sm-stat-value counter">{s.value}</p>
                <p className="sm-stat-label" data-i18n={s.labelKey}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
