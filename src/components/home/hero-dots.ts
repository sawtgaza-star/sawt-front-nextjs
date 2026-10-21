/* Dot clicks for the hero carousel, slid the way the dot sits on screen: a dot
   to the right of the active one brings its slide in from the right (the
   images move left), a dot to the left brings it in from the left.

   Bootstrap's own `to(index)` picks the direction from the index alone, which
   under dir="rtl" (dots laid out right-to-left, LTR stylesheet) ran the other
   way. So the click is caught before Bootstrap's data-api sees it, and handed
   to the carousel's `_slide(order, element)` — private, but stable across
   5.3.x (pinned in package.json). */

type HeroCarousel = {
  _slide: (order: "next" | "prev", element: Element) => void;
  _maybeEnableCycle?: () => void;
};

/** Wires the dots inside `element`; returns the teardown. */
export function enableHeroDots(element: HTMLElement, carousel: HeroCarousel): () => void {
  const onClick = (e: MouseEvent) => {
    const dot = (e.target as Element).closest<HTMLElement>(".carousel-indicators [data-bs-slide-to]");
    if (!dot || !element.contains(dot)) return;
    // keep Bootstrap's handler from also calling to() — it's delegated from
    // document in the capture phase, hence the window-capture listener below
    e.preventDefault();
    e.stopPropagation();

    const active = element.querySelector<HTMLElement>(".carousel-indicators .active");
    const item = element.querySelectorAll(".carousel-item")[Number(dot.dataset.bsSlideTo)];
    if (!active || !item || active === dot) return;

    const toTheRight = dot.getBoundingClientRect().left > active.getBoundingClientRect().left;
    carousel._slide(toTheRight ? "next" : "prev", item);
    carousel._maybeEnableCycle?.();
  };

  window.addEventListener("click", onClick, true);
  return () => window.removeEventListener("click", onClick, true);
}
