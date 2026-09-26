import { splitTitle } from "./incubator-page-view";

/* The heading + one-liner every /incubator section opens with. The API sends
   the heading as one string; splitTitle() finds the olive tail the design
   paints (see incubator-page-view). IncubatorTitle is the bare <h2>, for the
   sections that lay their heading out without the .inc-section-head box. */
export function IncubatorTitle({
  title,
  className = "inc-section-title",
}: {
  title: string;
  className?: string;
}) {
  const [head, highlight, tail] = splitTitle(title);
  if (!highlight && !head) return null;

  return (
    <h2 className={className}>
      {head ? <span>{head}</span> : null}
      {head && highlight ? " " : null}
      {highlight ? <span className="inc-highlight">{highlight}</span> : null}
      {tail}
    </h2>
  );
}

export default function IncubatorSectionHead({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  if (!title && !sub) return null;

  return (
    <div className="inc-section-head">
      <IncubatorTitle title={title} />
      {sub ? <p className="inc-section-sub">{sub}</p> : null}
    </div>
  );
}
