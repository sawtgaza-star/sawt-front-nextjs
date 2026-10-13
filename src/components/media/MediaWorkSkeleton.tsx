import SkeletonText from "@/components/ui/SkeletonText";
import { IconCalendarDays } from "@/components/ui/icons";
import { galleryLayout } from "./media-page-view";
import { SkProjectCta, SkProjectHead } from "./MediaSkeletonParts";
import "@/styles/media-skeleton.css";

/* Everything below the banner while GET /pages/media/works/{slug} is in
   flight — MediaProjectIntro, MediaProjectTabs opened on "عن المشروع"
   (MediaProjectAbout) and MediaProjectCta, in their own elements and classes,
   with the copy swapped for <SkeletonText /> and the photos left as empty
   frames. The counts are the current payload's (horizon-company-introductory-
   film); another case study differs in copy and in the number of frames, so
   its panel can land a little longer or shorter. The banner's own bars live
   in <MediaProjectHero />, which always renders its shell (see the note
   there). */
const INTRO = { date: 11, tag: 5, title: 21, category: 15, summary: 87, figures: [[3, 28], [6, 28]] };
const TABS = [10, 7, 10];
const ABOUT = {
  body: 187,
  notes: [
    { title: 8, items: [44, 62], tone: "orange" },
    { title: 6, items: [56, 48], tone: "olive" },
  ],
  results: { title: 7, items: [[3, 10], [3, 28], [4, 13]] },
  gallery: { title: 14, frames: galleryLayout(8) },
  /* A broad frame has no aspect of its own and its <img> is `height: 100%` of
     an auto-height cell, so a photo taller than the row stretches the row to
     its own proportions — the current payload's second photo does (≈750×727).
     Frame index → that photo's width/height. */
  tallFrames: { 1: 750 / 727 } as Record<number, number>,
};

function Intro() {
  return (
    <section className="sm-pj-intro">
      <div className="container">
        <div className="sm-pj-intro-row">
          <div className="sm-pj-intro-copy">
            <div className="sm-pj-chips">
              <span className="sm-works-chip sm-works-chip-date">
                <IconCalendarDays />
                <span>
                  <SkeletonText chars={INTRO.date} />
                </span>
              </span>
              <span className="sm-works-chip sm-works-chip-tag">
                <SkeletonText chars={INTRO.tag} />
              </span>
            </div>
            <div className="sm-pj-title-row">
              <h2 className="sm-pj-title">
                <SkeletonText chars={INTRO.title} />
              </h2>
              <span className="sm-pj-specialty">
                <SkeletonText chars={INTRO.category} />
              </span>
            </div>
            <p className="sm-pj-desc">
              <SkeletonText chars={INTRO.summary} />
            </p>
            <div className="sm-pj-figures">
              {INTRO.figures.map(([value, label], index) => (
                <div className="sm-pj-figure" key={index}>
                  <b className="sm-pj-figure-value">
                    <SkeletonText chars={value} />
                  </b>
                  <span className="sm-pj-figure-label">
                    <SkeletonText chars={label} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figure className="sm-pj-shot smk-fill"></figure>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="sm-pj-panel">
      <SkProjectHead chars={TABS[0]} />
      <p className="sm-pj-text">
        <SkeletonText chars={ABOUT.body} />
      </p>
      <div className="sm-pj-duo">
        {ABOUT.notes.map((note) => (
          <section className={"sm-pj-note sm-pj-note-" + note.tone} key={note.tone}>
            <span className="sm-pj-note-notch" aria-hidden="true" />
            <h3 className="sm-pj-note-head">
              <span
                className={"sm-pj-dot" + (note.tone === "olive" ? " sm-pj-dot-olive" : "")}
                aria-hidden="true"
              />
              <span>
                <SkeletonText chars={note.title} />
              </span>
            </h3>
            <ul className="sm-pj-note-list">
              {note.items.map((chars, index) => (
                <li key={index}>
                  <SkeletonText chars={chars} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <SkProjectHead chars={ABOUT.results.title} />
      <div className="sm-pj-results">
        {ABOUT.results.items.map(([value, label], index) => (
          <div className="sm-pj-result" key={index}>
            <b className="sm-pj-result-value">
              <SkeletonText chars={value} />
            </b>
            <span className="sm-pj-result-label">
              <SkeletonText chars={label} />
            </span>
          </div>
        ))}
      </div>

      <SkProjectHead chars={ABOUT.gallery.title} />
      <div className="sm-pj-gallery">
        {ABOUT.gallery.frames.map((frame, i) => (
          <figure
            className={
              "sm-pj-frame smk-fill " + (frame === "full" ? "sm-pj-frame-wide" : "sm-pj-frame-" + frame)
            }
            key={i}
          >
            {ABOUT.tallFrames[i] ? (
              <span style={{ display: "block", aspectRatio: ABOUT.tallFrames[i] }} />
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function MediaWorkSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <Intro />
      <section className="sm-pj-body">
        <div className="container">
          <div className="sm-pj-tabs">
            {TABS.map((chars, i) => (
              <button type="button" className={"sm-pj-tab" + (i === 0 ? " active" : "")} tabIndex={-1} key={i}>
                <span>
                  <SkeletonText chars={chars} />
                </span>
              </button>
            ))}
          </div>
          <div>
            <About />
          </div>
        </div>
      </section>
      <SkProjectCta />
    </div>
  );
}
