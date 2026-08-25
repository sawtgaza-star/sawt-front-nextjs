"use client";

import { HERO_FAN } from "./media-photos";
import { useHeroRotation } from "./MediaHeroRotation";

/* One seat per photo: seats 1..5 are the visible fan (1 = rightmost, 3 = the
   upright middle card, 5 = leftmost) and seat 0 is the hidden one past the
   left edge. Every tick each card moves up one seat, so the card leaving seat
   5 slides out through seat 0 and comes back in at seat 1 — the seats
   themselves are laid out in media.css, and the tick comes from the hero's
   shared clock so the headline word advances with the deck. */
const SEATS = HERO_FAN.length;

export default function MediaHeroFan() {
  const { step, setPaused } = useHeroRotation();

  return (
    <div
      className="sm-hero-fan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_FAN.map((photo, i) => (
        <span
          className={"sm-fan-card sm-fan-" + ((i + step) % SEATS)}
          key={photo.key}
        >
          <img src={photo.src} alt="" />
        </span>
      ))}
    </div>
  );
}
