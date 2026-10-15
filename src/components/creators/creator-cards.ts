/* GET /pages/creators rows → the shape <CreatorCard /> renders. Shared by the
   preview grid on /creators (`grid.creators`) and the full roster on
   /creators/all (`creators`), which are the same row shape under two names.

   The cards arrive in the visitor's language and therefore carry no `data-i18n`
   key — CreatorCard is told so with `translated`, so the DOM translator never
   overwrites copy React owns.

   THE LINK IS /creators/{uuid} (creatorHref): the uuids are the range
   creators/[id] pre-renders for `output: 'export'`. A row without an
   identifier is not linkable. */

import { localized } from "@/lib/api/pages";
import { creatorHref } from "@/lib/api/creator-profile";
import type { CreatorsGridCreator } from "@/lib/api/creators-page";
import type { Creator } from "./CreatorCard";
import { followersLabel } from "./creators-text";
import { CONTENT_CATEGORIES } from "@/components/collaborate/creator/creator-form-data";
import { translations } from "@/lib/translations";

/* A creator's `role` is the content-type KEY they joined under ("art",
   "other"), not words. It is shown as that type's label: from the payload's
   own `join.form.content_types` when the page has them (/creators), else from
   the site's category list (/creators/all sends none). A role that is not a
   known key is shown as it came — an editor-typed title. */
type ContentType = { key?: string; label?: Parameters<typeof localized>[0] };

function roleLabel(role: string, lang: string, types?: ContentType[]): string {
  const key = role.trim().toLowerCase();
  const fromApi = types?.find((type) => type.key === key);
  if (fromApi?.label) return localized(fromApi.label, lang) || role;
  const known = CONTENT_CATEGORIES.find((category) => category.value === key);
  if (!known) return role;
  const dict = (translations as Record<string, Record<string, string>>)[lang];
  return dict?.[known.labelKey] || known.label;
}

export function creatorCards(
  creators: CreatorsGridCreator[] | undefined,
  lang: string,
  labels: {
    experienceTitle?: string;
    followersSuffix?: string;
    contentTypes?: ContentType[];
  } = {},
): (Creator & { key: string | number })[] {
  if (!Array.isArray(creators)) return [];

  return creators.map((creator, index) => ({
    key: creator.uuid || creator.id || index,
    id: creator.id,
    photo: creator.avatar_url || "",
    name: creator.name || "",
    role: roleLabel(localized(creator.role, lang), lang, labels.contentTypes),
    followers: followersLabel(creator.followers_count, labels.followersSuffix || ""),
    experienceTitle: labels.experienceTitle || "",
    excerpt: localized(creator.experience_excerpt, lang),
    href: creatorHref(creator),
  }));
}
