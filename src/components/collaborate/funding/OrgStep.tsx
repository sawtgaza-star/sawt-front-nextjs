import {
  IconFieldBuilding,
  IconFieldLink,
  IconFieldMail,
  IconFieldPhone,
} from "@/components/collaborate/collaborate-icons";
import CollabCountrySelect from "@/components/collaborate/creator/CollabCountrySelect";

/* Step 1 — "بيانات الجهة": who is offering the support. Name, e-mail and
   phone are the ones the team writes back on; the website is optional.
   The values live in FundingWizard so they survive moving between steps, and
   so does the validation it runs on "التالي". */
export type OrgFields = {
  org: string;
  email: string;
  site: string;
  dial: string;
  phone: string;
};

export type OrgErrors = Partial<Record<keyof OrgFields, string>>;

export default function OrgStep({
  values,
  errors,
  onChange,
}: {
  values: OrgFields;
  errors: OrgErrors;
  onChange: (patch: Partial<OrgFields>) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-org">
          <span data-i18n="collab_fu_f_org">اسم الشركة / المؤسسة</span>
        </label>
        {/* the icon sits inside the border, so the frame is on the wrapper and
            the input itself is chrome-less */}
        <div className={"cl-input-wrap" + (errors.org ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldBuilding />
          </span>
          <input
            id="collab-org"
            type="text"
            className="cl-input"
            placeholder="شركة الابداع"
            data-i18n-placeholder="collab_fu_f_org_ph"
            value={values.org}
            onChange={(e) => onChange({ org: e.target.value })}
          />
        </div>
        {errors.org && <p className="cl-error">{errors.org}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-org-email">
          <span data-i18n="collab_fu_f_email">البريد الالكتروني</span>
        </label>
        <div className={"cl-input-wrap" + (errors.email ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldMail />
          </span>
          <input
            id="collab-org-email"
            type="email"
            className="cl-input"
            placeholder="Examle@Gmail.Com"
            data-i18n-placeholder="collab_fu_f_email_ph"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        {errors.email && <p className="cl-error">{errors.email}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-org-site">
          <span data-i18n="collab_fu_f_site">
            موقع الشركة / المؤسسة الإلكتروني
          </span>
        </label>
        <div className="cl-input-wrap">
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldLink />
          </span>
          <input
            id="collab-org-site"
            type="url"
            className="cl-input"
            placeholder="Www.Example.Com"
            data-i18n-placeholder="collab_fu_f_site_ph"
            value={values.site}
            onChange={(e) => onChange({ site: e.target.value })}
          />
        </div>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-org-phone">
          <span data-i18n="collab_fu_f_phone">رقم الهاتف للتواصل</span>
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
              id="collab-org-phone"
              type="tel"
              inputMode="tel"
              className="cl-input"
              placeholder="59999999"
              data-i18n-placeholder="collab_fu_f_phone_ph"
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
