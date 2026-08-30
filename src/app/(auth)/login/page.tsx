// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail, IconPassword, IconGoogle, IconFacebook, IconApple } from "@/components/ui/icons";
import { AuthMessage, fieldError, pendingProps } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { login } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth-state";
import { markLoggedIn } from "@/components/site/login-flash";
import { useAuthFlash } from "@/components/auth/useAuthFlash";

export default function Page() {
  const { pending, error, success, fieldErrors, submit, clearField, setSuccess } = useAuthForm();

  /* End of the reset flow: /set-new-password parks "تم تغيير كلمة المرور
     بنجاح. يمكنك تسجيل الدخول الآن." and this page is where it is read. */
  const { flashClassName } = useAuthFlash(setSuccess);

  const onSubmit = submit(async (data) => {
    const { session, message } = await login({
      email: String(data.get("email") || "").trim(),
      password: String(data.get("password") || ""),
    });
    saveSession(session);
    /* "تم تسجيل الدخول بنجاح." would be gone the moment this page is, so it is
       parked for the home page, where the session toast in SiteNav shows it —
       the same hand-off the sign-out button uses. */
    markLoggedIn(message);
    /* Leave the auth CSS group with a full reload, not a <Link> — see the
       CSS-groups convention in CLAUDE.md. This also lets the pre-paint script
       in layout.tsx pick up the new flag and render the signed-in top bar. */
    window.location.href = "/";
  });

  return (
    <>
      <LegacyInit page="login" />
      <AuthShell mobileTopBar>
    <div className="text-center"> <h1 className="title" data-i18n="login_title">تسجيل دخول</h1> <p className="subtitle" data-i18n="login_subtitle">
                يمكنك تسجيل الدخول من خلال إدخال البريد الإلكتروني وكلمة المرور
              </p> </div> <form onSubmit={onSubmit} onInput={(event) => clearField(event.target.name)} noValidate> {/* No `shownFields` here, unlike the other forms: a rejected sign-in is a
        failure of the pair, not of the email box, and the API hangs it on
        `email` only because that is the field it looked the account up by.
        Leaving it to IconInput printed "بيانات الدخول غير صحيحة." under one
        input as if the address were malformed. It belongs above the form, so
        the banner takes every message here and the inputs take none. */}
    <AuthMessage error={error} success={success} className={flashClassName} /> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" name="email" placeholder="البريد الإلكتروني" data-i18n-placeholder="auth_email_placeholder" required className="mb-3" autoComplete="email" aria-invalid={fieldError(fieldErrors, "email") ? true : undefined} /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" name="password" placeholder="كلمة المرور" data-i18n-placeholder="auth_password_placeholder" required className="mb-1" toggleId="togglePassword" autoComplete="current-password" aria-invalid={fieldError(fieldErrors, "password") ? true : undefined} /> <div className="forgot-password-link"> <a href="/forgot-password" data-i18n="login_forgot">هل نسيت كلمة المرور؟</a> </div> <Button type="submit" {...pendingProps(pending)} data-i18n="login_submit">تسجيل الدخول</Button> <div className="divider-line" data-i18n="auth_or">أو</div> {/*  أزرار التواصل الاجتماعي  */} <button type="button" className="btn btn-social-media btn-google"> <i className="social-icon"><IconGoogle /></i> <span data-i18n="auth_google">
                تسجيل الدخول باستخدام google
              </span> </button> <button type="button" className="btn btn-social-media btn-facebook"> <i className="social-icon"><IconFacebook /></i> <span data-i18n="auth_facebook">
                تسجيل الدخول باستخدام facebook
              </span> </button> <button type="button" className="btn btn-social-media btn-apple"> <i className="social-icon"><IconApple /></i> <span data-i18n="auth_apple">
                تسجيل الدخول باستخدام apple
              </span> </button> <div className="link-create-account text-center">
                <span data-i18n="login_no_account">ليس لديك حساب؟</span> <a href="/register" data-i18n="login_create_account">تسجيل حساب جديد</a> </div> </form>
      </AuthShell>
    </>
  );
}
