import { IconMicOutline } from "@/components/ui/icons";

/* The rings behind the reel stack: a warm glow, two concentric orbits and a
   dashed one turning the other way, with mic badges riding the outer ring —
   the inner one passes behind the side cards, where a badge would show
   through them.
   Each orbit turns as a whole and every badge counter-turns at the same
   speed, so the mics travel round the ring while staying upright. Purely
   decorative — all of it is CSS (home-hero.css). */

/** Where each badge starts on its ring, in degrees. */
const OUTER_MICS = [20, 110, 200, 290];

function Mics({ angles }: { angles: number[] }) {
  return (
    <>
      {angles.map((angle) => (
        <span key={angle} className="hh-mic-arm" style={{ transform: `rotate(${angle}deg)` }}>
          <span className="hh-mic" style={{ ["--hh-start" as string]: `${-angle}deg` }}>
            <IconMicOutline />
          </span>
        </span>
      ))}
    </>
  );
}

export default function HeroOrbit() {
  return (
    <div className="hh-orbit" aria-hidden="true">
      <span className="hh-glow"></span>
      <span className="hh-ring hh-ring-dashed"></span>
      <span className="hh-ring hh-ring-outer">
        <Mics angles={OUTER_MICS} />
      </span>
      <span className="hh-ring hh-ring-inner"></span>
    </div>
  );
}
