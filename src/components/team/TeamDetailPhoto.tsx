"use client";
import { useCallback, useState } from "react";

/* The profile portrait, with a placeholder under it until the photo paints.

   By the time this renders, GET /pages/team/{uuid} has already answered —
   TeamProfileSkeleton is gone and the name, the role and the bio are all on
   screen — but the JPEG itself is still downloading, and the column sat empty
   until it arrived.

   It is a client leaf, and the only one in the profile, because the box cannot
   hold its place in CSS alone: `.team-detail-photo img` is 110% wide at
   `height: auto`, so the column takes the photo's own proportions and a
   placeholder would have to pin it to a fixed ratio — which would change how
   the loaded photo is laid out. Instead the ratio is worn only while
   `.is-loading` is on (see team.css), and dropping the class restores exactly
   today's rendering.

   `complete` is checked on mount as well as `onLoad`: a cached photo can
   finish before React attaches its handler, and the class would never come
   off. `onError` clears it too — a broken src must not shimmer forever. */
export default function TeamDetailPhoto({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true);
  }, []);

  return (
    <div className={"team-detail-photo" + (loaded ? "" : " is-loading")}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}
