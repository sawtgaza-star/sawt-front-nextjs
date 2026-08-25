import { MEDIA_PHOTOS } from "./media-photos";

/* The banner that closes the case study: a still under an olive wash, the
   headline with "صوت ميديا" in orange, and the button back to the booking form
   on /media. */
export default function MediaProjectCta() {
  return (
    <section className="sm-pj-cta">
      <div className="container">
        <div className="sm-pj-cta-card">
          <img className="sm-pj-cta-photo" src={MEDIA_PHOTOS.yamal} alt="" />
          <span className="sm-pj-cta-veil" aria-hidden="true" />

          <div className="sm-pj-cta-text">
            <h2 className="sm-pj-cta-title">
              <span data-i18n="sm_pj_cta_lead">فريق</span>{" "}
              <span className="sm-pj-cta-hl" data-i18n="sm_brand">
                صوت ميديا
              </span>{" "}
              <span data-i18n="sm_pj_cta_tail">يدعم نموك</span>
            </h2>
            <p className="sm-pj-cta-desc" data-i18n="sm_pj_cta_desc">
              نساعد الشركات على تنفيذ مشاريعها بسرعة واحترافية من خلال فريق متخصص
              يعمل كامتداد لفريقك باستخدام أحدث أدوات التصميم وتقنيات الذكاء
              الاصطناعي.
            </p>
            <a className="sm-btn-green sm-btn-lg" href="/media#sm-consult">
              <span data-i18n="sm_pj_cta_btn">احجز استشارة</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
