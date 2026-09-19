/* The olive-tinted strip that rides the bottom edge of the hero: the service
   list scrolling right-to-left, each item followed by an orange dot. Two
   identical groups so the CSS translate loops seamlessly (same trick as the
   site-wide .marquee, but with text instead of logos).

   It says the same thing as the hero's rotating orange word — both are the
   payload's `hero.phrases` — so the two are fed the one list rather than
   keeping their own copies. */
function Group({ phrases, hidden = false }: { phrases: string[]; hidden?: boolean }) {
  return (
    <div className="sm-ticker-group" aria-hidden={hidden || undefined}>
      {phrases.map((phrase, index) => (
        <span className="sm-ticker-item" key={index}>
          <span>{phrase}</span>
          <i className="sm-ticker-dot" aria-hidden="true"></i>
        </span>
      ))}
    </div>
  );
}

export default function MediaTicker({ phrases }: { phrases: string[] }) {
  if (!phrases.length) return null;

  return (
    <div className="sm-ticker">
      <Group phrases={phrases} />
      <Group phrases={phrases} hidden />
    </div>
  );
}
