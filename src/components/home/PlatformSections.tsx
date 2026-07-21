// @ts-nocheck
"use client";
/* eslint-disable */
import { IconEye, IconVideo, IconBook, IconUsers } from "@/components/ui/icons";

const PLATFORMS = [
  { nameKey: "platform_card1_name", name: "منصة صوت", descKey: "platform_card1_desc_alt", desc: "مكتبة غنية بالمحتوى الهادف الذي يسلّط الضوء على الواقع، ويمنح مساحة وصوت لمن لا صوت له .", stats: [{ Icon: IconEye, key: "stat_views_30m", text: "+30 مليون مشاهدة" }, { Icon: IconVideo, key: "stat_clips_100", text: "+100 مقطع" }] },
  { nameKey: "platform_card2_title", name: "حاضنة صوت", descKey: "platform_card2_desc_alt", desc: "برامج تدريبية متخصصة لتطوير مهارات صناع المحتوى وتمكينهم من الإبداع والتميز.", stats: [{ Icon: IconUsers, key: "platform_stat_trainees", text: "+100 متدرب" }, { Icon: IconVideo, key: "platform_stat_projects", text: "+10 مشاريع منطلقة" }] },
  { nameKey: "platform_card3_title", name: "صوت ميديا", descKey: "platform_card3_desc_alt", desc: "حلول إعلامية متكاملة تجمع بين الإبداع، الإنتاج، والتسويق الرقمي.", stats: [{ Icon: IconBook, key: "platform_stat_creative", text: "+500 محتوى ابداعي" }, { Icon: IconUsers, key: "platform_stat_clients", text: "+100 عميل راضي" }] },
];

function PlatformCard({ item }: { item: (typeof PLATFORMS)[number] }) {
  return (
    <div className="col-md-4">
      <div className="platform-card">
        <div className="image-container">
          <img src="/assets/images/Rectangle 592.png" alt="منصة المحتوى" className="img-fluid" />
          <div className="up-center-icon">
            <div className="center-img">
              <img className="w-100 h-100" src="/assets/images/شعار الحاضنة.png" alt="شعار الحاضنة" />
            </div>
          </div>
        </div>
        <div className="card-content mt-4">
          <h4 className="text-black fw-bold" data-i18n={item.nameKey}>{item.name}</h4>
          <p data-i18n={item.descKey}>{item.desc}</p>
          <div className="stats d-flex justify-content-start gap-3 mb-2">
            {item.stats.map((s) => (
              <span key={s.key} className="text-light-muted lh-lg" style={{ color: "rgba(127, 127, 127, 1)" }}>
                <i><s.Icon /></i> <span data-i18n={s.key}>{s.text}</span>
              </span>
            ))}
          </div>
          <a href="#" className="read-more-btn text-white">
            <span data-i18n="read_more">اقرأ المزيد</span>
            <span className="arrow"><i className="fa-solid fa-angle-left"></i></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlatformSections() {
  return (
    <>
<section className="platform-sections py-5 text-center mb-2"> <div className="container"> <div className="header-content mb-3"> <h2 className="text-black fw-bold platform-title"> <span data-i18n="platform_title_pre">أقسام</span> <span className="who-us" data-i18n="platform_title_highlight">المنصة</span> </h2> <p className="font-24" style={{color: "rgba(72, 72, 72, 1)"}} data-i18n="platform_sections_subtitle">
              أقسام متخصصة تتكامل لتحقيق رسالتنا في الإعلام والتنمية وصناعة
              التأثير
            </p> </div> <div className="row g-4 mt-2 justify-content-center">    {PLATFORMS.map((item) => (<PlatformCard key={item.nameKey} item={item} />))}</div> </div> </section>
    </>
  );
}
