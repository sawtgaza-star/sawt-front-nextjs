import "@/styles/creators-skeleton.css";
import CollabStepsSkeleton from "./creators-skeleton/CollabStepsSkeleton";
import { CollabsSkeleton } from "./creators-skeleton/ProfileSectionsSkeleton";

export { default as ProfileCardSkeleton } from "./creators-skeleton/ProfileCardSkeleton";

/* What /creators/[id] shows below the hero while GET /pages/creators/{id} is
   in flight — the hero and profile card draw their own placeholders (see
   CreatorProfileHero). Each section is the real one's markup with its texts
   and pictures swapped for shimmer, so the page keeps the shape the content
   arrives into: the collaborations block and the collaboration steps. No reel
   slider placeholder: many creators have no reels, and CreatorContent then
   draws nothing — a slider that vanishes on load would jump the page.
   (ContentDetailSkeleton stays in ./creators-skeleton, unused for now.) */
export default function CreatorProfileSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <CollabsSkeleton />
      <CollabStepsSkeleton />
    </div>
  );
}
