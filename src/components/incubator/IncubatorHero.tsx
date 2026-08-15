import IncubatorNav from "./IncubatorNav";
import { HERO_STATS } from "./hero-stats-data";

/* Hero of /incubator — headline + collage with two floating counters, and the
   stats strip that straddles the bottom of the gradient. */
export default function IncubatorHero() {
  return (
    <header className="inc-hero">
      <IncubatorNav />

      <div className="container">
        <div className="inc-hero-grid">
          <div className="inc-hero-text">
            <h1 className="inc-hero-title">
              <span data-i18n="inc_hero_title_pre">حوّل قصتك</span>{" "}
              <span className="inc-hero-title-green" data-i18n="inc_hero_title_mid">
                إلى محتوى
              </span>
              <br />
              <span
                className="inc-hero-title-orange"
                data-i18n="inc_hero_title_post"
              >
                يصنع أثرًا
              </span>
            </h1>
            <p className="inc-hero-desc" data-i18n="inc_hero_desc">
              انضم إلى بيئة تدريبية تجمع بين التعلم العملي، والإرشاد، والمشاريع
              الواقعية لتساعدك على صناعة محتوى يترك أثرًا.
            </p>
            <a className="inc-btn-green" href="#inc-courses">
              <span data-i18n="inc_hero_cta">ابدأ رحلتك التعليمية</span>
              <i className="fa-solid fa-angle-left"></i>
            </a>
          </div>

          <div className="inc-hero-media">
            <img
              className="inc-hero-img"
              src="/assets/images/tree.jpg"
              alt="حاضنة صوت"
            />
            <div className="inc-hero-badge inc-hero-badge-green">
              <b>1,247</b>
              <span data-i18n="inc_hero_badge_donors">متبرع هذا الشهر</span>
            </div>
            <div className="inc-hero-badge inc-hero-badge-orange">
              <b>340+</b>
              <span data-i18n="inc_hero_badge_stories">قصة وثّقت</span>
            </div>
          </div>
        </div>

        <div className="inc-stats">
          {HERO_STATS.map((s) => (
            <div className="inc-stat" key={s.key}>
              <span className="inc-stat-icon" aria-hidden="true">
                {s.icon}
              </span>
              {/* .counter → animated by runCounters(), same as the home hero */}
              <p className="inc-stat-value counter">{s.value}</p>
              <p className="inc-stat-label" data-i18n={s.labelKey}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
