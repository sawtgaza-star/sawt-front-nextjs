import { WHY_FEATURES } from "./why-features-data";

/* "لماذا حاضنة صوت؟" — intro copy + 2×2 feature grid on the start side, and
   the filming photo layered over two rounded blocks + a dotted grid. */
export default function WhyIncubator() {
  return (
    <section className="inc-why" id="inc-about">
      <div className="container">
        <div className="inc-why-grid">
          <div className="inc-why-media">
            <span className="inc-why-shape-green" aria-hidden="true"></span>
            <span className="inc-why-shape-peach" aria-hidden="true"></span>
            <span className="inc-why-dots" aria-hidden="true"></span>
            <img
              className="inc-why-img"
              src="/assets/images/story.png"
              alt="متدرب يصوّر محتوى على شاطئ غزة"
            />
          </div>

          <div className="inc-why-text">
            <h2 className="inc-section-title inc-why-title">
              <span data-i18n="inc_why_title_pre">لماذا حاضنة</span>{" "}
              <span className="inc-highlight" data-i18n="inc_why_title_hl">
                صوت
              </span>
              ؟
            </h2>
            <p className="inc-why-desc" data-i18n="inc_why_desc">
              حاضنة صوت ليست مجرد منصة تدريبية، بل رحلة متكاملة تساعدك على تحويل
              أفكارك وقصصك إلى محتوى مؤثر. من خلال التدريب العملي، والإرشاد
              المستمر، والمشاريع الواقعية، نمنحك البيئة المناسبة لتطوير مهاراتك
              وصناعة أثر حقيقي.
            </p>

            <div className="inc-why-features">
              {WHY_FEATURES.map((f) => (
                <div className="inc-why-feature" key={f.key}>
                  <span className="inc-why-feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div className="inc-why-feature-body">
                    <h3
                      className="inc-why-feature-title"
                      data-i18n={f.titleKey}
                    >
                      {f.title}
                    </h3>
                    <p className="inc-why-feature-desc" data-i18n={f.descKey}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
