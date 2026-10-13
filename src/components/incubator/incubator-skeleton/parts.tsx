import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/incubator-skeleton.css";

/* Building blocks shared by the /incubator and /courses/[id] skeletons. */

/** An empty SVG of the given size: as an <img> src it gives the placeholder
    the photo's intrinsic aspect ratio, for the slots whose height is the
    image's own (`height: auto`). Fixed boxes don't care what it says. */
function ratioSrc(width: number, height: number): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'/%3E`;
}

/** A photo slot, drawn as a grey block with the real <img>'s classes (so the
    descendant `img` rules of incubator.css / course.css still size it).
    `ratio` is [width, height] of the photo the API currently sends. */
export function SkImg({
  className,
  ratio = [1, 1],
}: {
  className?: string;
  ratio?: [number, number];
}) {
  return (
    <img
      className={(className ? className + " " : "") + "incskel-media"}
      src={ratioSrc(ratio[0], ratio[1])}
      alt=""
      aria-hidden="true"
    />
  );
}

/** IncubatorSectionHead with its two lines of copy swapped for filler. */
export function SkSectionHead({ title, sub }: { title: number; sub: number }) {
  return (
    <div className="inc-section-head">
      <h2 className="inc-section-title">
        <SkeletonText chars={title} />
      </h2>
      <p className="inc-section-sub">
        <SkeletonText chars={sub} />
      </p>
    </div>
  );
}

/** The decorative branch some sections open with — a static asset, so the
    skeleton draws it as the page will. */
export function Leaf({ className }: { className: string }) {
  return <img src="/assets/images/leaf_cutout.png" className={className} alt="" />;
}
