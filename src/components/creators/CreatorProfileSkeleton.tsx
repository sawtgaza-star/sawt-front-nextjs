import { CollabStepsSkeleton, Line } from "./CreatorsSkeleton";

/* What /creators/[id] shows below the hero while GET /pages/creators/{id} is
   in flight — the hero and profile card draw their own bars (see
   CreatorProfileHero). Each placeholder sits in the real section wrapper, so
   the page keeps the shape the content arrives into: the reel slider, the
   collaborations block and the collaboration steps. */
export default function CreatorProfileSkeleton() {
  return (
    <div aria-busy="true" aria-hidden="true">
      <section className="cr-content-detail-section">
        <div className="container">
          <Line width="160px" className="sk-line-title" />
          <div className="cr-sk-reels">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="sk-block cr-sk-reel" />
            ))}
          </div>
        </div>
      </section>

      <section className="cr-collabs-section">
        <div className="container">
          <div className="cr-sk-collabs">
            <div>
              <Line width="70%" className="sk-line-title" />
              <Line width="90%" />
              <Line width="60%" />
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="sk-block cr-sk-collab-item" />
              ))}
            </div>
            <span className="sk-block cr-sk-collab-media" />
            <span className="sk-block cr-sk-collab-quote" />
          </div>
        </div>
      </section>

      <CollabStepsSkeleton />
    </div>
  );
}
