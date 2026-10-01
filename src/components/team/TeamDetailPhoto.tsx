"use client";
import { useEffect, useState } from "react";
import { cutoutMic } from "@/lib/mic-cutout";

/* The profile's mic portrait over the fixed waveform backdrop.

   The box itself is fixed (aspect-ratio + the waveform in team.css). The
   API's `mic_photo_url` arrives with whatever background it was uploaded on
   (transparent, flat gray, even a painted checkerboard), so it goes through
   lib/mic-cutout first: backdrop removed, cropped to the mic. Until that is
   ready the image stays transparent (`.is-loading`), then fades in centered.
   If the cutout fails, the upload is shown as it came. */
export default function TeamDetailPhoto({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [cut, setCut] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    setCut(null);
    cutoutMic(src)
      .catch(() => src)
      .then((url) => {
        if (!cancelled) setCut(url);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={"team-detail-photo" + (src && !cut ? " is-loading" : "")}>
      {/* No mic portrait yet: the waveform backdrop stands on its own. */}
      {cut ? <img src={cut} alt={alt} /> : null}
    </div>
  );
}
