// @ts-nocheck
"use client";
/* eslint-disable */
import { IconArrowUpLeft } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { CreatorsCollaborationContent } from "@/lib/api/creators-page";
import { splitTail, stepNumber } from "./creators-text";

/* "كيف يبدأ التعاون مع صناع محتوى صوت؟" — flow diagram + steps + CTA.

   /creators fills this from the API's `collaboration` block; /creators/{id}
   renders the same section with no payload behind it, so the built-in copy is
   kept as the fallback for that page — and with it the `data-i18n` keys, which
   are only ever attached when the API did NOT supply the text.

   THE STEP TITLES ("ابحث واختر"…) ARE CHROME, not content: `steps` sends a
   number and a body, no title, so the three titles stay in the markup and keep
   their keys even when the bodies come from the payload. A fourth step the
   editor adds therefore shows its number and text with no title. */
const STEPS = [
  {
    num: "01",
    title: "ابحث واختر",
    titleKey: "creators_step_1_title",
    text: "استعرض ملفات صنّاعنا وفلتر حسب التخصص والميزانية والوصول الجماهيري",
    key: "creators_step_1",
  },
  {
    num: "02",
    title: "تواصل وتفاهم",
    titleKey: "creators_step_2_title",
    text: "فريق صوت ميديا يتولى التنسيق الكامل بينك وبين صانع المحتوى — من التفاصيل حتى العقد",
    key: "creators_step_2",
  },
  {
    num: "03",
    title: "أطلق وقس",
    titleKey: "creators_step_3_title",
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

  /* the dir modifier lets the mobile CSS turn the row into a downward column
     (dots small → large) with the arrow head rotated to point down */
  return <div className={`cr-flow-arrow cr-flow-arrow-${dir}`}>{children}</div>;
}

export default function CollaborationSteps({
  data,
  lang = "ar",
}: {
  data?: CreatorsCollaborationContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titlePre, titleHl] = splitTail(title, 3);
  const description = localized(data?.description, lang);

  const diagram = data?.diagram;
  const brandsTitle = localized(diagram?.brands?.title, lang);
  const brandsSub = localized(diagram?.brands?.subtitle, lang);
  const mediaTitle = localized(diagram?.media?.title, lang);
  const mediaSub = localized(diagram?.media?.subtitle, lang);
  const mediaImage =
    diagram?.media?.image_url ||
    "/assets/images/شعار الحاضنة 2 [Vectorized].png";
  const creatorsTitle = localized(diagram?.creators?.title, lang);
  const creatorsSub = localized(diagram?.creators?.subtitle, lang);

  const stepsTitle = localized(data?.steps_title, lang);
  const ctaLabel = localized(data?.cta?.label, lang);

  const apiSteps = Array.isArray(data?.steps) ? data.steps : [];
  const steps = apiSteps.length
    ? apiSteps.map((step, i) => ({
        num: stepNumber(step.number, i),
        title: STEPS[i]?.title,
        titleKey: STEPS[i]?.titleKey,
        text: localized(step.text, lang),
        key: undefined,
      }))
    : STEPS;

  return (
    <section className="cr-collab-section">
      <div className="container position-relative ">


          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-CollaborationSteps-section"
            alt="Olive Branch"
          />

        <div className="cr-section-head">
          {title ? (
            <h2 className="cr-section-title">
              <span>{titlePre}</span>{" "}
              <span className="cr-highlight">{titleHl}</span>
            </h2>
          ) : (
            <h2 className="cr-section-title">
              <span data-i18n="creators_collab_title_pre">
                كيف يبدأ التعاون مع
              </span>{" "}
              <span className="cr-highlight" data-i18n="creators_collab_title_hl">
                صناع محتوى صوت؟
              </span>
            </h2>
          )}
          <p className="cr-section-sub" data-i18n={description ? undefined : "creators_collab_sub"}>
            {description ||
              "وصلنا شركات من حول العالم بصنّاع المحتوى في غزة — صوت ميديا هي الجسر الذي يوصلك"}
          </p>
        </div>

        <div className="cr-flow-outer">
          <div className="cr-flow-panel">
            <div className="cr-flow-node">
              <div className="cr-flow-icon cr-flow-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 28.2002H28M4 9.53353L16 4.2002L28 9.53353M5.33333 9.53353V28.2002M26.6667 9.53353V28.2002M10.6667 14.8669V17.5335M10.6667 20.2002V22.8669M16 14.8669V17.5335M16 20.2002V22.8669M21.3333 14.8669V17.5335M21.3333 20.2002V22.8669" stroke="#EDEFEB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3
                className="cr-flow-node-title"
                data-i18n={brandsTitle ? undefined : "creators_flow_brands"}
              >
                {brandsTitle || "الشركات والعلامات"}
              </h3>
              <p
                className="cr-flow-node-sub"
                data-i18n={brandsSub ? undefined : "creators_flow_brands_sub"}
              >
                {brandsSub || "التجارية حول العالم"}
              </p>
            </div>

            <FlowArrow dir="left" />

            <div className="cr-flow-center">
              <div className="cr-flow-center-circle">
                <img src={mediaImage} alt="" />
                <span data-i18n={mediaTitle ? undefined : "creators_flow_media"}>
                  {mediaTitle || "ميديا صوت"}
                </span>
              </div>
              <span
                className="cr-flow-badge"
                data-i18n={mediaSub ? undefined : "creators_flow_trusted"}
              >
                {mediaSub || "الوسيط الرسمي الموثوق"}
              </span>
            </div>

            <FlowArrow dir="right" />

            <div className="cr-flow-node">
              <div className="cr-flow-icon cr-flow-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M20 6.8667C20 4.65756 18.2091 2.8667 16 2.8667C13.7909 2.8667 12 4.65756 12 6.8667V14.8667C12 17.0758 13.7909 18.8667 16 18.8667C18.2091 18.8667 20 17.0758 20 14.8667V6.8667Z" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66699 13.5337C6.66699 16.009 7.65032 18.383 9.40066 20.1334C11.151 21.8837 13.525 22.867 16.0003 22.867C18.4757 22.867 20.8496 21.8837 22.6 20.1334C24.3503 18.383 25.3337 16.009 25.3337 13.5337M16.0003 25.5337V29.5337M12.0003 29.5337H20.0003" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3
                className="cr-flow-node-title"
                data-i18n={creatorsTitle ? undefined : "creators_flow_creators"}
              >
                {creatorsTitle || "صناع المحتوى"}
              </h3>
              <p
                className="cr-flow-node-sub"
                data-i18n={creatorsSub ? undefined : "creators_flow_creators_sub"}
              >
                {creatorsSub || "مبدعو غزة وفلسطين"}
              </p>
            </div>
          </div>
        </div>

        <div className="cr-steps-divider">
          <span data-i18n={stepsTitle ? undefined : "creators_steps_title"}>
            {stepsTitle || "خطوات التعاون"}
          </span>
        </div>

        <div className="cr-steps-grid">
          {steps.map((s, i) => (
            <div className="cr-step-card" key={s.key || `step-${i}`}>
              <span className="cr-step-num">{s.num}</span>
              {s.title ? (
                <span className="cr-step-title" data-i18n={s.titleKey}>
                  {s.title}
                </span>
              ) : null}
              <span className="cr-step-text" data-i18n={s.key}>
                {s.text}
              </span>
            </div>
          ))}
        </div>

        <div className="cr-collab-cta">
          <a href="/media">
            <span>
            {ctaLabel || "تواصل مع فريق صوت للانضمام"}
            </span>
            <IconArrowUpLeft />
          </a>
        </div>
      </div>
    </section>
  );
}
