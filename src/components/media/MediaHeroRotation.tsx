"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { HERO_FAN } from "./media-photos";

/* The hero's single clock. The fanned deck and the orange half of the headline
   are siblings in the markup but show the same thing — the card sitting in the
   focus seat and the service it stands for — so the tick lives here and both
   read it. Hovering the deck pauses both. */
const ROTATE_MS = 1500;
const SEATS = HERO_FAN.length;
/* seat 3 is the upright middle card (see `.sm-fan-3` in media.css) */
const FOCUS_SEAT = 3;

type Rotation = {
  /* how many seats every card has advanced so far */
  step: number;
  /* index into HERO_FAN of the card currently in the focus seat */
  focus: number;
  setPaused: (paused: boolean) => void;
};

const RotationContext = createContext<Rotation | null>(null);

export function useHeroRotation() {
  const ctx = useContext(RotationContext);
  if (!ctx) {
    throw new Error("useHeroRotation must be used inside <MediaHeroRotation>");
  }
  return ctx;
}

export default function MediaHeroRotation({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((s) => s + 1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  /* card i sits at seat (i + step) % SEATS, so the card in the focus seat is
     the one FOCUS_SEAT - step seats back round the loop */
  const value = useMemo<Rotation>(
    () => ({
      step,
      focus: (((FOCUS_SEAT - step) % SEATS) + SEATS) % SEATS,
      setPaused,
    }),
    [step]
  );

  return <RotationContext.Provider value={value}>{children}</RotationContext.Provider>;
}
