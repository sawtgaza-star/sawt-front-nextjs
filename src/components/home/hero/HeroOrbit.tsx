import { OrbitBroadcast, OrbitGlobe, OrbitMic, OrbitReel } from "./orbit-icons";

/* The rings behind the reel stack: a warm glow, two concentric orbits and a
   dashed one turning the other way, with four badges riding the outer ring
   (the voice, the content, the reach, the broadcast — orbit-icons.tsx) —
   the inner one passes behind the side cards, where a badge would show
   through them.
   Each orbit turns as a whole and every badge counter-turns at the same
   speed, so the mics travel round the ring while staying upright. Purely
   decorative — all of it is CSS (home-hero.css). */

/** Each badge's icon and where it starts on the ring, in degrees. */
const OUTER_BADGES = [
  { angle: 20, Icon: OrbitMic },
  { angle: 110, Icon: OrbitReel },
  { angle: 200, Icon: OrbitGlobe },
  { angle: 290, Icon: OrbitBroadcast },
];

function Badges() {
  return (
    <>
      {OUTER_BADGES.map(({ angle, Icon }) => (
        <span key={angle} className="hh-mic-arm" style={{ transform: `rotate(${angle}deg)` }}>
          <span className="hh-mic" style={{ ["--hh-start" as string]: `${-angle}deg` }}>
            <Icon />
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
        <Badges />
      </span>
      <span className="hh-ring hh-ring-inner"></span>
    </div>
  );
}
