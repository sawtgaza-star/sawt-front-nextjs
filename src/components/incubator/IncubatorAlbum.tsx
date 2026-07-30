import { IconPlay } from "@/components/ui/icons";
import { ALBUM_CARDS } from "./album-data";

/* "الحاضنة بيتك الثاني ، البوم الحاضنة" — sixth section of /incubator: a
   three-column photo album (tall launch-day video on the start side, featured
   + workshop shots in the middle, mentor / community on the end side). The
   chips and captions live on the dark gradient and only appear on hover; the
   pale olive branch sits in the section's bottom-left corner, as in the mock. */
export default function IncubatorAlbum() {
  return (
    <section className="inc-album" id="inc-album">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-album-leaf"
        alt=""
      />

      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_album_title_pre">الحاضنة بيتك الثاني ،</span>{" "}
            <span className="inc-highlight" data-i18n="inc_album_title_hl">
              البوم الحاضنة
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_album_sub">
            مبلغ بسيط يفتح باب المعرفة أمام شاب في غزة — تبرّعك يصل مباشرة
            لتغطية تكاليف التدريب
          </p>
        </div>

        <div className="inc-album-grid">
          {ALBUM_CARDS.map((c) => (
            <figure
              className={`inc-album-card inc-album-card-${c.area}`}
              key={c.key}
            >
              <img
                src={c.image}
                alt=""
                className="inc-album-photo"
                style={c.position ? { objectPosition: c.position } : undefined}
              />

              {c.play && (
                <span className="inc-album-play" aria-hidden="true">
                  <IconPlay />
                </span>
              )}

              <figcaption className="inc-album-overlay">
                {c.chip && (
                  <span
                    className={`inc-album-chip inc-album-chip-${c.chip.pos}`}
                    data-i18n={c.chip.key}
                  >
                    {c.chip.text}
                  </span>
                )}
                {c.caption && (
                  <span className="inc-album-caption">
                    <b data-i18n={c.caption.key}>{c.caption.text}</b>
                    {c.captionSub && (
                      <span data-i18n={c.captionSub.key}>
                        {c.captionSub.text}
                      </span>
                    )}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
