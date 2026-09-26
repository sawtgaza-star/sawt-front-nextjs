import { localized } from "@/lib/api/pages";
import type { IncubatorHeroContent, IncubatorStat } from "@/lib/api/incubator-page";
import IncubatorNav from "./IncubatorNav";
import { STAT_ICONS } from "./hero-stats-data";
import { INCUBATOR_ROUTES, PLACEHOLDER, sortItems, splitHeroTitle } from "./incubator-page-view";

/* Hero of /incubator — headline + collage with two floating counters, and the
   stats strip that straddles the bottom of the gradient. Copy, images and
   figures are GET /pages/incubator's `hero` and `stats` blocks.

   The frame (and <IncubatorNav /> inside it) is rendered from the first paint
   whatever the request is doing — the nav's `.language-btn` is bound once by
   initTranslate() and must never be remounted — and only the text inside it
   is drawn as bars while `loading`. */
export default function IncubatorHero({
  data,
  stats,
  lang,
  loading,
}: {
  data?: IncubatorHeroContent;
  stats?: IncubatorStat[];
  lang: string;
  loading: boolean;
}) {
  const [plain, green, orange] = splitHeroTitle(localized(data?.title, lang));
  const desc = localized(data?.description, lang);
  const cta = localized(data?.cta?.label, lang);
  const image = data?.foreground_url || data?.image_url || PLACEHOLDER.heroImage;
  const top = data?.badges?.top;
  const bottom = data?.badges?.bottom;
  const items = sortItems(stats);

  return (
    <header
      className="inc-hero"
      style={
        data?.background_url
          ? { background: `url("${data.background_url}") top center / 100% 100% no-repeat` }
          : undefined
      }
    >
      <IncubatorNav />

      <div className="container">
        <div className="inc-hero-grid">
          <div className="inc-hero-text">
            {loading ? (
              <>
                <span className="nsk-line" style={{ display: "block", width: "80%", height: 40 }} />
                <span className="nsk-line" style={{ display: "block", width: "55%", height: 40, marginTop: 14 }} />
                <span className="nsk-line" style={{ display: "block", width: "95%", marginTop: 24 }} />
                <span className="nsk-line" style={{ display: "block", width: "70%", marginTop: 10 }} />
              </>
            ) : (
              <>
                <h1 className="inc-hero-title">
                  {plain ? <span>{plain}</span> : null}
                  {plain && green ? " " : null}
                  {green ? <span className="inc-hero-title-green">{green}</span> : null}
                  {orange ? (
                    <>
                      <br />
                      <span className="inc-hero-title-orange">{orange}</span>
                    </>
                  ) : null}
                </h1>
                {desc ? <p className="inc-hero-desc">{desc}</p> : null}
                {cta ? (
                  <a className="inc-btn-green" href={INCUBATOR_ROUTES.heroCta}>
                    <span>{cta}</span>
                    <i className="fa-solid fa-angle-left"></i>
                  </a>
                ) : null}
              </>
            )}
          </div>

          <div className="inc-hero-media">
            {loading ? (
              <span className="nsk-block inc-hero-img" style={{ border: 0 }} />
            ) : (
              /* `foreground_url` is a finished composite — the design's frame
                 and shadow are part of the upload — so it drops the CSS frame
                 (.inc-hero-img--composite) instead of being framed twice */
              <img
                className={
                  "inc-hero-img" + (data?.foreground_url ? " inc-hero-img--composite" : "")
                }
                src={image}
                alt=""
              />
            )}
            {!loading && top?.value ? (
              <div className="inc-hero-badge inc-hero-badge-green">
                <b>{top.value}</b>
                <span>{localized(top.label, lang)}</span>
              </div>
            ) : null}
            {!loading && bottom?.value ? (
              <div className="inc-hero-badge inc-hero-badge-orange">
                <b>{bottom.value}</b>
                <span>{localized(bottom.label, lang)}</span>
              </div>
            ) : null}
          </div>
        </div>

        {loading || items.length ? (
          <div className="inc-stats">
            {loading
              ? [0, 1, 2, 3].map((index) => (
                  <div className="inc-stat" key={index}>
                    <span className="nsk-line" style={{ display: "block", width: "60%", height: 28 }} />
                    <span className="nsk-line" style={{ display: "block", width: "80%", marginTop: 10 }} />
                  </div>
                ))
              : items.map((stat, index) => (
                  <div className="inc-stat" key={stat.key || index}>
                    <span className="inc-stat-icon" aria-hidden="true">
                      {STAT_ICONS[(stat.key || "").toLowerCase()] ?? null}
                    </span>
                    {/* counted up from zero by initCounters() (lib/scroll-effects)
                        once it lands and is scrolled into view */}
                    <p className="inc-stat-value">{stat.value}</p>
                    <p className="inc-stat-label">{localized(stat.label, lang)}</p>
                  </div>
                ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
