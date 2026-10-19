// @ts-nocheck
"use client";
/* eslint-disable */

import { IconGlobe } from "@/components/ui/icons";
import SawtAboutAnim from "@/components/home/sawt-anim/SawtAboutAnim";
import { useLang } from "@/lib/use-lang";
import "@/styles/auth-promo.css";

/* Shared auth layout: promo side (identical on all 5 auth pages) + form column shell.
   The promo is the home "من نحن" animation (it replaced the static swat.png);
   its badge/aria text follow the language toggle through useLang.
   mobileTopBar (login/register): logo right + language globe/En left instead of the centered logo. */
export default function AuthShell({
  children,
  topContent,
  mobileTopBar,
}: {
  children: React.ReactNode;
  topContent?: React.ReactNode;
  mobileTopBar?: boolean;
}) {
  const { lang } = useLang();
  return (
    <div className="container-fluid p-0 full-screen-container">
      <div className="row g-0 w-100 h-100">
<div className="col-md-6 right-design-section d-none d-md-block"> <div className="promo-container"> <div className="promo-anim"><SawtAboutAnim lang={lang} /></div> <div className="bottom-text-wrapper count"> <h2 className="promo-title" data-i18n-html="auth_promo_title_html">
                صوت من لا <span className="sawt-lh">صوت له</span> </h2> </div> </div> </div>
        <div className="col-md-6 left-form-section col-12">
          <button
            type="button"
            className="language-btn auth-lang-btn auth-lang-btn-desktop d-none d-md-flex"
            aria-label="تغيير اللغة"
          >
            <IconGlobe />
            <span data-i18n="auth_lang_label">En</span>
          </button>
          {topContent}
          <div className="form-wrapper postion-relative">
            {mobileTopBar ? (
              <div className="auth-mobile-topbar d-md-none">
                <img src={encodeURI("/assets/images/صوت 1.png")} alt="Sawt Logo" />
                <button type="button" className="language-btn auth-lang-btn" aria-label="تغيير اللغة">
                  <IconGlobe />
                  <span data-i18n="auth_lang_label">En</span>
                </button>
              </div>
            ) : (
              <div className="text-center mobile-logo d-md-none">
                <img src={encodeURI("/assets/images/صوت 1.png")} alt="Sawt Logo" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
