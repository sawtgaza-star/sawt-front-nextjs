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

/* The social row of the profile. The payload is a list of { label, url } in
   the editor's order; each platform's Font Awesome class is found from the
   label first ("X / Twitter" → twitter), then from the URL's host when the
   label is one this list doesn't know. An entry with neither draws a generic
   link icon rather than vanishing. */
const SOCIAL_ICONS: { match: string[]; icon: string; label: string }[] = [
  { match: ["instagram"], icon: "fa-instagram", label: "Instagram" },
  { match: ["twitter", "x.com"], icon: "fa-twitter", label: "Twitter" },
  { match: ["linkedin"], icon: "fa-linkedin-in", label: "LinkedIn" },
  { match: ["facebook", "fb.com"], icon: "fa-facebook-f", label: "Facebook" },
  { match: ["behance"], icon: "fa-behance", label: "Behance" },
  { match: ["github"], icon: "fa-github", label: "GitHub" },
  { match: ["youtube", "youtu.be"], icon: "fa-youtube", label: "YouTube" },
  { match: ["tiktok"], icon: "fa-tiktok", label: "TikTok" },
  { match: ["dribbble"], icon: "fa-dribbble", label: "Dribbble" },
];

const FALLBACK_ICON = "fa-solid fa-link";

export type TeamSocialLink = { icon: string; label: string; href: string };

function findPlatform(text: string) {
  const lower = text.toLowerCase();
  return SOCIAL_ICONS.find((entry) => entry.match.some((m) => lower.includes(m)));
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/** The member's links, in the order they arrive, without empty ones. */
export function toSocialLinks(socials: TeamSocials | undefined): TeamSocialLink[] {
  if (!socials) return [];

  // Older payload: an object keyed by platform.
  const entries = Array.isArray(socials)
    ? socials
    : Object.entries(socials).map(([label, url]) => ({ label, url }));

  return entries
    .filter((entry): entry is { label?: string | null; url: string } =>
      Boolean(entry?.url),
    )
    .map((entry) => {
      const platform =
        findPlatform(entry.label || "") || findPlatform(hostOf(entry.url));
      return {
        icon: platform ? `fab ${platform.icon}` : FALLBACK_ICON,
        label: entry.label || platform?.label || hostOf(entry.url),
        href: entry.url,
      };
    });
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
