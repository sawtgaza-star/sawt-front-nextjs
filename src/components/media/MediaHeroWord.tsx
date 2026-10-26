"use client";
import { useState, type CSSProperties } from "react";
import { useHeroRotation } from "./MediaHeroRotation";

/* The orange half of "…صوت ميديا تقدم". It doesn't run a cycle of its own: it
   names the next of the hero's service phrases on every tick of the shared
   clock, so the word and the deck under it always change together (see
   MediaHeroRotation).

   Each change is a cube roll (media.css): the outgoing phrase turns up and
   away while the incoming one turns up into place from below, both pivoting
   on an axis behind the text. The roll runs word by word, each a beat after
   the one before it (`--i`), starting from the phrase's first word — the
   right-hand one in Arabic. Words, not letters: splitting Arabic letters into
   boxes would break their joins.

   So the last phrase is kept alongside the current one, and both faces are
   keyed by the tick so the roll replays. The very first phrase just sits
   there — nothing to roll from.

   The phrases come from GET /pages/media already in the current language, so
   there is no `data-i18n` key here — a language switch re-renders the section
   with the other half of the payload. */
function Face({ text, kind }: { text: string; kind: "in" | "out" }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span
      className={"sm-hero-word-face is-" + kind}
      aria-hidden={kind === "out" || undefined}
    >
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 ? " " : null}
          <span
            className="sm-hero-word-part"
            style={{ "--i": i } as CSSProperties}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function MediaHeroWord({ phrases }: { phrases: string[] }) {
  const { step } = useHeroRotation();
  const [turn, setTurn] = useState<{ step: number; prev: number | null }>({
    step,
    prev: null,
  });

  // a new tick: remember the step we are rolling away from
  if (turn.step !== step) setTurn({ step, prev: turn.step });

  if (!phrases.length) return null;
  const phrase = (at: number) => phrases[at % phrases.length];
  const rolling = turn.prev !== null && turn.prev !== step;

  return (
    <span className={"sm-hero-word" + (rolling ? " is-rolling" : "")}>
      {rolling ? <Face key={"out-" + turn.prev} text={phrase(turn.prev!)} kind="out" /> : null}
      <Face key={"in-" + step} text={phrase(step)} kind="in" />
    </span>
  );
}
