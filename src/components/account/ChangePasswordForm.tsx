import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/use-lang";
import { passwordPolicyErrors } from "@/lib/password-policy";
import { apiMessage } from "@/lib/api/messages";

/* "تغيير كلمة المرور": current / new / confirm, checked against the same
   policy /register uses (lib/password-policy).

   The API has no authenticated change-password endpoint (only the emailed
   reset flow), so a valid submit says so and points to "نسيت كلمة المرور"
   rather than pretending the password changed. Wire the request in here once
   the endpoint exists. */
export default function ChangePasswordForm({ onCancel }: { onCancel: () => void }) {
  const { tr } = useLang();
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors([]);
    setNotice("");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const found: string[] = [];
    if (!values.current) found.push(tr("acc_pw_current_required"));
    found.push(...passwordPolicyErrors(values.next).map((m) => apiMessage(m) || m));
    if (values.next && values.next !== values.confirm) found.push(tr("acc_pw_mismatch"));
    if (values.current && values.current === values.next) found.push(tr("acc_pw_same"));
    setErrors(found);
    if (found.length === 0) setNotice(tr("acc_pw_unavailable"));
  }

  const fields: { key: keyof typeof values; label: string; auto: string }[] = [
    { key: "current", label: "acc_pw_current", auto: "current-password" },
    { key: "next", label: "acc_pw_new", auto: "new-password" },
    { key: "confirm", label: "acc_pw_confirm", auto: "new-password" },
  ];

  return (
    <form className="acc-card" onSubmit={submit} noValidate>
      {fields.map((field) => (
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

      {errors.length > 0 ? (
        <ul className="acc-msg is-error">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : null}
      {notice ? (
        <p className="acc-msg is-info">
          {notice}{" "}
          <a href="/forgot-password">{tr("acc_password_change")}</a>
        </p>
      ) : null}

      <div className="acc-actions">
        <button type="submit" className="acc-btn-primary">
          {tr("acc_pw_submit")}
        </button>
        <button type="button" className="acc-btn-text" onClick={onCancel}>
          {tr("acc_cancel")}
        </button>
      </div>
    </form>
  );
}
