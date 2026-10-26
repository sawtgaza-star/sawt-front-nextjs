export type ReelFigure = {
  key: string;
  value: string;
  /** a word after the number (views, followers…) */
  label?: string;
  /** an icon before the number instead of a word */
  icon?: "heart" | "comment";
};

const ICONS = {
  heart:
    "M10.41 19.968C7.59 17.858 2 13.035 2 8.694C2 5.826 4.105 3.5 7 3.5c1.5 0 3 .5 5 2.5c2-2 3.5-2.5 5-2.5c2.895 0 5 2.326 5 5.194c0 4.34-5.59 9.164-8.41 11.274c-.95.71-2.23.71-3.18 0",
  comment:
    "M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865",
};

/* The dark caption under the media reel — the home reel's `.reel-caption`
   rows: title (2 lines), "@account • date" (or the creator's role), then
   the figures and the Instagram link. */
export default function CreatorReelCaption({
  title,
  tooltip,
  subtitle,
  handle,
  posted,
  postedIso,
  figures,
  link,
  linkLabel,
}: {
  title: string;
  tooltip?: string;
  subtitle?: string;
  handle: string;
  posted: string;
  postedIso: string;
  figures: ReelFigure[];
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="reel-caption">
      {title ? (
        <p className="reel-title" dir="auto" title={tooltip || undefined}>
          {title}
        </p>
      ) : null}

      {handle || posted || subtitle ? (
        <div className="reel-byline">
          {handle ? (
            <a className="reel-user" href={`https://www.instagram.com/${encodeURIComponent(handle)}/`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              <bdi>@{handle}</bdi>
            </a>
          ) : null}
          {handle && (posted || subtitle) ? <span className="reel-dot" aria-hidden="true">•</span> : null}
          {posted ? (
            <time className="reel-date" dateTime={postedIso}>
              <bdi>{posted}</bdi>
            </time>
          ) : subtitle ? (
            <span className="reel-date">{subtitle}</span>
          ) : null}
        </div>
      ) : null}

      {figures.length || link ? (
        <div className="reel-stats">
          {figures.map((f) => (
            <span key={f.key} className={"reel-stat" + (f.key === "views" ? " reel-views" : "")}>
              {f.icon ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1.15em" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={ICONS[f.icon]} />
                </svg>
              ) : null}
              <bdi>{f.value}</bdi>
              {f.label ? <> {f.label}</> : null}
            </span>
          ))}
          {link ? (
            <a className="reel-ig-link" href={link} target="_blank" rel="noopener noreferrer">
              <span>{linkLabel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4h6v6m0-6L11 13m-2-7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
              </svg>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
