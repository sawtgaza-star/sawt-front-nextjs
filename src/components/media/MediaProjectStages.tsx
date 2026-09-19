import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import type { MediaWorkStagesContent } from "@/lib/api/media-work";
import MediaProjectHead from "./MediaProjectHead";

/* "المراحل" panel — how the project ran, one numbered step per stage down a
   single olive rail. The step number is the stage's place in the list, as the
   design draws it; the API sends only the copy. */
export default function MediaProjectStages({
  title,
  data,
  lang = "ar",
}: {
  /** The tab's own label — the heading the panel opens with. */
  title: string;
  data?: MediaWorkStagesContent;
  lang?: string;
}) {
  const stages = sortItems(data?.items);

  return (
    <div className="sm-pj-panel">
      {title ? <MediaProjectHead title={title} /> : null}

      <ol className="sm-pj-stages">
        {stages.map((stage, index) => (
          <li className="sm-pj-stage" key={index}>
            <span className="sm-pj-stage-step" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="sm-pj-stage-text">
              <h3>{localized(stage.title, lang)}</h3>
              <p>{localized(stage.body, lang)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
