import { IconCloudUpload, IconInfoCircle } from "@/components/ui/icons";
import { FILE_ACCEPT, NOTE_MAX } from "./other-form-data";

/* Step 2 — "شرح الفكرة": the pitch itself, an optional attachment and any last
   notes, then the info panel "تسليم الطلب" submits from. Nothing on this step
   is required — the mock shows no error state here. */
export type IdeaFields = {
  idea: string;
  notes: string;
  file: File | null;
  fileError: "type" | "size" | null;
};

export default function IdeaStep({
  values,
  onChange,
  onFile,
}: {
  values: IdeaFields;
  onChange: (patch: Partial<IdeaFields>) => void;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-ot-idea">
          <span data-i18n="collab_ot_f_idea">
            ما هي فكرة التعاون التي تقترحها؟
          </span>
        </label>
        <textarea
          id="collab-ot-idea"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="نوع التعاون الذي تريده وكيف يمكن أن يفيد الطرفين"
          data-i18n-placeholder="collab_ot_f_idea_ph"
          value={values.idea}
          onChange={(e) => onChange({ idea: e.target.value })}
        />
        {/* the mock prints the cap first, then what has been typed */}
        <p className="cl-counter">
          {NOTE_MAX}/{values.idea.length}
        </p>
      </div>

      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_ot_f_file">
          إضافة ملف
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
          <span className="cl-drop-title" data-i18n="collab_ot_f_file_title">
            رفع ملف تعريفي
          </span>
          <span className="cl-drop-hint" data-i18n="collab_ot_f_file_hint">
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
        <label className="cl-label" htmlFor="collab-ot-notes">
          <span data-i18n="collab_f_notes">ملاحظات إضافية</span>
        </label>
        <textarea
          id="collab-ot-notes"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="أضف ملاحظاتك"
          data-i18n-placeholder="collab_ot_f_notes_ph"
          value={values.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
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
