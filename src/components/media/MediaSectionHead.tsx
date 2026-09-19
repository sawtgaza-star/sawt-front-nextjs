/* Every section on /media opens the same way: an orange outline pill, a bold
   heading and a muted one-liner. `titleHl` renders the trailing half of the
   heading in olive green (the packages section is the only one that uses it —
   see splitHighlight in ./media-page-view).

   The strings arrive already resolved from GET /pages/media, so there are no
   `data-i18n` keys here any more: the language toggle is served by `lang` at
   the section above, not by the DOM translator. Anything the editor leaves
   empty is not rendered rather than rendered blank. */
export default function MediaSectionHead({
  pill,
  title,
  titleHl,
  sub,
  align = "center",
}: {
  pill?: string;
  title?: string;
  titleHl?: string;
  sub?: string;
  align?: "center" | "start";
}) {
  if (!pill && !title && !sub) return null;

  return (
    <div className={"sm-head" + (align === "start" ? " sm-head-start" : "")}>
      {pill ? <span className="sm-pill">{pill}</span> : null}
      {title ? (
        <h2 className="sm-head-title">
          <span>{title}</span>
          {titleHl ? (
            <>
              {" "}
              <span className="sm-head-hl">{titleHl}</span>
            </>
          ) : null}
        </h2>
      ) : null}
      {sub ? <p className="sm-head-sub">{sub}</p> : null}
    </div>
  );
}
