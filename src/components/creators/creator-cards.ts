/* GET /pages/creators rows → the shape the home page's creator card
   (components/home/CreatorCard) renders. Shared by the preview grid on
   /creators (`grid.creators`) and the full roster on /creators/all
   (`creators`), which are the same row shape under two names.

   The card is filled the way the home slider fills it (ContentCreators): the
   bio line is the creator's `experience_excerpt`, or their role when there is
   none. The cards arrive in the visitor's language, so no `data-i18n` key.

   THE LINK IS /creators/{uuid} (creatorHref): the uuids are the range
   creators/[id] pre-renders for `output: 'export'`. A row without an
   identifier is not linkable. */

import { localized, localizedHtml } from "@/lib/api/pages";
import { creatorHref } from "@/lib/api/creator-profile";
import type { CreatorsGridCreator } from "@/lib/api/creators-page";
import type { HomeCreatorCardData } from "@/components/home/CreatorCard";
import { formatFollowers } from "@/components/home/home-text";
import { richInline } from "@/lib/rich-text";
import { CONTENT_CATEGORIES } from "@/components/collaborate/creator/creator-form-data";
import { translations } from "@/lib/translations";

/* A creator's `role` is the content-type KEY they joined under ("art",
   "other"), not words. It is shown as that type's label: from the payload's
   own `join.form.content_types` when the page has them (/creators), else from
   the site's category list (/creators/all sends none). A role that is not a
   known key is shown as it came — an editor-typed title. */
type ContentType = { key?: string; label?: Parameters<typeof localized>[0] };

export function roleLabel(role: string, lang: string, types?: ContentType[]): string {
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
  labels: { contentTypes?: ContentType[] } = {},
): (HomeCreatorCardData & { key: string | number })[] {
  if (!Array.isArray(creators)) return [];

  return creators.map((creator, index) => ({
    key: creator.uuid || creator.id || index,
    uuid: creator.uuid || (creator.id != null ? String(creator.id) : ""),
    name: localized(creator.name, lang),
    // the excerpt arrives as CMS HTML — its formatting kept, on one run so
    // the card's two-line clamp applies
    bio:
      localizedHtml(creator.experience_excerpt, lang, { oneLine: true }) ||
      richInline(roleLabel(localized(creator.role, lang), lang, labels.contentTypes)),
    avatar: creator.avatar_url,
    followers: formatFollowers(creator.followers_count),
    followersCount: creator.followers_count,
    href: creatorHref(creator),
    verified: creator.is_verified === true,
  }));
}
