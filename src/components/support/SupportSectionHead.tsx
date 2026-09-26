import { splitHeading } from "./support-text";

/* The centred heading every /support section opens with (cr-section-head from
   creators.css). With the API's copy the last word takes the accent; without
   it the built-in two-part heading renders with its data-i18n keys, so the DOM
   translator still reaches it. The API's copy carries none — it is already in
   the current language, picked by `lang` upstream. */
export type HeadFallback = {
  pre?: string;
  preKey?: string;
  hl: string;
  hlKey: string;
  sub?: string;
  subKey?: string;
};

export default function SupportSectionHead({
  title,
  sub,
  fallback,
  tailWords = 1,
}: {
  title: string;
  sub: string;
  fallback: HeadFallback;
  tailWords?: number;
}) {
  const [pre, hl] = splitHeading(title, tailWords);

  return (
    <div className="cr-section-head">
      {title ? (
        <h2 className="cr-section-title">
          {pre ? <span>{pre}</span> : null}
          {pre ? " " : null}
          <span className="cr-highlight">{hl}</span>
        </h2>
      ) : (
        <h2 className="cr-section-title">
          {fallback.pre ? (
            <>
              <span data-i18n={fallback.preKey}>{fallback.pre}</span>{" "}
            </>
          ) : null}
          <span className="cr-highlight" data-i18n={fallback.hlKey}>
            {fallback.hl}
          </span>
        </h2>
      )}
      {sub ? (
        <p className="cr-section-sub">{sub}</p>
      ) : title || !fallback.sub ? null : (
        <p className="cr-section-sub" data-i18n={fallback.subKey}>
          {fallback.sub}
        </p>
      )}
    </div>
  );
}
