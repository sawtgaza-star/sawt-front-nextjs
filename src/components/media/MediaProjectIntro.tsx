import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import type { MediaWorkIdentity } from "@/lib/api/media-work";
import { IconCalendarDays } from "@/components/ui/icons";

/* Top of the case study: the project's still on the left, its identity on the
   right (chips, name + specialty, the one-line brief) and the headline figures
   in the card underneath — the card whose top edge carries the design's
   olive→orange hairline (media.css). */
export default function MediaProjectIntro({
  data,
  lang = "ar",
}: {
  data?: MediaWorkIdentity;
  lang?: string;
}) {
  const date = localized(data?.date, lang);
  const tag = localized(data?.tag, lang);
  const title = localized(data?.title, lang);
  const category = localized(data?.category, lang);
  const summary = localized(data?.summary, lang);
  const highlights = sortItems(data?.highlights);

  if (!data) return null;

  return (
    <section className="sm-pj-intro">
      <div className="container">
        <div className="sm-pj-intro-row">
          <div className="sm-pj-intro-copy">
            <div className="sm-pj-chips">
              {date ? (
                <span className="sm-works-chip sm-works-chip-date">
                  <IconCalendarDays />
                  <span>{date}</span>
                </span>
              ) : null}
              {tag ? (
                <span className="sm-works-chip sm-works-chip-tag">{tag}</span>
              ) : null}
            </div>

            <div className="sm-pj-title-row">
              <h2 className="sm-pj-title">{title}</h2>
              <span className="sm-pj-specialty">{category}</span>
            </div>

            <p className="sm-pj-desc">{summary}</p>

            {/* the figures count up when the card scrolls into view — that is
                initCounters() in scroll-effects.ts, which reads the class */}
            <div className="sm-pj-figures">
              {highlights.map((figure, index) => (
                <div className="sm-pj-figure" key={index}>
                  <b className="sm-pj-figure-value">{figure.value}</b>
                  <span className="sm-pj-figure-label">
                    {localized(figure.label, lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <figure className="sm-pj-shot">
            {data.cover_url ? <img src={data.cover_url} alt="" /> : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
