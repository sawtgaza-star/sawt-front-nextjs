"use client";

import { useEffect, useState } from "react";
import { cutoutPortrait } from "@/lib/portrait-cutout";

/* The hover layer of TeamMemberCard: the same portrait with its backdrop cut
   away, stacked exactly over the photo and clipped to the strip ABOVE the
   card, so on hover — when both images grow from the bottom — only the head
   rising out of the frame comes from the cutout. Nothing renders until the
   cutout is ready (or if it fails): the card simply keeps its plain zoom. */
export default function TeamMemberPop({ src }: { src: string }) {
  const [cutout, setCutout] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    cutoutPortrait(src)
      .then((url) => alive && setCutout(url))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  if (!cutout) return null;
  return (
    <div className="team-member-pop" aria-hidden="true">
      <img src={cutout} alt="" />
    </div>
  );
}
