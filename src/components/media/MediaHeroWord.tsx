"use client";
import { HERO_FAN } from "./media-photos";
import { useHeroRotation } from "./MediaHeroRotation";

/* The orange half of "…صوت ميديا تقدم". It doesn't run a cycle of its own: it
   names whichever card of the fan is in the focus seat, so the word and the
   photo under it always change on the same tick (see MediaHeroRotation).

   Each word carries its own data-i18n key, so a language switch mid-cycle
   still translates: initTranslate() runs on the node that happens to be
   mounted, and the next tick remounts an already-correct one. */
export default function MediaHeroWord() {
  const { focus } = useHeroRotation();
  const w = HERO_FAN[focus];

  return (
    /* keyed so React swaps the node and the fade-up animation replays */
    <span className="sm-hero-word" key={w.key} data-i18n={w.key}>
      {w.text}
    </span>
  );
}
