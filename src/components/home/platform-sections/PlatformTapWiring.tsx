"use client";
import { useEffect } from "react";

/* Touch screens only: a card's :hover sticks after a tap and can't be undone
   by tapping it again, so there hover is switched off (.ps-touch) and a tap
   toggles .is-open instead — opening one card closes the others. A tap on a
   closed card's (hidden) link opens the card rather than following it. */
export default function PlatformTapWiring() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".ps-accordion .ps-item"));
    items.forEach((item) => item.classList.add("ps-touch"));

    const onClick = (e: MouseEvent) => {
      const item = (e.target as Element).closest<HTMLElement>(".ps-accordion .ps-item");
      if (!item) return;
      const open = item.classList.contains("is-open");
      if (open && (e.target as Element).closest("a")) return;
      e.preventDefault();
      items.forEach((other) => other.classList.remove("is-open"));
      if (!open) item.classList.add("is-open");
      // a focused link inside would keep it open through :focus-within
      else (document.activeElement as HTMLElement | null)?.blur();
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      items.forEach((item) => item.classList.remove("ps-touch", "is-open"));
    };
  }, []);

  return null;
}
