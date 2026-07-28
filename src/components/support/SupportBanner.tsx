import {
  IconHandStar,
  IconPeoplePair,
  IconVideoPlay,
} from "@/components/ui/icons";

/* "ادعم المنصة التي توصل أصواتهم" — beige banner with the olive-tree artwork
   and the two floating counters from the mock. */
export default function SupportBanner() {
  return (
    <section className="sp-section" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* .sp-banner is the patterned frame; .sp-banner-inner is the olive-50
            panel that sits on top of it */}
        <div className="sp-banner">
          <div className="sp-banner-inner">
            <div className="sp-banner-text">
              <p
                className="sp-banner-eyebrow"
                data-i18n="support_banner_eyebrow"
              >
                قصص إنسانية من غزة
              </p>
              <h2 className="sp-banner-title">
                <span data-i18n="support_banner_title_pre">
                  ادعم المنصة التي توصل
                </span>{" "}
                <span
                  className="cr-highlight"
                  data-i18n="support_banner_title_hl"
                >
                  أصواتهم
                </span>
              </h2>

              {/* mock order: سهولة الدفع / وصول فوري on the first row */}
              <div className="sp-banner-features">
                <div className="sp-banner-feature">
                  <span className="sp-feature-icon">
                    <IconPeoplePair />
                  </span>
                  <span data-i18n="support_banner_feature_2">سهولة الدفع</span>
                </div>
                <div className="sp-banner-feature">
                  <span className="sp-feature-icon">
                    <IconHandStar />
                  </span>
                  <span data-i18n="support_banner_feature_1">
                    وصول فوري للمستحقين
                  </span>
                </div>
                <div className="sp-banner-feature">
                  <span className="sp-feature-icon">
                    <IconVideoPlay />
                  </span>
                  <span data-i18n="support_banner_feature_3">
                    تبرع آمن ومشفر
                  </span>
                </div>
              </div>

              <a href="#support-donate" className="sp-btn-green">
                <span data-i18n="support_donate_now">تبرع الآن</span>
              </a>
            </div>

            <div className="sp-banner-media">
              <img src="/assets/images/tree.jpg" alt="" />
              <div className="sp-badge sp-badge-green">
                <span className="sp-badge-num">1,247</span>
                <span
                  className="sp-badge-label"
                  data-i18n="support_badge_donors"
                >
                  متبرع هذا الشهر
                </span>
              </div>
              <div className="sp-badge sp-badge-orange">
                <span className="sp-badge-num">340+</span>
                <span
                  className="sp-badge-label"
                  data-i18n="support_badge_stories"
                >
                  قصة وثقت
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
