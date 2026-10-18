/* Finished cutouts are also kept in Cache Storage, so a returning visitor's
   mics show at once instead of being downloaded and cut out again. Bump the
   name if the cutout algorithm changes. Cache Storage is missing on insecure
   origins (plain http on a LAN IP); then every visit simply cuts again. */
const STORE = "sawt-mic-cutouts-v1";

export async function fromStore(url: string): Promise<string | null> {
  try {
    const hit = await (await caches.open(STORE)).match(url);
    return hit ? URL.createObjectURL(await hit.blob()) : null;
  } catch {
    return null;
  }
}

export async function toStore(url: string, src: string): Promise<void> {
  try {
    const blob = await (await fetch(src)).blob();
    await (await caches.open(STORE)).put(
      url,
      new Response(blob, { headers: { "Content-Type": "image/png" } })
    );
  } catch {
    // not storable here — the cutout itself still stands
  }
}
