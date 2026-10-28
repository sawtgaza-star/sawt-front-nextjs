import SkeletonText from "@/components/ui/SkeletonText";
import { IconRatingStar } from "@/components/ui/icons";
import { IconContactChevron, IconContactMail, IconContactWhatsapp } from "./media-icons";
import { contactStyle } from "./media-contact-data";
import { MEDIA_PHOTOS } from "./media-photos";
import "@/styles/media-skeleton.css";

/* "لنبدأ العمل سويا" while GET /pages/media/contact is in flight — the same
   elements as MediaContactSection and MediaContactCard, with the copy swapped
   for <SkeletonText /> of the current payload's length, so the still, the
   cards and the trust row are already where they will stay.

   The photos are the design's own, not the payload's (see MediaContactSection),
   so they are drawn for real from the first paint and only the words are bars.
   The banner's own bars live in <MediaContactHero />. */
const COPY = { title: 16, body: 119, trustValue: 4, trustLabel: 14 };
/** key, label, hint — the channels the payload currently sends */
const CHANNELS: [string, number, number][] = [
  ["whatsapp", 16, 19],
  ["email", 17, 17],
];
/* plain circles while the clients' logos (trust.avatars) are on their way */
const TRUST_FACES = 4;

export default function MediaContactSkeleton() {
  return (
    <section className="sm-ct-body" aria-busy="true">
      <div className="container">
        <div className="sm-ct-row">
          <figure className="sm-ct-photo">
            <img src={MEDIA_PHOTOS.crew} alt="" />
          </figure>

          <div className="sm-ct-copy" aria-hidden="true">
            <h2 className="sm-ct-title">
              <SkeletonText chars={COPY.title} />
            </h2>
            <p className="sm-ct-desc">
              <SkeletonText chars={COPY.body} />
            </p>

            <div className="sm-ct-cards">
              {CHANNELS.map(([key, label, hint], i) => {
                const style = contactStyle(key, i);
                return (
                  <a className="sm-ct-card" style={{ background: style.color }} tabIndex={-1} key={key}>
                    <span className="sm-ct-card-icon" style={{ background: style.tint }}>
                      {style.icon === "whatsapp" ? <IconContactWhatsapp /> : <IconContactMail />}
                    </span>
                    <span className="sm-ct-card-text">
                      <b>
                        <SkeletonText chars={label} />
                      </b>
                      <small>
                        <SkeletonText chars={hint} />
                      </small>
                    </span>
                    <span className="sm-ct-card-go" aria-hidden="true">
                      <IconContactChevron />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="sm-ct-trust">
              <span className="sm-ct-avatars" aria-hidden="true">
                {Array.from({ length: TRUST_FACES }, (_, i) => (
                  <span className="sm-ct-avatar-ph" key={i} />
                ))}
              </span>
              <span className="sm-ct-trust-text">
                <span className="sm-ct-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, s) => (
                    <IconRatingStar key={s} filled={s < 4} />
                  ))}
                </span>
                <span className="sm-ct-trust-line">
                  <b>
                    <SkeletonText chars={COPY.trustValue} />
                  </b>{" "}
                  <span>
                    <SkeletonText chars={COPY.trustLabel} />
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
