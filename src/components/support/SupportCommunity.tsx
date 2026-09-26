import { IconTarget } from "@/components/ui/icons";
import { localized, type Localized } from "@/lib/api/pages";
import type { SupportCommunityGoal } from "@/lib/api/support";
import SupportSectionHead from "./SupportSectionHead";
import { currencySymbol, formatNumber, splitAmount } from "./support-text";

/* "مجتمع الدعم الحي" — monthly goal, raised / remaining totals and the
   progress bar, from GET /pages/support's `community_goal` block. Without it
   the mock's figures and built-in copy stand in, so an outage still shows a
   complete section. */

const GOAL = 50000;
const RAISED = 32450;

/** A figure the API sent, or undefined for a missing / non-numeric one. */
function figure(value: number | null | undefined): number | undefined {
  if (value == null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

/** An API label, or the built-in one with its data-i18n key. */
function Label({ value, lang, i18n, text }: { value?: Localized; lang: string; i18n: string; text: string }) {
  const label = localized(value, lang);
  return label ? <span>{label}</span> : <span data-i18n={i18n}>{text}</span>;
}

export default function SupportCommunity({
  data,
  lang = "ar",
}: {
  data?: SupportCommunityGoal;
  lang?: string;
}) {
  const goal = figure(data?.target) ?? GOAL;
  const raised = figure(data?.raised) ?? RAISED;
  const remaining = figure(data?.remaining) ?? Math.max(0, goal - raised);
  const rawPercent =
    figure(data?.progress_percent) ?? (goal > 0 ? (raised / goal) * 100 : 0);
  const percent = Math.min(100, Math.max(0, Math.round(rawPercent)));
  const symbol = currencySymbol(data?.currency);

  const message = localized(data?.message, lang);
  const [msgHead, msgTail, hasAmount] = splitAmount(message);
  const cta = localized(data?.cta?.label, lang);

  return (
    <section className="sp-section sp-section-gray">
      <div className="container">
        <SupportSectionHead
          title={localized(data?.title, lang)}
          sub={localized(data?.subtitle, lang)}
          fallback={{
            pre: "مجتمع الدعم",
            preKey: "support_community_title_pre",
            hl: "الحي",
            hlKey: "support_community_title_hl",
            sub: "قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا وتطويرنا المستمر",
            subKey: "support_community_sub",
          }}
        />

        <div className="sp-stats-card">
          <div className="sp-stats-row">
            <div className="sp-stat sp-stat-goal">
              <span className="sp-stat-badge" aria-hidden="true">
                <IconTarget />
              </span>
              <div className="sp-stat-goal-text">
                <div className="sp-stat-label">
                  <Label value={data?.labels?.target} lang={lang} i18n="support_stat_goal" text="هدف الشهر" />
                </div>
                <div className="sp-stat-value sp-stat-value-dark">
                  {symbol}{formatNumber(goal)}
                </div>
              </div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <Label value={data?.labels?.raised} lang={lang} i18n="support_stat_raised" text="تم جمعه" />
              </div>
              <div className="sp-stat-value">{symbol}{formatNumber(raised)}</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <Label value={data?.labels?.remaining} lang={lang} i18n="support_stat_remaining" text="متبقي" />
              </div>
              <div className="sp-stat-value">{symbol}{formatNumber(remaining)}</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">
                <Label value={data?.labels?.progress} lang={lang} i18n="support_stat_progress" text="الإنجاز" />
              </div>
              <div className="sp-stat-value sp-stat-value-green">{percent}%</div>
            </div>
          </div>

          <div
            className="sp-progress"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="sp-progress-bar" style={{ width: `${percent}%` }}></div>
          </div>

          {message ? (
            /* the sentence carries an `:amount` slot — the figure goes in bold
               where the editor put it */
            <p className="sp-progress-note">
              {msgHead}
              {hasAmount ? <b>{formatNumber(remaining)}</b> : null}
              {msgTail}
            </p>
          ) : (
            <p className="sp-progress-note">
              <span data-i18n="support_progress_note_pre">نحتاج</span>{" "}
              <b>{formatNumber(remaining)}$</b>{" "}
              <span data-i18n="support_progress_note_post">
                لإتمام هدف الشهر — ساهم الآن
              </span>
            </p>
          )}
        </div>

        <div className="sp-community-cta">
          <a href="/support/methods" className="sp-btn-green sp-btn-pill">
            {cta ? (
              <span>{cta}</span>
            ) : (
              <span data-i18n="support_add_name_cta">
                أضف اسمك للقائمة — تبرع الآن
              </span>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
