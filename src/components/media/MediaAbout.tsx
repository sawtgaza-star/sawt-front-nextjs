import { localized } from "@/lib/api/pages";
import { sortItems, type MediaAboutContent } from "@/lib/api/media-page";
import { ABOUT_SLOTS, slotUrl } from "./media-page-view";
import MediaSectionHead from "./MediaSectionHead";
import MediaSatisfactionChip from "./MediaSatisfactionChip";

/* "شريكك الإعلامي المتكامل" — the about block. Copy column on the right (RTL
   first child), staggered four-photo collage on the left with the rating chip
   floating over its seam, and the vision/mission pair under the paragraph.

   Every word and every photo is the API's `about` block; the collage's four
   slots are named in the payload, so an editor can swap one picture without
   disturbing the other three (see slotUrl in ./media-page-view). An empty slot
   renders an empty frame rather than a broken image. */
export default function MediaAbout({
  data,
  lang = "ar",
}: {
  data?: MediaAboutContent;
  lang?: string;
}) {
  const body = localized(data?.body, lang);
  const images = sortItems(data?.images);
  /* listed in the order the payload sends them, so an upload with no key at
     all still lands in a sensible slot */
  const [topStart, topEnd, bottomStart, bottomEnd] = ABOUT_SLOTS.map((slot, index) =>
    slotUrl(images, slot, index),
  );

  const cards = [
    { key: "vision", className: "sm-about-vision", card: data?.vision },
    { key: "mission", className: "sm-about-mission", card: data?.mission },
  ]
    .map((entry) => ({
      ...entry,
      title: localized(entry.card?.title, lang),
      text: localized(entry.card?.text, lang),
    }))
    .filter((entry) => entry.title || entry.text);

  if (!data) return null;

  return (
    <section className="sm-about" id="sm-about">
      <div className="container">
        <div className="sm-about-row">
          <div className="sm-about-copy">
            <MediaSectionHead
              align="start"
              pill={localized(data.eyebrow, lang)}
              title={localized(data.title, lang)}
            />
            {body ? <p className="sm-about-desc">{body}</p> : null}

            {cards.length ? (
              <div className="sm-about-cards">
                {cards.map((entry) => (
                  <article className={"sm-about-card " + entry.className} key={entry.key}>
                    <h3>
                      <i className="sm-about-card-dot" aria-hidden="true"></i>
                      <span>{entry.title}</span>
                    </h3>
                    <p>{entry.text}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          {/* two stacks inside one 422px row: RTL puts column A on the right,
              where the design has the tall photo on top; the columns are
              staggered by exactly one gap (A sits at the bottom of the row,
              B at the top) */}
          <div className="sm-about-collage">
            <MediaSatisfactionChip
              className="sm-chip-about"
              tilt={0}
              value={data.badge?.value || undefined}
              label={localized(data.badge?.label, lang) || undefined}
            />
            <span className="sm-about-col sm-about-col-a">
              <span className="sm-about-img sm-about-img-1">
                {topStart ? <img src={topStart} alt="" /> : null}
              </span>
              <span className="sm-about-img sm-about-img-2">
                {bottomStart ? <img src={bottomStart} alt="" /> : null}
              </span>
            </span>
            <span className="sm-about-col sm-about-col-b">
              <span className="sm-about-img sm-about-img-3">
                {topEnd ? <img src={topEnd} alt="" /> : null}
              </span>
              <span className="sm-about-img sm-about-img-4">
                {bottomEnd ? <img src={bottomEnd} alt="" /> : null}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
