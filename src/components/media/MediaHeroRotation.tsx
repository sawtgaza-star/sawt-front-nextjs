"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/* The hero's single clock. The fanned deck and the orange half of the headline
   are siblings in the markup but move together — one tick advances the cards a
   seat and the word to the next service — so the tick lives here and both read
   it. It doesn't pause on hover (a resting cursor could leave it stuck), and
   it doesn't loop either: it runs once, up to `lastStep`, and holds there;
   prefers-reduced-motion keeps it still from the start.

   The two lists are no longer the same length: GET /pages/media sends the
   stills and the service phrases separately (five and six as the content
   stands), so each side takes `step` and walks its own list with it instead of
   sharing one index. */
/* long enough for the deck's 1.4s glide (media.css) to finish and rest */
const ROTATE_MS = 2600;

type Rotation = {
  /* how many ticks have passed — one seat, and one word, each */
  step: number;
};

const RotationContext = createContext<Rotation | null>(null);

export function useHeroRotation() {
  const ctx = useContext(RotationContext);
  if (!ctx) {
    throw new Error("useHeroRotation must be used inside <MediaHeroRotation>");
  }
  return ctx;
}

export default function MediaHeroRotation({
  children,
  lastStep,
}: {
  children: ReactNode;
  /** the tick it stops on — no wrapping back round */
  lastStep: number;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= lastStep) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [step, lastStep]);

  const value = useMemo<Rotation>(() => ({ step }), [step]);

  return <RotationContext.Provider value={value}>{children}</RotationContext.Provider>;
}
