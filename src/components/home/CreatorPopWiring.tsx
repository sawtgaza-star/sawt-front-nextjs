"use client";
import { useEffect } from "react";
import { cutoutPortrait } from "@/lib/portrait-cutout";

/* The home creator cards' hover pop-out layer (.cc-card-pop, styled in
   home-creator-card.css), the same effect as the team cards' TeamMemberPop.
   Owl clones every slide as plain DOM, so React can't render the layer into
   the clones: each card's portrait is cut out once (cached per URL in
   lib/portrait-cutout), and the layer is added to every card that shows that
   photo — clones included, and again whenever Owl rebuilds its stage. A card
   whose cutout fails simply keeps the plain zoom. */

const CARDS = ".creators-carousel2 .cc-card";

function addPop(card: HTMLElement, cutout: string) {
  if (card.querySelector(":scope > .cc-card-pop")) return;
  const pop = document.createElement("div");
  pop.className = "cc-card-pop";
  pop.setAttribute("aria-hidden", "true");
  const img = document.createElement("img");
  img.src = cutout;
  img.alt = "";
  pop.appendChild(img);
  card.appendChild(pop);
}

export default function CreatorPopWiring() {
  useEffect(() => {
    let alive = true;
    const ready = new Map<string, string>();
    // each photo is cut out once — a failure isn't retried
    const started = new Set<string>();

    const apply = () => {
      document.querySelectorAll<HTMLElement>(CARDS).forEach((card) => {
        const src = card.querySelector<HTMLImageElement>(".cc-card-photo")?.getAttribute("src");
        if (!src) return;
        const cutout = ready.get(src);
        if (cutout) {
          addPop(card, cutout);
          return;
        }
        if (started.has(src)) return;
        started.add(src);
        cutoutPortrait(src)
          .then((url) => {
            if (!alive) return;
            ready.set(src, url);
            apply();
          })
          .catch(() => {});
      });
    };

    apply();
    const root = document.querySelector(".creators-carousel2");
    const observer = new MutationObserver((records) => {
      // only Owl's own rebuilds (new slides), not the layers added above
      if (records.some((r) => Array.from(r.addedNodes).some((n) => !(n as Element).classList?.contains("cc-card-pop")))) {
        apply();
      }
    });
    if (root) observer.observe(root, { childList: true, subtree: true });
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);

  return null;
}
