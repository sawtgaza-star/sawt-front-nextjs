/* Ported from legacy assets/js/verification.js — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";

export function initVerification() {
  const __ready = (fn) => { try { fn(); } catch (e) { console.error(e); } };
  if ((window as any).__initVerification) return; (window as any).__initVerification = true;
// --- التنقل بين خانات الرمز (OTP) ---
const otpInputs = document.querySelectorAll(".otp-input");

otpInputs.forEach((input, index) => {
  // السماح بالأرقام فقط + الانتقال للخانة التالية عند الإدخال
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");

    if (this.value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  // الرجوع للخانة السابقة عند الحذف من خانة فارغة
  input.addEventListener("keydown", function (e) {
    if (e.key === "Backspace" && this.value === "" && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

// لصق الرمز كاملاً وتوزيعه على الخانات
if (otpInputs.length) {
  otpInputs[0].addEventListener("paste", function (e) {
    e.preventDefault();
    const digits = (e.clipboardData.getData("text") || "")
      .replace(/[^0-9]/g, "")
      .split("");
    otpInputs.forEach((box, i) => {
      box.value = digits[i] || "";
    });
    const lastFilled = Math.min(digits.length, otpInputs.length) - 1;
    if (lastFilled >= 0) otpInputs[lastFilled].focus();
  });
}

// --- العدّاد التنازلي ---
const timerElement = document.querySelector(".timer");
const resendLink = document.querySelector(".resend");
const COUNTDOWN_SECONDS = 15;
let countdownInterval = null;

function startCountdown(seconds) {
  if (!timerElement) return;

  let remaining = seconds;
  clearInterval(countdownInterval);

  const render = () => {
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    timerElement.textContent = `${mm}:${ss}`;
  };

  render();
  if (resendLink) resendLink.classList.add("disabled");

  countdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      remaining = 0;
      render();
      clearInterval(countdownInterval);
      if (resendLink) resendLink.classList.remove("disabled");
      return;
    }
    render();
  }, 1000);
}

// إعادة تشغيل العدّاد عند الضغط على "إعادة الإرسال"
if (resendLink) {
  resendLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.classList.contains("disabled")) return;
    startCountdown(COUNTDOWN_SECONDS);
  });
}

startCountdown(COUNTDOWN_SECONDS);

}
