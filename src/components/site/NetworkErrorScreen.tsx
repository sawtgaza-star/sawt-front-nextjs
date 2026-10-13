"use client";
/* The site's offline screen — the 404's image and layout (NotFoundContent),
   with its own wording and a retry button instead of "back to home".

   Takes over the whole viewport when:
     - the browser goes offline (`offline` event), or
     - a GET to the API can't reach the server (apiFetch fires
       NETWORK_ERROR_EVENT) — the page's content never arrived.
   Form submits don't trigger it (they keep their own toast and typed input).

   Coming back online reloads the page, so every section refetches. The image
   is fetched up front while still online — once the connection is gone it
   couldn't be downloaded any more. Mounted once, in the root layout. */

import { useEffect, useState } from "react";
import "@/styles/network-error.css";
import { NETWORK_ERROR_EVENT } from "@/lib/api/client";
import { useLang } from "@/lib/use-lang";

const IMAGE = "/assets/images/not-found-404.webp";

export default function NetworkErrorScreen() {
  const [down, setDown] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    new Image().src = IMAGE;

    const show = () => setDown(true);

    if (!navigator.onLine) show();
    window.addEventListener("offline", show);
    window.addEventListener(NETWORK_ERROR_EVENT, show);
    return () => {
      window.removeEventListener("offline", show);
      window.removeEventListener(NETWORK_ERROR_EVENT, show);
    };
  }, []);

  // Reload on reconnect only once the screen is up.
  useEffect(() => {
    if (!down) return;
    const back = () => window.location.reload();
    window.addEventListener("online", back);
    document.documentElement.classList.add("net-error-open");
    return () => {
      window.removeEventListener("online", back);
      document.documentElement.classList.remove("net-error-open");
    };
  }, [down]);

  if (!down) return null;

  return (
    <div className="net-error" role="alert">
      <img className="net-error-image" src={IMAGE} alt="" width={1400} height={788} />
      <h1 className="net-error-title">{tr("net_title")}</h1>
      <p className="net-error-desc">{tr("net_desc")}</p>
      <button type="button" className="net-error-retry" onClick={() => window.location.reload()}>
        <span>{tr("net_retry")}</span>
        <i className="fa-solid fa-rotate-right"></i>
      </button>
    </div>
  );
}
