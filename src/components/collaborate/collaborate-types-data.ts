/* The options of "اختر نوع التعاون" on /collaborate.

   The copy is GET /pages/collaborate's `types` block; what is NOT in that
   payload is where each option leads and what it wears, so both are matched to
   the API's own `key`:

     - FLOW_BY_KEY — the four flows are this site's pages, not the API's. The
       one the API calls `sponsorship` is /collaborate/funding here; both
       spellings are listed so either name finds it.
     - ICON_BY_KEY — `icon_url` is null for all four, so the design's glyph is
       used (the key into COLLAB_ICON in CollaborateTypeCard; the glyphs are
       JSX, so they can't live in this plain .ts file). An icon an editor does
       upload wins over it.

   BUILT_IN is the fallback for an outage, not a second source of truth: the
   API's four are what a visitor normally reads, and these only stand in when
   the request fails, so /collaborate still opens the flows rather than showing
   an empty picker. They keep their `data-i18n` keys, which the API's copy
   doesn't need — it carries ar and en at once and `lang` picks one. */

import { localized } from "@/lib/api/pages";
import type { CollaborateTypeItem } from "@/lib/api/collaborate";

export type CollabIcon = "creator" | "funding" | "partnership" | "other";

/** One card, resolved for one language. */
export type CollaborateType = {
  /** The radio's value — the API's key, or the built-in one behind it. */
  value: string;
  /** Where picking it goes; "" for a key this site has no flow for. */
  href: string;
  icon: CollabIcon;
  /** An uploaded glyph, which replaces the design's. */
  iconUrl?: string | null;
  title: string;
  /** Only the built-in copy carries these — see the note above. */
  titleKey?: string;
  desc: string;
  descKey?: string;
};

const FLOW_BY_KEY: Record<string, string> = {
  creator: "/collaborate/creator",
  sponsorship: "/collaborate/funding",
  funding: "/collaborate/funding",
  partnership: "/collaborate/partnership",
  other: "/collaborate/other",
};

const ICON_BY_KEY: Record<string, CollabIcon> = {
  creator: "creator",
  sponsorship: "funding",
  funding: "funding",
  partnership: "partnership",
  other: "other",
};

/** The four the page shows when the request fails, in the mock's order. */
export const COLLABORATE_TYPES: CollaborateType[] = [
  {
    value: "creator",
    href: FLOW_BY_KEY.creator,
    icon: "creator",
    title: "صانع محتوى",
    titleKey: "collab_type_creator_title",
    desc: "إذا كنت Content Creator أو إعلامي وتريد التعاون مع منصة صوت.",
    descKey: "collab_type_creator_desc",
  },
  {
    value: "funding",
    href: FLOW_BY_KEY.funding,
    icon: "funding",
    title: "رعاية أو تمويل",
    titleKey: "collab_type_funding_title",
    desc: "لدعم مشاريع صوت وحاضنة صوت لصناع المحتوى بشكل مباشر أو غير مباشر.",
    descKey: "collab_type_funding_desc",
  },
  {
    value: "partnership",
    href: FLOW_BY_KEY.partnership,
    icon: "partnership",
    title: "شراكة استراتيجية",
    titleKey: "collab_type_partnership_title",
    desc: "يتم التعاون عم بمنصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتجر إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "collab_type_partnership_desc",
  },
  {
    value: "other",
    href: FLOW_BY_KEY.other,
    icon: "other",
    title: "تعاون آخر",
    titleKey: "collab_type_other_title",
    desc: "يتم التعاون عم بمنصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتجر إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "collab_type_other_desc",
  },
];

/** The payload's types as the picker draws them, or the built-in four when the
    API sent none. An entry with no key is still shown — it just has no flow to
    open, exactly like the nav links that point at "#". */
export function resolveCollaborateTypes(
  types: CollaborateTypeItem[] | undefined,
  lang: string,
): CollaborateType[] {
  const resolved = (types || [])
    .map((type, index) => {
      const key = (type.key || "").trim().toLowerCase();
      return {
        value: key || type.uuid || String(type.id ?? index),
        href: FLOW_BY_KEY[key] || "",
        icon: ICON_BY_KEY[key] || "other",
        iconUrl: type.icon_url,
        title: localized(type.title, lang),
        desc: localized(type.description, lang),
      };
    })
    // an option with no title is an empty row in the admin
    .filter((type) => type.title);

  return resolved.length ? resolved : COLLABORATE_TYPES;
}
