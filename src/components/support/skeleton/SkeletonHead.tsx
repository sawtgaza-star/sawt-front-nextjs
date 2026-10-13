import SkeletonText from "./SkeletonCopy";

/* SupportSectionHead while loading: the same .cr-section-head / h2 / p, with
   the title and subtitle as <SkeletonText /> of the copy's length. `sub` is
   left out when the section has none. */
export default function SkeletonHead({ title, sub }: { title: number; sub?: number }) {
  return (
    <div className="cr-section-head">
      <h2 className="cr-section-title">
        <SkeletonText chars={title} />
      </h2>
      {sub ? (
        <p className="cr-section-sub">
          <SkeletonText chars={sub} />
        </p>
      ) : null}
    </div>
  );
}
