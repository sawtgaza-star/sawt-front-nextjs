import MediaSectionHead from "./MediaSectionHead";
import { MEDIA_PROCESS } from "./media-process-data";

/* "رحلتنا معك" — the six-step timeline. One horizontal rail with a node per
   step; odd steps hang their card above the rail, even steps below, and each
   card carries its step number as a big translucent watermark. The track
   scrolls sideways, so the run stays reachable on narrow screens. */
export default function MediaProcess() {
  return (
    <section className="sm-process" id="sm-process">
      {/* the two radial washes the design lays over the olive-50 ground */}
      <span className="sm-process-glow sm-process-glow-a" aria-hidden="true"></span>
      <span className="sm-process-glow sm-process-glow-b" aria-hidden="true"></span>

      <div className="container">
        <MediaSectionHead
          pill="منهجيتنا"
          pillKey="sm_process_pill"
          title="رحلتنا معك"
          titleKey="sm_process_title"
          sub="ست خطوات واضحة تضمن لك نتيجة استثنائية في كل مرة"
          subKey="sm_process_sub"
        />
      </div>

      <div className="sm-process-scroll">
        <div className="sm-process-track">
          <span className="sm-process-line" aria-hidden="true"></span>

          {MEDIA_PROCESS.map((s, i) => (
            <div
              className={
                "sm-process-step " + (i % 2 === 0 ? "sm-step-up" : "sm-step-down")
              }
              key={s.key}
            >
              <article className="sm-step-card">
                <span className="sm-step-watermark" aria-hidden="true">
                  {s.num}
                </span>
                <h3 className="sm-step-title" data-i18n={s.titleKey}>
                  {s.title}
                </h3>
                <p className="sm-step-desc" data-i18n={s.descKey}>
                  {s.desc}
                </p>
              </article>

              <span className="sm-step-node" aria-hidden="true"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
