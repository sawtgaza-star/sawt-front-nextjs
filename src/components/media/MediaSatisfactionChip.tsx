import { IconSatisfactionMedal } from "./media-icons";

/* The floating white "98% / رضا العملاء" chip. It appears three times on the
   page (twice over the hero fan, once over the about collage); `tilt` picks
   which of the design's two medal takes it carries.

   Both halves are the API's `badge` block — the hero's and the about section's
   are separate fields, so an editor can change one without the other. With no
   badge in the payload there is nothing to float, and the chip is skipped. */
export default function MediaSatisfactionChip({
  value,
  label,
  className = "",
  tilt = 0,
}: {
  value?: string;
  label?: string;
  className?: string;
  tilt?: 0 | 1;
}) {
  if (!value && !label) return null;

  return (
    <span className={"sm-chip " + className} aria-hidden="true">
      {/* RTL puts the first child on the right, which is where the design's
          olive-tinted medal badge sits */}
      <span className="sm-chip-icon">
        <IconSatisfactionMedal tilt={tilt} />
      </span>
      <span className="sm-chip-text">
        <b>{value}</b>
        <small>{label}</small>
      </span>
    </span>
  );
}
