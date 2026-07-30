import { IconEnvelopeSquare, IconInfoCircle } from "@/components/ui/icons";

/* "التواصل" — the wizard's last screen: the e-mail the team writes back to,
   then the confirmation panel. The field is required, so its value and the
   validation error live in CheckoutWizard (the one that runs the check when
   "اتمام العملية" is pressed) and arrive here as props. */
export type ContactEmailError = "required" | "invalid";

export default function ContactStep({
  email,
  onEmailChange,
  error,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  error: ContactEmailError | null;
}) {
  return (
    <div className="sp-contact">
      <h2 className="sp-pay-title" data-i18n="checkout_contact_title">
        التواصل
      </h2>

      <div className="sp-contact-field">
        <label className="sp-proof-label" htmlFor="contact-email">
          <span data-i18n="checkout_contact_email">البريد الالكتروني</span>
        </label>
        {/* the icon sits inside the border, so the frame is on the wrapper and
            the input itself is chrome-less */}
        <div
          className={"sp-contact-input-wrap" + (error ? " is-invalid" : "")}
        >
          <span className="sp-contact-input-icon" aria-hidden="true">
            <IconEnvelopeSquare />
          </span>
          <input
            id="contact-email"
            type="email"
            className="sp-contact-input"
            placeholder="Mahmad@Gmail.Com"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "contact-email-error" : undefined}
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>

        {error === "required" && (
          <p
            id="contact-email-error"
            className="sp-contact-error"
            data-i18n="checkout_contact_email_required"
          >
            الرجاء إدخال البريد الالكتروني للتواصل معك.
          </p>
        )}
        {error === "invalid" && (
          <p
            id="contact-email-error"
            className="sp-contact-error"
            data-i18n="checkout_contact_email_invalid"
          >
            الرجاء إدخال بريد الكتروني صحيح.
          </p>
        )}
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
