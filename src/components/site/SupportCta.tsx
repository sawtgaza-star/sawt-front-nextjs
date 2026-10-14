"use client";
/* "الحقيقة تحتاج من يمولها" — the dark funding band from /support's partners
   section, reused under a news article and a story. Its button opens "ادعم
   صوت" (/support) rather than the support page's own "تواصل معنا".

   Copy through tr() (useLang) — the article pages render after
   initTranslate() has walked the DOM. Styled by support-cta.css, a copy of
   support.css's .sp-dark-cta look, so those pages don't load all of
   support.css. */

import { useLang } from "@/lib/use-lang";
import "@/styles/support-cta.css";

export default function SupportCta() {
  const { tr } = useLang();
  return (
    <div className="support-cta">
      <div>
        <h3 className="support-cta-title">{tr("support_fund_title")}</h3>
        <p className="support-cta-desc">{tr("support_fund_desc")}</p>
      </div>
      <a href="/support" className="support-cta-btn">
        {tr("nav_support")}
      </a>
    </div>
  );
}
