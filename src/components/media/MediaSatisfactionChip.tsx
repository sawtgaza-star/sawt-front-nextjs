import { IconSatisfactionMedal } from "./media-icons";

/* The floating white "98% / رضا العملاء" chip. It appears three times on the
   page (twice over the hero fan, once over the about collage); `tilt` picks
   which of the design's two medal takes it carries. */
export default function MediaSatisfactionChip({
  className = "",
  tilt = 0,
}: {
  className?: string;
  tilt?: 0 | 1;
}) {
  return (
    <span className={"sm-chip " + className} aria-hidden="true">
      {/* RTL puts the first child on the right, which is where the design's
          olive-tinted medal badge sits */}
      <span className="sm-chip-icon">
        <IconSatisfactionMedal tilt={tilt} />
      </span>
      <span className="sm-chip-text">
        <b>98%</b>
        <small data-i18n="sm_chip_satisfaction">رضا العملاء</small>
      </span>
    </span>
  );
}
