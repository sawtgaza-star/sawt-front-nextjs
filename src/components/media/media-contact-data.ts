/* The two ways /media/contact offers to reach صوت ميديا. Each one is a whole
   card in the design — its own brand colour, its own darker tile behind the
   glyph — so the colours live here with the copy rather than in a class per
   card.

   The phone and the address are the platform's real ones (the same pair the
   site footer prints); the design mockup carries a placeholder in their place.
   `note` is the line under the title: WhatsApp gets a promise, mail gets the
   address itself, which is why only the first one is translated. */
export type MediaContactChannel = {
  key: string;
  icon: "whatsapp" | "mail";
  href: string;
  title: string;
  titleKey: string;
  note: string;
  /* absent when the note is data (an address), not a sentence */
  noteKey?: string;
  /* the card body and the tile behind its glyph */
  color: string;
  tint: string;
};

export const CONTACT_PHONE = "+972567247177";
export const CONTACT_EMAIL = "info@sawtgaza.com";

export const MEDIA_CONTACT_CHANNELS: MediaContactChannel[] = [
  {
    key: "whatsapp",
    icon: "whatsapp",
    href: "https://wa.me/" + CONTACT_PHONE.replace(/\D/g, ""),
    title: "تواصل عبر واتساب",
    titleKey: "sm_ct_wa_title",
    note: "رد فوري- متاح دائما",
    noteKey: "sm_ct_wa_note",
    color: "#00B041",
    tint: "#019639",
  },
  {
    key: "mail",
    icon: "mail",
    href: "mailto:" + CONTACT_EMAIL,
    title: "راسلنا على البريد",
    titleKey: "sm_ct_mail_title",
    note: CONTACT_EMAIL,
    color: "#0B57D0",
    tint: "#3174DE",
  },
];
