import "@/styles/media-skeleton.css";
import MediaSkeletonUpper from "./MediaSkeletonUpper";
import MediaSkeletonMiddle from "./MediaSkeletonMiddle";
import MediaSkeletonConsult from "./MediaSkeletonConsult";
import MediaSkeletonLower from "./MediaSkeletonLower";

/* Everything below the hero while GET /pages/media is in flight.

   It is the real page — the twelve sections MediaContent renders, with the
   same elements and the same classes — with each string swapped for a
   <SkeletonText /> of the current copy's length and each upload (photos,
   icons, logos, avatars) left as its empty frame, painted grey by `.smk-fill`.
   So every heading, card, grid and margin is the one the content arrives
   into, at every breakpoint, and the page doesn't change height when it
   lands. The hero's own placeholders live in <MediaHero />, which always
   renders its frame — see the note there for why.

   The character counts sit at the top of each part; keep them, and the
   markup, in step with the sections when either changes.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides, so this is what ships in media.html and what hydration expects. */
export default function MediaSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <MediaSkeletonUpper />
      <MediaSkeletonMiddle />
      <MediaSkeletonConsult />
      <MediaSkeletonLower />
    </div>
  );
}
