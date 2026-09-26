import { localized } from "@/lib/api/pages";
import type { IncubatorEmployer, IncubatorEmployersContent } from "@/lib/api/incubator-page";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { sortItems } from "./incubator-page-view";

/* "يعمل خريجونا لدى جهات موثوقة" — the API's `employers` block on the home
   page's automatic logo slider (the .marquee strip from MidBanner /
   SupportPartners — animation lives in style.css, which the (main) layout
   already loads). An employer with no logo uploaded yet is shown by name, and
   one with a `url` links to it. */
function Employer({ employer }: { employer: IncubatorEmployer }) {
  const mark = employer.logo_url ? (
    <img src={employer.logo_url} alt={employer.name || ""} />
  ) : (
    <span className="inc-grads-name">{employer.name}</span>
  );

  return employer.url ? (
    <a href={employer.url} target="_blank" rel="noopener noreferrer">
      {mark}
    </a>
  ) : (
    mark
  );
}

export default function GraduatesPartners({
  data,
  lang,
}: {
  data?: IncubatorEmployersContent;
  lang: string;
}) {
  const items = sortItems(data?.items).filter((item) => item.logo_url || item.name);
  if (!data || !items.length) return null;

  return (
    <section className="inc-grads">
      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />
      </div>

      <div className="marquee">
        <div className="marquee-group">
          {items.map((employer, index) => (
            <Employer employer={employer} key={index} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((employer, index) => (
            <Employer employer={employer} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
