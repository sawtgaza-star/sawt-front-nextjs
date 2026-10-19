import "@/styles/skeleton-text.css";

/* A text placeholder that takes exactly the room the real text will.

   Put it INSIDE the real element (the same h5 / p / li / a, with the same
   classes) in place of the text. It renders invisible filler text of about
   `chars` characters with a grey band behind each line — so it inherits the
   element's font, size and line-height and wraps to the same number of lines
   at every screen width as copy of that length. Fixed-height bars can't: they
   are always too short or too tall somewhere, and the page jumps on arrival.

   Size `chars` to the copy it stands for (the current API text's length). */

const FILLER =
  "هذا نص تجريبي يحجز مكان المحتوى أثناء التحميل حتى لا تتحرك الصفحة عند وصوله ";

function filler(chars: number): string {
  const n = Math.max(1, Math.round(chars));
  return FILLER.repeat(Math.ceil(n / FILLER.length)).slice(0, n).trim() || "نص";
}

/* Two spans: the outer one keeps the element's own font-size, so the line it
   makes is the real line's height even where it ends up a flex/grid item; the
   inner one is the smaller, rounded bar (skeleton-text.css). */
export default function SkeletonText({ chars }: { chars: number }) {
  return (
    <span className="sk-text-line" aria-hidden="true">
      <span className="sk-text">
        <span className="sk-text__fill">{filler(chars)}</span>
      </span>
    </span>
  );
}
