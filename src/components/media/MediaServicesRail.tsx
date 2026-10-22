/* The thin vertical rail pinned to the section's left edge: one tick per
   service card, the current one drawn as a filled bar. It doubles as the
   slider's pagination — each tick jumps to its card. Presentational: the
   active index lives in MediaServicesSlider, and the labels are the cards'
   own titles, already in the current language.

   `countdown` is the autoplay's time to the next card: while it runs, the
   current tick fills up over exactly that long — down the rail on desktop,
   sideways on the row of dots under the deck (≤991px, media.css); `key`
   restarts the fill with the timer. */
export default function MediaServicesRail({
  titles,
  active,
  countdown = null,
  onSelect,
}: {
  titles: string[];
  active: number;
  countdown?: { key: number; ms: number } | null;
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
        >
          {i === active && countdown ? (
            <span
              className="sm-rail-fill"
              key={countdown.key}
              style={{ animationDuration: `${countdown.ms}ms` }}
            ></span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
