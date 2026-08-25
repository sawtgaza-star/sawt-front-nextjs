import { MEDIA_PHOTOS } from "./media-photos";
import { ALL_WORKS, WORK_FILTERS, type MediaPageWork } from "./media-works-page-data";

/* Data behind /media/works/[slug] — the project details page the arrow on every
   works card opens. The listing already carries each project's identity (photo,
   tag, date, title, section, specialty), so this file only adds the case-study
   body the design lays out: the intro stats, the about/challenges/solutions
   block, the results, the gallery, the stages and the client's verdict.

   The mockups show the same placeholder case study for every project ("اسم
   المشروع"), so the body below is shared and each project is rendered with its
   own identity around it — a per-project override drops into PROJECT_DETAILS
   the day real copy exists. */

/* `value` is the digits themselves — they carry no i18n key because they read
   the same in both languages and are the text the scroll count-up writes into */
export type ProjectStat = { key: string; value: string; label: string; labelKey: string };
export type ProjectPoint = { key: string; text: string };
export type ProjectStage = {
  key: string;
  step: string;
  title: string;
  titleKey: string;
  text: string;
  textKey: string;
};
export type ProjectBar = { key: string; label: string; labelKey: string; pct: number };

export type ProjectDetail = {
  desc: string;
  descKey: string;
  /* the two figures in the card under the intro copy */
  stats: ProjectStat[];
  about: string;
  aboutKey: string;
  challenges: ProjectPoint[];
  solutions: ProjectPoint[];
  results: ProjectStat[];
  gallery: string[];
  stages: ProjectStage[];
  review: {
    rating: number;
    quote: string;
    quoteKey: string;
    name: string;
    nameKey: string;
    meta: string;
    metaKey: string;
    photo: string;
    bars: ProjectBar[];
  };
};

/* the placeholder portrait the testimonials slider already uses */
const REVIEW_PHOTO = "/assets/images/Image (أحمد المنصور).png";

