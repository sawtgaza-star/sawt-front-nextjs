// @ts-nocheck
"use client";
/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from "react";
import LegacyInit from "@/components/LegacyInit";
import AuthShell from "@/components/site/AuthShell";
import IconInput from "@/components/ui/IconInput";
import Button from "@/components/ui/Button";
import {  } from "@/components/ui/icons";
import { AuthMessage, pendingProps } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { useAutoDismiss } from "@/components/auth/useAutoDismiss";
import { verifyCode, resendCode } from "@/lib/api/auth";
import { getResetEmail, setResetToken, setAuthFlash } from "@/lib/api/reset-flow";
import { useAuthFlash } from "@/components/auth/useAuthFlash";
import { useLang } from "@/lib/use-lang";

const CODE_LENGTH = 6;

export default function Page() {
  /* `fieldErrors` isn't rendered here — the OTP is one value across six boxes,
     so its message goes in the banner — but the map is still what clearField()
     keys on when the user starts retyping. */
  const { pending, error, success, submit, fail, clearField, setSuccess, setError } = useAuthForm();
  const formRef = useRef(null);
  const [email, setEmail] = useState(null);
  /* `attempts_left` from the last send. Null until the API has said — a resend
     is what reports it, so on first arrival there is nothing to claim. */
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const { tr } = useLang();

  // "تم إرسال رمز التحقق إلى بريدك الإلكتروني.", parked by /forgot-password.
  const { flashClassName } = useAuthFlash(setSuccess);

  /* The code error is shown in the banner above the six boxes (both halves of
     the 422 say the same thing — `message` and `errors.code`), and it takes
     itself away after a few seconds so it isn't still sitting there while the
     user retypes. Typing clears it sooner, through clearField below. */
  const dismissError = useCallback(() => setError(null), [setError]);
  const errorClassName = useAutoDismiss(error, dismissError);

  /* Step 2 of 3. The address was stored by /forgot-password; without it there
     is nothing to verify, so send the user back to the start of the flow. */
  useEffect(() => {
    const stored = getResetEmail();
    if (!stored) {
      window.location.href = "/forgot-password";
      return;
    }
    setEmail(stored);
  }, []);

  /* Resend is wired here rather than through onClick because legacy-verification.ts
     already listens on `.resend` (it restarts the countdown and re-adds the
     `disabled` class). That direct listener runs at the target phase, i.e.
     BEFORE React's delegated handler at the root — so an onClick would always
     observe the freshly-disabled link and never fire. Capture phase runs first
     and sees the real state. */
  useEffect(() => {
    const link = document.querySelector(".resend");
    if (!link) return;

    const onResend = (event) => {
      event.preventDefault();
      if (link.classList.contains("disabled") || !email) return;
      setError(null);
      setSuccess(null);
      resendCode(email)
        .then(({ message, attemptsLeft: left }) => {
          setSuccess(message || "تم إرسال رمز جديد إلى بريدك الإلكتروني.");
          if (typeof left === "number") setAttemptsLeft(left);
        })
        .catch((caught) => setError(caught?.message || "تعذر إعادة إرسال الرمز."));
    };

    link.addEventListener("click", onResend, true);
    return () => link.removeEventListener("click", onResend, true);
  }, [email, setError, setSuccess]);

  const onSubmit = submit(async () => {
    /* The six boxes are driven by legacy-verification.ts (auto-advance, paste
       distribution), so read them from the DOM rather than from React state. */
    const boxes = formRef.current?.querySelectorAll(".otp-input") ?? [];
    const code = Array.from(boxes).map((box) => box.value.trim()).join("");

    if (code.length !== CODE_LENGTH) {
      const message = "أدخل رمز التحقق المكوّن من 6 أرقام.";
      fail(message, { code: [message] });
      return;
    }

    const { token, message } = await verifyCode(email, code);
    setResetToken(token);
    // "تم التحقق من الرمز بنجاح." — shown by /set-new-password.
    setAuthFlash(message);
    window.location.href = "/set-new-password";
  });

  return (
    <>
      <LegacyInit page="code-verification" />
      <AuthShell topContent={<><button type="button" className="back-arrow d-md-none" onClick={() => { history.back(); }} aria-label="رجوع"> <i className="fas fa-arrow-right"></i> </button></>}>
   <div className="text-center"> <h1 className="title" data-i18n="otp_title">التحقق من الرمز</h1> 
   
   <p className="subtitle" data-i18n="otp_subtitle">
                تم ارسال رمز مكون من 6 ارقام الى البريد الإلكتروني
              </p> 
              
              
              </div> {/* The six boxes carry no name — they are all one value, `code`. */} <form ref={formRef} onSubmit={onSubmit} onInput={() => clearField("code")} noValidate> <AuthMessage error={error} success={success} className={flashClassName} errorClassName={errorClassName} /> <div className="otp-container"> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" autoComplete="one-time-code" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" /> <input type="text" maxLength={1} className="otp-input" placeholder="0" inputMode="numeric" /> </div> <div className="links text-center text-bold">
                <span data-i18n="otp_not_received">لم تستلم رمزًا؟</span>{" "}
                <a href="#" className="resend" data-i18n="otp_resend">إعادة الإرسال</a> </div> {/* `attempts_left` from the resend response. Rendered through tr()
      rather than data-i18n: it appears after initTranslate() has walked the
      page, so the DOM translator would never reach it. */}
              {attemptsLeft !== null ? (
                <p className="auth-attempts-left text-center">
                  {tr("otp_attempts_left")} {attemptsLeft}
                </p>
              ) : null} <Button type="submit" {...pendingProps(pending)} data-i18n="otp_verify">التحقق</Button> <p className="timer text-center font-20 mt-3">00:59</p> </form>
      </AuthShell>
    </>
  );
}
