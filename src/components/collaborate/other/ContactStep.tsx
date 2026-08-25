import {
  IconFieldMail,
  IconFieldPhone,
  IconFieldUser,
} from "@/components/collaborate/collaborate-icons";
import CollabCountrySelect from "@/components/collaborate/creator/CollabCountrySelect";

/* Step 1 — "بيانات التواصل": who is proposing the collaboration. All three
   fields are the ones the team writes back on, so all three are required.
   The values live in OtherWizard so they survive moving between steps, and so
   does the validation it runs on "التالي".
   The name label is spelled "الأسم" in the mock — kept as drawn, same as every
   other design quirk on the site. */
export type ContactFields = {
  name: string;
  email: string;
  dial: string;
  phone: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export default function ContactStep({
  values,
  errors,
  onChange,
}: {
  values: ContactFields;
  errors: ContactErrors;
  onChange: (patch: Partial<ContactFields>) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-ot-name">
          <span data-i18n="collab_ot_f_name">الأسم / اسم المؤسسة</span>
        </label>
        {/* the icon sits inside the border, so the frame is on the wrapper and
            the input itself is chrome-less */}
        <div className={"cl-input-wrap" + (errors.name ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldUser />
          </span>
          <input
            id="collab-ot-name"
            type="text"
            className="cl-input"
            placeholder="محمد احمد"
            data-i18n-placeholder="collab_ot_f_name_ph"
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        {errors.name && <p className="cl-error">{errors.name}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-ot-email">
          <span data-i18n="collab_ot_f_email">البريد الالكتروني</span>
        </label>
        <div className={"cl-input-wrap" + (errors.email ? " is-invalid" : "")}>
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldMail />
          </span>
          <input
            id="collab-ot-email"
            type="email"
            className="cl-input"
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="collab_ot_f_email_ph"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        {errors.email && <p className="cl-error">{errors.email}</p>}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-ot-phone">
          <span data-i18n="collab_ot_f_phone">رقم الهاتف</span>
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
              id="collab-ot-phone"
              type="tel"
              inputMode="tel"
              className="cl-input"
              placeholder="59999999"
              data-i18n-placeholder="collab_ot_f_phone_ph"
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
