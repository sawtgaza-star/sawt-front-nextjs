import { useLang } from "@/lib/use-lang";
import AccountAvatar from "./AccountAvatar";
import { IconPencil } from "./account-icons";
import { fill, memberSince, type AccountUser } from "./account-user";

/* "ملفي الشخصي": the profile card — photo with an edit badge, name, email,
   "في صوت منذ …", the "تعديل الملف الشخصي" pill — and the "تتابع" count.
   Both edit controls open الإعدادات. ("تفاعلاتي", "المحفوظات" and the
   "المحتوى الذي تفاعلت معه" strip of the mock are dropped on purpose.) */
export default function ProfileTab({
  user,
  followingCount,
  onEdit,
  onShowCreators,
}: {
  user: AccountUser;
  followingCount: number;
  onEdit: () => void;
  onShowCreators: () => void;
}) {
  const { lang, tr } = useLang();
  const since = memberSince(user.createdAt, lang);

  return (
    <section className="acc-panel">
      <h1 className="acc-title">{tr("acc_profile_title")}</h1>
      <p className="acc-desc">{tr("acc_profile_desc")}</p>

      <div className="acc-profile-card">
        <div className="acc-profile-top">
          <div className="acc-profile-id">
            <button
              type="button"
              className="acc-profile-avatar"
              onClick={onEdit}
              aria-label={tr("acc_edit_profile")}
            >
              <AccountAvatar src={user.avatar} name={user.name} className="acc-avatar-lg" />
              <span className="acc-profile-avatar-badge">
                <IconPencil size={14} />
              </span>
            </button>
            <div className="acc-profile-text">
              <h2 className="acc-profile-name">{user.name}</h2>
              {user.email ? <p className="acc-profile-email">{user.email}</p> : null}
              {since ? (
                <p className="acc-profile-since">{fill(tr("acc_member_since"), { date: since })}</p>
              ) : null}
            </div>
          </div>
          <button type="button" className="acc-btn-edit" onClick={onEdit}>
            <IconPencil />
            <span>{tr("acc_edit_profile")}</span>
          </button>
        </div>

        <div className="acc-stats">
          <button type="button" className="acc-stat" onClick={onShowCreators}>
            <span className="acc-stat-num">{followingCount}</span>
            <span className="acc-stat-label">{tr("acc_stat_following")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
