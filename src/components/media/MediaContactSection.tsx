import { localized, localizedHtml } from "@/lib/api/pages";
import {
  contactChannels,
  type MediaContactIntroContent,
  type MediaContactChannel,
  type MediaContactTrust,
} from "@/lib/api/media-contact";
import { IconRatingStar } from "@/components/ui/icons";
import MediaContactCard from "./MediaContactCard";
import { MEDIA_PHOTOS } from "./media-photos";
import RichText from "@/components/ui/RichText";

/* "لنبدأ العمل سويا" — the whole body of /media/contact: the still on the right
   (RTL puts the first column there), the copy and the channel cards on the
   left, both columns the same height so the photo runs from the headline down
   to the trust row. Stacked, the copy comes first — media.css reorders it.

   Every word comes from GET /pages/media/contact, cards included; only the
   still is the design's own (it isn't in the payload). The trust row's faces
   are the payload's `trust.avatars` — the clients' logos — every one of them,
   however many the API sends, last one first; a logo with no url is skipped. */

export default function MediaContactSection({
  intro,
  channels,
  trust,
  lang = "ar",
}: {
  intro?: MediaContactIntroContent;
  channels?: Record<string, MediaContactChannel>;
  trust?: MediaContactTrust;
  lang?: string;
}) {
  const title = localized(intro?.title, lang);
  const body = localizedHtml(intro?.body, lang);
  const cards = contactChannels(channels).filter((c) => localized(c.label, lang));
  const trustLabel = localized(trust?.label, lang);
  // shown in reverse of the API's order
  const trustLogos = (Array.isArray(trust?.avatars) ? trust.avatars : [])
    .filter((avatar) => (avatar?.avatar_url || "").trim())
    .reverse();
  /* the number counts the logos actually shown, so the two always agree —
     the payload's `value` only stands in when there are no logos */
  const trustValue = trustLogos.length
    ? String(trustLogos.length)
    : (trust?.value || "").trim();

  return (
    <section className="sm-ct-body">
      <div className="container">
        <div className="sm-ct-row">
          <figure className="sm-ct-photo">
            <img src={MEDIA_PHOTOS.crew} alt="" />
          </figure>

          <div className="sm-ct-copy">
            {title ? <h2 className="sm-ct-title">{title}</h2> : null}
            {body ? <RichText as="p" className="sm-ct-desc" html={body} /> : null}

            {cards.length ? (
              <div className="sm-ct-cards">
                {cards.map((c, i) => (
                  <MediaContactCard channel={c} index={i} lang={lang} key={c.key || i} />
                ))}
              </div>
            ) : null}

            {trustValue || trustLabel ? (
              <div className="sm-ct-trust">
                {trustLogos.length ? (
                  <span className="sm-ct-avatars">
                    {trustLogos.map((avatar, i) => (
                      <img
                        src={avatar.avatar_url as string}
                        alt={avatar.name || ""}
                        title={avatar.name || undefined}
                        key={i}
                      />
                    ))}
                  </span>
                ) : null}

                <span className="sm-ct-trust-text">
                  <span className="sm-ct-stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, s) => (
                      <IconRatingStar key={s} filled={s < 4} />
                    ))}
                  </span>
                  <span className="sm-ct-trust-line">
                    <b>{trustValue}</b> <span>{trustLabel}</span>
                  </span>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
