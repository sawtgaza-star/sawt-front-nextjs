// @ts-nocheck
/* eslint-disable */
import "@/styles/home-stats.css";
import "@/styles/home-hero.css";
import SiteNav from "@/components/site/SiteNav";
import { localized } from "@/lib/api/pages";
import type { HomeHero, HomeStats } from "@/lib/api/home";
import { bySortOrder } from "./home-text";
import { StatIcon, splitStatValue } from "./stat-icons";
import { HeroSlideSkeleton, StatsBarSkeleton } from "./HomeSkeleton";

/* Slides, copy and figures all come from the API's `hero` + `stats` blocks;
   nothing here carries built-in text any more, and the `data-i18n` keys went
   with it — the payload holds ar + en at once, so `lang` alone decides which
   is shown. Leaving those keys on React-rendered copy is what made
   applyTranslations() fight React on /about; see the note in AboutHero.

   The <header> shell is NOT conditional, for the same reason it isn't there:
   <SiteNav /> lives inside it and initHeaderPin() (lib/legacy-main) wraps
   `.nav-face` + `.navbar` into `.header-bar` right after mount. A header that
   appeared only once the payload landed would bring its nav up too late to be
   wrapped. The carousel and the stats bar hold their height with bars until
   then — and HomeContent re-starts the Bootstrap carousel afterwards, because
   an empty `.carousel-inner` is nothing for it to cycle. */

/** The four filled stars + one empty one, ahead of the trust line. */
function HeroStars() {
  return (
    <>
      <i className="fa-solid fa-star yellow-stars"></i>{" "}
      <i className="fa-solid fa-star yellow-stars"></i>{" "}
      <i className="fa-solid fa-star yellow-stars"></i>{" "}
      <i className="fa-solid fa-star yellow-stars"></i>{" "}
      <i className="fa-regular fa-star gray-star"></i>{" "}
    </>
  );
}

function HeroSlide({ slide, index, trust, support, collaborate, lang }) {
  const title = localized(slide.title, lang);
  const subtitle = localized(slide.subtitle, lang);

  return (
    <div
      className={"carousel-item position-relative" + (index === 0 ? " active" : "")}
    >
      {" "}
      {slide.image_url ? (
        <img
          src={slide.image_url}
          className="d-block w-100 carousel-img"
          alt={title}
          /* the first slide is the page's LCP image: fetch it ahead of the
             scripts. The others aren't lazy — Bootstrap reveals them mid-slide,
             too late to start a request — they just yield the bandwidth. */
          fetchPriority={index === 0 ? "high" : "low"}
          decoding={index === 0 ? undefined : "async"}
        />
      ) : null}{" "}
      <div className="carousel-caption-custom text-center">
        {" "}
        <div className="container">
          {" "}
          <div className="d-md-flex justify-content-center gap-1 mb-4 align-items-center">
            {" "}
            <HeroStars />{" "}
            {trust ? (
              <p className="text-white hero-subtitle mb-0">{trust}</p>
            ) : null}{" "}
          </div>{" "}
          {title ? (
            <h1 className="fw-bold text-white font-60">
              {/* inner line carries the title's gradient colour (home-hero.css) */}
              <span className="hero-reveal">
                <span className="hero-reveal-text">{title}</span>
              </span>
            </h1>
          ) : null}{" "}
          {subtitle ? (
            <p className="mb-4 text-white font-24">{subtitle}</p>
          ) : null}{" "}
          <div className="d-flex justify-content-center gap-3 heroOptionsBtn">
            {" "}
            {support ? (
              <a
                href="/support"
                className="btn rounded-pill px-4 py-2 text-white fw-bold hero-btn-watch"
                style={{ backgroundColor: "rgba(76, 92, 55, 1)" }}
              >
                {" "}
                <span className="ms-2">{support}</span>{" "}
                <i className="fa-solid fa-angle-left"></i>{" "}
              </a>
            ) : null}{" "}
            {collaborate ? (
              <a
                href="/collaborate"
                className="btn rounded-pill px-4 py-2 text-white fw-bold hero-btn-support"
              >
                {collaborate}
              </a>
            ) : null}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

/** One figure of the bar. `.counter` is what runCounters() animates, and it
    reads the number out of `.counter-figure` — which holds only the figure
    ("+140", "20+"), while any word the API sends with it ("مليون") sits in
    its own span that stays still. */
function StatColumn({ stat, lang }) {
  const label = localized(stat.label, lang);
  const value =
    stat.value && typeof stat.value === "object" ? localized(stat.value, lang) : stat.value;
  const { figure, word } = splitStatValue(value, lang);

  return (
    <div className="col count">
      {" "}
      <i>
        <StatIcon statKey={stat.key} />
      </i>{" "}
      {/* keyed by the figure: runCounters() caches the first text it animated
          (data-counter-from), so a language switch that rescales it ("140+"
          → "140K+") needs a fresh element */}
      <h3 className="counter font-mob-22" key={figure}>
        {/* LTR island: in the RTL heading a leading "+" would otherwise be
            flipped to the number's other side ("+20" painting as "20+"). */}
        <span className="counter-figure" dir="ltr">
          {figure}
        </span>
        {word ? (
          <>
            {" "}
            <span className="counter-word">{word}</span>
          </>
        ) : null}
      </h3>{" "}
      <p className="mb-0">{label}</p>{" "}
    </div>
  );
}

export default function HeroHeader({
  hero,
  stats,
  lang = "ar",
  loading = false,
}: {
  hero?: HomeHero;
  stats?: HomeStats;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
  const slides = bySortOrder(hero?.slides);
  const trust = localized(hero?.trust, lang);
  const support = localized(hero?.buttons?.support?.label, lang);
  const collaborate = localized(hero?.buttons?.collaborate?.label, lang);
  const statItems = Array.isArray(stats?.items) ? stats.items : [];

  return (
    <>
      <header>
        {" "}
        <div className="main-header-wrapper py-1">
          {" "}
          <SiteNav />{" "}
          {/*  Mobile search panel (revealed by the mobile search icon)  */}{" "}
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            {" "}
            <div className="carousel-indicators">
              {" "}
              {slides.map((_, index) => (
                <div key={index}>
                  {" "}
                  <button
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide-to={String(index)}
                    className={index === 0 ? "active" : undefined}
                  ></button>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            <div className="carousel-inner">
              {" "}
              {loading ? (
                <HeroSlideSkeleton />
              ) : (
                slides.map((slide, index) => (
                  <HeroSlide
                    key={index}
                    slide={slide}
                    index={index}
                    trust={trust}
                    support={support}
                    collaborate={collaborate}
                    lang={lang}
                  />
                ))
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="stats-bar">
          {" "}
          <div className="box-element container front-face text-white rounded-4 py-4">
            {" "}
            <div className="row d-flex justify-content-center align-items-center text-center g-0">
              {" "}
              {loading ? (
                <StatsBarSkeleton />
              ) : (
                statItems.map((stat, index) => (
                  <StatColumn key={stat.key || index} stat={stat} lang={lang} />
                ))
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </header>
    </>
  );
}
