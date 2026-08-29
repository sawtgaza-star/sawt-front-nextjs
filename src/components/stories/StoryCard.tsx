import type { StoryCardItem } from "./story-data";

/* The story card used on /stories and in the "قصص ذات صلة" strip — the very
   same `.rs-card` markup the home slider and the support page render, so the
   poster, the "قصة نجاح" badge, the slide-up-on-hover full story and the
   circular arrow all come from style.css unchanged. The arrow is the card's
   link, exactly as on the home slider. */
export default function StoryCard({ story }: { story: StoryCardItem }) {
  return (
    <div className="rs-card">
      <img className="rs-card-bg" src={story.image} alt="" />
      <div className="rs-card-info">
        <div className="rs-card-text">
          <span className="rs-badge" data-i18n="rs_badge">
            قصة نجاح
          </span>
          <h5 className="rs-card-title" data-i18n={story.titleKey}>
            {story.title}
          </h5>
          <p className="rs-card-desc" data-i18n="rs_card_desc">
            من غزة الى الأردن وأمل لايمشي مجددا
          </p>
          <p className="rs-card-full" data-i18n={story.fullKey}>
            {story.full}
          </p>
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
  );
}
