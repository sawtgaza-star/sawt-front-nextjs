/* Helpers shared by the /creators and /creators/{id} skeletons. */

/** An empty, transparent image of a given intrinsic size. In an <img> that
    carries the real element's class it takes exactly the box the real image
    would — width, height and, where the CSS leaves one side `auto`, the aspect
    ratio — without loading anything. */
export function blank(width = 1, height = 1): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'/%3E`;
}

/** `count` indices, for rendering N placeholder rows. */
export function times(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}
