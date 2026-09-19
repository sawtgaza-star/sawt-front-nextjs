// @ts-nocheck
/* eslint-disable */
import { localized } from "@/lib/api/pages";
import type { HomePartners } from "@/lib/api/home";
import { splitHeading, bySortOrder } from "./home-text";

/* The API's `partners` block. The marquee scrolls one group of logos twice —
   the second copy is what makes the loop seamless, so it is rendered from the
   same list and kept `aria-hidden`, exactly as the legacy markup did with its
   five repeated images.

   `name` comes through empty from the API today; it is used as the alt text
   when an editor fills it in, and falls back to nothing rather than to a
   made-up label. */
function PartnerLogos({ partners, hidden }) {
  return (
    <div className="marquee-group" aria-hidden={hidden ? "true" : undefined}>
      {" "}
      {partners.map((partner, index) => (
        <img key={index} src={partner.logo} alt={partner.name} />
      ))}{" "}
    </div>
  );
}

export default function MidBanner({
  data,
  lang = "ar",
}: {
  data?: HomePartners;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 2);
  const subtitle = localized(data?.subtitle, lang);

  const partners = bySortOrder(data?.items)
    .map((item) => ({ logo: item.logo_url, name: item.name || "" }))
    .filter((partner) => partner.logo);

  if (!title && !subtitle && !partners.length) return null;

  return (
    <>
      <section className="mt-3">
        {" "}
        <div className="partners-section text-center mb-4">
          {" "}
          {title ? (
            <h1 className="partners-title fw-bold" style={{ fontSize: "40px" }}>
              {" "}
              <span>{titleHead}</span>{" "}
              <span className="partners-highlight who-us">{titleTail}</span>{" "}
            </h1>
          ) : null}{" "}
          {subtitle ? (
            <p className="partners-description font-24">{subtitle}</p>
          ) : null}{" "}
        </div>{" "}
        <div className="marquee">
          {" "}
          <PartnerLogos partners={partners} hidden={false} />{" "}
          <PartnerLogos partners={partners} hidden={true} />{" "}
        </div>{" "}
      </section>
    </>
  );
}
