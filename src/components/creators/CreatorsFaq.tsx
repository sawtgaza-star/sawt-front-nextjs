"use client";
import { useState } from "react";


type Faq = { q: string; qKey: string; a: string; aKey: string };

const FAQS: Faq[] = [
  {
    q: "كيف يمكنني الانضمام كصانع محتوى؟",
    qKey: "creators_faq_q1",
    a: "سجّل حسابك عبر زر «طلب الانضمام»، أكمل ملفك التعريفي وأضف نماذج من أعمالك، وسيتواصل معك فريق صوت لإتمام التفعيل.",
    aKey: "creators_faq_a1",
  },
  {
    q: "هل الدفع مضمون للإعلانات التعاونية؟",
    qKey: "creators_faq_q2",
    a: "عملية الدفع بسيطة جداً — احجز المبلغ وطريقة الدفع (بطاقة ائتمانية، PayPal، أو تحويل بنكي) واضغط «توزيع الآن». لن تأخذ أكثر من دقيقتين، ويصلك تأكيد فوري على بريدك الإلكتروني.",
    aKey: "creators_faq_a2",
  },
  {
    q: "كيف تختار الشركات صانع المحتوى المناسب؟",
    qKey: "creators_faq_q3",
    a: "تستعرض الشركات ملفات الصنّاع وتفلتر حسب التخصص والجمهور والميزانية، ويتولى فريق صوت ميديا الترشيح والتنسيق لضمان أفضل تطابق.",
    aKey: "creators_faq_a3",
  },
  {
    q: "هل يمكنني الانضمام من أي بلد؟",
    qKey: "creators_faq_q4",
    a: "نعم، الانضمام متاح لصنّاع المحتوى من فلسطين والعالم العربي، مع أولوية لإبراز أصوات غزة.",
    aKey: "creators_faq_a4",
  },
  {
    q: "هل هناك رسوم للانضمام إلى المنصة؟",
    qKey: "creators_faq_q5",
    a: "الانضمام مجاني بالكامل، وتحصل صوت على نسبة رمزية فقط عند إتمام تعاون إعلاني ناجح.",
    aKey: "creators_faq_a5",
  },
];

export default function CreatorsFaq() {
  // payment question (index 1) is expanded by default; the featured bar (index 0) starts collapsed
  const [open, setOpen] = useState<number>(1);

  const renderItem = (f: Faq, i: number) => {
    const isOpen = open === i;
    return (
      <div
        className={"cr-faq-item" + (isOpen ? " cr-faq-open" : "")}
        key={f.qKey}
      >
        <button
          type="button"
          className="cr-faq-q"
          aria-expanded={isOpen}
          onClick={() => setOpen(isOpen ? -1 : i)}
        >
          <span data-i18n={f.qKey}>{f.q}</span>
          <i className="fa-solid fa-chevron-down cr-faq-chevron"></i>
        </button>
        {isOpen && (
          <div className="cr-faq-a" data-i18n={f.aKey}>
            {f.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="cr-faq-section">
      <img
        src="/assets/images/leaf_cutout.png"
        className="cr-leaf cr-leaf-tl"
        alt=""
      />
      
      <div className="cr-faq-featured">{renderItem(FAQS[0], 0)}</div>
      <div className="container">
        {/* First question — full-width featured bar above the section title */}
        

        <div className="cr-section-head cr-section-head-qs">
          <h2 className="cr-section-title">
            <span data-i18n="creators_faq_title_pre">الأسئلة التي</span>{" "}
            <span  data-i18n="creators_faq_title_hl">
              تدور ببالك؟
            </span>{" "}
            <span className="cr-title-orange" data-i18n="creators_faq_title_post">
              إليك ردودها
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="creators_faq_sub">
            كل ما تحتاج معرفته قبل أن تبدأ رحلتك مع صوت
          </p>
        </div>

        <div className="cr-faq-row">
          <div className="cr-faq-col">
            {FAQS.slice(1).map((f, idx) => renderItem(f, idx + 1))}
          </div>

          <div className="cr-faq-visual">
            <div className="cr-faq-visual-wrap">
              <img src="/assets/images/Frame 1984080629.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
