"use client";

import { useEffect, useState } from "react";
import { HERO_FAN } from "./media-photos";

/* One seat per photo: seats 1..5 are the visible fan (1 = rightmost, 3 = the
   upright middle card, 5 = leftmost) and seat 0 is the hidden one past the
   left edge. Every tick each card moves up one seat, so the card leaving seat
   5 slides out through seat 0 and comes back in at seat 1 — the seats
   themselves are laid out in media.css. */
const SEATS = HERO_FAN.length;
const ROTATE_MS = 3200;

export default function MediaHeroFan() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((s) => s + 1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="sm-hero-fan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_FAN.map((src, i) => (
        <span className={"sm-fan-card sm-fan-" + ((i + step) % SEATS)} key={src + i}>
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
}
