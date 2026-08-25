import MediaProjectHead from "./MediaProjectHead";
import type { MediaProject } from "./media-project-data";

/* "عن المشروع" panel — the brief, the challenges/solutions pair (orange card on
   the right, olive on the left, each with the design's quarter-circle notch in
   its top-left corner), the three result figures and the frames of the project. */
export default function MediaProjectAbout({ project }: { project: MediaProject }) {
  return (
    <div className="sm-pj-panel">
      <MediaProjectHead title="عن المشروع" titleKey="sm_pj_tab_about" />
      <p className="sm-pj-text" data-i18n={project.aboutKey}>
        {project.about}
      </p>

      <div className="sm-pj-duo">
        <section className="sm-pj-note sm-pj-note-orange">
          <span className="sm-pj-note-notch" aria-hidden="true" />
          <h3 className="sm-pj-note-head">
            <span className="sm-pj-dot" aria-hidden="true" />
            <span data-i18n="sm_pj_challenges">التحديات</span>
          </h3>
          <ul className="sm-pj-note-list">
            {project.challenges.map((c) => (
              <li key={c.key} data-i18n={c.key}>
                {c.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="sm-pj-note sm-pj-note-olive">
          <span className="sm-pj-note-notch" aria-hidden="true" />
          <h3 className="sm-pj-note-head">
            <span className="sm-pj-dot sm-pj-dot-olive" aria-hidden="true" />
            <span data-i18n="sm_pj_solutions">الحلول</span>
          </h3>
          <ul className="sm-pj-note-list">
            {project.solutions.map((s) => (
              <li key={s.key} data-i18n={s.key}>
                {s.text}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <MediaProjectHead title="النتائج" titleKey="sm_pj_results" />
      <div className="sm-pj-results">
        {project.results.map((r) => (
          <div className="sm-pj-result" key={r.key}>
            {/* counted up on scroll, so no data-i18n — see MediaProjectIntro */}
            <b className="sm-pj-result-value">{r.value}</b>
            <span className="sm-pj-result-label" data-i18n={r.labelKey}>
              {r.label}
            </span>
          </div>
        ))}
      </div>

      <MediaProjectHead title="صور من المشروع" titleKey="sm_pj_gallery" />
      <div className="sm-pj-gallery">
        {project.gallery.map((src, i) => (
          <figure
            className={
              "sm-pj-frame" +
              /* the design closes the block with one wide frame */
              (i === project.gallery.length - 1 ? " sm-pj-frame-wide" : "")
            }
            key={i}
          >
            <img src={src} alt="" />
          </figure>
        ))}
      </div>
    </div>
  );
}
