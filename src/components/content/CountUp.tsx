"use client";
/* A number that counts up from 0 once mounted — the hero's stat orbits
   (ContentHeroStats). `delay` lets it start as the orbit's line reaches its
   dot. Reduced motion shows the final value straight away. */

import { useEffect, useState } from "react";

// the whole number, digits grouped (30,000,000) — no K / M abbreviation
const format = new Intl.NumberFormat("en");

export default function CountUp({
  value,
  duration = 1600,
  delay = 0,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic: fast at first, settling onto the value
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return <>{format.format(shown)}</>;
}
