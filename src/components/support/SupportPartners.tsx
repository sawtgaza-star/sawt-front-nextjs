import { localized } from "@/lib/api/pages";
import type { SupportPartnersContent } from "@/lib/api/support";
import SupportSectionHead from "./SupportSectionHead";

/* "شركاؤنا في نشر الصوت" — scrolling partner logo row plus the dark funding
   CTA, from GET /pages/support's `partners` block. Without logos the mock's
   placeholder (the Sawt wordmark, repeated) stands in. */

const PLACEHOLDER_LOGOS = Array.from({ length: 5 }, () => ({
  src: "/assets/images/صوت 8.png",
  alt: "sout",
}));

export default function SupportPartners({
  data,
  lang = "ar",
}: {
  data?: SupportPartnersContent;
  lang?: string;
}) {
  const fromApi = (data?.items || [])
    .filter((item) => item.logo_url)
    .map((item) => ({ src: item.logo_url as string, alt: item.name || "" }));
  const logos = fromApi.length ? fromApi : PLACEHOLDER_LOGOS;

  const ctaTitle = localized(data?.cta?.title, lang);
  const ctaBody = localized(data?.cta?.body, lang);
  const ctaLabel = localized(data?.cta?.label, lang);

  return (
    <section className="sp-section">
      <div className="container">
        <SupportSectionHead
          title={localized(data?.title, lang)}
          sub={localized(data?.subtitle, lang)}
          fallback={{
            pre: "شركاؤنا في نشر",
            preKey: "support_partners_title_pre",
            hl: "الصوت",
            hlKey: "support_partners_title_hl",
            sub: "شكرا للمؤسسات والشركات التي تؤمن بمهمتنا وتصدر صوت أهل غزة للعالم",
            subKey: "support_partners_sub",
          }}
        />

        {/* Same scrolling logo strip as the home page (MidBanner) — .marquee
            styles come from style.css, which the (main) layout already loads.
            The second group is the seamless-loop copy. */}
        <div className="marquee">
          <div className="marquee-group">
            {logos.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} />
            ))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {logos.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>

        <div className="sp-dark-cta">
          <div>
            {ctaTitle ? (
              <h3 className="sp-dark-cta-title">{ctaTitle}</h3>
            ) : (
              <h3 className="sp-dark-cta-title" data-i18n="support_fund_title">
                الحقيقة تحتاج من يمولها
              </h3>
            )}
            {ctaBody ? (
              <p className="sp-dark-cta-desc">{ctaBody}</p>
            ) : (
              <p className="sp-dark-cta-desc" data-i18n="support_fund_desc">
                شراكات مؤسسية مع صوت — للجهات التي تريد أن يكون دورها في إيصال
                الحقيقة للعالم. انضم وأبق صوت غزة حيا
              </p>
            )}
          </div>
          {/* The contact page — /#join was a dead anchor (nothing on the home
              page carries id="join"), so this only ever went home. */}
          <a href="/media/contact" className="sp-btn-green sp-btn-light sp-btn-pill">
            {ctaLabel ? (
              <span>{ctaLabel}</span>
            ) : (
              <span data-i18n="support_contact_us">تواصل معنا</span>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
