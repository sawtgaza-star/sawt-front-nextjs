import { MEDIA_SERVICES } from "./media-services-data";
import { IconMail, IconUser } from "@/components/ui/icons";
import { IconFormPhone } from "./media-icons";

/* The "احجز الأن" card. Stays a Server Component: like the rest of the site's
   forms it has no backend yet, so there is no submit handler to hydrate — the
   markup mirrors the join-modal's phone field (country box + flag) so it
   inherits the same look. */
export default function MediaConsultForm() {
  return (
    <form className="sm-form" noValidate>
      <h3 className="sm-form-title" data-i18n="sm_form_title">
        احجز الأن
      </h3>

      <div className="sm-field">
        <label className="sm-label" data-i18n="sm_form_name">
          الاسم الكامل
        </label>
        <div className="sm-input-wrap">
          <i className="sm-input-icon">
            <IconUser />
          </i>
          <input
            type="text"
            className="sm-input"
            name="fullname"
            placeholder="محمد احمد"
            data-i18n-placeholder="sm_form_name_ph"
          />
        </div>
      </div>

      <div className="sm-field">
        <label className="sm-label" data-i18n="sm_form_phone">
          رقم الهاتف
        </label>
        <div className="sm-phone-wrap">
          <div className="sm-country-box">
            <i className="fa-solid fa-chevron-down sm-country-caret"></i>
            <span className="sm-country-code">+970</span>
            <span className="fi fi-ps sm-country-flag"></span>
          </div>
          <div className="sm-input-wrap sm-phone-num">
            <i className="sm-input-icon">
              <IconFormPhone />
            </i>
            <input
              type="tel"
              className="sm-input"
              name="phone"
              placeholder="59999999"
              data-i18n-placeholder="sm_form_phone_ph"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      <div className="sm-field">
        <label className="sm-label" data-i18n="sm_form_email">
          البريد الالكتروني
        </label>
        <div className="sm-input-wrap">
          <i className="sm-input-icon">
            <IconMail />
          </i>
          <input
            type="email"
            className="sm-input"
            name="email"
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="sm_form_email_ph"
          />
        </div>
      </div>

      <div className="sm-field">
        <label className="sm-label" data-i18n="sm_form_service">
          الخدمة المطلوبة
        </label>
        <div className="sm-input-wrap sm-select-wrap">
          <i className="fa-solid fa-chevron-down sm-select-caret"></i>
          <select className="sm-input sm-select" name="service" defaultValue="">
            <option value="" disabled data-i18n="sm_form_service_ph">
              اختر الخدمة المطلوبة
            </option>
            {MEDIA_SERVICES.map((s) => (
              <option value={s.key} key={s.key} data-i18n={s.titleKey}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="sm-btn-green sm-form-submit">
        <span data-i18n="sm_form_submit">احجز استشارتك</span>
        <i className="fa-solid fa-angle-left"></i>
      </button>
    </form>
  );
}
