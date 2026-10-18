import sharp from "sharp";
import { fetchHomePage } from "@/lib/api/home";
import { fetchAllTeamUuids, fetchTeamMember } from "@/lib/api/team";
import { cutoutPixels } from "@/lib/mic-cutout";
import { micCutoutFile, micUploadUrl } from "@/lib/mic-cutout-file";

/* /mic-cutouts/<id>-<ext>.webp — every team mic, cut out at build time.

   The same cutout lib/mic-cutout runs in the browser (cutoutPixels is
   DOM-free), done here once per deploy so visitors get a finished transparent
   image instead of waiting for a proxy download and the pixel work. The static
   export writes each response out as a file. sharp ships with Next itself.

   Mics come from the home page's team block and every member profile — the
   two places that draw one. The response is built from the file name alone,
   never from a second listing: the build may answer it from a differently
   cached copy of the API. Nothing here fails the build — a mic that can't be
   cut is written as an error body, which the browser fails to decode, so it
   cuts that mic itself as before (see lib/mic-cutout). */

export const dynamic = "force-static";
export const dynamicParams = false;

const MAX_HEIGHT = 800; // same as the browser cutout

/* One retry: the build fires a request per member, and a single dropped one
   would otherwise leave that member's mic without a file. */
async function retry<T>(load: () => Promise<T>): Promise<T> {
  try {
    return await load();
  } catch {
    return load();
  }
}

export async function generateStaticParams() {
  const urls: string[] = [];
  try {
    const home = await retry(() => fetchHomePage());
    for (const item of home?.team?.items ?? []) if (item.mic_image) urls.push(item.mic_image);
  } catch (caught) {
    console.warn("[mic-cutouts] home page unavailable:", caught);
  }
  try {
    for (const uuid of await retry(fetchAllTeamUuids)) {
      const page = await retry(() => fetchTeamMember(uuid)).catch(() => null);
      const mic = page?.member?.mic_photo_url;
      if (mic) urls.push(mic);
    }
  } catch (caught) {
    console.warn("[mic-cutouts] team roster unavailable:", caught);
  }
  const files = new Set(urls.map(micCutoutFile).filter((file): file is string => !!file));
  return Array.from(files, (file) => ({ file }));
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const url = micUploadUrl(file);
  if (!url) return new Response("Not found", { status: 404 });

  try {
    const upload = await retry(async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`answered ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    });
    const { data, info } = await sharp(upload)
      .resize({ height: MAX_HEIGHT, withoutEnlargement: true })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const px = new Uint8ClampedArray(data.buffer, data.byteOffset, data.length);
    const box = cutoutPixels(px, info.width, info.height);
    if (!box) throw new Error("nothing left after the cutout");

    const webp = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .extract({ left: box.x, top: box.y, width: box.width, height: box.height })
      .webp({ quality: 90, alphaQuality: 100 })
      .toBuffer();

    return new Response(new Uint8Array(webp), {
      headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch (caught) {
    console.warn(`[mic-cutouts] could not cut ${url}:`, caught);
    return new Response("Cutout failed", { status: 502 });
  }
}
