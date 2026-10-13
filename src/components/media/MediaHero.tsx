import { localized } from "@/lib/api/pages";
import { sortItems, type MediaHeroContent } from "@/lib/api/media-page";
import { ctaHref, heroDeck } from "./media-page-view";
import MediaNav from "./MediaNav";
import MediaHeroRotation from "./MediaHeroRotation";
import MediaHeroWord from "./MediaHeroWord";
import MediaHeroFan from "./MediaHeroFan";
import MediaSatisfactionChip from "./MediaSatisfactionChip";
import MediaTicker from "./MediaTicker";
import SkeletonText from "@/components/ui/SkeletonText";
import { SkButton, SkChip, SkTicker } from "./MediaSkeletonParts";

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
   `loading`: the same elements with each string swapped for a <SkeletonText />
   of the current copy's length (LOADING), so the headline, the buttons, the
   chips and the ticker hold the room the payload lands in.

   The ellipsis in front of the eyebrow is the design's, not the editor's: it
   is typography, so it stays in the markup whatever the API sends. */
/** Character counts of the current hero copy (GET /pages/media → hero). The
    rotating word is sized by its longest phrase, the line it wraps on. */
const LOADING = {
  eyebrow: 17,
  word: 20,
  description: 95,
  primary: 11,
  secondary: 16,
  phrases: [16, 17, 19, 18, 20, 13],
};

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
                  <>
                    <span>
                      <SkeletonText chars={LOADING.eyebrow} />
                    </span>
                    <span className="sm-hero-word">
                      <SkeletonText chars={LOADING.word} />
                    </span>
                  </>
                ) : (
                  <>
                    <span>...{eyebrow}</span>
                    <MediaHeroWord phrases={phrases} />
                  </>
                )}
              </h1>
              {loading ? (
                <p className="sm-hero-desc">
                  <SkeletonText chars={LOADING.description} />
                </p>
              ) : description ? (
                <p className="sm-hero-desc">{description}</p>
              ) : null}
              <div className="sm-hero-cta">
                {loading ? (
                  <>
                    <SkButton className="sm-btn-green" chars={LOADING.primary} />
                    <a className="sm-btn-outline" aria-hidden="true" tabIndex={-1}>
                      <SkeletonText chars={LOADING.secondary} />
                    </a>
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
        {loading ? (
          <>
            <SkChip className="sm-chip-hero-a" tilt={1} />
            <SkChip className="sm-chip-hero-b" tilt={0} />
          </>
        ) : (
          <>
            <MediaSatisfactionChip className="sm-chip-hero-a" tilt={1} {...badge} />
            <MediaSatisfactionChip className="sm-chip-hero-b" tilt={0} {...badge} />
          </>
        )}
      </div>

      {loading ? (
        <SkTicker phrases={LOADING.phrases} />
      ) : (
        <MediaTicker phrases={phrases} />
      )}
    </header>
  );
}
