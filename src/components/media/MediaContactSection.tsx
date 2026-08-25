import { IconRatingStar } from "@/components/ui/icons";
import MediaContactCard from "./MediaContactCard";
import { MEDIA_CONTACT_CHANNELS } from "./media-contact-data";
import { MEDIA_PHOTOS } from "./media-photos";

/* "لنبدأ العمل سويا" — the whole body of /media/contact: the still on the right
   (RTL puts the first column there), the copy and the two channel cards on the
   left, both columns the same height so the photo runs from the headline down
   to the trust row. Stacked, the copy comes first — media.css reorders it.

   The design reuses one stock portrait for the four faces in that row and it
   isn't exported from the design file yet, so the site's placeholder stands in
   (same as the testimonials cards). */
const TRUST_PHOTO = "/assets/images/Image (أحمد المنصور).png";
const TRUST_FACES = 4;

export default function MediaContactSection() {
  return (
    <section className="sm-ct-body">
      <div className="container">
        <div className="sm-ct-row">
          <figure className="sm-ct-photo">
            <img src={MEDIA_PHOTOS.crew} alt="" />
          </figure>

          <div className="sm-ct-copy">
            <h2 className="sm-ct-title" data-i18n="sm_ct_title">
              لنبدأ العمل سويا
            </h2>
            <p className="sm-ct-desc" data-i18n="sm_ct_desc">
              نحن متواجدون للاستماع والرد على جميع تساؤلاتكم لا تترددوا في
              التواصل معنا عبر الطرق المتاحة أدناه وسنكون سعداء بخدمتكم.
            </p>

            <div className="sm-ct-cards">
              {MEDIA_CONTACT_CHANNELS.map((c) => (
                <MediaContactCard channel={c} key={c.key} />
              ))}
            </div>

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
                  <b>+150</b>{" "}
                  <span data-i18n="sm_ct_trust">عميل يثقون بنا</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
