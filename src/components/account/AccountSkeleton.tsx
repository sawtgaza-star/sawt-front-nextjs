"use client";
/* /account while its data isn't there yet — ProfileTab's and CreatorsTab's
   real markup, with the user's own details (name, email, date, photo,
   counts, followed creators) swapped for placeholders. The page's fixed copy
   (titles, descriptions, button labels) is real text: it comes from the
   dictionary, not the API. So both tabs take exactly the room they will once
   the user is read (exported HTML → hydration) or GET /auth/profile lands.

   Keep in step with ProfileTab / CreatorsTab / FollowedCreatorCard. */

import SkeletonText from "@/components/ui/SkeletonText";
import { useLang } from "@/lib/use-lang";
import { IconPencil, IconUserPlus } from "./account-icons";
import { fill } from "./account-user";

/** ProfileTab with the user's details as placeholders. */
export function ProfileTabSkeleton() {
  const { tr } = useLang();

  return (
    <section className="acc-panel" aria-busy="true">
      <h1 className="acc-title">{tr("acc_profile_title")}</h1>
      <p className="acc-desc">{tr("acc_profile_desc")}</p>

      <div className="acc-profile-card" aria-hidden="true">
        <div className="acc-profile-top">
          <div className="acc-profile-id">
            <button type="button" className="acc-profile-avatar" disabled tabIndex={-1}>
              <span className="acc-avatar acc-avatar-lg acc-sk-block" />
              <span className="acc-profile-avatar-badge">
                <IconPencil size={14} />
              </span>
            </button>
            <div className="acc-profile-text">
              <h2 className="acc-profile-name"><SkeletonText chars={12} /></h2>
              <p className="acc-profile-email"><SkeletonText chars={22} /></p>
              <p className="acc-profile-since"><SkeletonText chars={18} /></p>
            </div>
          </div>
          <button type="button" className="acc-btn-edit" disabled tabIndex={-1}>
            <IconPencil />
            <span>{tr("acc_edit_profile")}</span>
          </button>
        </div>

        <div className="acc-stats">
          <button type="button" className="acc-stat" disabled tabIndex={-1}>
            <span className="acc-stat-num"><SkeletonText chars={2} /></span>
            <span className="acc-stat-label">{tr("acc_stat_following")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/** One FollowedCreatorCard, inert. */
function CreatorCardSkeleton() {
  const { tr } = useLang();
  return (
    <article className="acc-creator-card">
      <span className="acc-creator-photo acc-sk-ring" />
      {/* an <a> in the card: inline, so its line box is the name's */}
      <span className="acc-creator-name"><SkeletonText chars={12} /></span>
      <p className="acc-creator-sub"><SkeletonText chars={8} /></p>
      <button type="button" className="acc-creator-btn" disabled tabIndex={-1}>
        <IconUserPlus />
        <span>{tr("acc_unfollow")}</span>
      </button>
    </article>
  );
}

/** CreatorsTab's list before the followed creators are known; `count` is the
    stored user's following count, so the row is as long as it will be and
    the count line can already be the real one. */
export function CreatorsListSkeleton({ count }: { count: number }) {
  const { tr } = useLang();
  const n = Math.max(1, count);
  return (
    <div aria-busy="true">
      <p className="acc-desc">
        {n === 1 ? tr("acc_creators_count_one") : fill(tr("acc_creators_count"), { count: n })}
      </p>
      <div className="acc-creators-row" aria-hidden="true">
        {Array.from({ length: n }, (_, index) => (
          <CreatorCardSkeleton key={index} />
        ))}
      </div>
      <p className="acc-note">{tr("acc_creators_note")}</p>
    </div>
  );
}
