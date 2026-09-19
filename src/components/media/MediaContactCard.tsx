import { localized } from "@/lib/api/pages";
import type { MediaContactChannel } from "@/lib/api/media-contact";
import {
  IconContactChevron,
  IconContactMail,
  IconContactWhatsapp,
} from "./media-icons";
import { contactStyle } from "./media-contact-data";

/* One channel of "لنبدأ العمل سويا" — the whole card is the link. RTL puts the
   glyph tile on the right and the chevron on the left, which is the order the
   design shows; the two colours come from the channel's key so a third card
   needs no new CSS (see ./media-contact-data).

   The words and the destination are the payload's — a card with no label left
   to draw is simply not rendered, by <MediaContactSection />. */
export default function MediaContactCard({
  channel,
  index = 0,
  lang = "ar",
}: {
  channel: MediaContactChannel;
  index?: number;
  lang?: string;
}) {
  const style = contactStyle(channel.key, index);
  const hint = localized(channel.hint, lang);

  return (
    <a
      className="sm-ct-card"
      href={channel.href || "#"}
      style={{ background: style.color }}
    >
      <span className="sm-ct-card-icon" style={{ background: style.tint }}>
        {style.icon === "whatsapp" ? <IconContactWhatsapp /> : <IconContactMail />}
      </span>

      <span className="sm-ct-card-text">
        <b>{localized(channel.label, lang)}</b>
        {hint ? <small>{hint}</small> : null}
      </span>

      <span className="sm-ct-card-go" aria-hidden="true">
        <IconContactChevron />
      </span>
    </a>
  );
}
