import { localized } from "@/lib/api/pages";
import { sortItems, type MediaPartnersContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";

/* "شركاء النجاح" — the client logos on the site-wide automatic .marquee (its
   animation lives in style.css, which the (main) layout already loads). The
   set is rendered twice so the CSS translate loops without a seam; the second
   group is hidden from assistive tech.

   The logos are the API's now, uploads and all, so a partner can carry a link
   (`url`) — with none, the logo is just an image. */
function Logos({
  items,
  hidden = false,
}: {
  items: { name?: string | null; logo_url?: string | null; url?: string | null }[];
  hidden?: boolean;
}) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((partner, index) => {
        const logo = <img src={partner.logo_url!} alt={partner.name || ""} />;
        /* An unlinked partner stays a bare <img>, which is what
           `.sm-partners-marquee .marquee-group img` sizes as a flex item; the
           anchor around a linked one takes that role instead (media.css). */
        return partner.url ? (
          <a
            href={partner.url}
            key={index}
            target="_blank"
            rel="noreferrer"
            tabIndex={hidden ? -1 : undefined}
          >
            {logo}
          </a>
        ) : (
          <span key={index} style={{ display: "contents" }}>
            {logo}
          </span>
        );
      })}
    </div>
  );
}

export default function MediaPartners({
  data,
  lang = "ar",
}: {
  data?: MediaPartnersContent;
  lang?: string;
}) {
  const items = sortItems(data?.items).filter((partner) => partner.logo_url);
  if (!data || !items.length) return null;

  return (
    <section className="sm-partners">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />
      </div>

      <div className="marquee sm-partners-marquee">
        <Logos items={items} />
        <Logos items={items} hidden />
      </div>
    </section>
  );
}
