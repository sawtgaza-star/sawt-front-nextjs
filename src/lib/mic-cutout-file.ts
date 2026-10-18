/* Where a mic's pre-made cutout lives: app/mic-cutouts/[file]/route.ts cuts
   every mic the build can see and the static export writes each one out as
   /mic-cutouts/<upload id>-<upload ext>.webp — same origin, already
   transparent and cropped, so it loads like any other image. A mic uploaded
   after the deploy has no file yet; lib/mic-cutout then cuts it in the
   browser as before.

   The file name alone says which upload it came from (the API keeps every mic
   in one folder, named by a ULID that is unique per upload), so the route
   never has to look anything up — and a replaced mic gets a new file instead
   of a stale one. Pure string work — safe on both sides. */

import { API_ORIGIN } from "./api/client";

const MIC_FOLDER = "/media/team/members/mic/";
const UPLOAD = /^([A-Za-z0-9]+)\.(webp|png|jpe?g)$/i;
const FILE = /^([A-Za-z0-9]+)-(webp|png|jpe?g)\.webp$/i;

/** "<id>-<ext>.webp" for a mic upload of the API, else null. */
export function micCutoutFile(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.origin !== API_ORIGIN || !u.pathname.startsWith(MIC_FOLDER)) return null;
    const match = UPLOAD.exec(u.pathname.slice(MIC_FOLDER.length));
    return match ? `${match[1]}-${match[2].toLowerCase()}.webp` : null;
  } catch {
    return null;
  }
}

export function micCutoutPath(url: string): string | null {
  const file = micCutoutFile(url);
  return file ? `/mic-cutouts/${file}` : null;
}

/** The upload a cutout file was made from — the inverse of micCutoutFile. */
export function micUploadUrl(file: string): string | null {
  const match = FILE.exec(file);
  return match ? `${API_ORIGIN}${MIC_FOLDER}${match[1]}.${match[2]}` : null;
}
