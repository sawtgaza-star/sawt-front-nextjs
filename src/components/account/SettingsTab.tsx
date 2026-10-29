import { useLang } from "@/lib/use-lang";
import { IconNavLogout } from "@/components/ui/icons";
import NavLogoutButton from "@/components/site/NavLogoutButton";
import AccountInfoForm from "./AccountInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import type { AccountUser } from "./account-user";

export type SettingsView = "account" | "password";

/* "الإعدادات" (its sub-tab bar — إعدادات الحساب / الخصوصية — was removed). The account view is the
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
      : { title: "acc_settings_title", desc: "acc_settings_desc" };

  return (
    <section className="acc-panel">
      <h1 className="acc-title">{tr(head.title)}</h1>
      <p className="acc-desc">{tr(head.desc)}</p>

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
          <div className="acc-card acc-logout-card">
            <div className="acc-logout-text">
              <h2 className="acc-card-title">{tr("acc_logout_title")}</h2>
              <p className="acc-card-desc">{tr("acc_logout_desc")}</p>
            </div>
            <NavLogoutButton className="acc-logout-btn">
              <IconNavLogout />
              <span>{tr("acc_logout_btn")}</span>
            </NavLogoutButton>
          </div>
        </>
      ) : null}

      {view === "password" ? <ChangePasswordForm onCancel={() => onView("account")} /> : null}
    </section>
  );
}
