/* Stroke icons for <AvatarCropper /> — drawn inline because the site's Font
   Awesome is a subset without these glyphs. */

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
export const ICON_MINUS = icon("M5 12h14");
export const ICON_PLUS = icon("M12 5v14M5 12h14");
export const ICON_ROTATE_LEFT = icon("M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5");
export const ICON_ROTATE_RIGHT = icon("M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5");
