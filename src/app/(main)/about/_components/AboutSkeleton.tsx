import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/about-skeleton.css";

/* Everything below the hero while GET /pages/about is in flight.

   It is the real page's markup — the same elements with the same classes as
   AboutIntro, CoreValues, AboutPlatform, SawtStory and JoinUs — with each text
   swapped for a <SkeletonText /> of the current copy's length. So every
   heading, paragraph, card and margin is the one the content arrives into, at
   every breakpoint, and the page doesn't jump when the API answers. Only the
   photos and the icons are blocks, sized like the real ones. The hero's own
   copy lives in <AboutHero />, which always renders its <header> (see the note
   there).

   Keep it in step with those components when their markup changes.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides, so this is what ships in about.html and what hydration expects. */

/** Character counts of the current copy (GET /pages/about), raised about a
    quarter for the longer copy: the filler runs narrower than real Arabic, so
    this keeps each paragraph at roughly its real number of lines. */
const LEN = {
  heroTitle: 32,
  heroDesc: 180,
  introTitle: 6,
  introBody: 680,
  valuesHead: 13,
  valuesTail: 10,
  valuesSub: 95,
  platformHead: 30,
  platformTail: 6,
  platformDesc: 280,
  storyHead: 3,
  storyTail: 3,
  storySub: 70,
  joinTitle: 31,
  joinDesc: 75,
  joinButton: 17,
};
const VALUES = [
  [9, 115],
  [9, 95],
  [7, 95],
  [11, 95],
];
const STORY = [
  [6, 165],
  [7, 146],
  [7, 141],
];

function IntroSkeleton() {
  return (
    <section>
      <div className="about-sec container" style={{ marginTop: "50px", zIndex: 1 }}>
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 about-sec-content" dir="rtl">
            <h2 className="about-sec-title"><SkeletonText chars={LEN.introTitle} /></h2>
            <p className="about-sec-desc"><SkeletonText chars={LEN.introBody} /></p>
          </div>
          <div className="col-12 col-lg-6 mt-4 about-sec-img-col">
            <div className="about-sec-img-wrapper">
              <span className="about-sec-img ask-intro-img" />
              <div className="member-card about-sec-leaf" dir="rtl">
                <img src={encodeURI("/assets/images/شعار صوت اخضر.svg")} alt="" width="100" height="100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSkeleton() {
  return (
    <section className="core-values-section">
      <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-right-bottom-about" alt="" />
      <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-left-bottom-about" alt="" />
      <div className="container" dir="rtl">
        <div className="text-center core-values-head">
          <h2 className="core-values-title">
            <SkeletonText chars={LEN.valuesHead} />{" "}
            <span className="core-values-highlight"><SkeletonText chars={LEN.valuesTail} /></span>
          </h2>
          <p className="core-values-subtitle"><SkeletonText chars={LEN.valuesSub} /></p>
        </div>
        <div className="row g-4 justify-content-center core-values-grid">
          {VALUES.map(([title, desc], index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="value-card">
                <div className="value-card-icon" />
                <h3 className="value-card-title"><SkeletonText chars={title} /></h3>
                <p className="value-card-desc"><SkeletonText chars={desc} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSkeleton() {
  return (
    <section className="about-the-platform">
      <div className="about-the-platform-card">
        <div className="about-the-platform-card-inner">
          <img className="birds-img" src="/assets/images/birds.png" alt="" />
          <div className="row align-items-center g-0" dir="ltr">
            <div className="col-12 col-lg-5 about-the-platform-content">
              <h2 className="about-the-platform-question">
                <SkeletonText chars={LEN.platformHead} />{" "}
                <span className="platform-highlight"><SkeletonText chars={LEN.platformTail} /></span>
              </h2>
              <p className="about-the-platform-desc"><SkeletonText chars={LEN.platformDesc} /></p>
            </div>
            <div className="col-12 col-lg-7 about-the-platform-visual">
              <span className="about-platform-img ask-platform-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySkeleton() {
  return (
    <section className="sawt-story-section">
      <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-right-bottom-sawt-story" alt="" />
      <div className="container" dir="rtl">
        <div className="text-center sawt-story-head">
          <h2 className="sawt-story-title">
            <span><SkeletonText chars={LEN.storyHead} /> </span>{" "}
            <span className="sawt-story-highlight"><SkeletonText chars={LEN.storyTail} /></span>
          </h2>
          <p className="sawt-story-subtitle"><SkeletonText chars={LEN.storySub} /></p>
        </div>
        <div className="row g-4 justify-content-center sawt-story-grid">
          {STORY.map(([title, desc], index) => (
            <div className="col-12 col-md-6 col-lg-4 sawt-story-grid-col" key={index}>
              <div className="sawt-story-card">
                <div className="sawt-story-icon" />
                <h3 className="sawt-story-card-title"><SkeletonText chars={title} /></h3>
                <p className="sawt-story-card-desc"><SkeletonText chars={desc} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSkeleton() {
  return (
    <section className="join-us-section">
      <div className="join-us-banner-about">
        <span className="join-us-bg-about ask-join-bg" />
        <div className="join-us-content text-center">
          <h2 className="join-us-title"><SkeletonText chars={LEN.joinTitle} /></h2>
          <p className="join-us-desc"><SkeletonText chars={LEN.joinDesc} /></p>
          <span className="btn btn-dark-green join-us-btn">
            <span><SkeletonText chars={LEN.joinButton} /></span>{" "}
            <i className="fa-solid fa-angle-left arrow"></i>
          </span>
        </div>
      </div>
    </section>
  );
}

export default function AboutSkeleton() {
  return (
    <div className="ask" aria-busy="true" aria-hidden="true">
      <IntroSkeleton />
      <PlatformSkeleton />
      <ValuesSkeleton />
      <StorySkeleton />
      <JoinSkeleton />
    </div>
  );
}

/** The hero's copy — the same h1 + p as AboutHero renders. */
export function AboutHeroSkeleton() {
  return (
    <>
      <h1 className="about-hero-title" aria-hidden="true">
        <SkeletonText chars={LEN.heroTitle} />
      </h1>{" "}
      <p className="about-hero-desc" aria-hidden="true">
        <SkeletonText chars={LEN.heroDesc} />
      </p>
    </>
  );
}
