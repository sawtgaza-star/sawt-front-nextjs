import { localized } from "@/lib/api/pages";
import {
  contactChannels,
  type MediaContactIntroContent,
  type MediaContactChannel,
  type MediaContactTrust,
} from "@/lib/api/media-contact";
import { IconRatingStar } from "@/components/ui/icons";
import MediaContactCard from "./MediaContactCard";
import { MEDIA_PHOTOS } from "./media-photos";

/* "لنبدأ العمل سويا" — the whole body of /media/contact: the still on the right
   (RTL puts the first column there), the copy and the channel cards on the
   left, both columns the same height so the photo runs from the headline down
   to the trust row. Stacked, the copy comes first — media.css reorders it.

   Every word comes from GET /pages/media/contact, cards included; only the two
   photos are the design's own. The still isn't in the payload, and the design
   reuses one stock portrait for the four faces in the trust row which isn't
   exported from the design file yet, so the site's placeholder stands in (same
   as the testimonials cards). */
const TRUST_PHOTO = "/assets/images/Image (أحمد المنصور).png";
const TRUST_FACES = 4;

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
  const body = localized(intro?.body, lang);
  const cards = contactChannels(channels).filter((c) => localized(c.label, lang));
  const trustValue = (trust?.value || "").trim();
  const trustLabel = localized(trust?.label, lang);

  return (
    <section className="sm-ct-body">
      <div className="container">
        <div className="sm-ct-row">
          <figure className="sm-ct-photo">
            <img src={MEDIA_PHOTOS.crew} alt="" />
          </figure>

          <div className="sm-ct-copy">
            {title ? <h2 className="sm-ct-title">{title}</h2> : null}
            {body ? <p className="sm-ct-desc">{body}</p> : null}

            {cards.length ? (
              <div className="sm-ct-cards">
                {cards.map((c, i) => (
                  <MediaContactCard channel={c} index={i} lang={lang} key={c.key || i} />
                ))}
              </div>
            ) : null}

            {trustValue || trustLabel ? (
              <div className="sm-ct-trust">
                <span className="sm-ct-avatars" aria-hidden="true">
                  {Array.from({ length: TRUST_FACES }, (_, i) => (
                    <img src={TRUST_PHOTO} alt="" key={i} />
                  ))}
                </span>

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
