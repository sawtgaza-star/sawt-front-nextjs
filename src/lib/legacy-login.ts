/* Ported from legacy assets/js/login.js — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";

export function initLoginPage() {
  const __ready = (fn) => { try { fn(); } catch (e) { console.error(e); } };
  if ((window as any).__initLoginPage) return; (window as any).__initLoginPage = true;
// --- الحقل الأول (كلمة المرور الجديدة) ---
const passwordInput = document.getElementById('password');
const togglePasswordIcon = document.getElementById('togglePassword');

togglePasswordIcon.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});


// --- الحقل الثاني (إعادة إدخال كلمة المرور) ---
const setPasswordInput = document.getElementById('set_password');
const setTogglePasswordIcon = document.getElementById('set_togglePassword');

setTogglePasswordIcon.addEventListener('click', function () {
    // هنا نتحقق من حقل التأكيد الثاني ونغيره
    const type = setPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    setPasswordInput.setAttribute('type', type);
    
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
}
