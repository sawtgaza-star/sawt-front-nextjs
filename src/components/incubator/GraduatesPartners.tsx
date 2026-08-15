import { GRADUATE_LOGOS } from "./graduates-logos-data";

/* "يعمل خريجونا لدى جهات موثوقة" — ninth section of /incubator. Reuses the
   home page's automatic logo slider (the .marquee strip from MidBanner /
   SupportPartners — animation lives in style.css, which the (main) layout
   already loads), with the graduates' employer logos. */
export default function GraduatesPartners() {
  return (
    <section className="inc-grads">
      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_grads_title_pre">يعمل خريجونا لدى</span>{" "}
            <span className="inc-highlight" data-i18n="inc_grads_title_hl">
              جهات موثوقة
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_grads_sub">
            نفخر بتميز خريجينا وحصولهم على وظائف مرموقة في جهات عالمية
          </p>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-group">
          {GRADUATE_LOGOS.map((logo) => (
            <img src={logo.src} alt={logo.alt} key={logo.src} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {GRADUATE_LOGOS.map((logo) => (
            <img src={logo.src} alt={logo.alt} key={logo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
