import {
  IconFieldMail,
  IconFieldPhone,
  IconFieldUser,
} from "@/components/collaborate/collaborate-icons";
import CollabCountrySelect from "./CollabCountrySelect";

/* Step 1 — "المعلومات الشخصية": full name, phone (dial code + number) and the
   e-mail the team writes back to. The values live in CreatorWizard so they
   survive moving between steps, and so does the validation it runs on "التالي". */
export type PersonalFields = {
  name: string;
  dial: string;
  phone: string;
  email: string;
};

export type PersonalErrors = Partial<Record<keyof PersonalFields, string>>;

export default function PersonalStep({
  values,
  errors,
  onChange,
}: {
  values: PersonalFields;
  errors: PersonalErrors;
  onChange: (patch: Partial<PersonalFields>) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-name">
          <span data-i18n="collab_f_name">الاسم الكامل</span>
        </label>
        {/* the icon sits inside the border, so the frame is on the wrapper and
            the input itself is chrome-less */}
        <div className={"cl-input-wrap" + (errors.name ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldUser />
          </span>
          <input
            id="collab-name"
            type="text"
            className="cl-input"
            placeholder="محمد احمد"
            data-i18n-placeholder="collab_f_name_ph"
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        {errors.name && <p className="cl-error">{errors.name}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-phone">
          <span data-i18n="collab_f_phone">رقم الهاتف</span>
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
              id="collab-phone"
              type="tel"
              inputMode="tel"
              className="cl-input"
              placeholder="59999999"
              data-i18n-placeholder="collab_f_phone_ph"
              value={values.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
        </div>
        {errors.phone && <p className="cl-error">{errors.phone}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-email">
          <span data-i18n="collab_f_email">البريد الالكتروني</span>
        </label>
        <div className={"cl-input-wrap" + (errors.email ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldMail />
          </span>
          <input
            id="collab-email"
            type="email"
            className="cl-input"
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="collab_f_email_ph"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        {errors.email && <p className="cl-error">{errors.email}</p>}
      </div>
    </div>
  );
}
