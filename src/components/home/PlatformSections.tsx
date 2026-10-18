// @ts-nocheck
/* eslint-disable */
import "@/styles/platform-accordion.css";
import { localized } from "@/lib/api/pages";
import type { HomePlatformSections } from "@/lib/api/home";
import { splitHeading, bySortOrder } from "./home-text";
import PlatformAccordion from "./platform-sections/PlatformAccordion";

/* The API's `platform_sections` block: image, title, copy, the figures and the
   button label all come from the payload, laid out as an expanding accordion
   (see platform-sections/PlatformAccordion).

   Two things stay local, because the payload doesn't carry them:

   - the icon of each card. The API has an `icon_url` field for it, but it is
     still null, so bundled line icons are used by position and an upload
     takes over the moment one exists.
   - the destination. Every card opens a route of THIS app; plain <a> (not
     <Link>) because /media and /content live in their own CSS group — see
     CLAUDE.md. */

const CARD_HREFS = ["/about", "/incubator", "/media"];

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
          {items.length ? <PlatformAccordion items={items} moreLabel={lang === "en" ? "View more" : "عرض المزيد"} /> : null}
        </div>{" "}
      </section>
    </>
  );
}
