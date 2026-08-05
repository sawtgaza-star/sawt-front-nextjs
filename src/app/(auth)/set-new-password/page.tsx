// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconPassword } from "@/components/ui/icons";

export default function Page() {
  return (
    <>
      <LegacyInit page="set-new-password" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title" data-i18n="reset_title">تعيين كلمة مرور جديدة</h1> <p className="subtitle" data-i18n="reset_subtitle">
                أعد تعيين كلمة مرورك. يرجى تعيين كلمة مرور جديدة لحسابك
              </p> </div> <form> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" placeholder=" كلمة المرور الجديدة" data-i18n-placeholder="reset_new_password" required className="mb-3" toggleId="togglePassword" /> <IconInput icon={<IconPassword />} type="password" id="set_password" placeholder="إعادة ادخال كلمة المرور الجديدة" data-i18n-placeholder="reset_confirm_password" required className="mb-3" toggleId="set_togglePassword" /> <Button type="submit" data-i18n="reset_submit">تغيير كلمة المرور</Button> </form>
      </AuthShell>
    </>
  );
}
