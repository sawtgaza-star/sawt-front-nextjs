import {
  IconFieldMail,
  IconFieldPhone,
  IconFieldUser,
} from "@/components/collaborate/collaborate-icons";
import CollabCountrySelect from "@/components/collaborate/creator/CollabCountrySelect";

/* Step 1 — "بيانات الشركة": who is proposing the partnership. Name, e-mail and
   phone are the ones the team writes back on; the website is optional.
   The values live in PartnershipWizard so they survive moving between steps,
   and so does the validation it runs on "التالي".
   The website field carries the mock's envelope glyph and its e-mail
   placeholder — kept as drawn, same as every other design quirk on the site. */
export type CompanyFields = {
  company: string;
  email: string;
  site: string;
  dial: string;
  phone: string;
};

export type CompanyErrors = Partial<Record<keyof CompanyFields, string>>;

export default function CompanyStep({
  values,
  errors,
  onChange,
}: {
  values: CompanyFields;
  errors: CompanyErrors;
  onChange: (patch: Partial<CompanyFields>) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-pa-company">
          <span data-i18n="collab_pa_f_company">اسم الشركة / المؤسسة</span>
        </label>
        {/* the icon sits inside the border, so the frame is on the wrapper and
            the input itself is chrome-less */}
        <div
          className={"cl-input-wrap" + (errors.company ? " is-invalid" : "")}
        >
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldUser />
          </span>
          <input
            id="collab-pa-company"
            type="text"
            className="cl-input"
            placeholder="محمد احمد"
            data-i18n-placeholder="collab_pa_f_company_ph"
            value={values.company}
            onChange={(e) => onChange({ company: e.target.value })}
          />
        </div>
        {errors.company && <p className="cl-error">{errors.company}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-pa-email">
          <span data-i18n="collab_pa_f_email">البريد الالكتروني</span>
        </label>
        <div className={"cl-input-wrap" + (errors.email ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldMail />
          </span>
          <input
            id="collab-pa-email"
            type="email"
            className="cl-input"
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="collab_pa_f_email_ph"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        {errors.email && <p className="cl-error">{errors.email}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-pa-site">
          <span data-i18n="collab_pa_f_site">موقع الشركة الإلكتروني</span>
        </label>
        <div className="cl-input-wrap">
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldMail />
          </span>
          <input
            id="collab-pa-site"
            type="url"
            className="cl-input"
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="collab_pa_f_site_ph"
            value={values.site}
            onChange={(e) => onChange({ site: e.target.value })}
          />
        </div>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-pa-phone">
          <span data-i18n="collab_pa_f_phone">رقم الهاتف</span>
        </label>
        <div className="cl-phone-row">
          <CollabCountrySelect
            value={values.dial}
            onChange={(dial) => onChange({ dial })}
          />
          <div className={"cl-input-wrap" + (errors.phone ? " is-invalid" : "")}>
            <span className="cl-input-icon" aria-hidden="true">
              <IconFieldPhone />
            </span>
            <input
              id="collab-pa-phone"
              type="tel"
              inputMode="tel"
              className="cl-input"
              placeholder="59999999"
              data-i18n-placeholder="collab_pa_f_phone_ph"
              value={values.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
        </div>
        {errors.phone && <p className="cl-error">{errors.phone}</p>}
      </div>
    </div>
  );
}
