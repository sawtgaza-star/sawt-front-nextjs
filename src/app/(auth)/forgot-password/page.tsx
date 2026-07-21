// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail } from "@/components/ui/icons";

export default function Page() {
  return (
    <>
      <LegacyInit page="forgot-password" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title mb-3">نسيت كلمة المرور؟</h1> <p className="subtitle">
                أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً آمناً لإعادة تعيين
                كلمة المرور الخاصة بك
              </p> </div> <form> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" placeholder="البريد الإلكتروني" required className="mb-3" /> <Button type="submit">إرسال</Button> </form> 
      </AuthShell>
    </>
  );
}
