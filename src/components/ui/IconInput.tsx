// @ts-nocheck
"use client";
/* eslint-disable */

import { IconEyeAuth, IconEyeSlashAuth } from "@/components/ui/icons";

/* Auth form input with a leading icon and optional trailing toggle icon
   (password eye — wired by lib/legacy-login via its id).

   `error` is the validation message for this field — the API's, or the local
   password-policy check's. It renders right under the box, inside the wrapper
   that carries the spacing class, so the message sits in the field's own gap
   instead of pushing the form down. An array gets one line per message: a
   password can break several rules at once, and listing them together beats
   revealing one per submit.

   The wrapper is always rendered, error or not: adding a level around the
   <input> only when a message appears would remount it, and an uncontrolled
   input loses what the user typed when it remounts. */
export default function IconInput({
  icon,
  toggleId,
  className = "mb-3",
  error,
  ...inputProps
}: {
  icon: React.ReactNode;
  toggleId?: string;
  className?: string;
  error?: string | string[];
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const messages = Array.isArray(error) ? error : error ? [error] : [];

  return (
    <div className={className}>
      <div className="input-group-custom">
        <i className="input-icon-main">{icon}</i>
        <input className="form-control" aria-invalid={messages.length ? true : undefined} {...inputProps} />
        {/* fa-eye/fa-eye-slash toggled by legacy-login.ts — CSS shows the matching eye state */}
        {toggleId && (
          <i className="fa-eye input-icon-left" id={toggleId} style={{ cursor: "pointer" }}>
            <span className="eye-open"><IconEyeAuth /></span>
            <span className="eye-slash"><IconEyeSlashAuth /></span>
          </i>
        )}
      </div>
      {messages.map((message) => (
        <p className="auth-field-error" key={message}>
          {message}
        </p>
      ))}
    </div>
  );
}
