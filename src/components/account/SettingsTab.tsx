import { useLang } from "@/lib/use-lang";
import AccountInfoForm from "./AccountInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import PrivacyForm from "./PrivacyForm";
import type { AccountUser } from "./account-user";

export type SettingsView = "account" | "password" | "privacy";

/* "الإعدادات": sub-tabs إعدادات الحساب / الخصوصية. The account view is the
   personal-info form plus the password card, whose link swaps the whole view
   for "تغيير كلمة المرور". */
export default function SettingsTab({
  view,
  onView,
  user,
  onSave,
}: {
  view: SettingsView;
  onView: (view: SettingsView) => void;
  user: AccountUser;
  onSave: Parameters<typeof AccountInfoForm>[0]["onSave"];
}) {
  const { tr } = useLang();
  const head =
    view === "password"
      ? { title: "acc_pw_title", desc: "acc_pw_desc" }
      : view === "privacy"
        ? { title: "acc_privacy_title", desc: "acc_privacy_desc" }
        : { title: "acc_settings_title", desc: "acc_settings_desc" };

  return (
    <section className="acc-panel">
      <h1 className="acc-title">{tr(head.title)}</h1>
      <p className="acc-desc">{tr(head.desc)}</p>

      <div className="acc-subtabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={view !== "privacy"}
          className={"acc-subtab" + (view !== "privacy" ? " is-active" : "")}
          onClick={() => onView("account")}
        >
          {tr("acc_sub_account")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "privacy"}
          className={"acc-subtab" + (view === "privacy" ? " is-active" : "")}
          onClick={() => onView("privacy")}
        >
          {tr("acc_sub_privacy")}
        </button>
      </div>

      {view === "account" ? (
        <>
          <AccountInfoForm user={user} onSave={onSave} />
          <div className="acc-card">
            <h2 className="acc-card-title">{tr("acc_password_title")}</h2>
            <p className="acc-card-desc">{tr("acc_password_desc")}</p>
            <button type="button" className="acc-link-btn" onClick={() => onView("password")}>
              {tr("acc_password_change")}
            </button>
          </div>
        </>
      ) : null}

      {view === "password" ? <ChangePasswordForm onCancel={() => onView("account")} /> : null}

      {view === "privacy" ? <PrivacyForm /> : null}
    </section>
  );
}
