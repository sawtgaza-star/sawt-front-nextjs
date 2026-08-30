// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect } from "react";
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconPassword } from "@/components/ui/icons";
import { AuthMessage, fieldError, fieldErrorList, pendingProps } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { resetPassword } from "@/lib/api/auth";
import { getResetToken, clearResetFlow, setAuthFlash } from "@/lib/api/reset-flow";
import { useAuthFlash } from "@/components/auth/useAuthFlash";
import { passwordPolicyErrors } from "@/lib/password-policy";

export default function Page() {
  const { pending, error, success, fieldErrors, submit, fail, clearField, setSuccess } = useAuthForm();

  // "تم التحقق من الرمز بنجاح.", parked by /code-verification — shown briefly,
  // then it slides away on its own.
  const { flashClassName } = useAuthFlash(setSuccess);

  /* Step 3 of 3 — spends the reset_token that /code-verification stored.
     Landing here without one means the flow was skipped or the tab is new. */
  useEffect(() => {
    if (!getResetToken()) window.location.href = "/forgot-password";
  }, []);

  const onSubmit = submit(async (data) => {
    const password = String(data.get("password") || "");
    const confirmation = String(data.get("password_confirmation") || "");

    /* Checked here as well as server-side so the user isn't made to wait on a
       round trip for a mismatch they can see. */
    const policyErrors = passwordPolicyErrors(password);
    if (policyErrors.length > 0) {
      fail(policyErrors[0], { password: policyErrors });
      return;
    }
    if (password !== confirmation) {
      const message = "كلمتا المرور غير متطابقتين.";
      fail(message, { password_confirmation: [message] });
      return;
    }

    const reset_token = getResetToken();
    if (!reset_token) {
      window.location.href = "/forgot-password";
      return;
    }

    const message = await resetPassword({
      reset_token,
      password,
      password_confirmation: confirmation,
    });
    clearResetFlow();
    /* clearResetFlow() drops the email and the token; the flash is a separate
       key, so it survives to greet the user on /login with "تم تغيير كلمة
       المرور بنجاح. يمكنك تسجيل الدخول الآن." */
    setAuthFlash(message);
    window.location.href = "/login";
  });

  return (
    <>
      <LegacyInit page="set-new-password" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title" data-i18n="reset_title">تعيين كلمة مرور جديدة</h1> <p className="subtitle" data-i18n="reset_subtitle">
                أعد تعيين كلمة مرورك. يرجى تعيين كلمة مرور جديدة لحسابك
              </p> </div> {/* Both fields clear both messages: "كلمتا المرور غير متطابقتين." sits under
      the confirmation but can be answered by editing either box. */} <form onSubmit={onSubmit} onInput={() => clearField("password", "password_confirmation")} noValidate> <AuthMessage error={error} success={success} fieldErrors={fieldErrors} shownFields={["password", "password_confirmation"]} className={flashClassName} /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" name="password" placeholder=" كلمة المرور الجديدة" data-i18n-placeholder="reset_new_password" required minLength={8} className="mb-3" toggleId="togglePassword" autoComplete="new-password" error={fieldErrorList(fieldErrors, "password")} /> <IconInput icon={<IconPassword />} type="password" id="set_password" name="password_confirmation" placeholder="إعادة ادخال كلمة المرور الجديدة" data-i18n-placeholder="reset_confirm_password" required minLength={8} className="mb-3" toggleId="set_togglePassword" autoComplete="new-password" error={fieldError(fieldErrors, "password_confirmation")} /> <Button type="submit" {...pendingProps(pending)} data-i18n="reset_submit">تغيير كلمة المرور</Button> </form>
      </AuthShell>
    </>
  );
}
