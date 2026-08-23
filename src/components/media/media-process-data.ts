/* "رحلتنا معك" — the six steps in the design's order (first = rightmost).
   Odd steps hang above the timeline with an orange node, even steps below
   with an olive one; media.css derives both from the index. */
export type MediaStep = {
  key: string;
  num: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
};

export const MEDIA_PROCESS: MediaStep[] = [
  {
    key: "request",
    num: "01",
    title: "طلب الخدمة",
    titleKey: "sm_step_request_title",
    desc: "تتواصل معنا وتخبرنا عن فكرتك. نرد في أقل من 24 ساعة.",
    descKey: "sm_step_request_desc",
  },
  {
    key: "discovery",
    num: "02",
    title: "دراسة الاحتياج",
    titleKey: "sm_step_discovery_title",
    desc: "نحلل متطلباتك ونفهم جمهورك وأهدافك بعمق.",
    descKey: "sm_step_discovery_desc",
  },
  {
    key: "plan",
    num: "03",
    title: "إعداد الخطة",
    titleKey: "sm_step_plan_title",
    desc: "نضع خطة عمل واضحة بجدول زمني وميزانية محددة.",
    descKey: "sm_step_plan_desc",
  },
  {
    key: "produce",
    num: "04",
    title: "التنفيذ والإنتاج",
    titleKey: "sm_step_produce_title",
    desc: "ينفّذ الفريق المشروع بمعايير احترافية ومتابعة مستمرة.",
    descKey: "sm_step_produce_desc",
  },
  {
    key: "review",
    num: "05",
    title: "المراجعة والتسليم",
    titleKey: "sm_step_review_title",
    desc: "نراجع العمل معك ونعدّله حتى يصل إلى الصورة التي تريدها.",
    descKey: "sm_step_review_desc",
  },
  {
    key: "followup",
    num: "06",
    title: "المتابعة بعد التسليم",
    titleKey: "sm_step_followup_title",
    desc: "نبقى معك بعد التسليم لقياس الأثر ودعم ما يحتاج تطويرًا.",
    descKey: "sm_step_followup_desc",
  },
];
