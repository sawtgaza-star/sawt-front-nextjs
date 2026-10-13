import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "@/lib/use-lang";
import { passwordPolicyErrors } from "@/lib/password-policy";
import { apiMessage } from "@/lib/api/messages";
import { ApiError } from "@/lib/api/client";
import { changePassword } from "@/lib/api/profile";
import { getToken, USER_EVENT } from "@/lib/auth-state";
import { handleAuthError } from "@/lib/follows";
import NewsletterToast from "@/components/site/NewsletterToast";
import { useAccountToast } from "./use-account-toast";
import { markHasPassword, needsCurrentPassword } from "./account-user";

/* "تغيير كلمة المرور": current / new / confirm, checked against the same
   policy /register uses (lib/password-policy), then sent as
   POST /auth/password. The server's answer is shown as it came (through
   apiMessage); its field errors — a wrong current password among them — are
   listed in the toast. An account from a Google/Facebook sign-in that has
   no password yet gets only "new" + "confirm" (see needsCurrentPassword). */
export default function ChangePasswordForm({ onCancel }: { onCancel: () => void }) {
  const { tr } = useLang();
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const toast = useAccountToast();
  // read after mount (localStorage); re-read when GET /auth/profile lands
  const [askCurrent, setAskCurrent] = useState(true);
  useEffect(() => {
    const sync = () => setAskCurrent(needsCurrentPassword());
    sync();
    document.addEventListener(USER_EVENT, sync);
    return () => document.removeEventListener(USER_EVENT, sync);
  }, []);
  const [saving, setSaving] = useState(false);

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const found: string[] = [];
    if (askCurrent && !values.current) found.push(tr("acc_pw_current_required"));
    found.push(...passwordPolicyErrors(values.next).map((m) => apiMessage(m) || m));
    if (values.next && values.next !== values.confirm) found.push(tr("acc_pw_mismatch"));
    if (askCurrent && values.current && values.current === values.next) {
      found.push(tr("acc_pw_same"));
    }
    if (found.length > 0) {
      toast.error(found);
      return;
    }
    toast.close();

    setSaving(true);
    try {
      const message = await changePassword(getToken() || "", {
        ...(askCurrent ? { current_password: values.current } : {}),
        password: values.next,
        password_confirmation: values.confirm,
      });
      setValues({ current: "", next: "", confirm: "" });
      markHasPassword();
      toast.success(apiMessage(message) || tr("acc_pw_changed"));
    } catch (error) {
      if (handleAuthError(error)) return;
      const list =
        error instanceof ApiError
          ? Object.values(error.errors).flat().concat(
              Object.keys(error.errors).length ? [] : [error.message],
            )
          : [tr("acc_pw_failed")];
      toast.error(list.map((m) => apiMessage(m) || m));
    } finally {
      setSaving(false);
    }
  }

  const fields: { key: keyof typeof values; label: string; auto: string }[] = [
    { key: "current", label: "acc_pw_current", auto: "current-password" },
    { key: "next", label: "acc_pw_new", auto: "new-password" },
    { key: "confirm", label: "acc_pw_confirm", auto: "new-password" },
  ];

  return (
    <form className="acc-card" onSubmit={submit} noValidate>
      {fields.filter((field) => askCurrent || field.key !== "current").map((field) => (
        <label className="acc-field" key={field.key}>
          <span className="acc-label">{tr(field.label)}</span>
          <input
            className="acc-input"
            type="password"
            dir="ltr"
            value={values[field.key]}
            onChange={(e) => set(field.key, e.target.value)}
            autoComplete={field.auto}
          />
          {field.key === "next" ? <span className="acc-hint">{tr("acc_pw_hint")}</span> : null}
        </label>
      ))}

      <p className="acc-note">{tr("acc_pw_note")}</p>

      {toast.notice ? <NewsletterToast notice={toast.notice} onClose={toast.close} /> : null}

      <div className="acc-actions">
        <button type="submit" className="acc-btn-primary" disabled={saving} aria-busy={saving}>
          {tr("acc_pw_submit")}
        </button>
        <button type="button" className="acc-btn-text" onClick={onCancel}>
          {tr("acc_cancel")}
        </button>
      </div>
    </form>
  );
}
