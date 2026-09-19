// @ts-nocheck
/* eslint-disable */
import SiteNav from "@/components/site/SiteNav";
import { localized } from "@/lib/api/pages";
import type { HomeHero, HomeStats } from "@/lib/api/home";
import { bySortOrder } from "./home-text";
import { StatIcon, STAT_KEYS_WITH_THOUSANDS } from "./stat-icons";
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
      <div className="overlay"></div>{" "}
      {slide.image_url ? (
        <img
          src={slide.image_url}
          className="d-block w-100 carousel-img"
          alt={title}
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
            <h1 className="fw-bold text-white font-60">{title}</h1>
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
    reads the number straight out of this text node — so the value stays a
    bare string here, with the "ألف"/"K" unit in its own translated span. */
function StatColumn({ stat, lang }) {
  const label = localized(stat.label, lang);
  const showThousands = STAT_KEYS_WITH_THOUSANDS.includes(stat.key);

  return (
    <div className="col count">
      {" "}
      <i>
        <StatIcon statKey={stat.key} />
      </i>{" "}
      <h3 className="counter font-mob-22">
        {stat.value || ""}
        {showThousands ? (
          <>
            {" "}
            <span data-i18n="one_thousand"></span>
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
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
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
            <button
              className="carousel-control-prev hero-arrow"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              {" "}
              <span className="hero-arrow-icon" aria-hidden="true">
                {" "}
                <i className="fa-solid fa-chevron-left"></i>{" "}
              </span>{" "}
              <span className="visually-hidden">Previous</span>{" "}
            </button>{" "}
            <button
              className="carousel-control-next hero-arrow"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              {" "}
              <span className="hero-arrow-icon" aria-hidden="true">
                {" "}
                <i className="fa-solid fa-chevron-right"></i>{" "}
              </span>{" "}
              <span className="visually-hidden">Next</span>{" "}
            </button>{" "}
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
