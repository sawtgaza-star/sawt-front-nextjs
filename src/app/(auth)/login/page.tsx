// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail, IconPassword, IconGoogle, IconFacebook, IconApple } from "@/components/ui/icons";
import { setLoggedIn } from "@/lib/auth-state";

export default function Page() {
  return (
    <>
      <LegacyInit page="login" />
      <AuthShell mobileTopBar>
    <div className="text-center"> <h1 className="title" data-i18n="login_title">تسجيل دخول</h1> <p className="subtitle" data-i18n="login_subtitle">
                يمكنك تسجيل الدخول من خلال إدخال البريد الإلكتروني وكلمة المرور
              </p> </div> <form
              onSubmit={(e) => {
                /* No auth API yet (CLAUDE.md roadmap #7) — flip the local flag
                   so the signed-in top bar shows, then leave the auth CSS group
                   with a full reload (see the CSS-groups convention). */
                e.preventDefault();
                setLoggedIn(true);
                window.location.href = "/";
              }}
            > {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" placeholder="البريد الإلكتروني" data-i18n-placeholder="auth_email_placeholder" required className="mb-3" /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" placeholder="كلمة المرور" data-i18n-placeholder="auth_password_placeholder" required className="mb-1" toggleId="togglePassword" /> <div className="forgot-password-link"> <a href="/forgot-password" data-i18n="login_forgot">هل نسيت كلمة المرور؟</a> </div> <Button type="submit" data-i18n="login_submit">تسجيل الدخول</Button> <div className="divider-line" data-i18n="auth_or">أو</div> {/*  أزرار التواصل الاجتماعي  */} <button type="button" className="btn btn-social-media btn-google"> <i className="social-icon"><IconGoogle /></i> <span data-i18n="auth_google">
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
