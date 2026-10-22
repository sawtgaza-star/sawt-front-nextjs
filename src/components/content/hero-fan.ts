/* The hero's poster fan, shared by HeroReelsSlider (the live strip) and
   ContentPostersSkeleton (its loading placeholder), so the placeholder blocks
   sit exactly where the posters will land. */

/* The fan: a size GRADIENT out from the focused poster. Each whole step away
   (a slide progress: 0 for the focus, ±1 its neighbours, ±2 …; POSITIVE
   is a poster to the RIGHT — Swiper's own sign in RTL; HeroReelsSlider flips
   it in LTR) has a
   fixed scale, turn and look; between two steps everything is interpolated
   from the exact progress, so a moving strip grows and shrinks continuously.

   - FAN_SCALE: the focus stands out a size up; each step out is a clear notch
     smaller than the last.
   - Shrinking a poster in place would leave a wider and wider gap beside it,
     so each one is drawn in toward the focus by exactly what keeps the visual
     gap between neighbours even (fanPose).
   - FAN_TURN: the outer edge turns away, so the row faces the middle.
   - FAN_BLUR: the further out, the softer (content.css reads it as
     --fan-blur), so the focus is the clear one. No darkening — the posters
     keep their full brightness. */
export const FAN_SCALE = [1.06, 0.88, 0.76, 0.66, 0.58, 0.51, 0.45];
export const FAN_TURN = [0, 3, 6, 8, 10, 11, 12]; // rotateY deg
export const FAN_BLUR = [0, 0.8, 1.6, 2.2, 2.6, 3, 3]; // px
export const FAN_LAST = FAN_SCALE.length - 1;
/** extra room either side of the focused poster, on top of the slider's gap */
const FOCUS_GAP = 8;
const TURN_GAP = 0.021;

/** Where the poster k steps out sits (its centre, from the focus's centre)
    once the row is graded: half of each poster's scaled width plus the gap. */
export function fanCentres(width: number, gap: number): number[] {
  const centres = [0];
  for (let k = 1; k <= FAN_LAST; k++) {
    /* a turned poster reads narrower in perspective on its inner side, which
       opened each gap a little more than the last — TURN_GAP takes that back
       (measured: ~2% of the poster width per step beyond the first) */
    const between = gap + (k === 1 ? FOCUS_GAP : 0) - TURN_GAP * (k - 1) * width;
    centres.push(centres[k - 1] + ((FAN_SCALE[k - 1] + FAN_SCALE[k]) / 2) * width + between);
  }
  return centres;
}

/* The glowing planet rim in the hero backdrop. Measured on the API's
   backdrop, 1920×1006: the rim is a circle whose top sits at (960, 661) with
   a ~1900px radius. Its place on screen is worked out from the header's size
   (backdropPlacement). If the editor swaps the backdrop for one with a
   differently placed rim, these numbers need re-measuring. */
export const ARC_IMAGE = { width: 1920, height: 1006, topX: 960, topY: 661, radius: 1900 };
/** the focused poster's centre sits this share of its height above the rim */
const ARC_LIFT = 0.08;
/** how much of the rim's slope each poster takes on (1 = fully tangent) */
const ARC_TILT = 0.5;
export const ARC_MEDIA = "(min-width: 992px)";
/* Below ARC_MEDIA the header is far taller than wide for the backdrop:
   `cover` would blow the rim up into a near-flat line. There content.css
   paints it this many header-widths wide instead, pinned to the bottom (the
   strip above it is filled with the backdrop's own top colour), so the rim
   keeps its curve. Keep the two in step. */
const COMPACT_BACKDROP_WIDTH = 1.6;

/** Where the backdrop is painted inside a `width` × `height` header: its
    scale and its top-left corner, as content.css lays it out. */
export function backdropPlacement(width: number, height: number) {
  if (window.matchMedia(ARC_MEDIA).matches) {
    // background-size: cover; background-position: center
    const scale = Math.max(width / ARC_IMAGE.width, height / ARC_IMAGE.height);
    return {
      scale,
      offsetX: (width - ARC_IMAGE.width * scale) / 2,
      offsetY: (height - ARC_IMAGE.height * scale) / 2,
    };
  }
  // background-size: 160% auto; background-position: center bottom
  const scale = (width * COMPACT_BACKDROP_WIDTH) / ARC_IMAGE.width;
  return {
    scale,
    offsetX: (width - ARC_IMAGE.width * scale) / 2,
    offsetY: height - ARC_IMAGE.height * scale,
  };
}

/** Where the rim is, in the strip's own coordinates. */
export type Arc = {
  /** px to move every poster down so the focus sits on the rim */
  shift: number;
  /** the rim's radius on screen */
  radius: number;
};

/** The pose of a poster at `progress` steps from the focus. With an `arc`,
    the row bends with the rim: each poster drops by the rim's sag at its
    distance from the centre and leans along its slope. */
export function fanPose(
  progress: number,
  width: number,
  gap: number,
  centres: number[],
  arc?: Arc,
) {
  const distance = Math.min(Math.abs(progress), FAN_LAST);
  const lower = Math.floor(distance);
  const upper = Math.min(lower + 1, FAN_LAST);
  const t = distance - lower;
  const mix = (steps: number[]) => steps[lower] + (steps[upper] - steps[lower]) * t;
  const sign = progress < 0 ? -1 : 1;
  // the graded centre minus where Swiper's even row already puts it
  const pull = mix(centres) - distance * (width + gap);
  let bend = "";
  if (arc) {
    const dx = Math.min(mix(centres), arc.radius * 0.95);
    const sag = arc.radius - Math.sqrt(arc.radius * arc.radius - dx * dx);
    const tilt = ((Math.asin(dx / arc.radius) * 180) / Math.PI) * ARC_TILT;
    bend = ` translateY(${arc.shift + sag}px) rotateZ(${sign * tilt}deg)`;
  }
  return {
    distance,
    transform: `translateX(${sign * pull}px)${bend} rotateY(${sign * mix(FAN_TURN)}deg) scale(${mix(FAN_SCALE)})`,
    blur: mix(FAN_BLUR),
  };
}

/** The rim's place relative to the posters' resting row — measured once per
    layout (init / resize), not per frame. `rowTop` is the top of the row the
    posters rest in (it only ever moves sideways), `slideHeight` one poster's
    unscaled height. */
export function measureArc(
  header: Element | null,
  rowTop: number,
  slideHeight: number,
): Arc | undefined {
  if (!header || !slideHeight) return undefined;
  const box = header.getBoundingClientRect();
  const { scale, offsetY } = backdropPlacement(box.width, box.height);
  const rimTop = box.top + offsetY + ARC_IMAGE.topY * scale;
  const rowCentre = rowTop + slideHeight / 2;
  const focusHeight = slideHeight * FAN_SCALE[0];
  return {
    shift: rimTop - ARC_LIFT * focusHeight - rowCentre,
    radius: ARC_IMAGE.radius * scale,
  };
}
