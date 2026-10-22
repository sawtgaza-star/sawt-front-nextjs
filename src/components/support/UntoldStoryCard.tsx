import type { StorySlide } from "./untold-stories-data";
import RichText from "@/components/ui/RichText";

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
              <RichText as="p" className="rs-card-desc" data-i18n={story.subtitleKey} html={story.subtitle} />
            ) : null}
            {story.full ? (
              <RichText as="p" className="rs-card-full" data-i18n={story.fullKey} html={story.full} />
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
