"use client";
import { useEffect } from "react";
import { canHover, queueCutout } from "@/lib/portrait-cutout";

/* The home creator cards' hover pop-out layer (.cc-card-pop, styled in
   home-creator-card.css), the same effect as the team cards' TeamMemberPop.
   Owl clones every slide as plain DOM, so React can't render the layer into
   the clones: each card's portrait is cut out once (cached per URL in
   lib/portrait-cutout), and the layer is added to every card that shows that
   photo — clones included, and again whenever Owl rebuilds its stage. A card
   whose cutout fails simply keeps the plain zoom.

   Hover devices only, and not before the cards are near the screen: the cuts
   used to run on load on every device, 2.5s of main thread on a phone that
   can't even hover, plus a full-size download of every portrait. */

/* the home slider and the /creators, /creators/all grids */
const ROOTS = ".creators-carousel2, .cr-creators-grid";
const CARDS = ".creators-carousel2 .cc-card, .cr-creators-grid .cc-card";

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
    if (!canHover()) return;
    let alive = true;
    let near = false;
    const ready = new Map<string, string>();
    // each photo is cut out once — a failure isn't retried
    const started = new Set<string>();

    const apply = () => {
      if (!near) return;
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
        queueCutout(src)
          .then((url) => {
            if (!alive) return;
            ready.set(src, url);
            apply();
          })
          .catch(() => {});
      });
    };

    const root = document.querySelector(ROOTS);
    const start = () => {
      near = true;
      apply();
    };
    let nearObserver: IntersectionObserver | null = null;
    if (root && typeof IntersectionObserver !== "undefined") {
      nearObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            nearObserver?.disconnect();
            start();
          }
        },
        { rootMargin: "400px 0px" },
      );
      nearObserver.observe(root);
    } else {
      start();
    }
    const observer = new MutationObserver((records) => {
      // only Owl's own rebuilds (new slides), not the layers added above
      if (records.some((r) => Array.from(r.addedNodes).some((n) => !(n as Element).classList?.contains("cc-card-pop")))) {
        apply();
      }
    });
    if (root) observer.observe(root, { childList: true, subtree: true });
    return () => {
      alive = false;
      nearObserver?.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
