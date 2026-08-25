import { IconCloudUpload, IconInfoCircle } from "@/components/ui/icons";
import { FILE_ACCEPT, NOTE_MAX } from "./partnership-form-data";

/* Step 3 — "مرفقات وملاحظات": the company-profile drop zone and any last
   notes. Unlike the funding flow there is no terms textarea here — the mock
   goes straight from the drop zone to the notes and the info panel, so
   "تسليم الطلب" submits from there. */
export type FilesFields = {
  notes: string;
  file: File | null;
  fileError: "type" | "size" | null;
};

export default function FilesStep({
  values,
  onChange,
  onFile,
}: {
  values: FilesFields;
  onChange: (patch: Partial<FilesFields>) => void;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_pa_f_file">
          إضافة ملف تعريفي
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
          <span className="cl-drop-title" data-i18n="collab_pa_f_file_title">
            رفع ملف تعريفي
          </span>
          <span className="cl-drop-hint" data-i18n="collab_pa_f_file_hint">
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
        <label className="cl-label" htmlFor="collab-pa-notes">
          <span data-i18n="collab_f_notes">ملاحظات إضافية</span>
        </label>
        <textarea
          id="collab-pa-notes"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="أضف ملاحظاتك"
          data-i18n-placeholder="collab_pa_f_notes_ph"
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
