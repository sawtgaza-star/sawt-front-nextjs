import { CC_COPY, pick } from "./media-creators-data";

/* The reel card for a creator with no featured reel yet: their portrait,
   blurred and dimmed, behind the home reel column's empty state (`reels-empty`
   from home-reels.css) — a "no videos" icon, a title naming the creator, one
   line of text and, when they have an Instagram handle, a pill to their
   account. */
export default function CreatorReelEmpty({
  name,
  avatar,
  handle,
  lang,
}: {
  name: string;
  avatar: string;
  handle: string;
  lang: string;
}) {
  return (
    <div className="review-reels sm-cc-reel is-empty">
      {avatar ? <img className="sm-cc-reel-backdrop" src={avatar} alt="" aria-hidden="true" /> : null}
      <div className="reels-empty" role="status">
        <span className="reels-empty-icon" aria-hidden="true">
          {/* a clapper with a slash: no videos */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
              <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
              <path d="M2 2l20 20" />
            </g>
          </svg>
        </span>
        <h3 className="reels-empty-title">{pick(CC_COPY.emptyTitle, lang)}</h3>
        <p className="reels-empty-text">
          {name ? (
            <>
              <bdi>{name}</bdi> {pick(CC_COPY.emptyTextNamed, lang)}
            </>
          ) : (
            pick(CC_COPY.emptyText, lang)
          )}
        </p>
        {handle ? (
          <a
            className="reels-empty-retry sm-cc-reel-follow"
            href={`https://www.instagram.com/${encodeURIComponent(handle)}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            <span>{pick(CC_COPY.follow, lang)}</span>
            <bdi dir="ltr">@{handle}</bdi>
          </a>
        ) : null}
      </div>
    </div>
  );
}
