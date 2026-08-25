import {
  IconContactChevron,
  IconContactMail,
  IconContactWhatsapp,
} from "./media-icons";
import type { MediaContactChannel } from "./media-contact-data";

/* One channel of "لنبدأ العمل سويا" — the whole card is the link. RTL puts the
   glyph tile on the right and the chevron on the left, which is the order the
   design shows; the two colours come from the channel itself so a third card
   needs no new CSS. */
export default function MediaContactCard({
  channel,
}: {
  channel: MediaContactChannel;
}) {
  return (
    <a
      className="sm-ct-card"
      href={channel.href}
      style={{ background: channel.color }}
    >
      <span className="sm-ct-card-icon" style={{ background: channel.tint }}>
        {channel.icon === "whatsapp" ? <IconContactWhatsapp /> : <IconContactMail />}
      </span>

      <span className="sm-ct-card-text">
        <b data-i18n={channel.titleKey}>{channel.title}</b>
        {channel.noteKey ? (
          <small data-i18n={channel.noteKey}>{channel.note}</small>
        ) : (
          <small>{channel.note}</small>
        )}
      </span>

      <span className="sm-ct-card-go" aria-hidden="true">
        <IconContactChevron />
      </span>
    </a>
  );
}
