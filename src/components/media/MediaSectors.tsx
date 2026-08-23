import MediaSectionHead from "./MediaSectionHead";
import { IconSectorBadge } from "./media-icons";
import { MEDIA_SECTORS } from "./media-sectors-data";

/* "من نخدم ؟" — three audience cards side by side; the middle one is drawn
   with the orange top rule the design highlights it with. */
export default function MediaSectors() {
  return (
    <section className="sm-sectors">
      <div className="container">
        <MediaSectionHead
          pill="القطاعات"
          pillKey="sm_sectors_pill"
          title="من نخدم ؟"
          titleKey="sm_sectors_title"
          sub="تخصص في ثلاثة قطاعات رئيسية نفهم احتياجاتها بعمق ونُقدم حلولاً إعلامية مُصمّمة لكل منها."
          subKey="sm_sectors_sub"
        />

        <div className="sm-sectors-grid">
          {MEDIA_SECTORS.map((s) => (
            <article
              className={"sm-sector" + (s.featured ? " sm-sector-featured" : "")}
              key={s.key}
            >
              <span className="sm-sector-icon" aria-hidden="true">
                <IconSectorBadge />
              </span>

              <h3 className="sm-sector-title" data-i18n={s.titleKey}>
                {s.title}
              </h3>
              <p className="sm-sector-tagline" data-i18n={s.taglineKey}>
                {s.tagline}
              </p>
              <p className="sm-sector-desc" data-i18n={s.descKey}>
                {s.desc}
              </p>

              <ul className="sm-sector-points">
                {s.points.map((p) => (
                  <li key={p.key}>
                    <i aria-hidden="true"></i>
                    <span data-i18n={p.key}>{p.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
