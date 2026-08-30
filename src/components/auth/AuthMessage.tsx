"use client";
/* Feedback bits shared by the auth forms. Styles live at the end of
   styles/legacy/password.css under "auth API feedback".

   The API answers in Arabic only, so these render server text verbatim; the
   surrounding static copy keeps its data-i18n keys as usual. */

import type { FieldErrors } from "@/lib/api/client";

/** Every message for the first of `names` that has any — for a field that can
    break several rules at once, so the user sees all of them in one go.
    IconInput renders a `string[]` as one line per message. */
export function fieldErrorList(
  errors: FieldErrors | undefined,
  ...names: string[]
): string[] | undefined {
  if (!errors) return undefined;
  for (const name of names) {
    const messages = errors[name];
    if (messages?.length) return messages;
  }
  return undefined;
}

/** First message the API returned for any of `names`. */
export function fieldError(
  errors: FieldErrors | undefined,
  ...names: string[]
): string | undefined {
  if (!errors) return undefined;
  for (const name of names) {
    const message = errors[name]?.[0];
    if (message) return message;
  }
  return undefined;
}

/** Top-of-form result banner. Renders nothing when there is no message.

    Validation errors ("… مطلوب") belong under the input they name, so the
    banner steps aside once every flagged field is shown with its own message —
    Laravel's top-level `message` only repeats the first of them anyway. A
    field the form doesn't render (reset_token, the OTP's email) has nowhere
    else to go, so that message still surfaces here. */
export function AuthMessage({
  error,
  success,
  fieldErrors,
  shownFields = [],
  className = "",
  errorClassName = "",
}: {
  /** One message, or several — a 422 can reject two fields at once. */
  error?: string | string[] | null;
  success?: string | null;
  fieldErrors?: FieldErrors;
  shownFields?: string[];
  /** Extra class for a success banner — `useAuthFlash` passes its exit
      animation here. Kept apart from `errorClassName` so a message that
      outlives the one it replaced never inherits the other's animation. */
  className?: string;
  /** Extra class for an error banner — see `useAutoDismiss`. */
  errorClassName?: string;
}) {
  const errors = (Array.isArray(error) ? error : error ? [error] : []).filter(Boolean);
  const isError = errors.length > 0;
  const messages = isError ? errors : success ? [success] : [];
  if (messages.length === 0) return null;

  const flagged = fieldErrors ? Object.keys(fieldErrors) : [];
  if (isError && flagged.length > 0 && flagged.every((name) => shownFields.includes(name))) {
    return null;
  }

  return (
    <div
      className={`auth-alert ${
        isError ? `auth-alert-error ${errorClassName}` : `auth-alert-success ${className}`
      }`.trim()}
      role={isError ? "alert" : "status"}
    >
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

/** Standalone validation message, for a field that isn't an <IconInput> (the
    OTP boxes). Inputs take their text through IconInput's `error` prop. */
export function FieldError({
  errors,
  name,
  className = "",
}: {
  errors: FieldErrors;
  name: string | string[];
  className?: string;
}) {
  const message = fieldError(errors, ...(Array.isArray(name) ? name : [name]));
  if (!message) return null;
  return <p className={`auth-field-error ${className}`.trim()}>{message}</p>;
}

/** Props that turn a submit button into its waiting state. The spinner is a
    CSS ::after on [data-loading] rather than a child element: applyTranslations()
    assigns `textContent` to every [data-i18n] node, which would delete a real
    child on the next language toggle. */
export function pendingProps(pending: boolean) {
  return {
    disabled: pending,
    "data-loading": pending ? "true" : undefined,
    "aria-busy": pending ? "true" : undefined,
  };
}
