import { IconCalendarWeeks, IconUser } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorSponsorContent } from "@/lib/api/incubator-page";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { INCUBATOR_ROUTES, sortItems } from "./incubator-page-view";

/* "ساعد طلاب في الانضمام للحاضنة" — a 2×2 grid of sponsorship packages on the
   start side, and a sidebar with the waiting-students list plus the orange
   impact counters on the end side, all from the API's `sponsor` block. The
   pale olive branch sits in the section's top-right corner, as in the mock.
   Every package pays through the same page (INCUBATOR_ROUTES.sponsor). */
export default function SponsorStudents({
  data,
  lang,
}: {
  data?: IncubatorSponsorContent;
  lang: string;
}) {
  const packages = sortItems(data?.packages);
  const students = sortItems(data?.waiting?.students);
  const impact = sortItems(data?.impact?.stats);
  if (!data || (!packages.length && !students.length && !impact.length)) return null;

  const waitingTitle = localized(data.waiting?.title, lang);
  const more = localized(data.waiting?.more_label, lang);
  const impactTitle = localized(data.impact?.title, lang);

  return (
    <section className="inc-sponsor" id="inc-sponsor">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-sponsor-leaf"
        alt=""
      />

      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="inc-sponsor-grid">
          <div className="inc-sponsor-tracks">
            {packages.map((pack, index) => {
              const duration = localized(pack.duration, lang);
              const seats = localized(pack.seats, lang);
              const cta = localized(pack.cta?.label, lang);
              return (
                <article className="inc-sponsor-card" key={index}>
                  <h3 className="inc-sponsor-card-title">
                    {localized(pack.title, lang)}
                  </h3>
                  <p className="inc-sponsor-card-desc">
                    {localized(pack.description, lang)}
                  </p>
                  {duration || seats ? (
                    <div className="inc-sponsor-meta">
                      {duration ? (
                        <span className="inc-sponsor-meta-item">
                          <IconCalendarWeeks />
                          <span>{duration}</span>
                        </span>
                      ) : null}
                      {seats ? <span>{seats}</span> : null}
                    </div>
                  ) : null}
                  {cta ? (
                    <a className="inc-sponsor-cta" href={INCUBATOR_ROUTES.sponsor}>
                      <span>{cta}</span>
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>

          <aside className="inc-sponsor-side">
            {students.length || waitingTitle ? (
              <div className="inc-sponsor-waiting">
                {waitingTitle ? (
                  <h3 className="inc-sponsor-side-title">{waitingTitle}</h3>
                ) : null}

                <ul className="inc-sponsor-students">
                  {students.map((student, index) => (
                    <li className="inc-sponsor-student" key={index}>
                      <span className="inc-sponsor-avatar" aria-hidden="true">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="" />
                        ) : (
                          <IconUser />
                        )}
                      </span>
                      <span className="inc-sponsor-student-body">
                        <b className="inc-sponsor-student-name">{student.name}</b>
                        <span className="inc-sponsor-student-meta">
                          {localized(student.meta, lang)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {more ? <p className="inc-sponsor-more">{more}</p> : null}
              </div>
            ) : null}

            {impact.length ? (
              <div className="inc-sponsor-impact">
                {impactTitle ? (
                  <h3 className="inc-sponsor-side-title inc-sponsor-impact-title">
                    {impactTitle}
                  </h3>
                ) : null}
                <ul className="inc-sponsor-impact-list">
                  {impact.map((row, index) => (
                    <li className="inc-sponsor-impact-row" key={index}>
                      <b className="inc-sponsor-impact-value">{row.value}</b>
                      <span className="inc-sponsor-impact-label">
                        {localized(row.label, lang)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
