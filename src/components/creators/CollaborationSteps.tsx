// @ts-nocheck
"use client";
/* eslint-disable */
import { IconArrowUpLeft } from "@/components/ui/icons";

/* "كيف يبدأ التعاون مع صناع محتوى صوت؟" — flow diagram + steps + CTA. */
const STEPS = [
  {
    num: "01",
    text: "استعرض ملفات صنّاعنا وفلتر حسب التخصص والميزانية والوصول الجماهيري",
    key: "creators_step_1",
  },
  {
    num: "02",
    text: "فريق صوت ميديا يتولى التنسيق الكامل بينك وبين صانع المحتوى — من التفاصيل حتى العقد",
    key: "creators_step_2",
  },
  {
    num: "03",
    text: "المحتوى يُنتج ويُنشر، وتحصل على تقرير تفصيلي بالنتائج والوصول والتفاعل",
    key: "creators_step_3",
  },
];

/* Six graduated dots: index 0 = nearest the centre (big / solid orange),
   index 5 = farthest (small / faint). `flip` reverses the visual order so the
   big dots always sit next to the green centre circle. */
function FlowArrow({ dir }: { dir: "left" | "right" }) {
  const dots = [0, 1, 2, 3, 4, 5];
  const ordered = dir === "left" ? [...dots].reverse() : dots;

  const dotEls = ordered.map((i) => (
    <span key={`dot-${i}`} className={`cr-flow-dot cr-flow-dot-${i}`} />
  ));
  const arrow = (
    <svg
      key="arrow"
      className="cr-flow-head"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={dir === "left" ? "M19 12H5m0 0l6-6m-6 6l6 6" : "M5 12h14m0 0l-6-6m6 6l-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const children = dir === "left" ? [...dotEls, arrow] : [arrow, ...dotEls];

  return <div className="cr-flow-arrow">{children}</div>;
}

export default function CollaborationSteps() {
  return (
    <section className="cr-collab-section">
      <div className="container position-relative ">


          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-CollaborationSteps-section"
            alt="Olive Branch"
          />

        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="creators_collab_title_pre">
              كيف يبدأ التعاون مع
            </span>{" "}
            <span className="cr-highlight" data-i18n="creators_collab_title_hl">
              صناع محتوى صوت؟
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="creators_collab_sub">
            وصلنا شركات من حول العالم بصنّاع المحتوى في غزة — صوت ميديا هي الجسر
            الذي يوصلك
          </p>
        </div>

        <div className="cr-flow-outer">
          <div className="cr-flow-panel">
            <div className="cr-flow-node">
              <div className="cr-flow-icon cr-flow-orange">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h3
                className="cr-flow-node-title"
                data-i18n="creators_flow_brands"
              >
                الشركات والعلامات
              </h3>
              <p
                className="cr-flow-node-sub"
                data-i18n="creators_flow_brands_sub"
              >
                التجارية حول العالم
              </p>
            </div>

            <FlowArrow dir="left" />

            <div className="cr-flow-center">
              <div className="cr-flow-center-circle">
                <img src="/assets/images/شعار الحاضنة 2 [Vectorized].png" alt="" />
                <span data-i18n="creators_flow_media">ميديا صوت</span>
              </div>
              <span className="cr-flow-badge" data-i18n="creators_flow_trusted">
                الوسيط الرسمي الموثوق
              </span>
            </div>

            <FlowArrow dir="right" />

            <div className="cr-flow-node">
              <div className="cr-flow-icon cr-flow-orange">
                <i className="fa-solid fa-microphone"></i>
              </div>
              <h3
                className="cr-flow-node-title"
                data-i18n="creators_flow_creators"
              >
                صناع المحتوى
              </h3>
              <p
                className="cr-flow-node-sub"
                data-i18n="creators_flow_creators_sub"
              >
                مبدعو غزة وفلسطين
              </p>
            </div>
          </div>
        </div>

        <div className="cr-steps-divider">
          <span data-i18n="creators_steps_title">خطوات التعاون</span>
        </div>

        <div className="cr-steps-grid">
          {STEPS.map((s) => (
            <div className="cr-step-card" key={s.key}>
              <span className="cr-step-num">{s.num}</span>
              <span data-i18n={s.key}>{s.text}</span>
            </div>
          ))}
        </div>

        <div className="cr-collab-cta">
          <a href="#">
            <span data-i18n="creators_collab_cta">
              تواصل مع صوت ميديا للتعاقد مع صناع المحتوى
            </span>
            <IconArrowUpLeft />
          </a>
        </div>
      </div>
    </section>
  );
}
