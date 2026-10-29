/* The generic person shown wherever a profile photo is missing or broken —
   used by BrokenImageGuard (as an <img> src) and mirrored in
   image-fallback.css (as a background). Light olive disc, darker silhouette. */
const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<rect width="64" height="64" fill="#E9EBE5"/>' +
  '<circle cx="32" cy="25" r="11" fill="#9AA38F"/>' +
  '<path d="M12 58c2-11 10-17 20-17s18 6 20 17z" fill="#9AA38F"/>' +
  "</svg>";

export const PERSON_ICON = "data:image/svg+xml," + encodeURIComponent(SVG);
