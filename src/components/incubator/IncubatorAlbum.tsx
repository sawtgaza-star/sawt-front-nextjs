import { IconPlay } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorGalleryContent } from "@/lib/api/incubator-page";
import { CHIP_POS, SLOT_AREAS } from "./album-data";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { PLACEHOLDER, sortItems } from "./incubator-page-view";

/* "الحاضنة بيتك الثاني ، البوم الحاضنة" — a three-column photo album from the
   API's `gallery` block, each item placed by its `slot` (see ./album-data).
   The chips and captions live on the dark gradient and only appear on hover;
   a video item carries the dark-green play badge and opens its video. The
   pale olive branch sits in the section's bottom-left corner, as in the mock. */
export default function IncubatorAlbum({
  data,
  lang,
}: {
  data?: IncubatorGalleryContent;
  lang: string;
}) {
  const items = sortItems(data?.items).filter((item) => SLOT_AREAS[item.slot || ""]);
  if (!data || !items.length) return null;

  return (
    <section className="inc-album" id="inc-album">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-album-leaf"
        alt=""
      />

      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="inc-album-grid">
          {items.map((item) => {
            const area = SLOT_AREAS[item.slot || ""];
            const caption = localized(item.caption, lang);
            const sub = localized(item.subtitle, lang);
            const isVideo = item.type === "video";

            return (
              <figure className={`inc-album-card inc-album-card-${area}`} key={item.slot}>
                <img
                  src={item.image_url || PLACEHOLDER.album}
                  alt=""
                  className="inc-album-photo"
                />

                {isVideo ? (
                  item.video_url ? (
                    <a
                      className="inc-album-play"
                      href={item.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={caption || "video"}
                    >
                      <IconPlay />
                    </a>
                  ) : (
                    <span className="inc-album-play" aria-hidden="true">
                      <IconPlay />
                    </span>
                  )
                ) : null}

                <figcaption className="inc-album-overlay">
                  {caption && !sub ? (
                    <span className={`inc-album-chip inc-album-chip-${CHIP_POS[area]}`}>
                      {caption}
                    </span>
                  ) : null}
                  {caption && sub ? (
                    <span className="inc-album-caption">
                      <b>{caption}</b>
                      <span>{sub}</span>
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
