import { localized, localizedHtml } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import type { MediaWorkIdentity } from "@/lib/api/media-work";
import { IconCalendarDays } from "@/components/ui/icons";
import RichText from "@/components/ui/RichText";

/* Top of the case study: the project's still on the left, its identity on the
   right (chips, name + specialty, the one-line brief) and the headline figures
   in the card underneath — the card whose top edge carries the design's
   olive→orange hairline (media.css).

   Every piece the payload leaves empty is left out rather than drawn as an
   empty box — no still means the identity takes the whole row. */
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
  const summary = localizedHtml(data?.summary, lang);
  const highlights = sortItems(data?.highlights);

  if (!data) return null;
  const cover = data.cover_url;

  return (
    <section className="sm-pj-intro">
      <div className="container">
        <div
          className={"sm-pj-intro-row" + (cover ? "" : " sm-pj-intro-row-solo")}
        >
          <div className="sm-pj-intro-copy">
            {date || tag ? (
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
            ) : null}

            {title || category ? (
              <div className="sm-pj-title-row">
                {title ? <h2 className="sm-pj-title">{title}</h2> : null}
                {category ? (
                  <span className="sm-pj-specialty">{category}</span>
                ) : null}
              </div>
            ) : null}

            {summary ? (
              <RichText as="p" className="sm-pj-desc" html={summary} />
            ) : null}

            {/* the figures count up when the card scrolls into view — that is
                initCounters() in scroll-effects.ts, which reads the class */}
            {highlights.length ? (
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
            ) : null}
          </div>

          {cover ? (
            <figure className="sm-pj-shot">
              <img src={cover} alt="" />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
