import SkeletonText from "@/components/ui/SkeletonText";
import { IconCalendarDays, IconChevronLeftSmall } from "@/components/ui/icons";
import { IconSectorBadge } from "./media-icons";
import { SkButton, SkHead } from "./MediaSkeletonParts";

/* The middle of /media while GET /pages/media is in flight — MediaWorks,
   MediaSectors and MediaPartners, element for element, with every string swapped for a <SkeletonText /> of the current
   copy's length. Keep them in step with those components. */

const WORKS = { pill: 7, title: 12, sub: 59, more: 22, items: 15, tag: 5, date: 11, name: 21, category: 15 };
const SECTORS = {
  pill: 8,
  title: 9,
  sub: 88,
  /** title, tagline, description, bullets */
  items: [
    [16, 17, 73, [19, 19, 20, 16]],
    [8, 16, 72, [22, 21, 17, 18]],
    [7, 16, 67, [16, 20, 18, 20]],
  ] as [number, number, number, number[]][],
};
/** The partner logos' rendered boxes (natural size capped by media.css), width
    over height — the box is what a logo of that shape lands in. */
const PARTNERS = { pill: 18, title: 12, sub: 34, logos: [3.2, 2, 3.4, 3.2, 3.9] };
const PASSES = [0, 1, 2];

function Works() {
  /* dealt round-robin into three columns, like dealIntoColumns */
  const columns = [0, 1, 2].map((c) => Math.ceil((WORKS.items - c) / 3));
  return (
    <section className="sm-works">
      <div className="container">
        <SkHead pill={WORKS.pill} title={WORKS.title} sub={WORKS.sub} />
        <div className="sm-works-wall">
          {columns.map((count, c) => (
            <div className={"sm-works-col sm-works-col-" + (c + 1)} key={c}>
              <div className="sm-works-loop">
                {PASSES.map((pass) =>
                  Array.from({ length: count }, (_, i) => (
                    <span className="sm-works-shot smk-fill" key={`${pass}-${i}`}>
                      <article className="sm-works-card">
                        <div className="sm-works-card-tags">
                          <span className="sm-works-chip sm-works-chip-tag">
                            <SkeletonText chars={WORKS.tag} />
                          </span>
                          <span className="sm-works-chip sm-works-chip-date">
                            <IconCalendarDays />
                            <span>
                              <SkeletonText chars={WORKS.date} />
                            </span>
                          </span>
                        </div>
                        <div className="sm-works-card-body">
                          <a className="sm-works-card-go" tabIndex={-1}>
                            <IconChevronLeftSmall />
                          </a>
                          <div className="sm-works-card-text">
                            <h3>
                              <SkeletonText chars={WORKS.name} />
                            </h3>
                            <p>
                              <SkeletonText chars={WORKS.category} />
                            </p>
                          </div>
                        </div>
                      </article>
                    </span>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="sm-works-more">
          <SkButton className="sm-btn-green sm-btn-lg" chars={WORKS.more} />
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  const featured = Math.floor(SECTORS.items.length / 2);
  return (
    <section className="sm-sectors">
      <div className="container">
        <SkHead pill={SECTORS.pill} title={SECTORS.title} sub={SECTORS.sub} />
        <div className="sm-sectors-grid">
          {SECTORS.items.map(([title, tagline, description, bullets], index) => (
            <article
              className={"sm-sector" + (index === featured ? " sm-sector-featured" : "")}
              key={index}
            >
              <span className="sm-sector-icon" aria-hidden="true">
                <IconSectorBadge />
              </span>
              <h3 className="sm-sector-title">
                <SkeletonText chars={title} />
              </h3>
              <p className="sm-sector-tagline">
                <SkeletonText chars={tagline} />
              </p>
              <p className="sm-sector-desc">
                <SkeletonText chars={description} />
              </p>
              <ul className="sm-sector-points">
                {bullets.map((chars, i) => (
                  <li key={i}>
                    <i aria-hidden="true"></i>
                    <span>
                      <SkeletonText chars={chars} />
                    </span>
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

function Partners() {
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {PARTNERS.logos.map((ratio, index) => (
        <span className="smk-fill smk-logo" style={{ aspectRatio: ratio }} key={index} />
      ))}
    </div>
  );
  return (
    <section className="sm-partners">
      <div className="container">
        <SkHead pill={PARTNERS.pill} title={PARTNERS.title} sub={PARTNERS.sub} />
      </div>
      <div className="marquee sm-partners-marquee">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}

export default function MediaSkeletonMiddle() {
  return (
    <>
      <Works />
      <Sectors />
      <Partners />
    </>
  );
}
