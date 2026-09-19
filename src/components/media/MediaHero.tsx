import { localized } from "@/lib/api/pages";
import { sortItems, type MediaHeroContent } from "@/lib/api/media-page";
import { ctaHref, heroDeck } from "./media-page-view";
import MediaNav from "./MediaNav";
import MediaHeroRotation from "./MediaHeroRotation";
import MediaHeroWord from "./MediaHeroWord";
import MediaHeroFan from "./MediaHeroFan";
import MediaSatisfactionChip from "./MediaSatisfactionChip";
import MediaTicker from "./MediaTicker";
import "@/styles/nav-skeleton.css";

/* Hero of /media — hosts the page's own navbar, the headline whose second
   line names the service in focus, the two CTAs, the two floating rating
   chips and the fanned deck of production stills. Headline word and deck run
   off one clock (MediaHeroRotation), so the orange word always advances with
   the photo in the middle seat. The services ticker rides the bottom edge,
   straddling the hero and the about section.

   The copy is GET /pages/media's `hero` block and nothing else, but the shell
   around it is NOT conditional: <MediaNav /> lives inside, and its
   `.language-btn` is what initTranslate() binds the AR/EN toggle to, once, on
   page load — a header that appeared only when the payload landed would bring
   that button up afterwards and the toggle would never be wired. So the frame
   renders from the first paint and only its text is drawn as bars while
   `loading` (styles/nav-skeleton.css, as in the navbar itself).

   The ellipsis in front of the eyebrow is the design's, not the editor's: it
   is typography, so it stays in the markup whatever the API sends. */
export default function MediaHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: MediaHeroContent;
  lang?: string;
  loading?: boolean;
}) {
  const eyebrow = localized(data?.eyebrow, lang);
  const description = localized(data?.description, lang);
  const phrases = sortItems(data?.phrases)
    .map((phrase) => localized(phrase.label, lang))
    .filter(Boolean);
  const deck = heroDeck(
    sortItems(data?.images)
      .map((image) => image.url)
      .filter((url): url is string => Boolean(url)),
  );
  const primary = data?.cta?.primary;
  const secondary = data?.cta?.secondary;
  const badge = {
    value: data?.badge?.value || undefined,
    label: localized(data?.badge?.label, lang) || undefined,
  };

  return (
    <header className="sm-hero">
      {/* Everything except the ticker lives in the frame — it is the design's
          hero artboard, so the background stack and the two chips can use the
          artboard coordinates verbatim. */}
      <div className="sm-hero-frame">
        {/* background stack, bottom layer first: two peach washes centred on
            the artboard, then the two olive glows that bleed past its bottom
            corners into the about section (see `.sm-page` for the layer) */}
        <span className="sm-hero-wash" aria-hidden="true" />
        <span className="sm-hero-wash sm-hero-wash-2" aria-hidden="true" />
        <span className="sm-hero-glow sm-hero-glow-right" aria-hidden="true" />
        <span className="sm-hero-glow sm-hero-glow-left" aria-hidden="true" />

        <MediaNav />

        <MediaHeroRotation>
          <div className="container">
            <div className="sm-hero-text">
              <h1 className="sm-hero-title">
                {loading ? (
                  <span className="nsk-line" style={{ width: "260px", height: "34px" }} />
                ) : (
                  <>
                    <span>...{eyebrow}</span>
                    <MediaHeroWord phrases={phrases} />
                  </>
                )}
              </h1>
              {loading ? (
                <p className="sm-hero-desc">
                  <span className="nsk-line" style={{ width: "min(560px, 90%)" }} />
                </p>
              ) : description ? (
                <p className="sm-hero-desc">{description}</p>
              ) : null}
              <div className="sm-hero-cta">
                {loading ? (
                  <>
                    <span className="nsk-cta" style={{ width: "150px" }} />
                    <span className="nsk-cta" style={{ width: "160px" }} />
                  </>
                ) : (
                  <>
                    {primary?.label ? (
                      <a className="sm-btn-green" href={ctaHref(primary, "/media/contact")}>
                        <span>{localized(primary.label, lang)}</span>
                        <i className="fa-solid fa-angle-left"></i>
                      </a>
                    ) : null}
                    {/* the deck is on this very page, so the services key
                        resolves to the anchor rather than a link to /media */}
                    {secondary?.label ? (
                      <a
                        className="sm-btn-outline"
                        href={ctaHref(secondary, "#sm-services", {
                          services: "#sm-services",
                        })}
                      >
                        {localized(secondary.label, lang)}
                      </a>
                    ) : null}
                  </>
                )}
              </div>
            </div>

            {/* an empty deck of the same height holds the artboard open, so
                the ticker and everything under it don't jump when the stills
                arrive */}
            {loading ? (
              <div className="sm-hero-fan" aria-hidden="true" />
            ) : (
              <MediaHeroFan deck={deck} />
            )}
          </div>
        </MediaHeroRotation>

        {/* the chips are artboard-level, not part of the deck: the design puts
            the -3.779° one beside the headline and the +4° one over the deck */}
        <MediaSatisfactionChip className="sm-chip-hero-a" tilt={1} {...badge} />
        <MediaSatisfactionChip className="sm-chip-hero-b" tilt={0} {...badge} />
      </div>

      {/* empty while the payload is on its way — `.sm-ticker:empty` in
          media.css holds the strip's height so nothing below it jumps */}
      {loading ? (
        <div className="sm-ticker" aria-hidden="true" />
      ) : (
        <MediaTicker phrases={phrases} />
      )}
    </header>
  );
}
