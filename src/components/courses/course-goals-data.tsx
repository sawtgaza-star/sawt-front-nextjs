import type { ReactNode } from "react";
import {
  IconGoalUsers,
  IconGoalStoryDoc,
  IconGoalMediaCam,
  IconGoalShieldCheck,
  IconGoalNotes,
  IconGoalGrid,
} from "@/components/ui/icons";

/* "أهداف البرنامج" — 2×3 card grid per course, keyed by the /courses/[id]
   route id. Order is the mock's reading order: row 1 right→left, then row 2
   right→left. Every course reuses the mock's six icons in the same order. */

export type CourseGoal = {
  key: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  icon: ReactNode;
};

const GOAL_ICONS: ReactNode[] = [
  <IconGoalUsers key="users" />,
  <IconGoalStoryDoc key="story" />,
  <IconGoalMediaCam key="cam" />,
  <IconGoalShieldCheck key="shield" />,
  <IconGoalNotes key="notes" />,
  <IconGoalGrid key="grid" />,
];

/* rows: [key, title, desc] — i18n keys derive from the stem + goal key. */
function goals(stem: string, rows: [string, string, string][]): CourseGoal[] {
  return rows.map(([key, title, desc], i) => ({
    key,
    title,
    titleKey: `${stem}_${key}_title`,
    desc,
    descKey: `${stem}_${key}_desc`,
    icon: GOAL_ICONS[i],
  }));
}

export const COURSE_GOALS: Record<string, CourseGoal[]> = {
  "digital-content-maker": goals("crs_goal", [
    ["basics", "أساسيات صناعة المحتوى", "تمكين المشاركين من أساسيات صناعة المحتوى الرقمي."],
    ["storytelling", "الإبداع والسرد القصصي", "تطوير مهارات التفكير الإبداعي والسرد القصصي."],
    ["production", "مهارات الإنتاج الإعلامي", "إتقان كتابة السكربت والتصوير والمونتاج."],
    ["identity", "بناء الهوية الرقمية", "بناء هوية رقمية احترافية ومستدامة."],
    ["professional", "إنتاج محتوى احترافي", "تأهيل المشاركين لإنتاج محتوى هادف وقابل للنشر."],
    ["projects", "مشاريع إعلامية مؤثرة", "تحويل الأفكار إلى مشاريع إعلامية ذات أثر."],
  ]),

  "graphic-design": goals("crs_gd_goal", [
    ["basics", "أساسيات التصميم", "تمكين المشاركين من أساسيات التصميم ونظرية الألوان."],
    ["tools", "إتقان أدوات التصميم", "احتراف برامج التصميم الأساسية مثل فوتوشوب وإليستريتور."],
    ["typography", "التايبوغرافي والخط العربي", "توظيف الخطوط العربية واللاتينية بشكل احترافي."],
    ["identity", "بناء الهوية البصرية", "تصميم هويات بصرية متكاملة للعلامات التجارية."],
    ["social", "تصميم محتوى السوشيال ميديا", "إنتاج تصاميم جذابة لمنصات التواصل الاجتماعي."],
    ["portfolio", "معرض أعمال احترافي", "بناء معرض أعمال يؤهلك لسوق العمل."],
  ]),

  "data-analysis": goals("crs_da_goal", [
    ["basics", "أساسيات تحليل البيانات", "تمكين المشاركين من أساسيات جمع البيانات وتنظيفها."],
    ["stats", "التحليل الإحصائي", "فهم المؤشرات الإحصائية واستخلاص النتائج بدقة."],
    ["tools", "أدوات التحليل الحديثة", "احتراف أدوات مثل Excel وSQL وPower BI."],
    ["dashboards", "لوحات معلومات تفاعلية", "بناء لوحات معلومات ترصد الأداء لحظة بلحظة."],
    ["storytelling", "سرد البيانات", "تحويل الأرقام إلى قصص مقنعة تدعم القرار."],
    ["projects", "مشاريع تحليلية واقعية", "تطبيق المهارات على بيانات حقيقية من سوق العمل."],
  ]),

  "digital-marketing": goals("crs_dm_goal", [
    ["basics", "أساسيات التسويق الرقمي", "تمكين المشاركين من أساسيات التسويق الرقمي الحديث."],
    ["strategy", "استراتيجية المحتوى", "بناء استراتيجية محتوى فعالة تحقق أهداف العلامة."],
    ["social", "إدارة منصات التواصل", "إدارة الحسابات وصناعة محتوى يزيد التفاعل."],
    ["ads", "الحملات الممولة", "إطلاق حملات إعلانية ممولة وإدارتها باحتراف."],
    ["seo", "تحسين محركات البحث", "تصدر نتائج البحث وزيادة الزيارات المجانية."],
    ["analytics", "قياس الأداء والتحليل", "قراءة مؤشرات الأداء وتحسين النتائج باستمرار."],
  ]),
};
