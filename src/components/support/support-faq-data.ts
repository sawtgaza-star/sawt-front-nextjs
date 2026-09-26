/* "الأسئلة المتكررة" — support page FAQ. */

import { localized } from "@/lib/api/pages";
import type { SupportFaqContent } from "@/lib/api/support";

export type SupportFaq = {
  q: string;
  /** Only the built-in copy carries i18n keys. */
  qKey?: string;
  a: string;
  aKey?: string;
};

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: "كيف يمكنني التبرع؟",
    qKey: "support_faq_q1",
    a: "اختر نوع الدعم (لمرة واحدة، شهري أو سنوي)، ثم حدد المبلغ أو أدخل مبلغا خاصا بك، واضغط زر التبرع لإتمام العملية.",
    aKey: "support_faq_a1",
  },
  {
    q: "هل التبرع آمن؟",
    qKey: "support_faq_q2",
    a: "عملية التبرع بسيطة جدا — اختر المبلغ وطريقة الدفع (بطاقة ائتمانية، PayPal، أو تحويل بنكي) واضغط «تبرع الآن». لن تأخذ أكثر من دقيقتين، ويصلك تأكيد فوري على بريدك الإلكتروني.",
    aKey: "support_faq_a2",
  },
  {
    q: "هل يمكنني التبرع لمرة واحدة؟",
    qKey: "support_faq_q3",
    a: "نعم، اختر تبويب «لمرة واحدة» وسيتم خصم المبلغ مرة واحدة فقط دون أي التزام أو تجديد تلقائي.",
    aKey: "support_faq_a3",
  },
  {
    q: "كيف يتم استخدام التبرعات؟",
    qKey: "support_faq_q4",
    a: "توزع التبرعات على ثلاثة محاور: تمكين المبدعين 40%، التوثيق والإعلام 35%، والدعم النفسي والتعليمي 25% — وننشر تقريرا شهريا بالتفاصيل.",
    aKey: "support_faq_a4",
  },
  {
    q: "هل يمكنني إلغاء الاشتراك الشهري؟",
    qKey: "support_faq_q5",
    a: "يمكنك إيقاف الدعم الشهري في أي وقت من صفحة حسابك أو بمراسلتنا على البريد الإلكتروني، ويسري الإلغاء فورا.",
    aKey: "support_faq_a5",
  },
];

/* GET /pages/support's `faq.items`, resolved for one language; the built-in
   five stand in when the API sent none. */
export function resolveSupportFaqs(
  items: SupportFaqContent["items"],
  lang: string,
): SupportFaq[] {
  const resolved = (items || [])
    .map((item) => ({ q: localized(item.question, lang), a: localized(item.answer, lang) }))
    .filter((f) => f.q);
  return resolved.length ? resolved : SUPPORT_FAQS;
}
