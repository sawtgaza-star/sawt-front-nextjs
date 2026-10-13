import SkeletonText from "@/components/ui/SkeletonText";

/* CreatorsStats and the JoinUs banner while GET /pages/creators is in flight:
   their real markup, with each text swapped for a <SkeletonText /> (~1.25x
   the current copy). The stat cards keep their chrome (the card, the
   stroke behind the icon); the banner's photo becomes a shimmer over the same
   box. Keep it in step with CreatorsStats and home/JoinUs. */

/** Character counts (~1.25x) of the current `stats` and `join` copy. */
const STATS = {
  title: 28,
  subtitle: 36,
  items: [
    { num: 4, label: 18 },
    { num: 5, label: 23 },
    { num: 8, label: 18 },
    { num: 4, label: 21 },
  ],
};
const JOIN = { title: 28, description: 53, button: 15 };

export function StatsSkeleton() {
  return (
    <section className="cr-stats-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <SkeletonText chars={STATS.title} />
          </h2>
          <p className="cr-section-sub">
            <SkeletonText chars={STATS.subtitle} />
          </p>
        </div>
        <div className="cr-stats-grid">
          {STATS.items.map((stat, index) => (
            <div className="cr-stat-card" key={index}>
              <div className="cr-stat-icon">
                <i className="icon"></i>
              </div>
              <div className="cr-stat-num">
                <SkeletonText chars={stat.num} />
              </div>
              <p className="cr-stat-label">
                <SkeletonText chars={stat.label} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JoinSkeleton() {
  return (
    <section className="join-us-section position-relative">
      <img
        src="/assets/images/leaf_cutout.png"
        className="olive-branch branch-right-top-joinUs-section"
        alt=""
      />
      <div className="join-us-banner ">
        <span className="sk-shimmer join-us-bg" />
        <div className="join-us-content text-center ">
          <h2 className="join-us-title">
            <SkeletonText chars={JOIN.title} />
          </h2>
          <p className="join-us-desc">
            <SkeletonText chars={JOIN.description} />
          </p>
          <a className="btn btn-dark-green join-us-btn">
            <span>
              <SkeletonText chars={JOIN.button} />
            </span>
            <i className="fa-solid fa-angle-left arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
