import { localized } from "@/lib/api/pages";
import { sortItems, type MediaMethodologyContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";

/* "رحلتنا معك" — the methodology timeline. One horizontal rail with a node per
   step; odd steps hang their card above the rail, even steps below, and each
   card carries its step number as a big translucent watermark. The track
   scrolls sideways, so the run stays reachable on narrow screens.

   The steps are the API's `methodology.steps`, in the editor's order — which
   side of the rail a card hangs on follows from its position, as in the
   design, so adding a seventh step keeps the zigzag going. */
export default function MediaProcess({
  data,
  lang = "ar",
}: {
  data?: MediaMethodologyContent;
  lang?: string;
}) {
  const steps = sortItems(data?.steps);
  if (!data || !steps.length) return null;

  return (
    <section className="sm-process" id="sm-process">
      {/* the two radial washes the design lays over the olive-50 ground */}
      <span className="sm-process-glow sm-process-glow-a" aria-hidden="true"></span>
      <span className="sm-process-glow sm-process-glow-b" aria-hidden="true"></span>

      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />
      </div>

      <div className="sm-process-scroll">
        <div className="sm-process-track">
          <span className="sm-process-line" aria-hidden="true"></span>

          {steps.map((step, i) => (
            <div
              className={
                "sm-process-step " + (i % 2 === 0 ? "sm-step-up" : "sm-step-down")
              }
              key={i}
            >
              <article className="sm-step-card">
                <span className="sm-step-watermark" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="sm-step-title">{localized(step.title, lang)}</h3>
                <p className="sm-step-desc">{localized(step.description, lang)}</p>
              </article>

              <span className="sm-step-node" aria-hidden="true"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
