// @ts-nocheck
"use client";

import { IconTwoUsers,IconMoney, IconNews, IconUser, } from "../ui/icons";


const STATS = [

    {
    icon: IconUser,
    num: "+45",
    label: "صانع محتوى نشط",
    key: "creators_stat_active",
  },
    {
    icon: IconNews,
    num: "+500",
    label: "إعلان تعاوني نُفّذ",
    key: "creators_stat_ads",
  }, 
   {
    icon: IconMoney,
    num: "250K$+",
    label: "دعم مالي وُزّع",
    key: "creators_stat_funding",
  },
  {
    icon: IconTwoUsers,
    num: "+4M",
    label: "شخص وصلهم المحتوى",
    key: "creators_stat_reach",
  },



];

export default function CreatorsStats() {
  return (
    <section className="cr-stats-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span
              className="cr-title-orange"
              data-i18n="creators_stats_title_pre"
            >
              انجازات
            </span>{" "}
            <span data-i18n="creators_stats_title_mid">صناع محتوى</span>{" "}
            <span className="cr-highlight" data-i18n="brand_sawt">
              صوت
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="creators_stats_sub">
            أرقام حقيقية تعكس قوة مجتمعنا
          </p>
        </div>
        <div className="cr-stats-grid">
          {STATS.map((s) => (
            <div className="cr-stat-card" key={s.key}>
              <div className="cr-stat-icon">
                <i className='icon'>{s.icon()}</i>
              </div>
              <div className="cr-stat-num">{s.num}</div>
              <p className="cr-stat-label" data-i18n={s.key}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
