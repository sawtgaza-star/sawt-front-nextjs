import {
  IconChainLink,
  IconCloudUpload,
  IconInfoCircle,
} from "@/components/ui/icons";
import CollabPlatformSelect from "./CollabPlatformSelect";
import {
  NOTE_MAX,
  SOCIAL_PLATFORMS,
  VIDEO_ACCEPT,
} from "./creator-form-data";

/* Step 3 — "مواقع التواصل": one row per social profile (platform + link, with
   a row that can be removed and "اضافة منصة" to add another), free-text notes,
   the intro-video drop zone, and the join-terms tick the submit needs. */
export type SocialRow = { id: number; platform: string; url: string };

export type SocialFields = {
  rows: SocialRow[];
  notes: string;
  video: File | null;
  videoError: "type" | "size" | null;
  agree: boolean;
};

export default function SocialStep({
  values,
  agreeError,
  onChange,
  onAddRow,
  onRemoveRow,
  onRowChange,
  onVideo,
}: {
  values: SocialFields;
  agreeError: boolean;
  onChange: (patch: Partial<SocialFields>) => void;
  onAddRow: () => void;
  onRemoveRow: (id: number) => void;
  onRowChange: (id: number, patch: Partial<SocialRow>) => void;
  onVideo: (file: File | undefined) => void;
}) {
  return (
    <div className="cl-form">
      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_f_social">
          روابط مواقع التواصل الاجتماعي
        </span>

        {values.rows.map((row) => {
          const platform =
            SOCIAL_PLATFORMS.find((p) => p.value === row.platform) ??
            SOCIAL_PLATFORMS[0];

          return (
            <div className="cl-social-row" key={row.id}>
              <CollabPlatformSelect
                value={row.platform}
                onChange={(p) => onRowChange(row.id, { platform: p })}
              />

              <div className="cl-input-wrap">
                <span className="cl-input-icon" aria-hidden="true">
                  <IconChainLink />
                </span>
                <input
                  type="url"
                  className="cl-input"
                  placeholder={platform.placeholder}
                  data-i18n-placeholder={platform.placeholderKey}
                  value={row.url}
                  onChange={(e) => onRowChange(row.id, { url: e.target.value })}
                />
              </div>

              <button
                type="button"
                className="cl-social-remove"
                onClick={() => onRemoveRow(row.id)}
                aria-label="حذف"
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          );
        })}

        <button type="button" className="cl-add-platform" onClick={onAddRow}>
          <span data-i18n="collab_f_add_platform">اضافة منصة</span>
          <i className="fa-solid fa-plus" aria-hidden="true"></i>
        </button>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-notes">
          <span data-i18n="collab_f_notes">ملاحظات إضافية</span>
        </label>
        <textarea
          id="collab-notes"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="أي معلومات إضافية تود إضافتها (اختياري)"
          data-i18n-placeholder="collab_f_notes_ph"
          value={values.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
        {/* the mock prints the cap first, then what has been typed */}
        <p className="cl-counter">
          {NOTE_MAX}/{values.notes.length}
        </p>
      </div>

      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_f_video">
          فيديو تعريفي عنك ولماذا تريد التعاون مع المنصة ؟ 3 دقائق ك حد أقصى
        </span>

        {/* a <label> wrapper makes the whole panel open the picker without an
            onClick handler; the input stays focusable for keyboard users */}
        <label className="cl-drop">
          <input
            type="file"
            className="cl-drop-input"
            accept={VIDEO_ACCEPT}
            onChange={(e) => onVideo(e.target.files?.[0])}
          />
          <span className="cl-drop-icon" aria-hidden="true">
            <IconCloudUpload />
          </span>
          <span className="cl-drop-title" data-i18n="collab_f_video_title">
            إضافة فيديو
          </span>
          <span className="cl-drop-hint" data-i18n="collab_f_video_hint">
            الحد الأقصى لحجم الفيديو المسموح به هو 5 ميجابايت، وتشمل الصيغ
            المدعومة png, jpg, pdf
          </span>
        </label>

        {values.videoError === "type" && (
          <p className="cl-error" data-i18n="collab_f_video_error_type">
            الصيغة غير مدعومة، الرجاء رفع ملف png أو jpg أو pdf.
          </p>
        )}
        {values.videoError === "size" && (
          <p className="cl-error" data-i18n="collab_f_video_error_size">
            حجم الملف أكبر من 5 ميجابايت.
          </p>
        )}

        {values.video && (
          <div className="cl-drop-file">
            <span className="cl-drop-file-name">
              {values.video.name}{" "}
              <span className="cl-drop-file-size">
                ({Math.max(1, Math.round(values.video.size / 1024))} KB)
              </span>
            </span>
            <button
              type="button"
              className="cl-drop-remove"
              onClick={() => onChange({ video: null, videoError: null })}
              data-i18n="collab_f_video_remove"
            >
              إزالة
            </button>
          </div>
        )}
      </div>

      <label className={"cl-terms" + (agreeError ? " is-invalid" : "")}>
        <input
          type="checkbox"
          className="cl-terms-input"
          checked={values.agree}
          onChange={(e) => onChange({ agree: e.target.checked })}
        />
        <span className="cl-terms-box" aria-hidden="true">
          <i className="fa-solid fa-check"></i>
        </span>
        <span data-i18n="collab_f_terms">
          أوافق على شروط الانضمام وسياسة الخصوصية لمنصة صوت
        </span>
      </label>

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
