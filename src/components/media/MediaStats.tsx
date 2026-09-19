import { localized } from "@/lib/api/pages";
import { sortItems, type MediaStatsContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";

/* "أرقام نفخر بها" — the whole section sits inside one soft-gray rounded
   panel, heading included. Both the numbers and their captions are the API's
   `stats` block, so an editor can add a sixth figure and the row takes it. */
export default function MediaStats({
  data,
  lang = "ar",
}: {
  data?: MediaStatsContent;
  lang?: string;
}) {
  const items = sortItems(data?.items);
  if (!data || !items.length) return null;

  return (
    <section className="sm-stats">
      <div className="container">
        <div className="sm-stats-panel">
          <MediaSectionHead
            pill={localized(data.eyebrow, lang)}
            title={localized(data.title, lang)}
            sub={localized(data.subtitle, lang)}
          />

          <div className="sm-stats-row">
            {items.map((stat, index) => (
              <div className="sm-stat" key={index}>
                {/* counted up from zero by initCounters() (lib/scroll-effects)
                    when the panel is scrolled into view — it claims
                    `.sm-stat-value` as it appears, which is after this
                    section's payload lands */}
                <p className="sm-stat-value">{stat.value}</p>
                <p className="sm-stat-label">{localized(stat.label, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
