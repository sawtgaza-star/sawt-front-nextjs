/* "اختر باقتك" — the three bundles, right-to-left as in the design. `tone`
   drives the card's tab colour, border and accent (orange / olive / gray). */
export type MediaPackage = {
  key: string;
  tone: "orange" | "olive" | "gray";
  title: string;
  titleKey: string;
  tagline: string;
  taglineKey: string;
  desc: string;
  descKey: string;
  features: { key: string; name: string; noteKey: string; note: string }[];
};

export const MEDIA_PACKAGES: MediaPackage[] = [
  {
    key: "social",
    tone: "orange",
    title: "باقة السوشيل ميديا",
    titleKey: "sm_pkg_social_title",
    tagline: "حضور رقمي احترافي ومتكامل",
    taglineKey: "sm_pkg_social_tagline",
    desc: "كل ما تحتاجه لبناء حضور قوي على منصات التواصل الاجتماعي من تصميم ومحتوى وإدارة.",
    descKey: "sm_pkg_social_desc",
    features: [
      { key: "social_1", name: "تصاميم سوشيل ميديا", noteKey: "sm_pkg_note_daily", note: "تصاميم يومية لجميع المنصات" },
      { key: "social_2", name: "إدارة الحسابات", noteKey: "sm_pkg_note_publish", note: "نشر ومتابعة وتفاعل يومي" },
      { key: "social_3", name: "خطة تسويقية شهرية", noteKey: "sm_pkg_note_growth", note: "استراتيجية مدروسة للنمو" },
      { key: "social_4", name: "إنتاج محتوى مكتوب", noteKey: "sm_pkg_note_copy", note: "كتابة كابشنات وقصص هادفة" },
      { key: "social_5", name: "ريلز وفيديوهات قصيرة", noteKey: "sm_pkg_note_reels", note: "محتوى مرئي سريع الوصول" },
    ],
  },
  {
    key: "websites",
    tone: "olive",
    title: "باقة المواقع الإلكترونية",
    titleKey: "sm_pkg_web_title",
    tagline: "حضور رقمي احترافي ومتكامل",
    taglineKey: "sm_pkg_social_tagline",
    desc: "تصميم وبرمجة مواقع إلكترونية احترافية من الصفر حتى الإطلاق.",
    descKey: "sm_pkg_web_desc",
    features: [
      { key: "web_1", name: "تصميم UI/UX", noteKey: "sm_pkg_note_daily", note: "تصاميم يومية لجميع المنصات" },
      { key: "web_2", name: "برمجة الواجهة الأمامية", noteKey: "sm_pkg_note_publish", note: "نشر ومتابعة وتفاعل يومي" },
      { key: "web_3", name: "برمجة الخادم", noteKey: "sm_pkg_note_growth", note: "استراتيجية مدروسة للنمو" },
      { key: "web_4", name: "تحسين SEO", noteKey: "sm_pkg_note_copy", note: "كتابة كابشنات وقصص هادفة" },
      { key: "web_5", name: "دعم ما بعد الإطلاق", noteKey: "sm_pkg_note_support", note: "صيانة ودعم فني مستمر" },
    ],
  },
  {
    key: "marketing",
    tone: "gray",
    title: "باقة التسويق الرقمي",
    titleKey: "sm_pkg_mkt_title",
    tagline: "تعزيز الظهور الرقمي وزيادة المبيعات",
    taglineKey: "sm_pkg_mkt_tagline",
    desc: "استراتيجيات تسويقية مبتكرة تشمل الإعلانات المدفوعة والتسويق عبر البريد الإلكتروني.",
    descKey: "sm_pkg_mkt_desc",
    features: [
      { key: "mkt_1", name: "تحليل البيانات", noteKey: "sm_pkg_note_daily", note: "تصاميم يومية لجميع المنصات" },
      { key: "mkt_2", name: "إدارة الحملات الإعلانية", noteKey: "sm_pkg_note_publish", note: "نشر ومتابعة وتفاعل يومي" },
      { key: "mkt_3", name: "تحليل أداء الحملة", noteKey: "sm_pkg_note_growth", note: "استراتيجية مدروسة للنمو" },
      { key: "mkt_4", name: "إنتاج محتوى ترويجي", noteKey: "sm_pkg_note_copy", note: "كتابة كابشنات وقصص هادفة" },
      { key: "mkt_5", name: "تقارير شهرية للأداء", noteKey: "sm_pkg_note_support", note: "صيانة ودعم فني مستمر" },
    ],
  },
];
