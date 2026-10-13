import SkeletonText from "@/components/ui/SkeletonText";

/* <SkeletonText /> for /support's skeleton, with the counts given as the
   API copy's own lengths. The filler runs a little narrower than this page's
   copy, so the count is scaled up to wrap to about as many lines. */
const WIDTH = 1.25;

export default function SkeletonCopy({ chars }: { chars: number }) {
  return <SkeletonText chars={Math.round(chars * WIDTH)} />;
}
