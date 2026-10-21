"use client";
import { useEffect } from "react";

/* The album cards on touch screens. A tap leaves :hover stuck on, so a second
   tap could never hide the details again — there hover is switched off
   (html.inc-album-tap, incubator.css) and a tap toggles `.is-open` instead,
   which shows the card's chip/caption. Opening one card closes the others.
   A tap on the video's play badge still follows its link. */
export default function AlbumTapWiring() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const root = document.documentElement;
    root.classList.add("inc-album-tap");

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const card = target.closest<HTMLElement>(".inc-album-card");
      if (!card || target.closest("a")) return;
      const open = card.classList.contains("is-open");
      document
        .querySelectorAll(".inc-album-card.is-open")
        .forEach((other) => other.classList.remove("is-open"));
      if (!open) card.classList.add("is-open");
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      root.classList.remove("inc-album-tap");
    };
  }, []);

  return null;
}
