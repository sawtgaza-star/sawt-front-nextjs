import { IconCalendarWeeks, IconUser } from "@/components/ui/icons";
import {
  IMPACT_ROWS,
  SPONSOR_STUDENTS,
  SPONSOR_TRACKS,
} from "./sponsor-data";

/* "ساعد طلاب في الانضمام للحاضنة" — fourth section of /incubator: a 2×2 grid of
   sponsorship tracks on the start side, and a sidebar with the waiting-students
   list plus the orange impact counters on the end side. The pale olive branch
   sits in the section's top-right corner, as in the mock. */
export default function SponsorStudents() {
  return (
    <section className="inc-sponsor" id="inc-sponsor">
      <img
        src="/assets/images/leaf_cutout.png"
        className="inc-sponsor-leaf"
        alt=""
      />

      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_sponsor_title_pre">ساعد طلاب في الانضمام</span>{" "}
            <span className="inc-highlight" data-i18n="inc_sponsor_title_hl">
              للحاضنة
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_sponsor_sub">
            مبلغ بسيط يفتح باب المعرفة أمام شاب في غزة — تبرّعك يصل مباشرة
            لتغطية تكاليف التدريب
          </p>
        </div>

        <div className="inc-sponsor-grid">
          <div className="inc-sponsor-tracks">
            {SPONSOR_TRACKS.map((t) => (
              <article className="inc-sponsor-card" key={t.key}>
                <h3 className="inc-sponsor-card-title" data-i18n={t.titleKey}>
                  {t.title}
                </h3>
                <p className="inc-sponsor-card-desc" data-i18n={t.descKey}>
                  {t.desc}
                </p>
                <div className="inc-sponsor-meta">
                  <span className="inc-sponsor-meta-item">
                    <IconCalendarWeeks />
                    <span data-i18n="inc_sponsor_weeks">8 أسابيع</span>
                  </span>
                  <span data-i18n="inc_sponsor_seats">6 مقاعد</span>
                </div>
                <a className="inc-sponsor-cta" href={t.href}>
                  <span data-i18n={t.ctaKey}>{t.cta}</span>
                </a>
              </article>
            ))}
          </div>

          <aside className="inc-sponsor-side">
            <div className="inc-sponsor-waiting">
              <h3
                className="inc-sponsor-side-title"
                data-i18n="inc_sponsor_waiting_title"
              >
                طلاب ينتظرون داعماً
              </h3>

              <ul className="inc-sponsor-students">
                {SPONSOR_STUDENTS.map((s) => (
                  <li className="inc-sponsor-student" key={s.key}>
                    <span className="inc-sponsor-avatar" aria-hidden="true">
                      {s.photo ? (
                        <img src={s.photo} alt="" />
                      ) : s.initials ? (
                        <b>{s.initials}</b>
                      ) : (
                        <IconUser />
                      )}
                    </span>
                    <span className="inc-sponsor-student-body">
                      <b
                        className="inc-sponsor-student-name"
                        data-i18n={s.nameKey}
                      >
                        {s.name}
                      </b>
                      <span
                        className="inc-sponsor-student-meta"
                        data-i18n={s.metaKey}
                      >
                        {s.meta}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="inc-sponsor-more" data-i18n="inc_sponsor_waiting_more">
                + 28 طالباً آخرين
              </p>
            </div>

            <div className="inc-sponsor-impact">
              <h3
                className="inc-sponsor-side-title inc-sponsor-impact-title"
                data-i18n="inc_sponsor_impact_title"
              >
                أثر البرنامج
              </h3>
              <ul className="inc-sponsor-impact-list">
                {IMPACT_ROWS.map((r) => (
                  <li className="inc-sponsor-impact-row" key={r.key}>
                    <b className="inc-sponsor-impact-value">{r.value}</b>
                    <span
                      className="inc-sponsor-impact-label"
                      data-i18n={r.labelKey}
                    >
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
