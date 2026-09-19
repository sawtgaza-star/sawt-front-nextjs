import { localized } from "@/lib/api/pages";
import type { CreatorsStatsContent } from "@/lib/api/creators-page";
import { CreatorStatIcon } from "./creator-stat-icons";
import { splitEnds, statFigure } from "./creators-text";

/* "إنجازات صناع محتوى صوت" — the API's `stats` block: four figures, each with
   the icon its `key` picks (see ./creator-stat-icons).

   The number is the editor's raw `value`, compacted the way the design writes
   it (250000 → "250K"), with their own `prefix`/`suffix` around it — see
   statFigure in ./creators-text. The heading's accents are the legacy
   markup's: first word orange, the brand at the end in green. */
export default function CreatorsStats({
  data,
  lang = "ar",
}: {
  data?: CreatorsStatsContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [lead, titleMid, brand] = splitEnds(title, 1, 1);
  const subtitle = localized(data?.subtitle, lang);
  const items = Array.isArray(data?.items) ? data.items : [];

  if (!title && !subtitle && !items.length) return null;

  return (
    <section className="cr-stats-section">
      <div className="container">
        <div className="cr-section-head">
          {title ? (
            <h2 className="cr-section-title">
              <span className="cr-title-orange">{lead}</span>{" "}
              <span>{titleMid}</span>{" "}
              <span className="cr-highlight">{brand}</span>
            </h2>
          ) : null}
          {subtitle ? <p className="cr-section-sub">{subtitle}</p> : null}
        </div>
        <div className="cr-stats-grid">
          {items.map((stat, index) => (
            <div className="cr-stat-card" key={stat.key || index}>
              <div className="cr-stat-icon">
                <i className="icon">
                  <CreatorStatIcon statKey={stat.key} />
                </i>
              </div>
              <div className="cr-stat-num">
                {statFigure(stat.value, stat.prefix, stat.suffix)}
              </div>
              <p className="cr-stat-label">{localized(stat.label, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
