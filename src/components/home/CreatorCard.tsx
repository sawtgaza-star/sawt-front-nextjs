/* A single home creators-carousel card, filled from the API's
   `creators.items`. The card is tinted by its own creator: a heavily blurred
   copy of the photo is its background. The portrait fills the top,
   ending in a wide rounded bottom, its sides melting into a light tint of
   its own background; below it sit the name, two lines of bio, the
   follower count and a "متابعة +" pill.

   The whole card opens /creators/{id} (a stretched link under the copy); the
   pill sits above that link and follows instead. Owl clones the slides as
   plain DOM, so the pill carries everything the follow call needs in data-*
   attributes and CreatorFollowWiring handles every pill — clones included —
   from one document listener.

   No `data-i18n` here: the payload arrives in both languages and the caller
   picks one, so the DOM translator has nothing to do. */

import { textDir } from "./home-text";
import RichText from "@/components/ui/RichText";

export type HomeCreatorCardData = {
  uuid: string;
  name: string;
  bio: string;
  avatar?: string | null;
  followers: string;
  followersCount?: number | null;
  href: string;
  /** The API's `is_verified` — only then does the seal show. */
  verified?: boolean;
};

export default function CreatorCard({
  creator,
  dir,
  followLabel,
  unfollowLabel,
}: {
  creator: HomeCreatorCardData;
  /** The page language's direction — Owl's rtl mode would otherwise force
      every card right-to-left, English included. */
  dir: "rtl" | "ltr";
  followLabel: string;
  unfollowLabel: string;
}) {
  return (
    <div className="item">
      <article className="cc-card" dir={dir}>
        <div className="cc-card-screen">
          {creator.avatar ? (
            <img
              loading="lazy"
              decoding="async"
              className="cc-card-backdrop"
              src={creator.avatar}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          <div className="cc-card-tint" aria-hidden="true"></div>
          {/* the light backdrop behind the portrait: the top of the same
              photo — mostly its own background — blurred into a clean tint */}
          {creator.avatar ? (
            <div className="cc-card-stage" aria-hidden="true">
              <img
                loading="lazy"
                decoding="async"
                src={creator.avatar}
                alt=""
              />
            </div>
          ) : null}
          {creator.avatar ? (
            <div className="cc-card-portrait">
              <img
                loading="lazy"
                decoding="async"
                className="cc-card-photo"
                src={creator.avatar}
                alt={creator.name}
              />
            </div>
          ) : null}
          <a
            href={creator.href}
            className="cc-card-link"
            aria-label={creator.name}
          ></a>
          <div className="cc-card-body">
            {/* the name line reads in the name's own script — an English
                name starts on the left with its seal after it, an Arabic one
                on the right — whatever the page language */}
            <h3 className="cc-card-name" dir={textDir(creator.name, dir)}>
              <span>{creator.name}</span>
              {/* the official verified seal, as on the creator's profile — only
                for an account the API marks `is_verified` */}
              {creator.verified ? (
                <svg
                  className="cc-card-verified"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.6A3 3 0 0 1 16.7 3.86A3 3 0 0 1 20.14 7.3A3 3 0 0 1 21.4 12A3 3 0 0 1 20.14 16.7A3 3 0 0 1 16.7 20.14A3 3 0 0 1 12 21.4A3 3 0 0 1 7.3 20.14A3 3 0 0 1 3.86 16.7A3 3 0 0 1 2.6 12A3 3 0 0 1 3.86 7.3A3 3 0 0 1 7.3 3.86A3 3 0 0 1 12 2.6Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M8 12.3l2.7 2.7L16.2 9.5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </h3>
            {/* always rendered: its two-line height keeps the names level */}
            <RichText as="p" className="cc-card-bio" html={creator.bio} />
            <div className="cc-card-foot">
              {creator.followers ? (
                <span className="cc-card-stat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20.5c0-3.6 3.6-6 8-6s8 2.4 8 6" />
                  </svg>
                  <span>{creator.followers}</span>
                </span>
              ) : null}
              {creator.uuid ? (
                <button
                  type="button"
                  className="cc-follow"
                  aria-pressed="false"
                  data-uuid={creator.uuid}
                  data-name={creator.name}
                  data-avatar={creator.avatar || ""}
                  data-followers={creator.followersCount ?? ""}
                >
                  <span className="cc-follow-on">{followLabel}</span>
                  <span className="cc-follow-off">{unfollowLabel}</span>
                  <svg
                    className="cc-follow-plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
