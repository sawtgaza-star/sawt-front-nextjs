"use client";
import { useCallback, useRef } from "react";
import { localized } from "@/lib/api/pages";
import type { MediaConsultForm as MediaConsultFormContent } from "@/lib/api/media-page";
import {
  consultationPath,
  serviceChoices,
  submitConsultation,
} from "@/lib/api/media-consultation";
import { useMediaServiceOptions } from "@/lib/api/use-media-service-options";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { useLang } from "@/lib/use-lang";
import { IconMail, IconUser } from "@/components/ui/icons";
import { IconFormPhone } from "./media-icons";
import MediaCountrySelect from "./MediaCountrySelect";
import MediaFormToast from "./MediaFormToast";

/* The "احجز الأن" card — the booking that lands in صوت ميديا's inbox.

   POSTs to the endpoint the payload itself names (`form.submit_path`, resolved
   by `consultationPath`) and shows what comes back: the server's own "تم
   استلام طلب الاستشارة…" above the button on success, its 422 messages under
   the boxes they name. Nothing is checked here first — the API validates every
   field and answers in the same Arabic the rest of the site's forms show, so a
   second set of rules in the browser could only disagree with it. (The one
   thing the browser does own is emptying the card afterwards.)

   The labels, the services and the button are the API's. The example values in
   the inputs are not — the payload has no placeholder for them, and they are
   part of the design — so those keep their `data-i18n-placeholder` keys and
   are translated by the DOM translator like any other static string. The
   messages, which arrive long after that walk, go through `useAuthForm`'s own
   translation instead. */
/** What a booking is answered with when the 201 says nothing (api_consult_received). */
const CONSULT_RECEIVED = "تم استلام طلب الاستشارة، سنتواصل معك قريباً.";

export default function MediaConsultForm({
  form,
  lang: pageLang = "ar",
}: {
  form?: MediaConsultFormContent;
  lang?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending, error, success, fieldErrors, submit, clearField, setSuccess } =
    useAuthForm();
  /* only for the button's "جاري الإرسال..." — every other word here is either
     the payload's or, for the API's messages, translated by useAuthForm */
  const { tr } = useLang();
  const options = useMediaServiceOptions();
  const closeToast = useCallback(() => setSuccess(null), [setSuccess]);

  const fields = form?.fields;
  const label = (key: string) => localized(fields?.[key]?.label, pageLang);
  /* the API's own field keys, which are what a 422 names its errors by */
  const nameKey = fields?.name?.key || "name";
  const phoneKey = fields?.phone?.key || "phone";
  const codeKey = fields?.country_code?.key || "country_code";
  const emailKey = fields?.email?.key || "email";
  const serviceKey = fields?.service?.key || "service";

  const choices = serviceChoices(options, form?.services, pageLang);
  const fieldError = (key: string) => fieldErrors[key]?.[0];
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  const onSubmit = submit(async (data) => {
    const value = (key: string) => String(data.get(key) || "").trim();

    const result = await submitConsultation(
      {
        name: value(nameKey),
        email: value(emailKey),
        phone: value(phoneKey),
        country_code: value(codeKey),
        service: value(serviceKey),
      },
      consultationPath(form?.submit_path),
    );

    /* Only the message stays on screen: the next visitor to the card shouldn't
       find the last one's booking still in it. The country picker keeps its
       own state — reset() can't reach a React leaf — so the dial code stays
       where it was set, which is the one field a second booking would repeat. */
    formRef.current?.reset();

    /* The server's wording wins over the built-in one, exactly as the join
       modal does it — the fallback is only for a 201 that carries no message,
       and it is the same sentence, so lib/api/messages translates either. */
    setSuccess(result?.message || CONSULT_RECEIVED);
  });

  return (
    <form className="sm-form" ref={formRef} onSubmit={onSubmit} noValidate>
      <h3 className="sm-form-title">{localized(form?.title, pageLang)}</h3>

      <div className="sm-field">
        <label className="sm-label">{label("name")}</label>
        <div className="sm-input-wrap">
          <i className="sm-input-icon">
            <IconUser />
          </i>
          <input
            type="text"
            className="sm-input"
            name={nameKey}
            placeholder="محمد احمد"
            data-i18n-placeholder="sm_form_name_ph"
            onInput={() => clearField(nameKey)}
          />
        </div>
        {fieldError(nameKey) ? (
          <p className="sm-field-error">{fieldError(nameKey)}</p>
        ) : null}
      </div>

      <div className="sm-field">
        <label className="sm-label">{label("phone")}</label>
        <div className="sm-phone-wrap">
          <MediaCountrySelect name={codeKey} />
          <div className="sm-input-wrap sm-phone-num">
            <i className="sm-input-icon">
              <IconFormPhone />
            </i>
            <input
              type="tel"
              className="sm-input"
              name={phoneKey}
              placeholder="59999999"
              data-i18n-placeholder="sm_form_phone_ph"
              dir="rtl"
              onInput={() => clearField(phoneKey, codeKey)}
            />
          </div>
        </div>
        {fieldError(phoneKey) || fieldError(codeKey) ? (
          <p className="sm-field-error">{fieldError(phoneKey) || fieldError(codeKey)}</p>
        ) : null}
      </div>

      <div className="sm-field">
        <label className="sm-label">{label("email")}</label>
        <div className="sm-input-wrap">
          <i className="sm-input-icon">
            <IconMail />
          </i>
          <input
            type="email"
            className="sm-input"
            name={emailKey}
            placeholder="Mohamed@Gmail.Com"
            data-i18n-placeholder="sm_form_email_ph"
            onInput={() => clearField(emailKey)}
          />
        </div>
        {fieldError(emailKey) ? (
          <p className="sm-field-error">{fieldError(emailKey)}</p>
        ) : null}
      </div>

      <div className="sm-field">
        <label className="sm-label">{label("service")}</label>
        <div className="sm-input-wrap sm-select-wrap">
          <i className="fa-solid fa-chevron-down sm-select-caret"></i>
          <select
            className="sm-input sm-select"
            name={serviceKey}
            defaultValue=""
            onChange={() => clearField(serviceKey)}
          >
            <option value="" disabled>
              {localized(fields?.service?.placeholder, pageLang)}
            </option>
            {choices.map((choice) => (
              <option value={choice.value} key={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        {fieldError(serviceKey) ? (
          <p className="sm-field-error">{fieldError(serviceKey)}</p>
        ) : null}
      </div>

      {/* A 422's top-level message is only the API's echo of the first field it
         flagged, and that sentence is already under the box it names — so the
         banner above the button is left out and the notes stay where the eye
         goes to fix them. It still appears for the messages no field carries
         (a 500, a dropped connection), which would otherwise leave a press
         with no answer at all. Text, not [data-i18n]: useAuthForm re-translates
         it on the language button, after the DOM translator's walk. */}
      {error && !hasFieldErrors ? (
        <p className="sm-form-msg is-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="sm-btn-green sm-form-submit"
        disabled={pending}
        aria-busy={pending}
      >
        <span>
          {pending ? tr("sm_form_sending") : localized(form?.submit?.label, pageLang)}
        </span>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {success ? <MediaFormToast message={success} onClose={closeToast} /> : null}
    </form>
  );
}
