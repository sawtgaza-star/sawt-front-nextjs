import type { StorySlide } from "./untold-stories-data";

/* One slide of "أصوات لم نقدر على توصيلها". Reuses the home page's `.rs-card`
   markup so the slide-up hover story is identical. API copy renders bare;
   the built-in cards keep their data-i18n keys. */
export default function UntoldStoryCard({ story }: { story: StorySlide }) {
  return (
    <div className="sp-story-slide">
      <div className="rs-card">
        <img className="rs-card-bg" src={story.image} alt="" />
        <div className="rs-card-info">
          <div className="rs-card-text">
            {story.badge ? (
              <span className="rs-badge" data-i18n={story.badgeKey}>
                {story.badge}
              </span>
            ) : null}
            <h5 className="rs-card-title" data-i18n={story.titleKey}>
              {story.title}
            </h5>
            {story.subtitle ? (
              <p className="rs-card-desc" data-i18n={story.subtitleKey}>
                {story.subtitle}
              </p>
            ) : null}
            {story.full ? (
              <p className="rs-card-full" data-i18n={story.fullKey}>
                {story.full}
              </p>
            ) : null}
          </div>
          <a
            href={story.href}
            className="rs-arrow"
            aria-label="عرض القصة"
            data-i18n-title="rs_view_story"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
