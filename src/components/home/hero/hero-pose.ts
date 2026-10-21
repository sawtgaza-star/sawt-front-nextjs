/* The reel stack's poses as a CONTINUOUS function of where a card stands, so
   a drag can hold the stack anywhere between two reels and every card is
   posed exactly for that spot (HeroReelStack writes the result into each
   card's CSS variables, every frame).

   `rel` is a card's place relative to the front: 0 in front, -1 the card
   behind on the left, +1 the one on the right. Past ±1 a card is on its way
   round the back to the other side: it slides in behind the front card and
   reaches the middle (x = 0) at ±half the stack, which is where it wraps —
   so the pose is the same on both sides of the wrap and nothing jumps. */

/** the side cards' offset from the front, as a share of a card's width */
const SIDE_X = 70;
const FRONT_DEPTH = 40;
const SIDE_DEPTH = -140;
const BACK_DEPTH = -240;
const SIDE_SCALE = 0.92;
const BACK_SCALE = 0.8;
const SIDE_TURN = 16;
/* How far each card fades into the page — a veil of the page's own cream
   over an opaque card, not card opacity, so the orbit's badges behind it
   never show through. */
const SIDE_VEIL = 0.3;
const BACK_VEIL = 0.65;
const SIDE_SATURATE = 0.75;

export type Pose = {
  x: number; // % of the card's width
  depth: number; // px
  scale: number;
  turn: number; // deg
  veil: number;
  saturate: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** `rel` wrapped into [-count/2, count/2). */
export function wrapRel(rel: number, count: number): number {
  const half = count / 2;
  return ((((rel + half) % count) + count) % count) - half;
}

export function poseAt(rel: number, count: number): Pose {
  const side = Math.sign(rel) || 1;
  const away = Math.abs(rel);
  if (away <= 1) {
    return {
      x: rel * SIDE_X,
      depth: lerp(FRONT_DEPTH, SIDE_DEPTH, away),
      scale: lerp(1, SIDE_SCALE, away),
      turn: -rel * SIDE_TURN,
      veil: lerp(0, SIDE_VEIL, away),
      saturate: lerp(1, SIDE_SATURATE, away),
    };
  }
  // round the back: 1 → count/2 maps onto 0 → 1
  const back = Math.min(1, (away - 1) / Math.max(count / 2 - 1, 0.5));
  return {
    x: side * SIDE_X * (1 - back),
    depth: lerp(SIDE_DEPTH, BACK_DEPTH, back),
    scale: lerp(SIDE_SCALE, BACK_SCALE, back),
    turn: -side * SIDE_TURN * (1 - back),
    veil: lerp(SIDE_VEIL, BACK_VEIL, back),
    saturate: SIDE_SATURATE,
  };
}

/** Writes a pose into a card's CSS variables (home-hero.css .hh-card). */
export function applyPose(card: HTMLElement, pose: Pose): void {
  const style = card.style;
  style.setProperty("--hh-x", `${pose.x.toFixed(3)}%`);
  style.setProperty("--hh-depth", `${pose.depth.toFixed(2)}px`);
  style.setProperty("--hh-scale", pose.scale.toFixed(4));
  style.setProperty("--hh-turn", `${pose.turn.toFixed(3)}deg`);
  style.setProperty("--hh-veil", pose.veil.toFixed(3));
  style.setProperty("--hh-saturate", pose.saturate.toFixed(3));
}
