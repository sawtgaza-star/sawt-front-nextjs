/* The join modal's picked photo, shared between the React field that frames
   it (JoinPhotoField) and the DOM-driven stepper in lib/legacy-home, which
   sends it with the application and clears it once the application is in.
   `original` is the file as picked — "تعديل" reopens the cropper on it —
   `cropped` is the square the cropper handed back, the one that is sent. */

export type JoinPhoto = { original: File; cropped: File; preview: string };

let photo: JoinPhoto | null = null;
const listeners = new Set<() => void>();

export function getJoinPhoto(): JoinPhoto | null {
  return photo;
}

export function setJoinPhoto(next: JoinPhoto | null): void {
  if (photo && photo.preview !== next?.preview) URL.revokeObjectURL(photo.preview);
  photo = next;
  listeners.forEach((fn) => fn());
}

export function subscribeJoinPhoto(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
