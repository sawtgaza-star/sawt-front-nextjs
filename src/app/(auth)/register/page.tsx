// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail, IconPassword, IconUser, IconGoogle, IconFacebook, IconApple } from "@/components/ui/icons";
import { AuthMessage, fieldError, fieldErrorList, pendingProps } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { register } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth-state";
import { passwordPolicyErrors } from "@/lib/password-policy";

export default function Page() {
  /* Two destinations, on purpose: what the API rejects ("هذا البريد مسجّل
     مسبقاً.") goes to the banner above the form, what this page checks itself
     (a missing box, the password rules) stays under the box it is about. */
  const { pending, apiMessages, localFieldErrors, submit, fail, clearField } = useAuthForm();

  const onSubmit = submit(async (data) => {
    const first_name = String(data.get("first_name") || "").trim();
    const last_name = String(data.get("last_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    /* Checked here as well as server-side so the user isn't made to wait on a
       round trip for rules they can see.

       Every rule is collected before anything is reported: stopping at the
       password would take the request away and with it the API's own "…
       مطلوب" for the empty name and email boxes, so a blank form would answer
       about one field instead of four. Format is still left to the server —
       these are the same sentences it sends, so lib/api/messages.ts translates
       them for an English visitor either way (the api_*_required keys).
       `fail`'s first argument is only the top-level echo — the banner shows
       API messages exclusively, so what is seen here is the per-field map. */
    const localErrors = {};
    if (!first_name) localErrors.first_name = ["الاسم الأول مطلوب."];
    if (!last_name) localErrors.last_name = ["اسم العائلة مطلوب."];
    if (!email) localErrors.email = ["البريد الإلكتروني مطلوب."];

    const policyErrors = passwordPolicyErrors(password);
    if (policyErrors.length > 0) localErrors.password = policyErrors;

    const firstMessage = Object.values(localErrors)[0]?.[0];
    if (firstMessage) {
      fail(firstMessage, localErrors);
      return;
    }

    const { session } = await register({
      first_name,
      last_name,
      email,
      password,
      /* The design has no "confirm password" field, but the API requires the
         confirmation to be present and to match — so mirror the one field. */
      password_confirmation: password,
    });

    /* 201 may or may not carry a token. With one, sign straight in; without,
       send the new account to /login. Either way it is a full reload, since
       both destinations are outside the auth CSS group or reload it. */
    if (session) {
      saveSession(session);
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  });

  return (
    <>
      <LegacyInit page="register" />
      <AuthShell mobileTopBar>
    <div className="text-center"> <h1 className="title" data-i18n="register_title">تسجيل حساب جديد</h1> <p className="subtitle" data-i18n="register_subtitle">أنشئ حساب مع صوت و تابع اخر التطورات</p> </div> <form onSubmit={onSubmit} onInput={(event) => clearField(event.target.name)} noValidate> <AuthMessage error={apiMessages} /> <div className="row"> <div className="col-6"> <IconInput icon={<IconUser />} type="text" name="first_name" placeholder="الاسم الأول" data-i18n-placeholder="register_first_name" required className="mb-3" autoComplete="given-name" error={fieldError(localFieldErrors, "first_name")} /> </div> <div className="col-6"> <IconInput type="text" name="last_name" placeholder="اسم العائلة" data-i18n-placeholder="register_last_name" required className="mb-3" autoComplete="family-name" error={fieldError(localFieldErrors, "last_name")} /> </div> </div> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" name="email" placeholder="البريد الإلكتروني" data-i18n-placeholder="auth_email_placeholder" required className="mb-3" autoComplete="email" error={fieldError(localFieldErrors, "email")} /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" name="password" placeholder="كلمة المرور" data-i18n-placeholder="auth_password_placeholder" required minLength={8} className="mb-1" toggleId="togglePassword" autoComplete="new-password" error={fieldErrorList(localFieldErrors, "password", "password_confirmation")} /> <Button type="submit" className="mt-4" {...pendingProps(pending)} data-i18n="register_submit">انشئ حساب</Button> <div className="divider-line" data-i18n="auth_or">أو</div> {/*  أزرار التواصل الاجتماعي  */} <button type="button" className="btn btn-social-media btn-google"> <i className="social-icon"><IconGoogle /></i> <span data-i18n="auth_google">
                تسجيل الدخول باستخدام google
              </span> </button> <button type="button" className="btn btn-social-media btn-facebook"> <i className="social-icon"><IconFacebook /></i> <span data-i18n="auth_facebook">
                تسجيل الدخول باستخدام facebook
              </span> </button> <button type="button" className="btn btn-social-media btn-apple"> <i className="social-icon"><IconApple /></i> <span data-i18n="auth_apple">
                تسجيل الدخول باستخدام apple
              </span> </button> <div className="link-create-account text-center">
                <span data-i18n="register_have_account">هل لديك حساب؟</span> <a href="/login" data-i18n="register_sign_in">تسجيل الدخول</a> </div> </form>
      </AuthShell>
    </>
  );
}
