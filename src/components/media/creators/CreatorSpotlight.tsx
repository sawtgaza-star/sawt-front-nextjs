import { localized } from "@/lib/api/pages";
import type { MediaCreatorItem } from "@/lib/api/media-page";
import { htmlToLines } from "@/lib/html-text";
import { compact } from "@/components/creators/creators-text";
import CountUp from "./CountUp";
import CreatorBio from "./CreatorBio";

export type CreatorStatLabels = { videos: string; followers: string; views: string };

/* The picked creator's card: followers badge in the corner, the round
   portrait (with the blue seal when verified), name, role, a short bio and
   three figures (videos · followers · views) labelled by the block's
   `stats_labels`; the figures count up each time a creator is picked. */
export default function CreatorSpotlight({
  creator,
  labels,
  lang,
}: {
  creator: MediaCreatorItem;
  labels: CreatorStatLabels;
  lang: string;
}) {
  const stats = creator.stats;
  const followers = stats?.followers;
  const bio = htmlToLines(localized(creator.bio, lang)).replace(/\s+/g, " ").trim();
  const figure = (value: number | null | undefined) =>
    typeof value === "number" ? (value >= 1000 ? `+${compact(value)}` : String(value)) : "—";

  const figures = [
    { key: "videos", value: stats?.videos, label: labels.videos },
    { key: "followers", value: followers, label: labels.followers },
    { key: "views", value: stats?.views, label: labels.views },
  ];

  return (
    <article className="sm-cc-profile" key={creator.uuid}>
      {typeof followers === "number" ? (
        <span className="sm-cc-badge">
          {compact(followers)} {labels.followers}
        </span>
      ) : null}
      <span className="sm-cc-avatar">
        {creator.avatar_url ? <img src={creator.avatar_url} alt={creator.name || ""} /> : null}
        {creator.is_verified ? (
          <span className="sm-cc-verified" title="حساب موثّق" aria-label="حساب موثّق">
            {/* the profile page's seal: blue scalloped rosette, white tick */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.6A3 3 0 0 1 16.7 3.86A3 3 0 0 1 20.14 7.3A3 3 0 0 1 21.4 12A3 3 0 0 1 20.14 16.7A3 3 0 0 1 16.7 20.14A3 3 0 0 1 12 21.4A3 3 0 0 1 7.3 20.14A3 3 0 0 1 3.86 16.7A3 3 0 0 1 2.6 12A3 3 0 0 1 3.86 7.3A3 3 0 0 1 7.3 3.86A3 3 0 0 1 12 2.6Z" fill="#1877F2" />
              <path d="M8 12.3l2.7 2.7L16.2 9.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </span>
      <h3 className="sm-cc-name">{creator.name}</h3>
      <p className="sm-cc-role">{localized(creator.role, lang)}</p>
      {bio ? <CreatorBio key={creator.uuid} text={bio} lang={lang} /> : null}
      <ul className="sm-cc-figures">
        {figures.map((f) => (
          <li key={f.key}>
            <b>
              {typeof f.value === "number" ? (
                <CountUp key={`${creator.uuid}-${f.key}`} value={f.value} format={figure} />
              ) : (
                figure(f.value)
              )}
            </b>
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
