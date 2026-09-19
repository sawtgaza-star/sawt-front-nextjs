/* Platform → mark, shared by the two pieces of site chrome that render an
   editor-managed social row: the footer's bottom bar and the navbar's top bar.
   Both are fed the same { platform, url } shape by the API (SocialLink in
   lib/api/layout.ts), so the mapping lives in one place rather than drifting
   between them.

   WHICH accounts appear is the editor's; how each one is DRAWN is not. The
   platforms the site has marks for use them (ui/icons, painted in currentColor
   so each row can colour them). Anything else — the admin can add tiktok,
   snapchat… — falls back to its Font Awesome glyph, so a platform nobody drew
   still shows up as something recognisable; it will read heavier than the
   marks beside it, which is the cue that one is worth drawing.

   Font Awesome 6.2.1 is what app/layout.tsx loads (fa-x-twitter and fa-threads
   landed later, so "x" borrows the bird). A platform in neither table still
   gets a link, drawn with the generic chain icon. */

import type { ComponentType } from "react";
import {
  IconSocialInstagram,
  IconSocialX,
  IconSocialTelegram,
  IconSocialFacebook,
  IconSocialLinkedin,
  IconSocialYoutube,
} from "@/components/ui/icons";

const SOCIAL_MARKS: Record<string, ComponentType> = {
  instagram: IconSocialInstagram,
  twitter: IconSocialX,
  x: IconSocialX,
  telegram: IconSocialTelegram,
  facebook: IconSocialFacebook,
  linkedin: IconSocialLinkedin,
  youtube: IconSocialYoutube,
};

const SOCIAL_ICONS: Record<string, string> = {
  instagram: "fab fa-instagram",
  twitter: "fab fa-twitter",
  x: "fab fa-twitter",
  telegram: "fab fa-telegram-plane",
  facebook: "fab fa-facebook-f",
  linkedin: "fab fa-linkedin-in",
  youtube: "fab fa-youtube",
  tiktok: "fab fa-tiktok",
  whatsapp: "fab fa-whatsapp",
  snapchat: "fab fa-snapchat-ghost",
  pinterest: "fab fa-pinterest-p",
  soundcloud: "fab fa-soundcloud",
  spotify: "fab fa-spotify",
  github: "fab fa-github",
};

export const GENERIC_SOCIAL_ICON = "fas fa-link";

/** The Font Awesome class for a platform slug, however the admin cased it. */
export function socialIcon(platform: string | null | undefined): string {
  return SOCIAL_ICONS[(platform || "").trim().toLowerCase()] || GENERIC_SOCIAL_ICON;
}

/** The design's own mark for a platform, or undefined when it draws none —
    the caller then falls back to `socialIcon`. */
export function socialMark(platform: string | null | undefined): ComponentType | undefined {
  return SOCIAL_MARKS[(platform || "").trim().toLowerCase()];
}
