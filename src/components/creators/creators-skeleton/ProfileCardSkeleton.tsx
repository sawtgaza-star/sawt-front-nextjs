import SkeletonText from "@/components/ui/SkeletonText";
import { blank, times } from "./sk-utils";

/* The overlapping profile card of CreatorProfileHero while GET
   /pages/creators/{id} is in flight: the real card — social bubble, the top
   row (avatar beside the name row with the follow pill and the bio) and the
   three stat tiles — with each text swapped for a <SkeletonText /> (~1.25x the
   current copy) and the photo for a shimmer of the photo's box. Keep it in
   step with CreatorProfileHero. */

const LEN = { socials: 14, name: 26, follow: 8, bio: 180 };
const SOCIAL_LINKS = 2;
const STATS = [
  { num: 5, label: 8 },
  { num: 3, label: 6 },
  { num: 2, label: 6 },
];

export default function ProfileCardSkeleton() {
  return (
    <div className="container" aria-busy="true" aria-hidden="true">
      <div className="cr-profile-card">
        <div className="cr-profile-social">
          <span className="cr-profile-social-label">
            <SkeletonText chars={LEN.socials} />
          </span>
          <div className="cr-profile-social-icons">
            {times(SOCIAL_LINKS).map((i) => (
              <a key={i}></a>
            ))}
          </div>
        </div>

        <div className="cr-profile-top">
          <div className="cr-profile-avatar">
            <img className="sk-shimmer" src={blank()} alt="" />
          </div>

          <div className="cr-profile-main">
            <div className="cr-profile-name-row">
              <h2 className="cr-profile-name">
                <SkeletonText chars={LEN.name} />
              </h2>
              <span className="cr-profile-follow">
                <span>
                  <SkeletonText chars={LEN.follow} />
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" />
              </span>
            </div>

            <p className="cr-profile-role">
              <SkeletonText chars={LEN.bio} />
            </p>
          </div>
        </div>

        <div className="cr-profile-stats">
          {STATS.map((stat, i) => (
            <div className="cr-profile-stat" key={i}>
              <span className="cr-profile-stat-num">
                <SkeletonText chars={stat.num} />
              </span>
              <span className="cr-profile-stat-label">
                <SkeletonText chars={stat.label} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
