// @ts-nocheck
/* eslint-disable */
import { IconEye, IconVideo, IconBook, IconUsers } from "@/components/ui/icons";
import { LogoPlatform, LogoIncubator, LogoMedia } from "./platform-logos";
import { localized } from "@/lib/api/pages";
import type { HomePlatformSections } from "@/lib/api/home";
import { splitHeading, bySortOrder } from "./home-text";

/* The API's `platform_sections` block: image, title, copy, the two figures and
   the button label all come from the payload.

   Three things stay local, because the payload doesn't carry them:

   - the branded logo over each card. The API has an `icon_url` field for it,
     but it is still null, so the bundled SVGs are used by position and an
     upload takes over the moment one exists.
   - the icon beside each figure. `stats` is plain text, with no icon at all.
   - the destination. Every card opens a route of THIS app; plain <a> (not
     <Link>) because /media and /content live in their own CSS group — see
     CLAUDE.md. */

const CARD_LOGOS = [LogoPlatform, LogoIncubator, LogoMedia];
const CARD_HREFS = ["/about", "/incubator", "/media"];
const CARD_STAT_ICONS = [
  [IconEye, IconVideo],
  [IconUsers, IconVideo],
  [IconBook, IconUsers],
];

function PlatformCard({ item, index }) {
  const Logo = CARD_LOGOS[index] || CARD_LOGOS[0];
  const statIcons = CARD_STAT_ICONS[index] || CARD_STAT_ICONS[0];

  return (
    <div className="col-md-4">
      <div className="platform-card">
        <div className="image-container">
          {item.image ? (
            <img src={item.image} alt={item.title} className="img-fluid" />
          ) : null}
          <div className="up-center-icon">
            <div className="center-img">
              {item.iconUrl ? (
                <img src={item.iconUrl} alt="" style={{ objectFit: "contain" }} />
              ) : (
                <Logo />
              )}
            </div>
          </div>
        </div>
        <div className="card-content mt-4">
          <h4 className="text-black fw-bold">{item.title}</h4>
          <p>{item.desc}</p>
          <div className="stats d-flex justify-content-start gap-3 mb-2">
            {item.stats.map((text, i) => {
              const Icon = statIcons[i] || statIcons[0];
              return (
                <span key={i} className="text-light-muted lh-lg" style={{ color: "rgba(127, 127, 127, 1)" }}>
                  <i><Icon /></i> <span>{text}</span>
                </span>
              );
            })}
          </div>
          {item.cta ? (
            <a href={item.href} className="read-more-btn text-white">
              <span>{item.cta}</span>
              <span className="arrow"><i className="fa-solid fa-angle-left"></i></span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function PlatformSections({
  data,
  lang = "ar",
}: {
  data?: HomePlatformSections;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);
  const subtitle = localized(data?.subtitle, lang);

  const items = bySortOrder(data?.items).map((item, index) => ({
    image: item.image_url,
    iconUrl: item.icon_url,
    title: localized(item.title, lang),
    desc: localized(item.description, lang),
    cta: localized(item.cta?.label, lang),
    href: CARD_HREFS[index] || CARD_HREFS[0],
    stats: (Array.isArray(item.stats) ? item.stats : [])
      .map((stat) => localized(stat, lang))
      .filter(Boolean),
  }));

  if (!title && !subtitle && !items.length) return null;

  return (
    <>
      <section className="platform-sections py-5 text-center mb-2">
        {" "}
        <div className="container">
          {" "}
          <div className="header-content mb-3">
            {" "}
            {title ? (
              <h2 className="text-black fw-bold platform-title">
                {" "}
                <span>{titleHead}</span>{" "}
                <span className="who-us">{titleTail}</span>{" "}
              </h2>
            ) : null}{" "}
            {subtitle ? (
              <p className="font-24" style={{ color: "rgba(72, 72, 72, 1)" }}>
                {subtitle}
              </p>
            ) : null}{" "}
          </div>{" "}
          <div className="row g-4 mt-2 justify-content-center">
            {items.map((item, index) => (
              <PlatformCard key={index} item={item} index={index} />
            ))}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
