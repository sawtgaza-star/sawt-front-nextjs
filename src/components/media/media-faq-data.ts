/* "الأسئلة التي تدور ببالك؟" — the five questions in the design's order; the
   third one is the one shown open. */
export type MediaFaq = { qKey: string; q: string; aKey: string; a: string };

const ANSWER =
  "البرنامج عملي بشكل كامل، حيث ستقوم بتطبيق كل ما تتعلمه عبر مشاريع حقيقية.";

export const MEDIA_FAQS: MediaFaq[] = [
  {
    qKey: "sm_faq_q1",
    q: "هل يمكنني نشر أعمالي بعد التدريب؟",
    aKey: "sm_faq_a",
    a: ANSWER,
  },
  {
    qKey: "sm_faq_q2",
    q: "هل أحتاج خبرة مسبقة للتقديم؟",
    aKey: "sm_faq_a",
    a: ANSWER,
  },
  {
    qKey: "sm_faq_q3",
    q: "هل البرنامج نظري أم عملي؟",
    aKey: "sm_faq_a",
    a: ANSWER,
  },
  {
    qKey: "sm_faq_q4",
    q: "هل يمكنني نشر أعمالي بعد التدريب؟",
    aKey: "sm_faq_a",
    a: ANSWER,
  },
  {
    qKey: "sm_faq_q5",
    q: "هل أحصل على شهادة بعد الانتهاء؟",
    aKey: "sm_faq_a",
    a: ANSWER,
  },
];
