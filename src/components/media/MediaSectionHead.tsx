/* Every section on /media opens the same way: an orange outline pill, a bold
   heading and a muted one-liner. `titleHl` renders the trailing half of the
   heading in olive green (the packages section is the only one that uses it). */
export default function MediaSectionHead({
  pill,
  pillKey,
  title,
  titleKey,
  titleHl,
  titleHlKey,
  sub,
  subKey,
  align = "center",
}: {
  pill: string;
  pillKey: string;
  title: string;
  titleKey: string;
  titleHl?: string;
  titleHlKey?: string;
  sub?: string;
  subKey?: string;
  align?: "center" | "start";
}) {
  return (
    <div className={"sm-head" + (align === "start" ? " sm-head-start" : "")}>
      <span className="sm-pill" data-i18n={pillKey}>
        {pill}
      </span>
      <h2 className="sm-head-title">
        <span data-i18n={titleKey}>{title}</span>
        {titleHl ? (
          <>
            {" "}
            <span className="sm-head-hl" data-i18n={titleHlKey}>
              {titleHl}
            </span>
          </>
        ) : null}
      </h2>
      {sub ? (
        <p className="sm-head-sub" data-i18n={subKey}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
