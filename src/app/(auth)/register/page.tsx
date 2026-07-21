// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import { IconMail, IconPassword, IconUser } from "@/components/ui/icons";

export default function Page() {
  return (
    <>
      <LegacyInit page="register" />
      <AuthShell>
    <div className="text-center"> <h1 className="title">تسجيل حساب جديد</h1> <p className="subtitle">أنشئ حساب مع صوت و تابع اخر التطورات</p> </div> <form> <div className="row"> <div className="col-6"> <IconInput icon={<IconUser />} type="text" placeholder="الاسم الأول" required className="mb-3" /> </div> <div className="col-6"> <IconInput type="text" placeholder="اسم العائلة" required className="mb-3" /> </div> </div> {/*  حقل البريد الإلكتروني مع الأيقونة بداخلها  */} <IconInput icon={<IconMail />} type="email" placeholder="البريد الإلكتروني" required className="mb-3" /> {/*  حقل كلمة المرور مع الأيقونات بداخلها  */} <IconInput icon={<IconPassword />} type="password" id="password" placeholder="كلمة المرور" required className="mb-1" toggleId="togglePassword" /> <div className="remember-me"> <input className="form-check-input" type="checkbox" value="" id="checkDefault" /> <label className="form-check-label font-13" htmlFor="checkDefault">
                  تذكرني
                </label> </div> <Button type="submit">انشئ حساب</Button> <div className="divider-line">أو</div> {/*  أزرار التواصل الاجتماعي  */} <button type="button" className="btn btn-social-media btn-google"> <i className="fab fa-google"></i>
                تسجيل الدخول باستخدام google
              </button> <button type="button" className="btn btn-social-media btn-facebook"> <i className="facebook-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path> </svg> </i>
                تسجيل الدخول باستخدام facebook
              </button> <button type="button" className="btn btn-social-media btn-apple"> <i className="fab fa-apple"></i>
                تسجيل الدخول باستخدام apple
              </button> <div className="link-create-account text-center">
                هل لديك حساب؟ <a href="/login">تسجيل دخول</a> </div> </form> 
      </AuthShell>
    </>
  );
}
