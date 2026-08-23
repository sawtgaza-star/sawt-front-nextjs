import { MEDIA_SERVICES } from "./media-services-data";

/* The thin vertical rail pinned to the section's left edge: one tick per
   service card, the current one drawn as a filled bar. It doubles as the
   slider's pagination — each tick jumps to its card. Presentational: the
   active index lives in MediaServicesSlider. */
export default function MediaServicesRail({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="sm-services-rail">
      {MEDIA_SERVICES.map((s, i) => (
        <button
          type="button"
          className={"sm-rail-tick" + (i === active ? " active" : "")}
          key={s.key}
          aria-label={s.title}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
        ></button>
      ))}
    </div>
  );
}
