"use client";
import { useEffect } from "react";

/* The story cards (.rs-card — home slider, /stories, /support, news) on touch
   screens: a card's :hover sticks after a tap and a second tap can't undo it,
   so there hover is switched off (html.rs-tap, style.css / support.css) and a
   tap toggles .is-open instead — opening one card closes the others. A tap on
   the arrow still follows its link. One document listener, so Owl's cloned
   slides are covered too. */
export default function StoryTapWiring() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const root = document.documentElement;
    root.classList.add("rs-tap");

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const card = target.closest<HTMLElement>(".rs-card");
      if (!card || target.closest("a")) return;
      const open = card.classList.contains("is-open");
      document.querySelectorAll(".rs-card.is-open").forEach((other) => other.classList.remove("is-open"));
      if (!open) card.classList.add("is-open");
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      root.classList.remove("rs-tap");
    };
  }, []);

  return null;
}
