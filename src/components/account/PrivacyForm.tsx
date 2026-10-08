import { useEffect, useState, type FormEvent } from "react";
import { getUser } from "@/lib/auth-state";
import { useLang } from "@/lib/use-lang";

/* الإعدادات → الخصوصية: "من يرى ما تشاركه؟" — four switches and the
   "من يمكنه رؤية نشاطي؟" choice, saved with "حفظ التغييرات" and put back
   with "إلغاء".

   The API has no privacy endpoint yet, so the choices are kept in this
   browser, per user — the same stop-gap as account-user's profile overlay.
   Swap readPrivacy()/writePrivacy() for requests once it exists. */

type Privacy = {
  showProfile: boolean;
  activity: "me" | "everyone";
  showInteractions: boolean;
  showLists: boolean;
  showFollowing: boolean;
};

type SwitchKey = "showProfile" | "showInteractions" | "showLists" | "showFollowing";

const DEFAULTS: Privacy = {
  showProfile: true,
  activity: "me",
  showInteractions: false,
  showLists: false,
  showFollowing: true,
};

function storageKey(): string | null {
  const user = getUser();
  return user ? `sawt_privacy:${user.id ?? user.uuid}` : null;
}

function readPrivacy(): Privacy {
  const key = storageKey();
  if (!key) return DEFAULTS;
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(key) || "{}") };
  } catch {
    return DEFAULTS;
  }
}

function writePrivacy(value: Privacy): void {
  const key = storageKey();
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage disabled */
  }
}

function SwitchRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="acc-toggle-row acc-pv-row">
      <span>
        <span className="acc-toggle-title">{title}</span>
        <span className="acc-pv-desc">{desc}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        className="acc-switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function PrivacyForm() {
  const { tr } = useLang();
  const [saved, setSaved] = useState<Privacy>(DEFAULTS);
  const [draft, setDraft] = useState<Privacy>(DEFAULTS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stored = readPrivacy();
    setSaved(stored);
    setDraft(stored);
  }, []);

  function patch(next: Partial<Privacy>) {
    setDraft((d) => ({ ...d, ...next }));
    setDone(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    writePrivacy(draft);
    setSaved(draft);
    setDone(true);
  }

  const toggle = (key: SwitchKey, label: string) => (
    <SwitchRow
      title={tr(`acc_pv_${label}`)}
      desc={tr(`acc_pv_${label}_desc`)}
      checked={draft[key]}
      onChange={(on) => patch({ [key]: on } as Partial<Privacy>)}
    />
  );

  const choices: { value: Privacy["activity"]; label: string }[] = [
    { value: "me", label: "acc_pv_only_me" },
    { value: "everyone", label: "acc_pv_everyone" },
  ];

  return (
    <form className="acc-card" onSubmit={submit} noValidate>
      <h2 className="acc-card-title">{tr("acc_privacy_card")}</h2>

      {toggle("showProfile", "profile")}

      <div className="acc-pv-row">
        <span className="acc-toggle-title">{tr("acc_pv_activity")}</span>
        <span className="acc-pv-desc">{tr("acc_pv_activity_desc")}</span>
        <div className="acc-pv-choice" role="radiogroup" aria-label={tr("acc_pv_activity")}>
          {choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                role="radio"
                aria-checked={draft.activity === choice.value}
                className={"acc-subtab" + (draft.activity === choice.value ? " is-active" : "")}
                onClick={() => patch({ activity: choice.value })}
              >
                {tr(choice.label)}
              </button>
          ))}
        </div>
      </div>

      {toggle("showInteractions", "interactions")}
      {toggle("showLists", "lists")}
      {toggle("showFollowing", "following")}

      <p className="acc-pv-note">{tr("acc_pv_note")}</p>

      {done ? <p className="acc-msg is-success">{tr("acc_saved")}</p> : null}

      <div className="acc-actions">
        <button type="submit" className="acc-btn-primary">
          {tr("acc_save")}
        </button>
        <button
          type="button"
          className="acc-btn-text"
          onClick={() => {
            setDraft(saved);
            setDone(false);
          }}
        >
          {tr("acc_cancel")}
        </button>
      </div>
    </form>
  );
}
