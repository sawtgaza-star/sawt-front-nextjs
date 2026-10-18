/* Loads an image the page is allowed to READ — what the canvas cutouts
   (portrait-cutout, mic-cutout) need for getImageData.

   A cross-origin image can only be read when its host sends
   `Access-Control-Allow-Origin`. The API's uploads (api.sawtgaza.com/media/*,
   served by the hosting CDN) don't, so in a visitor's browser the direct
   request fails and the cutout silently fell back to a plain zoom — the
   effect "worked locally" only where a CORS extension or a cached copy hid
   the problem.

   So: the image is requested directly (works for same-origin files and as
   soon as the backend adds the header) and, at the same time, through
   wsrv.nl — a free, public image proxy that serves any public image with
   `Access-Control-Allow-Origin: *`. The URLs are public uploads already.
   Once the backend sends the header, whichever answers first is used. */

const PROXY = "https://wsrv.nl/?url=";

function load(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });
}

function isCrossOrigin(url: string): boolean {
  try {
    const u = new URL(url, window.location.href);
    return /^https?:$/.test(u.protocol) && u.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/* Direct and proxy are raced, not tried in turn: the API's media host takes
   2–3s to serve an image (measured 2026-10-18) only for the read to be refused
   for lack of CORS, while the proxy answers in ~0.5s. Waiting for the direct
   attempt to fail first is what made the mics show up late. The first load
   that succeeds wins; once the backend sends the header the direct one can
   win on its own. */
export function loadCorsImage(url: string): Promise<HTMLImageElement> {
  if (!isCrossOrigin(url)) return load(url);
  const attempts = [load(url), load(PROXY + encodeURIComponent(url))];
  return new Promise((resolve, reject) => {
    let failed = 0;
    for (const attempt of attempts) {
      attempt.then(resolve, (error) => {
        if (++failed === attempts.length) reject(error);
      });
    }
  });
}
