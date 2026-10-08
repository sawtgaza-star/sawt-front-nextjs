import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/lib/use-lang";
import AccountAvatar from "./AccountAvatar";
import { resizeAvatar, type AccountUser, type Gender } from "./account-user";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

type Draft = { name: string; phone: string; gender: Gender; avatar: string | null };

function draftOf(user: AccountUser): Draft {
  return { name: user.name, phone: user.phone, gender: user.gender, avatar: user.avatar };
}

/* "المعلومات الشخصية": photo (+ "تغيير الصورة"), full name, email (read-only —
   changing it needs a verified flow the API doesn't offer), phone, gender;
   "حفظ التغييرات" / "إلغاء". Saved through account-user's save(). */
export default function AccountInfoForm({
  user,
  onSave,
}: {
  user: AccountUser;
  onSave: (draft: Draft) => void;
}) {
  const { tr } = useLang();
  const [draft, setDraft] = useState<Draft>(() => draftOf(user));
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Another tab (or the first read) changed the stored user — start over from it.
  useEffect(() => setDraft(draftOf(user)), [user]);

  function patch(next: Partial<Draft>) {
    setDraft((d) => ({ ...d, ...next }));
    setSaved(false);
    setError("");
  }

  async function pickPhoto(file?: File) {
    if (!file) return;
    if (file.size > MAX_PHOTO_BYTES) {
      setError(tr("acc_photo_too_big"));
      return;
    }
    try {
      patch({ avatar: await resizeAvatar(file) });
    } catch {
      /* not a readable image — keep the current photo */
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name) {
      setError(tr("acc_name_required"));
      return;
    }
    onSave({ ...draft, name, phone: draft.phone.trim() });
    setSaved(true);
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
          <span className="acc-label">{tr("acc_name")}</span>
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

      {error ? <p className="acc-msg is-error">{error}</p> : null}
      {saved ? <p className="acc-msg is-success">{tr("acc_saved")}</p> : null}

      <div className="acc-actions">
        <button type="submit" className="acc-btn-primary">
          {tr("acc_save")}
        </button>
        <button
          type="button"
          className="acc-btn-text"
          onClick={() => {
            setDraft(draftOf(user));
            setError("");
            setSaved(false);
          }}
        >
          {tr("acc_cancel")}
        </button>
      </div>
    </form>
  );
}
