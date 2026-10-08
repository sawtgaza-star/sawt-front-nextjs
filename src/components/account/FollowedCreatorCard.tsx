import { localized } from "@/lib/api/pages";
import type { FollowedCreator } from "@/lib/follows";
import { compact } from "@/components/creators/creators-text";
import { IconUserPlus } from "./account-icons";

const AVATAR_FALLBACK = "/assets/images/Image (أحمد المنصور).png";

/* One followed creator: follower badge, ringed photo, name, story count (or
   the role when the count is unknown) and "إلغاء المتابعة". Photo and name
   open the creator's page. */
export default function FollowedCreatorCard({
  creator,
  lang,
  tr,
  onUnfollow,
}: {
  creator: FollowedCreator;
  lang: string;
  tr: (key: string) => string;
  onUnfollow: () => void;
}) {
  const href = `/creators/${creator.uuid}`;
  const followers = compact(creator.followers);
  const stories = compact(creator.videos);
  const sub = stories
    ? `${stories} ${tr("acc_stories_suffix")}`
    : localized(creator.role, lang);

  return (
    <article className="acc-creator-card">
      {followers ? (
        <span className="acc-creator-badge">
          {followers} {tr("acc_followers_suffix")}
        </span>
      ) : null}
      <a href={href} className="acc-creator-photo">
        <img src={creator.avatar || AVATAR_FALLBACK} alt={creator.name} />
      </a>
      <a href={href} className="acc-creator-name">
        {creator.name}
      </a>
      {sub ? <p className="acc-creator-sub">{sub}</p> : null}
      <button type="button" className="acc-creator-btn" onClick={onUnfollow}>
        <IconUserPlus />
        <span>{tr("acc_unfollow")}</span>
      </button>
    </article>
  );
}
