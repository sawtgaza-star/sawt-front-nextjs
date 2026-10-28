"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import type { HomeReviewReel } from "@/lib/api/home";
import HeroOrbit from "./HeroOrbit";
import HeroReelCard from "./HeroReelCard";
import { pagerLabel } from "./hero-copy";
import { applyPose, poseAt, wrapRel } from "./hero-pose";

/* The latest reels, stacked inside the orbit: one in front, the others
   behind it either side.

   THE STACK IS ONE NUMBER. `pos` is how far the stack has turned, in reels
   (fractional while it moves); each card stands at `index - pos` from the
   front and is posed for exactly that spot (hero-pose), written straight to
   its CSS variables every frame — no React render, no CSS transition. A
   spring pulls `pos` toward `target`, which is what the pager, the autoplay
   and a released drag all set. So a drag can grab the stack mid-turn and it
   follows the pointer 1:1; letting go flings it on with the pointer's speed
   and it settles on the nearest reel.

   Dragging is physical in both languages: pulled left, the cards move left
   and the one on the right comes forward. Mouse, finger and pen alike; a
   vertical swipe still scrolls the page (touch-action: pan-y).

   Autoplay is a plain timer: every TURN_MS the stack turns on, on every
   device. It used to wait for the pager fill's CSS `animationend`, and on
   phones set to reduce motion (some turn it on in battery saver) that
   animation is off, so the stack never moved. The fill is only its picture
   now (its CSS duration matches TURN_MS). Dragging or the stack off screen
   holds the turn; it starts its full TURN_MS over once they end. Once the
   page has loaded the front reel plays muted (HeroReelCard). */

/** how long each reel stays in front — keep .hh-pager-fill's duration in step */
const TURN_MS = 3000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** after `load`, so the reels' files never compete with the page itself */
const PREVIEW_DELAY = 1200;
/** pixels of drag that turn the stack by one reel, as a share of a card's width */
const DRAG_STEP = 0.75;
/** how far a fling carries on: seconds of the release speed added to `pos` */
const FLING = 0.18;
/** spring: stiffness (1/s²) and damping (1/s) — critically damped, no wobble */
const STIFFNESS = 140;
const DAMPING = 2 * Math.sqrt(STIFFNESS);
/** a press that moves less than this is not a drag */
const DRAG_SLOP = 4;

type Drag = {
  id: number;
  startX: number;
  startPos: number;
  step: number;
  moved: boolean;
  samples: { x: number; t: number }[];
};

