import MediaNav from "./MediaNav";
import MediaHeroRotation from "./MediaHeroRotation";
import MediaHeroWord from "./MediaHeroWord";
import MediaHeroFan from "./MediaHeroFan";
import MediaSatisfactionChip from "./MediaSatisfactionChip";
import MediaTicker from "./MediaTicker";

/* Hero of /media — hosts the page's own navbar, the headline whose second
   line names the service in focus, the two CTAs, the two floating rating
   chips and the fanned deck of production stills. Headline word and deck run
   off one clock (MediaHeroRotation), so the orange word always belongs to the
   photo in the middle seat. The services ticker rides the bottom edge,
   straddling the hero and the about section. */
export default function MediaHero() {
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
                <span data-i18n="sm_hero_title">...صوت ميديا تقدم</span>
                <MediaHeroWord />
              </h1>
              <p className="sm-hero-desc" data-i18n="sm_hero_desc">
                نحوّل أفكارك إلى تجارب إعلامية مؤثرة. من الاستراتيجية إلى الإنتاج
                والنشر — كل شيء في مكان واحد.
              </p>
              <div className="sm-hero-cta">
                <a className="sm-btn-green" href="/media/contact">
                  <span data-i18n="sm_cta_start">ابدأ مشروعك</span>
                  <i className="fa-solid fa-angle-left"></i>
                </a>
                <a className="sm-btn-outline" href="#sm-services" data-i18n="sm_cta_services">
                  تعرف على خدماتنا
                </a>
              </div>
            </div>

            <MediaHeroFan />
          </div>
        </MediaHeroRotation>

        {/* the chips are artboard-level, not part of the deck: the design puts
            the -3.779° one beside the headline and the +4° one over the deck */}
        <MediaSatisfactionChip className="sm-chip-hero-a" tilt={1} />
        <MediaSatisfactionChip className="sm-chip-hero-b" tilt={0} />
      </div>

      <MediaTicker />
    </header>
  );
}
