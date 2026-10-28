import {
  IconHandStar,
  IconPeoplePair,
  IconVideoPlay,
} from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { SupportInviteContent, SupportTrustContent } from "@/lib/api/support";

const FEATURE_ICONS = [IconPeoplePair, IconHandStar, IconVideoPlay];

/** A transparent 1×1 GIF: keeps the artwork's box (and its grey frame,
    support.css) without showing any picture the API didn't send. Also the
    loading skeleton's. */
export const BLANK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/* "ادعم المنصة التي توصل أصواتهم" — beige banner with the artwork and the two
   floating counters from the mock, from GET /pages/support's `invite` block:
   the picture, the eyebrow (`image_label`), the title — its last word carries
   the brush stroke — the counters, both buttons and the feature row (which
   may also come from the top-level `trust` block).

   THE API IS THE ONLY SOURCE: nothing here has built-in copy or artwork
   standing behind it. A field the payload leaves out renders nothing (a
   counter or button without its text is left out whole), and the picture's
   frame stays empty and grey until the API's image arrives. */
export default function SupportBanner({
  invite,
  trust,
  lang = "ar",
}: {
  invite?: SupportInviteContent;
  trust?: SupportTrustContent;
  lang?: string;
}) {
  const features = (invite?.trust?.items || trust?.items || [])
    .map((item) => localized(item.label, lang))
    .filter(Boolean);

  const eyebrow = localized(invite?.image_label, lang);
  const title = localized(invite?.title, lang).trim();
  const cut = title.lastIndexOf(" ");
  const titleHead = cut > 0 ? title.slice(0, cut) : "";
  const titleTail = cut > 0 ? title.slice(cut + 1) : title;
  const primary = localized(invite?.cta?.primary, lang);
  const secondary = localized(invite?.cta?.secondary, lang);
  const badges = [
    { className: "sp-badge sp-badge-green", badge: invite?.badges?.donors },
    { className: "sp-badge sp-badge-orange", badge: invite?.badges?.stories },
  ]
    .map(({ className, badge }) => ({
      className,
      value: (badge?.value || "").trim(),
      label: localized(badge?.label, lang),
    }))
    .filter((b) => b.value || b.label);

  return (
    <section className="sp-section sp-banner-section" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* .sp-banner is the patterned frame; .sp-banner-inner is the olive-50
            panel that sits on top of it */}
        <div className="sp-banner">
          <div className="sp-banner-inner">
            <div className="sp-banner-text">
              {eyebrow ? <p className="sp-banner-eyebrow">{eyebrow}</p> : null}
              {title ? (
                <h2 className="sp-banner-title">
                  {titleHead ? <span>{titleHead}</span> : null}{" "}
                  <span className="cr-highlight">{titleTail}</span>
                </h2>
              ) : null}

              {/* the glyphs stay the design's, matched by position */}
              {features.length ? (
                <div className="sp-banner-features">
                  {features.map((text, i) => {
                    const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                    return (
                      <div className="sp-banner-feature" key={i}>
                        <span className="sp-feature-icon">
                          <Icon />
                        </span>
                        <span>{text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* wrapper is display:contents on desktop; becomes the two-button
                  row of the mobile mock, where the outline button appears */}
              {primary || secondary ? (
                <div className="sp-banner-cta">
                  {primary ? (
                    <a href="/support/methods" className="sp-btn-green">
                      <span>{primary}</span>
                    </a>
                  ) : null}
                  {secondary ? (
                    <a href="#where-donations" className="sp-btn-where">
                      <span>{secondary}</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="sp-banner-media">
              <img src={invite?.image_url || BLANK_IMAGE} alt="" />
              {/* .counter: runCounters() counts each figure up from 0 once it
                  scrolls into view (SupportContent starts it) */}
              {badges.map((b) => (
                <div className={b.className} key={b.className}>
                  {b.value ? <span className="sp-badge-num counter">{b.value}</span> : null}
                  {b.label ? <span className="sp-badge-label">{b.label}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
