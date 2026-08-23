import MediaSectionHead from "./MediaSectionHead";
import MediaWhyStrip from "./MediaWhyStrip";
import { MEDIA_WHY, type MediaWhy as MediaWhyItem } from "./media-why-data";

/* "لماذا صوت ميديا" — right-aligned heading over a horizontal card strip that
   deliberately bleeds past the container's left edge, exactly as the design
   crops it. The set is rendered twice so MediaWhyStrip's hover auto-scroll can
   loop without a seam; the clones are hidden from assistive tech. */

function WhyCard({ w, clone }: { w: MediaWhyItem; clone?: boolean }) {
  return (
    <article
      className="sm-why-card"
      style={{ "--sm-why-accent": w.accent } as React.CSSProperties}
      aria-hidden={clone || undefined}
    >
      <i className="sm-why-dot" aria-hidden="true"></i>
      <span className="sm-why-icon">{w.icon}</span>
      <h3 className="sm-why-card-title" data-i18n={w.titleKey}>
        {w.title}
      </h3>
      <p className="sm-why-card-desc" data-i18n={w.descKey}>
        {w.desc}
      </p>
    </article>
  );
}

export default function MediaWhy() {
  return (
    <section className="sm-why">
      <div className="container">
        <MediaSectionHead
          align="start"
          pill="مميزات صوت ميديا"
          pillKey="sm_why_pill"
          title="لماذا صوت ميديا"
          titleKey="sm_why_title"
          sub="صوت ميديا فريق يتن خبرته من حكاية أصعب القصص بمصداقية، وتوصّلها لجمهور عالمي"
          subKey="sm_why_sub"
        />
      </div>

      <MediaWhyStrip>
        {MEDIA_WHY.map((w) => (
          <WhyCard key={w.key} w={w} />
        ))}
        {MEDIA_WHY.map((w) => (
          <WhyCard key={w.key + "-loop"} w={w} clone />
        ))}
      </MediaWhyStrip>
    </section>
  );
}
