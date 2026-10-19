import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/lib/use-lang";
import { ApiError } from "@/lib/api/client";
import { apiMessage } from "@/lib/api/messages";
import { handleAuthError } from "@/lib/follows";
import NewsletterToast from "@/components/site/NewsletterToast";
import AccountAvatar from "./AccountAvatar";
import AvatarCropper from "./AvatarCropper";
import { useAccountToast } from "./use-account-toast";
import type { AccountDraft, AccountUser, Gender } from "./account-user";
import RequiredMark from "@/components/ui/RequiredMark";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png"];

type Draft = { name: string; phone: string; gender: Gender; avatar: string | null };

function draftOf(user: AccountUser): Draft {
  return { name: user.name, phone: user.phone, gender: user.gender, avatar: user.avatar };
}

/* Every message the server sent back — field errors first, else its message. */
function errorsOf(error: unknown): string[] {
  if (error instanceof ApiError) {
    const fields = Object.values(error.errors).flat();
    const list = fields.length ? fields : [error.message];
    return list.map((m) => apiMessage(m) || m);
  }
  return [apiMessage("حدث خطأ غير متوقع. حاول مرة أخرى.") || ""];
}

/* "المعلومات الشخصية": photo (+ "تغيير الصورة"), full name, email (read-only —
   changing it needs a verified flow), phone, gender; "حفظ التغييرات" /
   "إلغاء". Sent as POST /auth/profile through account-user's save(); the
   picked photo is first framed in <AvatarCropper /> (zoom, move, turn), and
   the cropped square is what is previewed locally and uploaded. */
export default function AccountInfoForm({
  user,
  onSave,
}: {
  user: AccountUser;
  onSave: (draft: AccountDraft) => Promise<void>;
}) {
  const { tr } = useLang();
  const [draft, setDraft] = useState<Draft>(() => draftOf(user));
  const [photo, setPhoto] = useState<File | null>(null);
  const toast = useAccountToast();
  const [cropping, setCropping] = useState<File | null>(null);
  // bumped per picked file, so "تغيير الصورة" inside the dialog starts it afresh
  const [cropKey, setCropKey] = useState(0);
  const closeCropper = useCallback(() => setCropping(null), []);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // The stored user changed (first fetch, a save, another tab) — start over from it.
  useEffect(() => {
    setDraft(draftOf(user));
    setPhoto(null);
  }, [user]);

  // the local preview of a picked photo is an object URL — release it
  useEffect(() => {
    const src = draft.avatar;
    return () => {
      if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
    };
  }, [draft.avatar]);

  function patch(next: Partial<Draft>) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function pickPhoto(file?: File) {
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type)) return;
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error([tr("acc_photo_too_big")]);
      return;
    }
    setCropping(file);
    setCropKey((k) => k + 1);
  }

  function takeCropped(file: File) {
    setCropping(null);
    setPhoto(file);
    patch({ avatar: URL.createObjectURL(file) });
  }

  function reset() {
    setDraft(draftOf(user));
    setPhoto(null);
    toast.close();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const name = draft.name.trim();
    if (!name) {
      toast.error([tr("acc_name_required")]);
      return;
    }
    setSaving(true);
    toast.close();
    try {
      await onSave({ name, phone: draft.phone.trim(), gender: draft.gender, avatarFile: photo });
      toast.success(tr("acc_saved"));
    } catch (error) {
      if (!handleAuthError(error)) toast.error(errorsOf(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="acc-card" onSubmit={submit} noValidate>
      <h2 className="acc-card-title">{tr("acc_info_title")}</h2>

      <div className="acc-photo-row">
        <AccountAvatar src={draft.avatar} name={draft.name} className="acc-avatar-md" />
        <div>
          <p className="acc-photo-title">{tr("acc_photo_title")}</p>
          <p className="acc-hint">{tr("acc_photo_hint")}</p>
          <button type="button" className="acc-link-btn" onClick={() => fileRef.current?.click()}>
            {tr("acc_photo_change")}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png"
            hidden
            onChange={(e) => {
              pickPhoto(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div className="acc-grid">
        <label className="acc-field">
          <span className="acc-label">
            {tr("acc_name")}
            <RequiredMark />
          </span>
          <input
            className="acc-input"
            value={draft.name}
            onChange={(e) => patch({ name: e.target.value })}
            autoComplete="name"
          />
        </label>
        <label className="acc-field">
          <span className="acc-label">{tr("acc_email")}</span>
          <input className="acc-input" value={user.email} readOnly dir="ltr" />
          <span className="acc-hint">{tr("acc_email_hint")}</span>
        </label>
        <label className="acc-field">
          <span className="acc-label">{tr("acc_phone")}</span>
          <input
            className="acc-input"
            value={draft.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            type="tel"
            dir="ltr"
            autoComplete="tel"
          />
        </label>
        <label className="acc-field">
          <span className="acc-label">{tr("acc_gender")}</span>
          <select
            className="acc-input acc-select"
            value={draft.gender}
            onChange={(e) => patch({ gender: e.target.value as Gender })}
          >
            <option value="">{tr("acc_gender_none")}</option>
            <option value="male">{tr("acc_gender_male")}</option>
            <option value="female">{tr("acc_gender_female")}</option>
          </select>
          <span className="acc-hint">{tr("acc_optional")}</span>
        </label>
      </div>

      {cropping ? (
        <AvatarCropper
          key={cropKey}
          file={cropping}
          onCancel={closeCropper}
          onDone={takeCropped}
          onPickAnother={() => fileRef.current?.click()}
        />
      ) : null}
      {toast.notice ? <NewsletterToast notice={toast.notice} onClose={toast.close} /> : null}

      <div className="acc-actions">
        <button type="submit" className="acc-btn-primary" disabled={saving} aria-busy={saving}>
          {tr("acc_save")}
        </button>
        <button
          type="button"
          className="acc-btn-text"
          onClick={reset}
          disabled={saving}
        >
          {tr("acc_cancel")}
        </button>
      </div>
    </form>
  );
}
