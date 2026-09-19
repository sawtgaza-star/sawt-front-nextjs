import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import type { MediaServiceWorksContent } from "@/lib/api/media-service";
import { ctaHref } from "./media-page-view";
import MediaProjectHead from "./MediaProjectHead";
import MediaWorksTile, { type TileWork } from "./MediaWorksTile";

/* "نماذج من أعمالنا" — the projects of the portfolio that stand for this
   service, on the same tiles the /media/works grid uses (media.css narrows them
   for this three-column row), and the outline button through to the full
   listing.

   The projects come in the same shape as /media's works wall, so the tile's
   subtitle is the project's category there too. The tiles carry no `data-i18n`:
   the strings are already in the reader's language. */
export default function MediaServiceWorks({
  data,
  lang = "ar",
}: {
  data?: MediaServiceWorksContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const moreLabel = localized(data?.more?.label, lang);

  const tiles: TileWork[] = sortItems(data?.items).map((work) => ({
    photo: work.image_url || "",
    href: work.path || (work.slug ? "/media/works/" + work.slug : "/media/works"),
    tag: localized(work.tag?.label, lang),
    date: localized(work.date, lang),
    title: localized(work.title, lang),
    sub: localized(work.category, lang),
  }));

  if (!title && !tiles.length) return null;

  return (
    <section className="sm-sv-works">
      {title ? <MediaProjectHead title={title} dot="orange" /> : null}

      <div className="sm-sv-grid">
        {tiles.map((tile, index) => (
          <MediaWorksTile key={index} work={tile} />
        ))}
      </div>

      {moreLabel ? (
        <div className="sm-sv-more">
          <a className="sm-btn-outline" href={ctaHref(data?.more, "/media/works")}>
            <span>{moreLabel}</span>
          </a>
        </div>
      ) : null}
    </section>
  );
}
