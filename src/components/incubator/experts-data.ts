/* "فريق خبراء متخصص" — the card view model. Each item of GET /pages/incubator's
   `experts` block becomes the shape ExpertCard draws. The experience chip is
   built from the API's bare year count ("8") with the unit in the current
   language; the two hover actions only exist when the API gives them a url
   (`link_url`, and a `linkedin` entry in `socials`). */

import { localized } from "@/lib/api/pages";
import type { IncubatorExpert } from "@/lib/api/incubator-page";
import { PLACEHOLDER } from "./incubator-page-view";

export type Expert = {
  key: string;
  image: string;
  name: string;
  /* the "X سنوات" experience chip — "" when the API has no figure */
  badge: string;
  desc: string;
  /* chain-link action — omitted when the API has no link */
  profileHref?: string;
  /* LinkedIn action — omitted when the API has no LinkedIn account */
  linkedinHref?: string;
};

/** "8" → "8 سنوات" / "8 years". Arabic takes the singular from 11 up. */
function years(raw: string, lang: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (!/^\+?\d+$/.test(value)) return value;
  const n = parseInt(value.replace("+", ""), 10);
  if (lang === "en") return `${value} ${n === 1 ? "year" : "years"}`;
  if (n === 1) return "سنة واحدة";
  if (n === 2) return "سنتان";
  return `${value} ${n >= 3 && n <= 10 ? "سنوات" : "سنة"}`;
}

export function toExpert(expert: IncubatorExpert, lang: string, index: number): Expert {
  const linkedin = expert.socials?.find(
    (social) => (social.platform || "").toLowerCase() === "linkedin" && social.url,
  );

  return {
    key: expert.uuid || String(expert.id ?? index),
    image: expert.avatar_url || PLACEHOLDER.person,
    name: localized(expert.name, lang),
    badge: years(localized(expert.experience, lang), lang),
    desc: localized(expert.bio, lang),
    profileHref: expert.link_url || undefined,
    linkedinHref: linkedin?.url || undefined,
  };
}
