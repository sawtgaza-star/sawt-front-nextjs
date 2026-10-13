import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/creators-skeleton.css";
import GridSectionSkeleton from "./creators-skeleton/GridSectionSkeleton";
import { JoinSkeleton, StatsSkeleton } from "./creators-skeleton/StatsJoinSkeleton";
import CompaniesSkeleton from "./creators-skeleton/CompaniesSkeleton";
import CollabStepsSkeleton from "./creators-skeleton/CollabStepsSkeleton";
import FaqSkeleton from "./creators-skeleton/FaqSkeleton";

export { CreatorsGridSkeleton } from "./creators-skeleton/GridSectionSkeleton";
export { CollabStepsSkeleton };

/* What /creators shows while GET /pages/creators is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in creators.html and what hydration expects.

   Each section is the real one's markup (see ./creators-skeleton) with its
   texts swapped for <SkeletonText /> and its pictures for shimmer boxes, so
   it takes about the room the content arrives into and the page doesn't jump.

   The breadcrumb header itself is NOT part of it — CreatorsHero always renders
   (SiteNav lives inside it) and swaps its own copy for CreatorsHeroSkeleton. */

/** The hero's title and description (~1.25x the current copy), in the real
    elements — /creators, /creators/all and /creators/{id} send the same. */
export function CreatorsHeroSkeleton() {
  return (
    <>
      <h1 className="cr-hero-title" aria-hidden="true">
        <SkeletonText chars={24} />
      </h1>
      <p className="cr-hero-desc" aria-hidden="true">
        <SkeletonText chars={92} />
      </p>
    </>
  );
}

export default function CreatorsSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <GridSectionSkeleton />
      <StatsSkeleton />
      <JoinSkeleton />
      <CompaniesSkeleton />
      <CollabStepsSkeleton />
      <FaqSkeleton />
    </div>
  );
}
