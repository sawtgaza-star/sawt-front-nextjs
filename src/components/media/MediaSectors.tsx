import { localized } from "@/lib/api/pages";
import { localizedList, sortItems, type MediaAudiencesContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";
import { IconSectorBadge } from "./media-icons";

/* "من نخدم ؟" — the audience cards side by side; the middle one is drawn with
   the orange top rule the design highlights it with. Which card that is comes
   from the position, not the payload: with the design's three cards it is the
   second, and the rule stays on the middle of whatever the editor lists. */
export default function MediaSectors({
  data,
  lang = "ar",
}: {
  data?: MediaAudiencesContent;
  lang?: string;
}) {
  const items = sortItems(data?.items);
  const featured = Math.floor(items.length / 2);

  if (!data || !items.length) return null;

  return (
    <section className="sm-sectors">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="sm-sectors-grid">
          {items.map((item, index) => (
            <article
              className={"sm-sector" + (index === featured ? " sm-sector-featured" : "")}
              key={index}
            >
              <span className="sm-sector-icon" aria-hidden="true">
                <IconSectorBadge />
              </span>

              <h3 className="sm-sector-title">{localized(item.title, lang)}</h3>
              <p className="sm-sector-tagline">{localized(item.tagline, lang)}</p>
              <p className="sm-sector-desc">{localized(item.description, lang)}</p>

              <ul className="sm-sector-points">
                {localizedList(item.bullets, lang).map((point, i) => (
                  <li key={i}>
                    <i aria-hidden="true"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
