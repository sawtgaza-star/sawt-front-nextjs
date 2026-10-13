import SkeletonText from "@/components/ui/SkeletonText";

/* The orange-bar heading every course section opens with, its label as
   filler (the real one is a t() label, which the skeleton can't read before
   hydration without risking a mismatch). */
export function SkSecHead({ chars }: { chars: number }) {
  return (
    <div className="crs-sec-head">
      <span className="crs-sec-bar" aria-hidden="true"></span>
      <h2 className="crs-sec-title">
        <SkeletonText chars={chars} />
      </h2>
    </div>
  );
}

/** The section's decorative branch, drawn empty: it is absolutely placed, but
    the sections' spacing rules count it as their first child, so it has to
    be there for the heading to sit where it will. */
export function SkLeaf({ className, size }: { className: string; size: [number, number] }) {
  const [width, height] = size;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    />
  );
}
