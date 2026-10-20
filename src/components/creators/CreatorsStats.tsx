import { localized } from "@/lib/api/pages";
import type { CreatorsStatsContent } from "@/lib/api/creators-page";
import { CreatorStatIcon } from "./creator-stat-icons";
import { splitEnds } from "./creators-text";
import { splitStatValue } from "@/components/home/stat-icons";

/* "إنجازات صناع محتوى صوت" — the API's `stats` block: four figures, each with
   the icon its `key` picks (see ./creator-stat-icons).

   The figure is written exactly as the home stats bar writes it (HeroHeader's
   StatColumn): the editor's `prefix` + raw `value` + `suffix` go through
   splitStatValue — the "+" leads, and a big number is shortened to "+17" ·
   "مليون" in Arabic / "+17M" in English — and `.counter` makes runCounters()
   count it up (CreatorsContent starts it). The heading's accents are the
   legacy markup's: first word orange, the brand at the end in green. */
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
          {items.map((stat, index) => {
            const raw =
              typeof stat.value === "number" && Number.isFinite(stat.value)
                ? `${stat.prefix || ""}${stat.value}${stat.suffix || ""}`
                : "";
            const { figure, word } = splitStatValue(raw, lang);
            return (
              <div className="cr-stat-card" key={stat.key || index}>
                <div className="cr-stat-icon">
                  <i className="icon">
                    <CreatorStatIcon statKey={stat.key} />
                  </i>
                </div>
                {/* keyed by the figure: runCounters() caches the first text it
                    animated, so a language switch that rescales it needs a
                    fresh element (as on the home bar) */}
                <div className="cr-stat-num counter" key={figure}>
                  <span className="counter-figure" dir={lang === "en" ? "ltr" : "rtl"}>
                    {figure}
                  </span>
                  {word ? (
                    <>
                      {" "}
                      <span className="counter-word">{word}</span>
                    </>
                  ) : null}
                </div>
                <p className="cr-stat-label">{localized(stat.label, lang)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
