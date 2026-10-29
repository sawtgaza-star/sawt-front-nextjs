import { useLayoutEffect, useRef, type RefObject } from "react";

/** Each newly drawn row fades / rises in this much after the one above, ms. */
const ROW_STAGGER = 70;
const CARD_MS = 520;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* "عرض المزيد" opening the grid softly instead of in one jump. `open()` (the
   button's click) notes how many cards are drawn and calls `expand`; once
   React has drawn the extra ones, they fade and rise in, row by row —
   `expanded` is how far the grid is open (a step count, or a flag): every
   change to a truthy value plays the new cards in —
   opacity / transform only, so the browser does no layout work per frame.
   Skipped under prefers-reduced-motion. */
export function useSmoothExpand(
  gridRef: RefObject<HTMLElement | null>,
  expanded: boolean | number,
  columns: number,
  expand: () => void,
) {
  const from = useRef<number | null>(null);

  const open = () => {
    const grid = gridRef.current;
    if (grid && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = grid.children.length;
    }
    expand();
  };

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const start = from.current;
    from.current = null;
    if (!expanded || !grid || start === null) return;

    const cards = Array.from(grid.children).slice(start) as HTMLElement[];
    const runs = cards.map((card, i) =>
      card.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: CARD_MS,
          delay: Math.floor(i / Math.max(columns, 1)) * ROW_STAGGER,
          easing: EASE,
          fill: "backwards",
        },
      ),
    );
    return () => runs.forEach((run) => run.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  return open;
}
