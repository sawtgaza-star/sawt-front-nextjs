/* Course detail page (/courses/[id]) — static data for every course reachable
   from the incubator's "دوراتنا الأكثر شهرة" cards, keyed by the route id.
   "digital-content-maker" is the original mock course; the other three match
   the incubator card keys. Swap for real data when a backend exists. */

export type CourseMetaRow = {
  key: string;
  label: string;
  labelKey: string;
  value: string;
  valueKey?: string;
};

export type Course = {
  /* breadcrumb + hero */
  category: string;
  categoryKey: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  /* registration card — the countdown runs to registrationEndsAt */
  registrationEndsAt: string;
  meta: CourseMetaRow[];
};

/* The register card shows the same five labelled rows for every course —
   only the values differ. Dates and counts stay keyless (numbers need no
   translation); only the duration wording gets an i18n key. */
function metaRows(
  duration: { value: string; valueKey: string },
  regEnd: string,
  start: string,
  modules: string,
  seats: string
): CourseMetaRow[] {
  return [
    { key: "duration", label: "المدة:", labelKey: "crs_meta_duration", ...duration },
    { key: "regEnd", label: "تاريخ انتهاء التسجيل:", labelKey: "crs_meta_reg_end", value: regEnd },
    { key: "start", label: "تاريخ البدء:", labelKey: "crs_meta_start", value: start },
    { key: "modules", label: "عدد المحاور:", labelKey: "crs_meta_modules", value: modules },
    { key: "seats", label: "عدد المقاعد:", labelKey: "crs_meta_seats", value: seats },
  ];
}

export const COURSES: Record<string, Course> = {
  "digital-content-maker": {
    category: "محتوى رقمي",
    categoryKey: "crs_badge",
    title: "صانع المحتوى الرقمي",
    titleKey: "crs_title",
    desc: "برنامج تدريبي احترافي يجمع بين المعرفة النظرية والتطبيق العملي، يؤهلك لإنتاج محتوى رقمي هادف ومؤثر من الفكرة الأولى وحتى النشر، عبر تجربة حية بإشراف متخصصين، ومشروع نهائي يعكس مهاراتك وهويتك.",
    descKey: "crs_hero_desc",
    registrationEndsAt: "2026-09-09T23:59:59",
    meta: metaRows(
      { value: "4 أسابيع", valueKey: "crs_meta_duration_value" },
      "9/9/2026",
      "28/9/2026",
      "5",
      "20"
    ),
  },

  "graphic-design": {
    category: "التصميم",
    categoryKey: "inc_course_cat_design",
    title: "تصميم الجرافيك",
    titleKey: "inc_course_graphic_title",
    desc: "برنامج تدريبي عملي في تصميم الجرافيك، تتعلم فيه أساسيات التصميم ونظرية الألوان والعمل على أشهر برامج التصميم، وصولًا إلى بناء هوية بصرية متكاملة ومعرض أعمال يفتح لك أبواب سوق العمل.",
    descKey: "crs_gd_hero_desc",
    registrationEndsAt: "2026-08-30T23:59:59",
    meta: metaRows(
      { value: "4 أسابيع", valueKey: "crs_meta_duration_value" },
      "30/8/2026",
      "7/9/2026",
      "7",
      "25"
    ),
  },

  "data-analysis": {
    category: "البيانات",
    categoryKey: "crs_da_badge",
    title: "تحليل البيانات",
    titleKey: "inc_course_data_title",
    desc: "برنامج تدريبي شامل في تحليل البيانات، يأخذك من أساسيات التعامل مع البيانات وتنظيفها إلى بناء لوحات معلومات تفاعلية وقراءة الأرقام بثقة، لتحويل البيانات إلى قرارات وقصص مؤثرة.",
    descKey: "crs_da_hero_desc",
    registrationEndsAt: "2026-09-15T23:59:59",
    meta: metaRows(
      { value: "3 أسابيع", valueKey: "crs_da_meta_duration_value" },
      "15/9/2026",
      "22/9/2026",
      "7",
      "20"
    ),
  },

  "digital-marketing": {
    category: "التسويق",
    categoryKey: "inc_course_cat_marketing",
    title: "تسويق المحتوى الرقمي",
    titleKey: "inc_course_marketing_title",
    desc: "برنامج تدريبي متكامل في تسويق المحتوى الرقمي، تتعلم فيه بناء استراتيجية محتوى فعالة وإدارة منصات التواصل وإطلاق الحملات الممولة وقياس نتائجها، لتصل بمحتواك إلى الجمهور الصحيح.",
    descKey: "crs_dm_hero_desc",
    registrationEndsAt: "2026-10-01T23:59:59",
    meta: metaRows(
      { value: "5 أسابيع", valueKey: "crs_dm_meta_duration_value" },
      "1/10/2026",
      "12/10/2026",
      "7",
      "30"
    ),
  },
};
