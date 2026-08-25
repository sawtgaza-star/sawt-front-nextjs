import { IconCloudUpload, IconInfoCircle } from "@/components/ui/icons";
import { FILE_ACCEPT, NOTE_MAX } from "./funding-form-data";

/* Step 3 — "تفاصيل إضافية ومرفقات": the terms the sponsor wants to propose,
   the company-profile drop zone, and any last notes. Unlike the creator flow
   this step has no join-terms tick — the mock ends at the note panel, so
   "تسليم الطلب" submits straight away. */
export type ExtrasFields = {
  terms: string;
  notes: string;
  file: File | null;
  fileError: "type" | "size" | null;
};

export default function ExtrasStep({
  values,
  onChange,
  onFile,
}: {
  values: ExtrasFields;
  onChange: (patch: Partial<ExtrasFields>) => void;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-fu-terms">
          <span data-i18n="collab_fu_f_terms">
            هل يوجد شروط أو مقترحات محددة للتعاون؟
          </span>
        </label>
        <textarea
          id="collab-fu-terms"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="نوع الظهور المطلوب، شراكة إعلامية حصرية.."
          data-i18n-placeholder="collab_fu_f_terms_ph"
          value={values.terms}
          onChange={(e) => onChange({ terms: e.target.value })}
        />
        {/* the mock prints the cap first, then what has been typed */}
        <p className="cl-counter">
          {NOTE_MAX}/{values.terms.length}
        </p>
      </div>

      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_fu_f_file">
          إضافة ملف تعريفي أو عرض تفصيلي
        </span>

        {/* a <label> wrapper makes the whole panel open the picker without an
            onClick handler; the input stays focusable for keyboard users */}
        <label className="cl-drop">
          <input
            type="file"
            className="cl-drop-input"
            accept={FILE_ACCEPT}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <span className="cl-drop-icon" aria-hidden="true">
            <IconCloudUpload />
          </span>
          <span className="cl-drop-title" data-i18n="collab_fu_f_file_title">
            رفع ملف تعريفي
          </span>
          <span className="cl-drop-hint" data-i18n="collab_fu_f_file_hint">
            الحد الأقصى لحجم الفيديو المسموح به هو 5 ميجابايت، وتشمل الصيغ
            المدعومة png, jpg, pdf
          </span>
        </label>

        {values.fileError === "type" && (
          <p className="cl-error" data-i18n="collab_f_video_error_type">
            الصيغة غير مدعومة، الرجاء رفع ملف png أو jpg أو pdf.
          </p>
        )}
        {values.fileError === "size" && (
          <p className="cl-error" data-i18n="collab_f_video_error_size">
            حجم الملف أكبر من 5 ميجابايت.
          </p>
        )}

        {values.file && (
          <div className="cl-drop-file">
            <span className="cl-drop-file-name">
              {values.file.name}{" "}
              <span className="cl-drop-file-size">
                ({Math.max(1, Math.round(values.file.size / 1024))} KB)
              </span>
            </span>
            <button
              type="button"
              className="cl-drop-remove"
              onClick={() => onChange({ file: null, fileError: null })}
              data-i18n="collab_f_video_remove"
            >
              إزالة
            </button>
          </div>
        )}
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-fu-notes">
          <span data-i18n="collab_f_notes">ملاحظات إضافية</span>
        </label>
        <textarea
          id="collab-fu-notes"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="أضف ملاحظاتك"
          data-i18n-placeholder="collab_fu_f_notes_ph"
          value={values.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
        {/* the mock prints the cap first, then what has been typed */}
        <p className="cl-counter">
          {NOTE_MAX}/{values.notes.length}
        </p>
      </div>

      <aside className="cl-note">
        <span className="cl-note-icon" aria-hidden="true">
          <IconInfoCircle />
        </span>
        <span data-i18n="collab_f_note">
          سيتم التواصل معك خلال 3-5 أيام عمل بعد استلام الطلب.
        </span>
      </aside>
    </div>
  );
}
