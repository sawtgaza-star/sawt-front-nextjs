import MediaProjectHead from "./MediaProjectHead";
import type { MediaProject } from "./media-project-data";

/* "المراحل" panel — how the project ran, one numbered step per stage down a
   single olive rail. */
export default function MediaProjectStages({ project }: { project: MediaProject }) {
  return (
    <div className="sm-pj-panel">
      <MediaProjectHead title="مراحل العمل" titleKey="sm_pj_stages_head" />

      <ol className="sm-pj-stages">
        {project.stages.map((s) => (
          <li className="sm-pj-stage" key={s.key}>
            <span className="sm-pj-stage-step" aria-hidden="true">
              {s.step}
            </span>
            <div className="sm-pj-stage-text">
              <h3 data-i18n={s.titleKey}>{s.title}</h3>
              <p data-i18n={s.textKey}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
