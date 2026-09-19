/* GET /pages/creators rows → the shape <CreatorCard /> renders. Shared by the
   preview grid on /creators (`grid.creators`) and the full roster on
   /creators/all (`creators`), which are the same row shape under two names.

   The cards arrive in the visitor's language and therefore carry no `data-i18n`
   key — CreatorCard is told so with `translated`, so the DOM translator never
   overwrites copy React owns.

   THE LINK IS /creators/{id}, not the uuid: those numeric ids are the range
   creators/[id] pre-renders for `output: 'export'`. A row without an id is not
   linkable. */

import { localized } from "@/lib/api/pages";
import type { CreatorsGridCreator } from "@/lib/api/creators-page";
import type { Creator } from "./CreatorCard";
import { followersLabel } from "./creators-text";

export function creatorCards(
  creators: CreatorsGridCreator[] | undefined,
  lang: string,
  labels: { experienceTitle?: string; followersSuffix?: string } = {},
): (Creator & { key: string | number })[] {
  if (!Array.isArray(creators)) return [];

  return creators.map((creator, index) => ({
    key: creator.uuid || creator.id || index,
    id: creator.id,
    photo: creator.avatar_url || "",
    name: creator.name || "",
    role: localized(creator.role, lang),
    followers: followersLabel(creator.followers_count, labels.followersSuffix || ""),
    experienceTitle: labels.experienceTitle || "",
    excerpt: localized(creator.experience_excerpt, lang),
    href: creator.id != null ? `/creators/${creator.id}` : "#",
  }));
}
