/* The enrollment modal's three steps and the options its two dropdowns offer.

   The course page has no API behind it (see course-data.ts — it is all local),
   so these lists are local too. Every label carries the `data-i18n` key the
   DOM translator swaps, exactly as the rest of the site does: the Arabic text
   here is the fallback that ships in the markup. */

export type StepId = 1 | 2 | 3;

export type Step = {
  id: StepId;
  key: string;
  label: string;
};

/** Right to left in the stepper, as the design has them. */
export const STEPS: Step[] = [
  { id: 1, key: "crs_en_step1", label: "المعلومات الشخصية" },
  { id: 2, key: "crs_en_step2", label: "البيانات الأكاديمية والمهنية" },
  { id: 3, key: "crs_en_step3", label: "أهدافك واهتماماتك" },
];

export type Option = {
  value: string;
  key: string;
  label: string;
};

/** "المستوى الدراسي أو المهني" — step 2. */
export const LEVELS: Option[] = [
  { value: "school", key: "crs_en_level_school", label: "طالب مدرسة" },
  { value: "university", key: "crs_en_level_university", label: "طالب جامعي" },
  { value: "graduate", key: "crs_en_level_graduate", label: "خريج" },
  { value: "employed", key: "crs_en_level_employed", label: "موظف" },
  { value: "freelancer", key: "crs_en_level_freelancer", label: "عامل حر" },
  { value: "other", key: "crs_en_level_other", label: "أخرى" },
];

/** "ما هدفك من الالتحاق بالدورة؟" — step 3. */
export const GOALS: Option[] = [
  { value: "skill", key: "crs_en_goal_skill", label: "تعلم مهارة جديدة" },
  { value: "career", key: "crs_en_goal_career", label: "تطوير مساري المهني" },
  { value: "work", key: "crs_en_goal_work", label: "الحصول على فرصة عمل" },
  { value: "project", key: "crs_en_goal_project", label: "إطلاق مشروعي الخاص" },
  { value: "other", key: "crs_en_goal_other", label: "أخرى" },
];

/** The longest "ملاحظات إضافية" the form accepts — the counter under it reads
    "<typed>/<this>", as in the design. */
export const NOTES_MAX = 500;

/** Everything the three steps collect. */
export type EnrollForm = {
  fullname: string;
  dialCode: string;
  phone: string;
  email: string;
  level: string;
  /** "هل سبق لك الالتحاق بدورة مشابهة؟" — "" until one is picked. */
  attendedBefore: "yes" | "no" | "";
  interests: string;
  goal: string;
  notes: string;
};

export const EMPTY_FORM: EnrollForm = {
  fullname: "",
  dialCode: "+970",
  phone: "",
  email: "",
  level: "",
  attendedBefore: "",
  interests: "",
  goal: "",
  notes: "",
};
