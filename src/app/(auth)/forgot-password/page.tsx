// @ts-nocheck
"use client";
/* eslint-disable */
import { useCallback } from "react";
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail } from "@/components/ui/icons";
import { AuthMessage, fieldError, pendingProps } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { useAutoDismiss } from "@/components/auth/useAutoDismiss";
import { forgotPassword } from "@/lib/api/auth";
import { setResetEmail, setAuthFlash } from "@/lib/api/reset-flow";
import { useAuthFlash } from "@/components/auth/useAuthFlash";

export default function Page() {
  const { pending, error, success, fieldErrors, submit, clearField, setSuccess, setError } = useAuthForm();

  // Nothing normally precedes this page; it consumes a flash anyway so a
  // bounce back here from a later step could say why.
  const { flashClassName } = useAuthFlash(setSuccess);

  /* The 422 says the same thing twice ("البريد الإلكتروني مطلوب." as both
     `message` and `errors.email`), so it is shown once, in the banner above the
     field, and takes itself away after a few seconds. Typing clears it sooner,
     through clearField below. */
  const dismissError = useCallback(() => setError(null), [setError]);
  const errorClassName = useAutoDismiss(error, dismissError);

  /* Step 1 of 3 — the API mails a 6-digit code, /code-verification exchanges it
     for a reset_token and /set-new-password spends it. The address travels in
     sessionStorage; see lib/api/reset-flow.ts for why not the query string. */
  const onSubmit = submit(async (data) => {
    const email = String(data.get("email") || "").trim();
    const { message } = await forgotPassword(email);
    setResetEmail(email);
    // "تم إرسال رمز التحقق إلى بريدك الإلكتروني." — shown by the page it
    // lands on, since this one is gone the moment the navigation starts.
    setAuthFlash(message);
    window.location.href = "/code-verification";
  });

  return (
    <>
      <LegacyInit page="forgot-password" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title mb-3" data-i18n="forgot_title">نسيت كلمة المرور؟</h1> <p className="subtitle" data-i18n="forgot_subtitle">
                أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً آمناً لإعادة تعيين
                كلمة المرور الخاصة بك
              </p> </div> <form onSubmit={onSubmit} onInput={(event) => clearField(event.target.name)} noValidate> <AuthMessage error={error} success={success} className={flashClassName} errorClassName={errorClassName} /> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" name="email" placeholder="البريد الإلكتروني" data-i18n-placeholder="auth_email_placeholder" required className="mb-3" autoComplete="email" aria-invalid={fieldError(fieldErrors, "email") ? true : undefined} /> <Button type="submit" {...pendingProps(pending)} data-i18n="auth_send">إرسال</Button> </form>
      </AuthShell>
    </>
  );
}
