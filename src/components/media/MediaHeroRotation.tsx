"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/* The hero's single clock. The fanned deck and the orange half of the headline
   are siblings in the markup but move together — one tick advances the cards a
   seat and the word to the next service — so the tick lives here and both read
   it. Hovering the deck pauses both.

   The two lists are no longer the same length: GET /pages/media sends the
   stills and the service phrases separately (five and six as the content
   stands), so each side takes `step` and walks its own list with it instead of
   sharing one index. */
const ROTATE_MS = 1500;

type Rotation = {
  /* how many ticks have passed — one seat, and one word, each */
  step: number;
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

  const value = useMemo<Rotation>(() => ({ step, setPaused }), [step]);

  return <RotationContext.Provider value={value}>{children}</RotationContext.Provider>;
}
