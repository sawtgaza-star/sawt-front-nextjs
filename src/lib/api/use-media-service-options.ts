"use client";
/* Loads GET /pages/media/services/options once, in the browser — the list the
   booking form's "الخدمة المطلوبة" offers.

   Unlike the page hooks there is no skeleton behind this one: the /media
   payload already carried the same five services, so the form renders that
   list and swaps it for this one when it lands (see `serviceChoices`). A
   failed request leaves the dropdown exactly as the page drew it, which is why
   the error is logged and not surfaced. */

import { useEffect, useState } from "react";
import { fetchMediaServiceOptions, type MediaServiceOption } from "./media-consultation";

export function useMediaServiceOptions(): MediaServiceOption[] {
  const [options, setOptions] = useState<MediaServiceOption[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchMediaServiceOptions(controller.signal)
      .then(setOptions)
      .catch((caught) => {
        if (caught?.name === "AbortError") return;
        console.warn("[media consultation] service options unavailable:", caught);
      });

    return () => controller.abort();
  }, []);

  return options;
}
