import { localized } from "@/lib/api/pages";
import { sortItems, type MediaWorksContent } from "@/lib/api/media-page";
import { dealIntoColumns } from "./media-page-view";
import MediaSectionHead from "./MediaSectionHead";
import MediaWorksCard, { type WorkTile } from "./MediaWorksCard";

/* "أبرز أعمالنا" — three columns of stills drifting vertically inside one
   rounded panel (outer columns up, middle one down); on phones media.css turns
   the same three loops on their side, so they run as full-bleed rows. Every
   tile carries its own project card inside `.sm-works-shot`, so the card
   scrolls along with its photo; hovering a tile reveals its card and pauses
   that column (media.css).

   Each column's list is rendered three times and the CSS walks it by exactly
   one pass, so the loop has no seam. Two passes were enough while the loops ran
   vertically — sideways a pass is shorter than a wide phone, and the row would
   run out of tiles before it came round.

   The API sends one flat list of projects; ./media-page-view deals it into the
   three columns. */
const PASSES = [0, 1, 2];

export default function MediaWorks({
  data,
  lang = "ar",
}: {
  data?: MediaWorksContent;
  lang?: string;
}) {
  const tiles: WorkTile[] = sortItems(data?.items).map((item) => ({
    imageUrl: item.image_url || null,
    tag: localized(item.tag?.label, lang),
    date: localized(item.date, lang),
    title: localized(item.title, lang),
    category: localized(item.category, lang),
    href: item.path || (item.slug ? "/media/works/" + item.slug : "/media/works"),
  }));
  const columns = dealIntoColumns(tiles);
  const moreLabel = localized(data?.more?.label, lang);

  if (!data || !tiles.length) return null;

  return (
    <section className="sm-works" id="sm-works">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="sm-works-wall">
          {columns.map((column, c) => (
            <div className={"sm-works-col sm-works-col-" + (c + 1)} key={c}>
              <div className="sm-works-loop">
                {PASSES.map((pass) =>
                  column.map((work, i) => (
                    <span className="sm-works-shot" key={`${pass}-${i}`}>
                      {work.imageUrl ? (
                        <img
                          src={work.imageUrl}
                          alt=""
                          aria-hidden={pass > 0 || undefined}
                        />
                      ) : null}
                      <MediaWorksCard work={work} duplicate={pass > 0} />
                    </span>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>

        {moreLabel ? (
          <div className="sm-works-more">
            <a className="sm-btn-green sm-btn-lg" href="/media/works">
              <span>{moreLabel}</span>
              <i className="fa-solid fa-angle-left"></i>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
