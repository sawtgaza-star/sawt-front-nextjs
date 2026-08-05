/* Ported from legacy assets/js/login.js — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";

export function initLoginPage() {
  const __ready = (fn) => { try { fn(); } catch (e) { console.error(e); } };
// --- الحقل الأول (كلمة المرور الجديدة) ---
// Null-guarded: login/register have only this field, forgot-password has none.
// Without the guards the missing element threw and broke initTranslate() downstream.
const passwordInput = document.getElementById('password');
const togglePasswordIcon = document.getElementById('togglePassword');

if (passwordInput && togglePasswordIcon && !(togglePasswordIcon as any).__wired) {
(togglePasswordIcon as any).__wired = true;
togglePasswordIcon.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
}


// --- الحقل الثاني (إعادة إدخال كلمة المرور) ---
const setPasswordInput = document.getElementById('set_password');
const setTogglePasswordIcon = document.getElementById('set_togglePassword');

if (setPasswordInput && setTogglePasswordIcon && !(setTogglePasswordIcon as any).__wired) {
(setTogglePasswordIcon as any).__wired = true;
setTogglePasswordIcon.addEventListener('click', function () {
    // هنا نتحقق من حقل التأكيد الثاني ونغيره
    const type = setPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    setPasswordInput.setAttribute('type', type);

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
}
}
