import SkeletonText from "@/components/ui/SkeletonText";
import { SkImg } from "./parts";
import { HERO } from "./skeleton-data";

/* The loading state of IncubatorHero's three slots — its headline block, its
   collage and its stats strip — as the real markup with the copy swapped for
   filler (see ./skeleton-data), so the hero is already its final height. */

export function HeroTextSkeleton() {
  return (
    <>
      <h1 className="inc-hero-title">
        <SkeletonText chars={HERO.title} />
        <br />
        <span className="inc-hero-title-orange">
          <SkeletonText chars={HERO.titleOrange} />
        </span>
      </h1>
      <p className="inc-hero-desc">
        <SkeletonText chars={HERO.desc} />
      </p>
      <a className="inc-btn-green incskel-media" aria-hidden="true">
        <span>
          <SkeletonText chars={HERO.cta} />
        </span>
        <i className="fa-solid fa-angle-left"></i>
      </a>
    </>
  );
}

export function HeroMediaSkeleton() {
  const [top, bottom] = HERO.badges;
  return (
    <>
      <SkImg className="inc-hero-img inc-hero-img--composite" ratio={HERO.image} />
      <div className="inc-hero-badge inc-hero-badge-green incskel-media">
        <b>
          <SkeletonText chars={top[0]} />
        </b>
        <span>
          <SkeletonText chars={top[1]} />
        </span>
      </div>
      <div className="inc-hero-badge inc-hero-badge-orange incskel-media">
        <b>
          <SkeletonText chars={bottom[0]} />
        </b>
        <span>
          <SkeletonText chars={bottom[1]} />
        </span>
      </div>
    </>
  );
}

export function HeroStatsSkeleton() {
  return (
    <>
      {HERO.stats.map((label, index) => (
        <div className="inc-stat" key={index}>
          <span className="inc-stat-icon incskel-media" aria-hidden="true">
            <svg viewBox="0 0 48 48" />
          </span>
          <p className="inc-stat-value">
            <SkeletonText chars={HERO.statValue} />
          </p>
          <p className="inc-stat-label">
            <SkeletonText chars={label} />
          </p>
        </div>
      ))}
    </>
  );
}
