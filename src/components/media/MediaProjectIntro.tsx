import { IconCalendarDays } from "@/components/ui/icons";
import type { MediaProject } from "./media-project-data";

/* Top of the case study: the project's still on the left, its identity on the
   right (chips, name + specialty, the one-line brief) and the two headline
   figures in the card underneath — the card whose top edge carries the
   design's olive→orange hairline (media.css). */
export default function MediaProjectIntro({ project }: { project: MediaProject }) {
  return (
    <section className="sm-pj-intro">
      <div className="container">
        <div className="sm-pj-intro-row">
          <div className="sm-pj-intro-copy">
            <div className="sm-pj-chips">
              <span className="sm-works-chip sm-works-chip-date">
                <IconCalendarDays />
                <span data-i18n={project.dateKey}>{project.date}</span>
              </span>
              <span className="sm-works-chip sm-works-chip-tag" data-i18n={project.tagKey}>
                {project.tag}
              </span>
            </div>

            <div className="sm-pj-title-row">
              <h2 className="sm-pj-title" data-i18n={project.titleKey}>
                {project.title}
              </h2>
              <span className="sm-pj-specialty" data-i18n={project.specialtyLabelKey}>
                {project.specialtyLabel}
              </span>
            </div>

            <p className="sm-pj-desc" data-i18n={project.descKey}>
              {project.desc}
            </p>

            {/* the figures count up when the card scrolls into view — that is
                initCounters() in scroll-effects.ts, which reads the class. The
                digits carry no data-i18n: they read the same in both languages,
                and a translation pass would replace the text node the count-up
                is writing into (same as `.sm-stat-value` on /media). */}
            <div className="sm-pj-figures">
              {project.stats.map((s) => (
                <div className="sm-pj-figure" key={s.key}>
                  <b className="sm-pj-figure-value">{s.value}</b>
                  <span className="sm-pj-figure-label" data-i18n={s.labelKey}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <figure className="sm-pj-shot">
            <img src={project.photo} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}
