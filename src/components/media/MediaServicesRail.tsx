/* The thin vertical rail pinned to the section's left edge: one tick per
   service card, the current one drawn as a filled bar. It doubles as the
   slider's pagination — each tick jumps to its card. Presentational: the
   active index lives in MediaServicesSlider, and the labels are the cards'
   own titles, already in the current language. */
export default function MediaServicesRail({
  titles,
  active,
  onSelect,
}: {
  titles: string[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="sm-services-rail">
      {titles.map((title, i) => (
        <button
          type="button"
          className={"sm-rail-tick" + (i === active ? " active" : "")}
          key={i}
          aria-label={title}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
        ></button>
      ))}
    </div>
  );
}
