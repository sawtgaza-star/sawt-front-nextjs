import {
  IconHandStar,
  IconPeoplePair,
  IconVideoPlay,
} from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { SupportTrustContent } from "@/lib/api/support";

const FEATURE_ICONS = [IconPeoplePair, IconHandStar, IconVideoPlay];

const BUILT_IN_FEATURES = [
  { text: "سهولة الدفع", key: "support_banner_feature_2" },
  { text: "وصول فوري للمستحقين", key: "support_banner_feature_1" },
  { text: "تبرع آمن ومشفر", key: "support_banner_feature_3" },
];

/* "ادعم المنصة التي توصل أصواتهم" — beige banner with the olive-tree artwork
   and the two floating counters from the mock. */
export default function SupportBanner({
  trust,
  lang = "ar",
}: {
  trust?: SupportTrustContent;
  lang?: string;
}) {
  const fromApi = (trust?.items || [])
    .map((item) => ({ text: localized(item.label, lang), key: undefined }))
    .filter((f) => f.text);
  const features: { text: string; key?: string }[] = fromApi.length
    ? fromApi
    : BUILT_IN_FEATURES;

  return (
    <section className="sp-section sp-banner-section" style={{ paddingTop: 0 }}>
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

              {/* mock order: سهولة الدفع / وصول فوري on the first row. The
                  labels come from the API's `trust` block when it sends them;
                  the glyphs stay the design's, matched by position. */}
              <div className="sp-banner-features">
                {features.map((f, i) => {
                  const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                  return (
                    <div className="sp-banner-feature" key={i}>
                      <span className="sp-feature-icon">
                        <Icon />
                      </span>
                      <span data-i18n={f.key}>{f.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* wrapper is display:contents on desktop; becomes the two-button
                  row of the mobile mock, where the outline button appears */}
              <div className="sp-banner-cta">
                <a href="/support/methods" className="sp-btn-green">
                  <span data-i18n="support_donate_now">تبرع الآن</span>
                </a>
                <a href="#where-donations" className="sp-btn-where">
                  <span data-i18n="support_banner_where">
                    أين تذهب تبرعاتي؟
                  </span>
                </a>
              </div>
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
