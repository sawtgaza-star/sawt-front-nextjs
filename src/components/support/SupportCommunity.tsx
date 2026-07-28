import { IconTarget } from "@/components/ui/icons";

/* "مجتمع الدعم الحي" — monthly goal, raised / remaining totals and the
   progress bar. Figures are the mock's placeholders until a real API exists. */

const GOAL = 50000;
const RAISED = 32450;
const REMAINING = GOAL - RAISED;
const PERCENT = Math.round((RAISED / GOAL) * 100);

export default function SupportCommunity() {
  return (
    <section className="sp-section sp-section-gray">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_community_title_pre">مجتمع الدعم</span>{" "}
            <span
              className="cr-highlight"
              data-i18n="support_community_title_hl"
            >
              الحي
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="support_community_sub">
            قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا
            وتطويرنا المستمر
          </p>
        </div>

        <div className="sp-stats-card">
          <div className="sp-stats-row">
            <div className="sp-stat sp-stat-goal">
              <span className="sp-stat-badge" aria-hidden="true">
                <IconTarget />
              </span>
              <div className="sp-stat-goal-text">
                <div className="sp-stat-label">
                  <span data-i18n="support_stat_goal">هدف الشهر</span>
                </div>
                <div className="sp-stat-value sp-stat-value-dark">
                  ${GOAL.toLocaleString("en-US")}
                </div>
              </div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <span data-i18n="support_stat_raised">تم جمعه</span>
              </div>
              <div className="sp-stat-value">
                ${RAISED.toLocaleString("en-US")}
              </div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <span data-i18n="support_stat_remaining">متبقي</span>
              </div>
              <div className="sp-stat-value">
                ${REMAINING.toLocaleString("en-US")}
              </div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <span data-i18n="support_stat_progress">الإنجاز</span>
              </div>
              <div className="sp-stat-value sp-stat-value-green">
                {PERCENT}%
              </div>
            </div>
          </div>

          <div
            className="sp-progress"
            role="progressbar"
            aria-valuenow={PERCENT}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="sp-progress-bar"
              style={{ width: `${PERCENT}%` }}
            ></div>
          </div>

          <p className="sp-progress-note">
            <span data-i18n="support_progress_note_pre">نحتاج</span>{" "}
            <b>{REMAINING.toLocaleString("en-US")}$</b>{" "}
            <span data-i18n="support_progress_note_post">
              لإتمام هدف الشهر — ساهم الآن
            </span>
          </p>
        </div>

        <div className="sp-community-cta">
          <a href="/support/methods" className="sp-btn-green sp-btn-pill">
            <span data-i18n="support_add_name_cta">
              أضف اسمك للقائمة — تبرع الآن
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
