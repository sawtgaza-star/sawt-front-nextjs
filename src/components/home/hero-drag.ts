/* Drag / swipe for the hero carousel — mouse, finger and pen alike. Grab a
   slide, pull it sideways past THRESHOLD and let go: the slides move the way
   the hand did. Pulled left → "next", pulled right → "prev", in Arabic and
   English both: the site loads Bootstrap's LTR stylesheet, whose "next"
   always slides the images leftwards. (Bootstrap's own swipe flips that
   mapping under dir="rtl", which made the slides run against the finger —
   so it is switched off where the carousel is created, in HomeContent.)

   A drag that went somewhere swallows the click that ends it, so letting go
   over "ادعم صوت" doesn't also follow the link. */

const THRESHOLD = 50;

type HeroCarousel = { next: () => void; prev: () => void };

/** Wires the drag onto `element`; returns the teardown. */
export function enableHeroDrag(element: HTMLElement, carousel: HeroCarousel): () => void {
  let startX: number | null = null;
  let dragged = false;

  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // the arrows and dots are buttons of their own
    if ((e.target as Element).closest(".carousel-control-prev, .carousel-control-next, .carousel-indicators")) return;
    startX = e.clientX;
    dragged = false;
    element.classList.add("is-dragging");
  };

  const onMove = (e: PointerEvent) => {
    if (startX === null) return;
    if (Math.abs(e.clientX - startX) > 5) dragged = true;
  };

  const onUp = (e: PointerEvent) => {
    if (startX === null) return;
    const delta = e.clientX - startX;
    startX = null;
    element.classList.remove("is-dragging");
    if (Math.abs(delta) < THRESHOLD) return;
    // pulled left → the slide that comes in from the right
    if (delta < 0) carousel.next();
    else carousel.prev();
  };

  const onCancel = () => {
    startX = null;
    element.classList.remove("is-dragging");
  };

  const onClick = (e: MouseEvent) => {
    if (!dragged) return;
    dragged = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // the browser's own image drag would steal the gesture
  const onDragStart = (e: DragEvent) => e.preventDefault();

  element.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onCancel);
  element.addEventListener("click", onClick, true);
  element.addEventListener("dragstart", onDragStart);
  element.classList.add("is-draggable");

  return () => {
    element.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    element.removeEventListener("click", onClick, true);
    element.removeEventListener("dragstart", onDragStart);
    element.classList.remove("is-draggable", "is-dragging");
  };
}
