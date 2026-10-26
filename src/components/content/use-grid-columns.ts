import { useEffect, useState, type RefObject } from "react";

/* How many columns a CSS grid lays out right now — read from its computed
   `grid-template-columns`, so it follows content.css's breakpoints (5 / 4 /
   3 / 2) without repeating them here. `fallback` is used until the grid is
   mounted (and on the server). */
export function useGridColumns(gridRef: RefObject<HTMLElement | null>, fallback: number) {
  const [columns, setColumns] = useState(fallback);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const read = () => {
      const tracks = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean);
      if (tracks.length) setColumns(tracks.length);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [gridRef]);

  return columns;
}
