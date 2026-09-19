/* What GET /pages/media/contact does NOT send: how each channel is drawn.
   Every word on the page comes from the payload (see lib/api/media-contact);
   what is left here is the card's brand colour, the darker tile behind its
   glyph, and which glyph that is.

   The channel's own key is the match — `whatsapp`, `email` — so the API can
   reword a card, or swap the number behind it, without touching this file. A
   key nothing here knows about is still a card: it is dealt a palette from the
   list below rather than rendering unstyled, which is what lets an editor add
   a third channel with no new CSS (media.css: `.sm-ct-card`). */
export type MediaContactStyle = {
  icon: "whatsapp" | "mail";
  /* the card body and the tile behind its glyph */
  color: string;
  tint: string;
};

const WHATSAPP: MediaContactStyle = { icon: "whatsapp", color: "#00B041", tint: "#019639" };
const MAIL: MediaContactStyle = { icon: "mail", color: "#0B57D0", tint: "#3174DE" };

/** The two channels the design draws, by the key the API sends them under. */
export const CONTACT_STYLE_BY_KEY: Record<string, MediaContactStyle> = {
  whatsapp: WHATSAPP,
  phone: WHATSAPP,
  email: MAIL,
  mail: MAIL,
};

/** Dealt to a channel the design has no card for, in the order they arrive. */
const FALLBACK_STYLES: MediaContactStyle[] = [MAIL, WHATSAPP];

export function contactStyle(key: string | null | undefined, index: number): MediaContactStyle {
  return (
    (key && CONTACT_STYLE_BY_KEY[key]) || FALLBACK_STYLES[index % FALLBACK_STYLES.length]
  );
}
