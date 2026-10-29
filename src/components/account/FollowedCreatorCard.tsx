import { localized, localizedHtml } from "@/lib/api/pages";
import type { FollowedCreator } from "@/lib/follows";
import CreatorCard from "@/components/home/CreatorCard";
import { formatFollowers } from "@/components/home/home-text";
import { roleLabel } from "@/components/creators/creator-cards";
import { richInline } from "@/lib/rich-text";

/* One followed creator, in the site's own creator card (home/CreatorCard —
   the home slider's and the /creators grids'). Its pill is marked
   `.is-following` by CreatorFollowWiring, so it reads "إلغاء المتابعة" and
   unfollows; the card then drops out of the list. The bio line is filled as
   on /creators: the excerpt, else the role's label. */
export default function FollowedCreatorCard({
  creator,
  lang,
  tr,
}: {
  creator: FollowedCreator;
  lang: string;
  tr: (key: string) => string;
}) {
  const bio =
    localizedHtml(creator.excerpt, lang, { oneLine: true }) ||
    richInline(roleLabel(localized(creator.role, lang), lang));

  return (
    <CreatorCard
      creator={{
        uuid: creator.uuid,
        name: localized(creator.name, lang),
        bio,
        avatar: creator.avatar,
        followers: formatFollowers(creator.followers),
        followersCount: creator.followers,
        href: `/creators/${creator.uuid}`,
        verified: creator.verified,
      }}
      dir={lang === "en" ? "ltr" : "rtl"}
      followLabel={lang === "en" ? "Follow" : "متابعة"}
      unfollowLabel={tr("acc_unfollow")}
    />
  );
}
