/* Loads an image the page is allowed to READ — what the canvas cutouts
   (portrait-cutout, mic-cutout) need for getImageData.

   A cross-origin image can only be read when its host sends
   `Access-Control-Allow-Origin`. The API's uploads (api.sawtgaza.com/media/*,
   served by the hosting CDN) don't, so in a visitor's browser the direct
   request fails and the cutout silently fell back to a plain zoom — the
   effect "worked locally" only where a CORS extension or a cached copy hid
   the problem.

   So: the image is tried directly first (works for same-origin files and as
   soon as the backend adds the header), and only if that fails it is fetched
   through wsrv.nl — a free, public image proxy that serves any public image
   with `Access-Control-Allow-Origin: *`. The URLs are public uploads already.
   Once the backend sends the header the proxy is simply never reached. */

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

export async function loadCorsImage(url: string): Promise<HTMLImageElement> {
  try {
    return await load(url);
  } catch (error) {
    if (!isCrossOrigin(url)) throw error;
    return load(PROXY + encodeURIComponent(url));
  }
}
