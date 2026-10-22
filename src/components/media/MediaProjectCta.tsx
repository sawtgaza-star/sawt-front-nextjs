import { localized, localizedHtml } from "@/lib/api/pages";
import type { MediaServiceCtaContent } from "@/lib/api/media-service";
import { ctaHref, splitBrand } from "./media-page-view";
import RichText from "@/components/ui/RichText";

/* The banner that closes a service page and a case study: a still under an
   olive wash, the headline with "صوت ميديا" in orange, and the button through
   to the booking form. Both callers now pass their own `cta` block, so every
   word and the photo are the API's. */

/* "احجز استشارة" means the booking card itself — the one /media closes with,
   under "احجز استشارتك مع خبراء صوت ميديا" — and not the contact page the
   payload's `start_project` path names, so the key is overridden here the way
   MediaServiceHero overrides `services`. Cross-page, hence the full path:
   this banner never renders on /media. */
const CONSULT_ANCHOR = "/media#sm-consult";
export default function MediaProjectCta({
  data,
  lang = "ar",
}: {
  data: MediaServiceCtaContent;
  lang?: string;
}) {
  const [lead, brand, tail] = splitBrand(localized(data.title, lang));
  const body = localizedHtml(data.body, lang);
  const buttonLabel = localized(data.button?.label, lang);

  return (
    <section className="sm-pj-cta">
      <div className="container">
        <div className="sm-pj-cta-card">
          {data.image_url ? (
            <img className="sm-pj-cta-photo" src={data.image_url} alt="" />
          ) : null}
          <span className="sm-pj-cta-veil" aria-hidden="true" />

          <div className="sm-pj-cta-text">
            {/* the slices are exact, never rejoined with a space: the English
                headline is "Sawt Media’s team…" */}
            <h2 className="sm-pj-cta-title">
              {lead}
              {brand ? <span className="sm-pj-cta-hl">{brand}</span> : null}
              {tail}
            </h2>
            {body ? <RichText as="p" className="sm-pj-cta-desc" html={body} /> : null}
            {buttonLabel ? (
              <a
                className="sm-btn-green sm-btn-lg"
                href={ctaHref(data.button, CONSULT_ANCHOR, {
                  start_project: CONSULT_ANCHOR,
                })}
              >
                <span>{buttonLabel}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
