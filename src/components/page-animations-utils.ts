/* Pure DOM helpers for PageAnimations: which blocks of a section reveal, and
   how they are marked hidden / cleaned up. Styles in styles/animations.css. */

export const DURATION = 600;
export const STAGGER = 100;
export const MAX_DELAY = 500;

const HEADING_SELECTOR = "h1, h2, .section-title";

const CONTAINER_SELECTOR =
  ":scope > .container, :scope > .container-fluid, :scope > .container-sm, :scope > .container-md, :scope > .container-lg, :scope > .container-xl, :scope > .container-xxl";

/* Never transform a block that holds a position:fixed element (it would be
   re-anchored to the transformed ancestor mid-animation). */
const FIXED_SELECTOR = ".theme-toggle-and-up, .header-bar";

/* Breaks a block down to the level its section heading sits on, so the heading
   and each of its siblings reveal on their own. Absolutely positioned layers
   (banner backgrounds, decorations) are left out and simply stay visible. */
export function splitAroundHeading(block: HTMLElement): HTMLElement[] {
  if (block.matches(HEADING_SELECTOR) || !block.querySelector(HEADING_SELECTOR)) {
    return [block];
  }
  const items: HTMLElement[] = [];
  for (const child of Array.from(block.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.matches("script, style, .modal, .olive-branch")) continue;
    const position = getComputedStyle(child).position;
    if (position === "absolute" || position === "fixed") continue;
    items.push(...splitAroundHeading(child));
  }
  return items;
}

export function collectItems(section: HTMLElement): HTMLElement[] {
  const host = section.querySelector(CONTAINER_SELECTOR) ?? section;
  const items: HTMLElement[] = [];
  for (const child of Array.from(host.children)) {
    if (!(child instanceof HTMLElement)) continue;
    // Olive branches keep their own positioning transforms + drift keyframes.
    if (child.matches("script, style, .modal, .olive-branch")) continue;
    if (child.matches(FIXED_SELECTOR) || child.querySelector(FIXED_SELECTOR)) continue;
    const kids = Array.from(child.children).filter(
      (kid): kid is HTMLElement => kid instanceof HTMLElement
    );
    if (
      child.classList.contains("row") &&
      kids.length >= 2 &&
      kids.length <= 8 &&
      !kids.some((kid) => kid.matches(FIXED_SELECTOR) || !!kid.querySelector(FIXED_SELECTOR))
    ) {
      kids.forEach((kid) => items.push(...splitAroundHeading(kid)));
    } else {
      items.push(...splitAroundHeading(child));
    }
  }
  return items;
}

/* Marks items hidden, jumping straight to the hidden state. Styles may already
   have been computed for them (splitAroundHeading reads getComputedStyle), and
   the transition would otherwise run 1 → 0 first and swallow the reveal. */
export function hide(items: HTMLElement[]) {
  const saved = items.map((item) => [
    item.style.getPropertyValue("transition"),
    item.style.getPropertyPriority("transition"),
  ]);
  items.forEach((item, i) => {
    item.style.setProperty("transition", "none", "important");
    item.setAttribute("data-sawt-reveal", "");
    item.style.setProperty("--sawt-delay", `${Math.min(i * STAGGER, MAX_DELAY)}ms`);
  });
  void document.body.offsetWidth;
  items.forEach((item, i) => {
    const [value, priority] = saved[i];
    if (value) item.style.setProperty("transition", value, priority);
    else item.style.removeProperty("transition");
  });
}

export function unmark(item: HTMLElement) {
  item.removeAttribute("data-sawt-reveal");
  item.classList.remove("sawt-in");
  item.style.removeProperty("--sawt-delay");
}