export default function HeroReelStack({
  reels,
  lang,
  loading,
}: {
  reels: HomeReviewReel[];
  lang: string;
  loading: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const motion = useRef({ pos: 0, target: 0, velocity: 0, frame: 0, last: 0, instant: false });
  const drag = useRef<Drag | null>(null);
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [preview, setPreview] = useState(false);
  const count = reels.length;

  /** Pose every card for the stack's current `pos`, and follow the front. */
  const paint = useCallback(() => {
    if (!count) return;
    const { pos } = motion.current;
    cardsRef.current.forEach((card, index) => {
      if (card) applyPose(card, poseAt(wrapRel(index - pos, count), count));
    });
    const front = ((Math.round(pos) % count) + count) % count;
    setActive((current) => (current === front ? current : front));
  }, [count]);

  /** One spring step per frame until `pos` rests on `target`. */
  const step = useCallback(
    (now: number) => {
      const m = motion.current;
      const dt = m.last ? Math.min(0.032, (now - m.last) / 1000) : 0.016;
      m.last = now;
      if (m.instant) {
        m.pos = m.target;
        m.velocity = 0;
      } else {
        m.velocity += ((m.target - m.pos) * STIFFNESS - m.velocity * DAMPING) * dt;
        m.pos += m.velocity * dt;
      }
      const resting = Math.abs(m.target - m.pos) < 0.0005 && Math.abs(m.velocity) < 0.002;
      if (resting) {
        m.pos = m.target;
        m.velocity = 0;
        // keep the numbers small: whole laps change nothing on screen
        const laps = Math.floor(m.target / count) * count;
        m.pos -= laps;
        m.target -= laps;
      }
      paint();
      if (resting) {
        m.frame = 0;
        m.last = 0;
      } else {
        m.frame = requestAnimationFrame(step);
      }
    },
    [count, paint],
  );

  const kick = useCallback(() => {
    const m = motion.current;
    if (!m.frame) m.frame = requestAnimationFrame(step);
  }, [step]);

  /** Turn the stack to a reel — the copy of it nearest the current spot. */
  const goTo = useCallback(
    (index: number) => {
      const m = motion.current;
      m.target = Math.round(m.pos + wrapRel(index - m.pos, count));
      setRound((r) => r + 1);
      kick();
    },
    [count, kick],
  );

  const next = useCallback(() => {
    const m = motion.current;
    m.target = Math.round(m.target) + 1;
    setRound((r) => r + 1);
    kick();
  }, [kick]);

  /* first paint, and again whenever the set of reels changes — including when
     the browser's fresh payload swaps a reel for another at the same count:
     React moves the kept cards to their new index, and a moved card would
     otherwise keep the pose of its old spot (two cards on one side, an empty
     slot until autoplay next turns the stack). Before the browser paints. */
  const reelKeys = reels.map((reel, index) => reel.id ?? `#${index}`).join("|");
  useLayoutEffect(() => {
    motion.current.instant = window.matchMedia(REDUCED_MOTION).matches;
    paint();
  }, [paint, loading, reelKeys]);

  useEffect(() => {
    const m = motion.current;
    return () => cancelAnimationFrame(m.frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /* the front reel plays on every phone: reduced motion or data saver used to
     switch the preview off, which read as "the video doesn't open" */
  useEffect(() => {
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setPreview(true), PREVIEW_DELAY);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, []);

  /* ---------------------------------------------------------- dragging */

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (count < 2 || (e.pointerType === "mouse" && e.button !== 0)) return;
    const width = cardsRef.current.find(Boolean)?.offsetWidth || 200;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startPos: motion.current.pos,
      step: width * DRAG_STEP,
      moved: false,
      samples: [{ x: e.clientX, t: e.timeStamp }],
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_SLOP) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    const m = motion.current;
    cancelAnimationFrame(m.frame);
    m.frame = 0;
    m.last = 0;
    m.velocity = 0;
    // pulled left (dx < 0) → the card on the right comes forward
    m.pos = d.startPos - dx / d.step;
    m.target = m.pos;
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 6) d.samples.shift();
    paint();
  };

  const release = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    setDragging(false);
    // release speed over the last few moves, in reels per second
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const span = (last.t - first.t) / 1000;
    const speed = span > 0 && e.timeStamp - last.t < 120 ? -(last.x - first.x) / d.step / span : 0;
    const m = motion.current;
    m.target = Math.round(m.pos + Math.max(-2, Math.min(2, speed * FLING)));
    m.velocity = Math.max(-12, Math.min(12, speed));
    setRound((r) => r + 1);
    kick();
  };

  const paused = offscreen || dragging;

  /* the autoplay clock — restarts with every turn (`round`) and after a pause */
  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setTimeout(next, TURN_MS);
    return () => window.clearTimeout(timer);
  }, [count, paused, active, round, next]);

  /* a pause throws the fill's progress away too, so it restarts with the timer */
  const wasPaused = useRef(paused);
  useEffect(() => {
    if (wasPaused.current && !paused) setRound((r) => r + 1);
    wasPaused.current = paused;
  }, [paused]);

  return (
    <div className="hh-stack-wrap">
      <div
        ref={stageRef}
        className={"hh-stage" + (count > 1 ? " is-draggable" : "") + (dragging ? " is-dragging" : "")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onDragStart={(e) => e.preventDefault()}
      >
        <HeroOrbit />
        <div className="hh-cards">
          {loading
            ? [0, 1, 2].map((slot) => (
                <span key={slot} className={`hh-card hh-card-skeleton hh-slot-${slot}`}></span>
              ))
            : reels.map((reel, index) => (
                <HeroReelCard
                  key={reel.id ?? index}
                  cardRef={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  reel={reel}
                  index={index}
                  front={index === active}
                  preview={preview}
                  priority={index === 0}
                />
              ))}
        </div>
      </div>

      {count > 1 ? (
        <div className={"hh-pager" + (paused ? " is-paused" : "")}>
          {reels.map((reel, index) => (
            <button
              key={reel.id ?? index}
              type="button"
              className={"hh-pager-dot" + (index === active ? " is-active" : "")}
              aria-label={`${pagerLabel(lang)} ${index + 1}`}
              aria-current={index === active || undefined}
              onClick={() => goTo(index)}
            >
              {index === active ? (
                <span key={`${active}-${round}`} className="hh-pager-fill"></span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
