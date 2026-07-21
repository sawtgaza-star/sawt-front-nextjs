// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import {  } from "@/components/ui/icons";

export default function Page() {
  return (
    <>
      <LegacyInit page="code-verification" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title">التحقق من الرمز</h1> <p className="subtitle">
                تم ارسال رمز مكون من 6 ارقام الى البريد الإلكتروني
              </p> </div> <form> <div className="otp-container"> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" /> </div> <div className="links text-center text-bold">
                لم تستلم رمزًا؟
                <a href="#" className="resend">إعادة الإرسال</a> </div> <Button type="submit">التحقق</Button> <p className="timer text-center font-20 mt-3">00:15</p> </form> 
      </AuthShell>
    </>
  );
}