const SHARED_DETAIL: ProjectDetail = {
  desc: "بناء هوية متكاملة لمؤسسة الشباب، تعكس طموح الجيل الجديد وقيم العمل المؤسسي الاحترافي.",
  descKey: "sm_pj_desc",
  stats: [
    {
      key: "engagement",
      value: "+60%",
      label: "زيادة في التفاعل على المنصات",
      labelKey: "sm_pj_stat_label",
    },
    {
      key: "reach",
      value: "+590 M",
      label: "زيادة في التفاعل على المنصات",
      labelKey: "sm_pj_stat_label",
    },
  ],
  about:
    "عملنا على تطوير هوية بصرية شاملة تضمنت تصميم الشعار ودليل الهوية الكامل وقوالب التواصل الاجتماعي والمطبوعات الرسمية. كان الهدف إيجاد هوية تجمع بين الاحترافية والحيوية لتناسب جمهور الشباب.",
  aboutKey: "sm_pj_about_text",
  challenges: [
    { key: "sm_pj_ch1", text: "إيجاد توازن بين الطابع المؤسسي الرسمي والروح" },
    { key: "sm_pj_ch2", text: "الشبابية النابضة مع ضمان قابلية تطبيق الهوية على جميع الوسائط." },
  ],
  solutions: [
    { key: "sm_pj_so1", text: "اعتمدنا على نظام ألوان ثنائي المزاج يجمع الرسوخ والحيوية" },
    { key: "sm_pj_so2", text: "مع خط عربي عصري يحمل الجرأة والوضوح في آنٍ معاً." },
  ],
  results: [
    {
      key: "episodes",
      value: "+45",
      label: "حلقة منتجة",
      labelKey: "sm_pj_res1_label",
    },
    {
      key: "reach",
      value: "+5m",
      label: "زيادة في التفاعل على المنصات",
      labelKey: "sm_pj_stat_label",
    },
    {
      key: "engagement",
      value: "+30%",
      label: "زيادة التفاعل",
      labelKey: "sm_pj_res3_label",
    },
  ],
  /* the design repeats one still across the five frames — two rows of two and
     a wide one closing the block */
  gallery: [
    MEDIA_PHOTOS.desk,
    MEDIA_PHOTOS.desk,
    MEDIA_PHOTOS.desk,
    MEDIA_PHOTOS.desk,
    MEDIA_PHOTOS.desk,
  ],
  stages: [
    {
      key: "discover",
      step: "01",
      title: "الاستكشاف والبحث",
      titleKey: "sm_pj_stage1_title",
      text: "جلسات عمل مع فريق العميل لفهم الجمهور والسوق، ومراجعة المواد الحالية وتحليل المنافسين.",
      textKey: "sm_pj_stage1_text",
    },
    {
      key: "strategy",
      step: "02",
      title: "الاستراتيجية والتوجه البصري",
      titleKey: "sm_pj_stage2_title",
      text: "صياغة رسالة العلامة وتحديد مزاجها البصري عبر لوحات إلهام تُعتمد قبل بدء التنفيذ.",
      textKey: "sm_pj_stage2_text",
    },
    {
      key: "produce",
      step: "03",
      title: "التنفيذ والإنتاج",
      titleKey: "sm_pj_stage3_title",
      text: "تصميم الشعار ونظام الألوان والخطوط والقوالب، مع دورات مراجعة قصيرة على كل مخرج.",
      textKey: "sm_pj_stage3_text",
    },
    {
      key: "launch",
      step: "04",
      title: "الإطلاق والقياس",
      titleKey: "sm_pj_stage4_title",
      text: "تسليم دليل الهوية وملفات المصدر، ومتابعة أداء الحملة على المنصات خلال الشهر الأول.",
      textKey: "sm_pj_stage4_text",
    },
  ],
  review: {
    rating: 4,
    quote:
      "التوجيه الذي تلقيته من المرشدين كان له تأثير كبير على مسيرتي. نصائحهم القيّمة ساعدتني في اتخاذ قرارات مدروسة في مشاريعي.",
    quoteKey: "sm_testi_quote",
    name: "سارة القحطاني",
    nameKey: "sm_testi_sara_name",
    meta: "محاماة — تقنية",
    metaKey: "sm_pj_review_meta",
    photo: REVIEW_PHOTO,
    bars: [
      { key: "satisfaction", label: "رضا العميل", labelKey: "sm_pj_bar_satisfaction", pct: 96 },
      { key: "delivery", label: "جودة التسليم", labelKey: "sm_pj_bar_delivery", pct: 98 },
    ],
  },
};

/* per-project overrides go here; anything missing falls back to SHARED_DETAIL */
const PROJECT_DETAILS: Record<string, Partial<ProjectDetail>> = {};

export type MediaProject = MediaPageWork &
  ProjectDetail & {
    /* breadcrumb middle link + the label beside the project's name */
    sectionLabel: string;
    sectionLabelKey: string;
    specialtyLabel: string;
    specialtyLabelKey: string;
  };

const labelOf = (facet: "section" | "specialty", id: string) => {
  const group = WORK_FILTERS.find((g) => g.facet === facet);
  return group?.options.find((o) => o.id === id);
};

export const PROJECT_SLUGS = ALL_WORKS.map((w) => w.key);

export function getProject(slug: string): MediaProject | null {
  const work = ALL_WORKS.find((w) => w.key === slug);
  if (!work) return null;

  const section = labelOf("section", work.section);
  const specialty = labelOf("specialty", work.specialty);

  return {
    ...work,
    ...SHARED_DETAIL,
    ...PROJECT_DETAILS[slug],
    sectionLabel: section?.label ?? "",
    sectionLabelKey: section?.labelKey ?? "",
    specialtyLabel: specialty?.label ?? "",
    specialtyLabelKey: specialty?.labelKey ?? "",
  };
}
