/* =========================================================
   /media/contact's content from the Sawt API (base + error shape: ./client).

     GET /pages/media/contact → { data: { hero, intro, channels, trust,
                                          cta_key } }

   Same conventions as ./media-page: every text field arrives as { ar, en } and
   is picked per the language the site is currently in (`localized`). Nothing
   here is an upload — the banner collage and the still beside the copy are the
   design's own, so there is no `assetUrl` pass on the way out.

   `channels` is an object keyed by channel, not a list: { whatsapp: {…},
   email: {…} }. The key is what the page matches a colour and a glyph to
   (components/media/media-contact-data), so a channel it doesn't know is still
   drawn — see `contactChannels` for the order they come out in.

   As on /media, this payload is the ONLY source the page has — the sections
   carry no built-in copy behind these fields. What the editor leaves empty
   renders empty.
   ========================================================= */

import { apiFetch } from "./client";
import type { Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

/** The banner: headline over one line of copy. No breadcrumb in the payload —
    الرئيسية › تواصل معنا is the page's own (see MediaContactHero). */
export type MediaContactHeroContent = {
  title?: Localized;
  subtitle?: Localized;
};

/** "لنبدأ العمل سويا" and the paragraph under it. */
export type MediaContactIntroContent = {
  title?: Localized;
  body?: Localized;
};

/** One way to reach صوت ميديا — a whole card in the design. `label` is its
    title, `hint` the line under it (a promise for WhatsApp, the address itself
    for mail) and `value` the raw number / address `href` is built from. */
export type MediaContactChannel = {
  key?: string | null;
  label?: Localized;
  hint?: Localized;
  value?: string | null;
  href?: string | null;
};

/** The "+150 عميل يثقون بنا" row under the cards. */
export type MediaContactTrust = {
  value?: string | null;
  label?: Localized;
};

export type MediaContactPage = {
  hero?: MediaContactHeroContent;
  intro?: MediaContactIntroContent;
  channels?: Record<string, MediaContactChannel>;
  trust?: MediaContactTrust;
  /** Which CTA this page IS — `start_project`, the one the navbar points here
      (see media-page-view's ROUTE_BY_KEY). Nothing to render. */
  cta_key?: string | null;
};

export async function fetchMediaContactPage(
  signal?: AbortSignal,
): Promise<MediaContactPage | null> {
  const payload = await apiFetch<Envelope<MediaContactPage>>("/pages/media/contact", {
    signal,
  });
  return payload?.data ?? null;
}

/** The channels as a list, in the order the API named them, each carrying its
    own key — the object's key stands in when the entry doesn't repeat it. */
export function contactChannels(
  channels: Record<string, MediaContactChannel> | null | undefined,
): MediaContactChannel[] {
  if (!channels || typeof channels !== "object") return [];
  return Object.entries(channels)
    .filter(([, channel]) => channel && typeof channel === "object")
    .map(([key, channel]) => ({ ...channel, key: channel.key || key }));
}
