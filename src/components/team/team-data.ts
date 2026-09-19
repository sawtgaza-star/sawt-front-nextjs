/* What the team pages still carry themselves, now that the roster, the filter
   pills and every profile come from GET /pages/team (see lib/api/team).

   Only two things are left, both because no payload has a field for them: the
   fallback portrait for a member an editor hasn't uploaded a photo for, and
   the icon class each social platform draws with. The detail page's "شاهد
   اعمالي في صوت ميديا" button is in the same position — it is written into
   TeamMemberProfile with its `data-i18n` key, exactly as before. */

import { localized } from "@/lib/api/pages";
import type { TeamMember, TeamSocials } from "@/lib/api/team";

/** Shown when a member has no uploaded photo. */
export const PLACEHOLDER_PHOTO = "/assets/images/team.png";

/* The social row of the profile. The payload is an object keyed by platform;
   this is the order the mock draws them in and the Font Awesome class each
   one uses — a platform the member left empty is simply skipped. */
const SOCIAL_ICONS: { key: keyof TeamSocials; icon: string; label: string }[] = [
  { key: "instagram", icon: "fa-instagram", label: "Instagram" },
  { key: "twitter", icon: "fa-twitter", label: "Twitter" },
  { key: "linkedin", icon: "fa-linkedin-in", label: "LinkedIn" },
  { key: "facebook", icon: "fa-facebook-f", label: "Facebook" },
];

export type TeamSocialLink = { icon: string; label: string; href: string };

/** The member's links, in the mock's order, without the ones they don't use. */
export function toSocialLinks(socials: TeamSocials | undefined): TeamSocialLink[] {
  if (!socials) return [];
  return SOCIAL_ICONS.filter((entry) => socials[entry.key]).map((entry) => ({
    icon: entry.icon,
    label: entry.label,
    href: socials[entry.key] as string,
  }));
}

/** One member as the card draws it: already in the reader's language, so it
    carries no `data-i18n` key any more. `uuid` is the identifier — the detail
    endpoint resolves that alone (see lib/api/team). */
export type TeamCardMember = {
  uuid: string;
  photo: string;
  name: string;
  role: string;
};

/** The API's `members` as cards. A member the payload gave no uuid keeps its
    position but links nowhere, rather than to somebody else's profile. */
export function toCards(
  members: TeamMember[] | undefined,
  lang: string,
): TeamCardMember[] {
  if (!Array.isArray(members)) return [];
  return members.map((member) => ({
    uuid: member.uuid || "",
    photo: member.image || PLACEHOLDER_PHOTO,
    name: localized(member.name, lang),
    role: localized(member.role, lang),
  }));
}
