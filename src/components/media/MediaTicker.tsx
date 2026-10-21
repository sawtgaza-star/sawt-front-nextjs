"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* The olive-tinted strip that rides the bottom edge of the hero: the service
   list scrolling right-to-left, each item followed by an orange dot. Two
   identical groups so the CSS translate loops seamlessly (same trick as the
   site-wide .marquee, but with text instead of logos).

   It says the same thing as the hero's rotating orange word — both are the
   payload's `hero.phrases` — so the two are fed the one list rather than
   keeping their own copies.

   The loop only closes up if each group is at least as wide as the strip:
   a group narrower than the screen leaves a bare stretch behind it every
   pass. So the group repeats the list as many times as the strip's width
   needs — measured, not guessed, and re-measured on resize — and the loop's
   duration grows with the group so any length scrolls at the same speed.
   Client Component for that measurement only. */
const SECONDS_PER_ITEM = 5;

/* the fit has to land before the browser paints, or the first frame shows the
   gap; on the server there is no layout to read, so it falls back to useEffect */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

function Group({
  phrases,
  hidden = false,
  groupRef,
}: {
  phrases: string[];
  hidden?: boolean;
  groupRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="sm-ticker-group" aria-hidden={hidden || undefined} ref={groupRef}>
      {phrases.map((phrase, index) => (
        <span className="sm-ticker-item" key={index}>
          <span>{phrase}</span>
          <i className="sm-ticker-dot" aria-hidden="true"></i>
        </span>
      ))}
    </div>
  );
}

export default function MediaTicker({ phrases }: { phrases: string[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [rounds, setRounds] = useState(3);

  useBeforePaint(() => {
    const strip = stripRef.current;
    const group = groupRef.current;
    if (!strip || !group || !phrases.length) return;

    const fit = () => {
      // one pass of the list = the group's width over how many passes it holds
      const perRound = group.scrollWidth / rounds;
      if (!perRound) return;
      // one spare pass, so the seam is never on screen even mid-resize
      const needed = Math.ceil(strip.clientWidth / perRound) + 1;
      if (needed > rounds) setRounds(needed);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(strip);
    return () => observer.disconnect();
  }, [phrases, rounds]);

  if (!phrases.length) return null;

  const items = Array.from({ length: rounds }, () => phrases).flat();

  return (
    <div
      className="sm-ticker"
      ref={stripRef}
      style={{ ["--sm-ticker-duration" as string]: `${items.length * SECONDS_PER_ITEM}s` }}
    >
      <Group phrases={items} groupRef={groupRef} />
      <Group phrases={items} hidden />
    </div>
  );
}
