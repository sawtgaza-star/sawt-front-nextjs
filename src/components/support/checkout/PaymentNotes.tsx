import { IconInfoCircle } from "@/components/ui/icons";

/* "ملاحظات مهمة" — the orange panel under the platform picker. Presentational
   (no "use client"), but it is client-bundled through PaymentPlatforms, which
   feeds it the currently selected brand name.
   The brand name is its own text node so initTranslate() (which replaces the
   textContent of [data-i18n] elements) never overwrites it. */
export default function PaymentNotes({ platform }: { platform: string }) {
  return (
    <aside className="sp-notes">
      <h3 className="sp-notes-title">
        <span className="sp-notes-icon" aria-hidden="true">
          <IconInfoCircle />
        </span>
        <span data-i18n="checkout_notes_title">ملاحظات مهمة:</span>
      </h3>

      <ol className="sp-notes-list">
        <li>
          <span data-i18n="checkout_note_platform_pre">لقد اخترت منصة</span>{" "}
          {platform}{" "}
          <span data-i18n="checkout_note_platform_post">
            للدفع، وهي وسيلة دفع إلكترونية موثوقة وآمنة لإيصال مساهمتك إلينا
            بسهولة وسرعة.
          </span>
        </li>
        <li data-i18n="checkout_note_no_extra_info">
          لا يلزم إدخال أي معلومات غير مطلوبة داخل المنصة سوى بيانات الدفع
          الأساسية.
        </li>
        <li data-i18n="checkout_note_redirect">
          في الخطوة التالية سيتم تحويلك مباشرة إلى صفحة الدفع لإتمام العملية.
        </li>
      </ol>

      <p className="sp-notes-foot" data-i18n="checkout_notes_attach">
        المرجو إرفاق هذه الفاتورة في المرفقات بالخطوة التالية.
      </p>
    </aside>
  );
}
