"use client";
import { useEffect, useRef } from "react";

/* The reel's collaborators, opened from the "+N" pill in its caption: a
   sheet that slides up over the bottom of the video (the caption itself
   clips its overflow, so the sheet lives on the .reel-item instead). Each
   row is a letter avatar, the @handle and a link to the account. Closes on
   the ✕, Escape, or a press anywhere outside it. */

/* the site's palette only: olive, orange, dark olive, soft orange */
const AVATAR_COLORS = ["#4c5c37", "#ff7420", "#38422a", "#e1723b"];

/** Same handle → same colour, every render. */
function colorFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ReelCollabsPanel({
  names,
  open,
  onClose,
}: {
  names: string[];
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (ref.current?.contains(target)) return;
      // the pill toggles the sheet itself
      if (target?.closest?.(".reel-collab-count")) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={"reel-collabs-sheet" + (open ? " open" : "")}
      aria-hidden={!open}
      role="dialog"
    >
      <span className="reel-collabs-grip" aria-hidden="true" />
      <div className="reel-collabs-head">
        <span className="reel-collabs-title">
          <span data-i18n="reel_with">بالتعاون مع</span>
          <bdi className="reel-collabs-total">{names.length}</bdi>
        </span>
        <button type="button" className="reel-collabs-close" onClick={onClose} aria-label="Close" tabIndex={open ? 0 : -1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18"></path>
          </svg>
        </button>
      </div>
      <ul className="reel-collabs-list">
        {names.map((name) => (
          <li key={name}>
            <a
              href={`https://www.instagram.com/${encodeURIComponent(name)}/`}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
            >
              <span className="reel-collab-avatar" style={{ background: colorFor(name) }} aria-hidden="true">
                {name.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase() || "@"}
              </span>
              <span className="reel-collab-text">
                <bdi className="reel-collab-name">@{name}</bdi>
                <span className="reel-collab-sub">Instagram</span>
              </span>
              <span className="reel-collab-ig" aria-hidden="true">
                <i className="fa-brands fa-instagram"></i>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
