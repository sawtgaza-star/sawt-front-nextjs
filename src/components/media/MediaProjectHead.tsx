/* The heading every block of the case study opens with: a small olive dot on
   the start side (right in RTL), blinking like a spotlight, and the title next
   to it. `dot` recolours it — the case study keeps the default, the service
   pages open their blocks with the design's orange one. */
export default function MediaProjectHead({
  title,
  titleKey,
  dot,
}: {
  title: string;
  titleKey: string;
  dot?: "olive" | "orange";
}) {
  return (
    <h2 className="sm-pj-head">
      <span
        className={"sm-pj-dot" + (dot ? " sm-pj-dot-" + dot : "")}
        aria-hidden="true"
      />
      <span data-i18n={titleKey}>{title}</span>
    </h2>
  );
}
