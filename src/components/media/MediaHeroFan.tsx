"use client";

import { useHeroRotation } from "./MediaHeroRotation";

/* One seat per card: seats 1..5 are the visible fan (1 = rightmost, 3 = the
   upright middle card, 5 = leftmost) and seat 0 is the hidden one past the
   left edge. Every tick each card moves up one seat, so the card leaving seat
   5 slides out through seat 0 and comes back in at seat 1 — the seats
   themselves are laid out in media.css, and the tick comes from the hero's
   shared clock so the headline word advances with the deck.

   The deck is the hero's uploads (`heroDeck` in ./media-page-view has already
   sized the list to the seats the CSS defines), so an image can legitimately
   appear twice and the key has to be the seat, not the URL. */
export default function MediaHeroFan({ deck }: { deck: string[] }) {
  const { step, setPaused } = useHeroRotation();
  const seats = deck.length;

  if (!seats) return null;

  return (
    <div
      className="sm-hero-fan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {deck.map((src, i) => (
        <span className={"sm-fan-card sm-fan-" + ((i + step) % seats)} key={i}>
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
}
