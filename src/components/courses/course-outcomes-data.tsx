import type { ReactNode } from "react";
import { IconOutcomeDoc, IconOutcomeDocCheck } from "@/components/ui/icons";

/* "مخرجات البرنامج" — the قبل/بعد البرنامج card pair per course, keyed by the
   /courses/[id] route id. Card order is the mock's reading order: "قبل" first
   (right in RTL, gray theme), then "بعد" (left, olive theme). */

export type CourseOutcome = {
  key: string;
  theme: "gray" | "olive";
  icon: ReactNode;
  title: string;
  titleKey: string;
  items: string[];
  itemStem: string;
};

/* i18n item keys derive from the stem: `${stem}_before_i1`, `${stem}_after_i1`… */
function cards(stem: string, before: string[], after: string[]): CourseOutcome[] {
  return [
    {
      key: "before",
      theme: "gray",
      icon: <IconOutcomeDoc />,
      title: "قبل البرنامج",
      titleKey: "crs_outcome_before_title",
      items: before,
      itemStem: `${stem}_before_i`,
    },
    {
      key: "after",
      theme: "olive",
      icon: <IconOutcomeDocCheck />,
      title: "بعد البرنامج",
      titleKey: "crs_outcome_after_title",
      items: after,
      itemStem: `${stem}_after_i`,
    },
  ];
}

export const COURSE_OUTCOMES: Record<string, CourseOutcome[]> = {
  "digital-content-maker": cards(
    "crs_outcome",
    [
      "لديك أفكار لكن لا تعرف كيف تبدأ.",
      "لا تمتلك خبرة في كتابة السكريت.",
      "تواجه صعوبة في التصوير والمونتاج.",
      "لا تعرف كيف تبني هويتك الرقمية.",
    ],
    [
      "تمتلك فيديو احترافياً من إنتاجك.",
      "تستطيع كتابة سكريت متكامل.",
      "تتقن التصوير والإخراج بالموبايل.",
      "تمتلك ملف أعمال (portfolio).",
      "تعرف كيف تنشر محتوى يصل إلى الجمهور.",
    ]
  ),

  "graphic-design": cards(
    "crs_gd_outcome",
    [
      "لديك شغف بالتصميم لكن لا تعرف من أين تبدأ.",
      "لا تمتلك خبرة في برامج التصميم.",
      "تواجه صعوبة في اختيار الألوان والخطوط.",
      "لا تعرف كيف تبني هوية بصرية متكاملة.",
    ],
    [
      "تمتلك تصاميم احترافية من إنتاجك.",
      "تحترف برامج التصميم الأساسية.",
      "تتقن بناء الهويات البصرية للعلامات.",
      "تمتلك ملف أعمال (portfolio).",
      "تعرف كيف تصمم محتوى يجذب الجمهور.",
    ]
  ),

  "data-analysis": cards(
    "crs_da_outcome",
    [
      "لديك اهتمام بالبيانات لكن لا تعرف كيف تبدأ.",
      "لا تمتلك خبرة في أدوات التحليل.",
      "تواجه صعوبة في قراءة الأرقام والمؤشرات.",
      "لا تعرف كيف تحول البيانات إلى قرارات.",
    ],
    [
      "تمتلك مشروع تحليل بيانات من إنتاجك.",
      "تحترف أدوات مثل Excel وSQL وPower BI.",
      "تتقن بناء لوحات معلومات تفاعلية.",
      "تمتلك ملف أعمال (portfolio).",
      "تعرف كيف تحول الأرقام إلى قصص مقنعة.",
    ]
  ),

  "digital-marketing": cards(
    "crs_dm_outcome",
    [
      "لديك حساب لكن لا تعرف كيف تنمّيه.",
      "لا تمتلك خبرة في بناء استراتيجية محتوى.",
      "تواجه صعوبة في إدارة الحملات الممولة.",
      "لا تعرف كيف تقيس نتائج التسويق.",
    ],
    [
      "تمتلك خطة تسويقية متكاملة من إعدادك.",
      "تستطيع إدارة منصات التواصل باحتراف.",
      "تتقن إطلاق الحملات الممولة وإدارتها.",
      "تمتلك ملف أعمال (portfolio).",
      "تعرف كيف تقرأ المؤشرات وتحسّن النتائج.",
    ]
  ),
};
