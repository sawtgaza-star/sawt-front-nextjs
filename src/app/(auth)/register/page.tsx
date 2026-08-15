// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail, IconPassword, IconUser, IconGoogle, IconFacebook, IconApple } from "@/components/ui/icons";

export default function Page() {
  return (
    <>
      <LegacyInit page="register" />
      <AuthShell mobileTopBar>
    <div className="text-center"> <h1 className="title" data-i18n="register_title">تسجيل حساب جديد</h1> <p className="subtitle" data-i18n="register_subtitle">أنشئ حساب مع صوت و تابع اخر التطورات</p> </div> <form> <div className="row"> <div className="col-6"> <IconInput icon={<IconUser />} type="text" placeholder="الاسم الأول" data-i18n-placeholder="register_first_name" required className="mb-3" /> </div> <div className="col-6"> <IconInput type="text" placeholder="اسم العائلة" data-i18n-placeholder="register_last_name" required className="mb-3" /> </div> </div> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" placeholder="البريد الإلكتروني" data-i18n-placeholder="auth_email_placeholder" required className="mb-3" /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" placeholder="كلمة المرور" data-i18n-placeholder="auth_password_placeholder" required className="mb-1" toggleId="togglePassword" /> <Button type="submit" className="mt-4" data-i18n="register_submit">انشئ حساب</Button> <div className="divider-line" data-i18n="auth_or">أو</div> {/*  أزرار التواصل الاجتماعي  */} <button type="button" className="btn btn-social-media btn-google"> <i className="social-icon"><IconGoogle /></i> <span data-i18n="auth_google">
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
