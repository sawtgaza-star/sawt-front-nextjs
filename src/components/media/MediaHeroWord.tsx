"use client";
import { useHeroRotation } from "./MediaHeroRotation";

/* The orange half of "…صوت ميديا تقدم". It doesn't run a cycle of its own: it
   names the next of the hero's service phrases on every tick of the shared
   clock, so the word and the deck under it always change together (see
   MediaHeroRotation).

   The phrases come from GET /pages/media already in the current language, so
   there is no `data-i18n` key here — a language switch re-renders the section
   with the other half of the payload. */
export default function MediaHeroWord({ phrases }: { phrases: string[] }) {
  const { step } = useHeroRotation();

  if (!phrases.length) return null;
  const index = step % phrases.length;

  return (
    /* keyed so React swaps the node and the fade-up animation replays */
    <span className="sm-hero-word" key={index}>
      {phrases[index]}
    </span>
  );
}
