"use client";
import type { ReactNode } from "react";
import { IconEnvelopeSquare, IconInfoCircle } from "@/components/ui/icons";
import ContactCountrySelect from "./ContactCountrySelect";
import {
  type ContactDetails,
  type ContactErrors,
  type ContactField,
} from "./contact-data";

/* "التواصل" — the wizard's last screen: e-mail, WhatsApp number and donor
   name (all required) and optional notes in a two-column grid, then the confirmation panel.
   The values and validation errors live in CheckoutWizard (the one that runs
   the check when "اتمام العملية" is pressed) and arrive here as props. */
export default function ContactStep({
  contact,
  onChange,
  errors,
}: {
  contact: ContactDetails;
  onChange: (field: ContactField, value: string) => void;
  errors: ContactErrors;
}) {

  return (
    <div className="sp-contact">
      <h2 className="sp-pay-title" data-i18n="checkout_contact_title">
        التواصل
      </h2>

      <div className="sp-contact-grid">
        <Field
          id="contact-email"
          labelKey="checkout_contact_email"
          label="البريد الالكتروني"
          required
          invalid={!!errors.email}
          error={
            errors.email === "required" ? (
              <span data-i18n="checkout_contact_email_required">
                الرجاء إدخال البريد الالكتروني للتواصل معك.
              </span>
            ) : errors.email === "invalid" ? (
              <span data-i18n="checkout_contact_email_invalid">
                الرجاء إدخال بريد الكتروني صحيح.
              </span>
            ) : null
          }
          icon={<IconEnvelopeSquare />}
        >
          <input
            id="contact-email"
            type="email"
            className="sp-contact-input"
            placeholder="Mahmad@Gmail.Com"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={contact.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Field>

        {/* like the site's other phone fields: the dial-code box stands on its
            own, then the number in a separate frame */}
        <div className="sp-contact-field">
          <label className="sp-proof-label" htmlFor="contact-whatsapp">
            <span data-i18n="checkout_contact_whatsapp">رقم الواتساب</span>
            <span className="sp-contact-required" aria-hidden="true">
              {" "}*
            </span>
          </label>
          <div className="sp-contact-phone">
            <ContactCountrySelect
              value={contact.country}
              onChange={(iso) => onChange("country", iso)}
            />
            <div
              className={
                "sp-contact-input-wrap sp-contact-phone-num" +
                (errors.whatsapp ? " is-invalid" : "")
              }
            >
              <input
                id="contact-whatsapp"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel-national"
                className="sp-contact-input"
                placeholder="59999999"
                required
                aria-invalid={errors.whatsapp ? true : undefined}
                aria-describedby={
                  errors.whatsapp ? "contact-whatsapp-error" : undefined
                }
                value={contact.whatsapp}
                // digits only — anything else typed or pasted is dropped
                onChange={(e) =>
                  onChange("whatsapp", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
          </div>
          {errors.whatsapp && (
            <p id="contact-whatsapp-error" className="sp-contact-error">
              {errors.whatsapp === "required" ? (
                <span data-i18n="checkout_contact_whatsapp_required">
                  الرجاء إدخال رقم الواتساب للتواصل معك.
                </span>
              ) : (
                <span data-i18n="checkout_contact_whatsapp_invalid">
                  الرجاء إدخال رقم واتساب صحيح.
                </span>
              )}
            </p>
          )}
        </div>

        <Field
          id="contact-name"
          labelKey="checkout_contact_name"
          label="اسم المتبرع"
          required
          invalid={!!errors.name}
          error={
            errors.name ? (
              <span data-i18n="checkout_contact_name_required">
                الرجاء إدخال اسم المتبرع.
              </span>
            ) : null
          }
          icon={<i className="ri-user-3-line" />}
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className="sp-contact-input"
            placeholder="محمد"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            data-i18n-placeholder="checkout_contact_name_placeholder"
            value={contact.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </Field>

        <Field
          id="contact-notes"
          labelKey="checkout_contact_notes"
          label="ملاحظات أخرى"
          icon={<i className="ri-file-text-line" />}
        >
          <input
            id="contact-notes"
            type="text"
            className="sp-contact-input"
            placeholder="هل لديك أي ملاحظات تود إضافتها؟"
            data-i18n-placeholder="checkout_contact_notes_placeholder"
            value={contact.notes}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </Field>
      </div>

      <aside className="sp-notes sp-notes--slim sp-contact-note">
        <p className="sp-notes-line">
          <span className="sp-notes-icon" aria-hidden="true">
            <IconInfoCircle />
          </span>
          <span data-i18n="checkout_contact_note">
            شكرا لك، تم استلام بيانات التبرع بنجاح. سنقوم بالتواصل معك بعد
            تأكيد وصول الحوالة.
          </span>
        </p>
      </aside>
    </div>
  );
}

/* One labelled field: the icon sits inside the border, so the frame is on the
   wrapper and the input itself is chrome-less. */
function Field({
  id,
  labelKey,
  label,
  required,
  invalid,
  error,
  icon,
  children,
}: {
  id: string;
  labelKey: string;
  label: string;
  required?: boolean;
  invalid?: boolean;
  error?: ReactNode;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="sp-contact-field">
      <label className="sp-proof-label" htmlFor={id}>
        <span data-i18n={labelKey}>{label}</span>
        {required && (
          <span className="sp-contact-required" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      <div className={"sp-contact-input-wrap" + (invalid ? " is-invalid" : "")}>
        <span className="sp-contact-input-icon" aria-hidden="true">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="sp-contact-error">
          {error}
        </p>
      )}
    </div>
  );
}
