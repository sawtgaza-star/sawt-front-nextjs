/* The one rule every upload on the site follows — the collaborate forms'
   drop zones and the donation receipt alike, as printed under each zone:
   "الحد الأقصى … 5 ميجابايت، وتشمل الصيغ المدعومة png, jpg, pdf".

   The browser's `file.type` is only a guess from the file name (and is empty
   on some systems), so a file passes only when its extension, its type (when
   the browser gives one) AND its first bytes all say png, jpeg or pdf — a
   renamed .exe or .mp4 is caught by its content. */

export const ATTACH_MAX_BYTES = 5 * 1024 * 1024;

/** For <input accept>: the extensions plus their types, so every OS picker
    filters on one or the other. */
export const ATTACH_ACCEPT =
  ".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf";

export type AttachmentError = "type" | "size";

const EXTENSIONS = ["png", "jpg", "jpeg", "pdf"];
const TYPES = ["image/png", "image/jpeg", "image/jpg", "image/pjpeg", "application/pdf"];

/* file signatures: PNG "\x89PNG", JPEG FF D8 FF, PDF "%PDF" */
const SIGNATURES = [
  [0x89, 0x50, 0x4e, 0x47],
  [0xff, 0xd8, 0xff],
  [0x25, 0x50, 0x44, 0x46],
];

async function hasSignature(file: File): Promise<boolean> {
  try {
    const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    return SIGNATURES.some((sig) => sig.every((byte, i) => head[i] === byte));
  } catch {
    return false;
  }
}

/** null when the file may be uploaded, otherwise why not. */
export async function checkAttachment(file: File): Promise<AttachmentError | null> {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!EXTENSIONS.includes(ext)) return "type";
  if (file.type && !TYPES.includes(file.type.toLowerCase())) return "type";
  if (file.size > ATTACH_MAX_BYTES) return "size";
  if (!(await hasSignature(file))) return "type";
  return null;
}

/** Drag-and-drop props for a drop-zone <label>: without them a file dropped on
    the zone is opened by the browser, which leaves the page and the form. */
export function dropZoneProps(onFile: (file: File | undefined) => void) {
  return {
    onDragOver: (e: { preventDefault: () => void }) => e.preventDefault(),
    onDrop: (e: { preventDefault: () => void; dataTransfer: DataTransfer }) => {
      e.preventDefault();
      onFile(e.dataTransfer.files?.[0]);
    },
  };
}
