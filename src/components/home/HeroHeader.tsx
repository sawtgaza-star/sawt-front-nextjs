// @ts-nocheck
/* eslint-disable */
import "@/styles/home-stats.css";
import "@/styles/home-hero.css";
import SiteNav from "@/components/site/SiteNav";
import { localized } from "@/lib/api/pages";
import type { HomeHero, HomeReviewReel, HomeStats } from "@/lib/api/home";
import { StatIcon, splitStatValue } from "./stat-icons";
import { StatsBarSkeleton } from "./HomeSkeleton";
import HeroCopy from "./hero/HeroCopy";
import HeroReelStack from "./hero/HeroReelStack";
import { latestReels } from "./hero/hero-copy";

/* The hero is the copy (hero/HeroCopy, the API's `hero` block) beside the
   platform's latest reels, stacked inside a ring of orbits
   (hero/HeroReelStack) — it replaced the photo carousel. The reels are the
   payload's `reviews.reels`, the same feed as the "آراؤكم في المحتوى"
   column; the stats bar is the `stats` block. No `data-i18n` keys: `lang`
   alone decides which language is shown. Leaving those keys on
   React-rendered copy is what made applyTranslations() fight React on
   /about; see the note in AboutHero.

   The <header> shell is NOT conditional, for the same reason it isn't there:
   <SiteNav /> lives inside it and initHeaderPin() (lib/legacy-main) wraps
   `.nav-face` + `.navbar` into `.header-bar` right after mount. A header that
   appeared only once the payload landed would bring its nav up too late to be
   wrapped. The copy, the reel stack and the stats bar hold their place with
   placeholders until then. */

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
    <div className={"col count" + (stat.key ? ` count-${stat.key}` : "")}>
      {" "}
      <i>
        <StatIcon statKey={stat.key} />
      </i>{" "}
      {/* keyed by the figure: runCounters() caches the first text it animated
          (data-counter-from), so a language switch that rescales it ("140+"
          → "140K+") needs a fresh element */}
      <h3 className="counter font-mob-22" key={figure}>
        {/* Arabic paints the "+" on the number's right ("20+", "مليون 30+"),
            English on its left ("+20", "+30M"): the figure's direction follows
            the language so the leading "+" lands on the reading-start side. */}
        <span className="counter-figure" dir={lang === "en" ? "ltr" : "rtl"}>
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
  reels,
  lang = "ar",
  loading = false,
}: {
  hero?: HomeHero;
  stats?: HomeStats;
  /** the payload's `reviews.reels` — the hero stacks the newest three */
  reels?: HomeReviewReel[];
  lang?: string;
  /** The payload is still on its way — hold the hero's place with placeholders. */
  loading?: boolean;
}) {
  const statItems = Array.isArray(stats?.items) ? stats.items : [];
  const stack = latestReels(reels);

  return (
    <>
      <header>
        {" "}
        <div className="main-header-wrapper py-1">
          {" "}
          <SiteNav />{" "}
          <section className="home-hero">
            <span className="hh-backdrop" aria-hidden="true"></span>
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-6">
                  <HeroCopy hero={hero} lang={lang} loading={loading} />
                </div>
                <div className="col-lg-6">
                  {loading || stack.length ? (
                    <HeroReelStack reels={stack} lang={lang} loading={loading} />
                  ) : null}
                </div>
              </div>
            </div>
          </section>{" "}
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
