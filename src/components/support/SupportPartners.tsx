/* "شركاؤنا في نشر الصوت" — faded partner logo row plus the dark funding CTA.
   Placeholder logos: the mock repeats the Sawt wordmark until the real
   partner marks are supplied. */
export default function SupportPartners() {
  return (
    <section className="sp-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_partners_title_pre">شركاؤنا في نشر</span>{" "}
            <span
              className="cr-highlight"
              data-i18n="support_partners_title_hl"
            >
              الصوت
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="support_partners_sub">
            شكرا للمؤسسات والشركات التي تؤمن بمهمتنا وتصدر صوت أهل غزة للعالم
          </p>
        </div>

        {/* Same scrolling logo strip as the home page (MidBanner) — .marquee
            styles come from style.css, which the (main) layout already loads. */}
        <div className="marquee">
          <div className="marquee-group">
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
          </div>
          <div className="marquee-group" aria-hidden="true">
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
            <img src="/assets/images/صوت 8.png" alt="sout" />
          </div>
        </div>

        <div className="sp-dark-cta">
          <div>
            <h3 className="sp-dark-cta-title" data-i18n="support_fund_title">
              الحقيقة تحتاج من يمولها
            </h3>
            <p className="sp-dark-cta-desc" data-i18n="support_fund_desc">
              شراكات مؤسسية مع صوت — للجهات التي تريد أن يكون دورها في إيصال
              الحقيقة للعالم. انضم وأبق صوت غزة حيا
            </p>
          </div>
          <a href="/#join" className="sp-btn-green sp-btn-light sp-btn-pill">
            <span data-i18n="support_contact_us">تواصل معنا</span>
          </a>
        </div>
      </div>
    </section>
  );
}
