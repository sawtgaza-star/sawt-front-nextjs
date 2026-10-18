"use client";
import { Fragment, type ReactNode } from "react";
import { useLang } from "@/lib/use-lang";
import { formatCount, formatDate, timeAgo, type ReelDetails } from "./reel-data";

const IG = "https://www.instagram.com/";

/* The caption with its @mentions and #hashtags as links to Instagram — the
   reels are the platform's Instagram posts, so that is where they lead. */
export function linkifyCaption(text: string): ReactNode {
  const parts = text.split(/([@#][\p{L}\p{N}_.]+)/u);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    // a mention can't end on a dot ("@sawtmedia0." is "@sawtmedia0" + ".")
    const word = part.slice(1).replace(/\.+$/, "");
    const rest = part.slice(1 + word.length);
    if (!word) return <Fragment key={i}>{part}</Fragment>;
    const href =
      part[0] === "@"
        ? `${IG}${encodeURIComponent(word)}/`
        : `${IG}explore/tags/${encodeURIComponent(word)}/`;
    return (
      <Fragment key={i}>
        <a
          className="cr-reel-caption-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {part[0]}
          {word}
        </a>
        {rest}
      </Fragment>
    );
  });
}

/* Everything else the API says about a reel, under its caption in the
   viewer: its categories, collaborators, the insight numbers when the backend
   has them (views / reach — hidden while null, never shown as 0), the full
   posting date, and a link to the post on Instagram. Each piece renders only
   when the payload carries it. */
export default function ReelExtra({ details }: { details?: ReelDetails }) {
  const { tr, lang } = useLang();
  if (!details) return null;

  const labels = details.categoryLabels?.length
    ? details.categoryLabels
    : [];
  const date = formatDate(details.postedAt, lang);
  const ago = timeAgo(details.postedAt, lang);
  const stats: { icon: string; value: number; label: string }[] = [];
  if (details.views !== null) {
    stats.push({ icon: "fa-regular fa-eye", value: details.views, label: tr("reel_views") });
  }
  if (details.reach !== null) {
    stats.push({ icon: "fa-solid fa-users", value: details.reach, label: tr("reel_reach") });
  }

  const hasAnything =
    labels.length || details.collaborators.length || stats.length || date || details.permalink;
  if (!hasAnything) return null;

  return (
    <div className="cr-reel-extra" onClick={(e) => e.stopPropagation()}>

      {details.collaborators.length > 0 && (
        <p className="cr-reel-collab">
          <i className="fa-solid fa-user-group" aria-hidden="true"></i>
          <span>{tr("reel_collab")}</span>{" "}
          {details.collaborators.map((name, i) => (
            <Fragment key={name}>
              {i > 0 ? "، " : null}
              <a
                href={`${IG}${encodeURIComponent(name)}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{name}
              </a>
            </Fragment>
          ))}
        </p>
      )}

      {/* one quiet line: category chips · stats · date, Instagram at the end */}
      <div className="cr-reel-extra-row">
        {labels.map((label) => (
          <span key={label} className="cr-reel-tag">
            {label}
          </span>
        ))}
        {stats.map((s) => (
          <span key={s.label} className="cr-reel-stat" title={`${s.value} ${s.label}`}>
            <i className={s.icon} aria-hidden="true"></i>
            {formatCount(s.value, lang)} {s.label}
          </span>
        ))}
        {date && (
          <span className="cr-reel-stat" title={date}>
            {ago || date}
          </span>
        )}
        {details.permalink && (
          <a
            className="cr-reel-ig"
            href={details.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tr("reel_open_instagram")}
            title={tr("reel_open_instagram")}
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>
        )}
      </div>
    </div>
  );
}
