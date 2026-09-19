import type { StoryCardItem } from "./story-data";

/* The story card used on /stories and in the "قصص ذات صلة" strip — the very
   same `.rs-card` markup the home slider and the support page render, so the
   poster, the "قصة نجاح" badge, the slide-up-on-hover full story and the
   circular arrow all come from style.css unchanged. The arrow is the card's
   link, exactly as on the home slider.

   Every word comes from GET /pages/stories and is already in the reader's
   language, so nothing here carries a `data-i18n` key: one on copy React owns
   is what makes applyTranslations() fight React (see the note in NewsCard).
   A slot the payload left empty renders as nothing rather than as built-in
   Arabic that would contradict it. */
export default function StoryCard({ story }: { story: StoryCardItem }) {
  return (
    <div className="rs-card">
      {/* src="" would make the browser re-request the page as an image */}
      {story.image ? (
        <img className="rs-card-bg" src={story.image} alt="" />
      ) : null}
      <div className="rs-card-info">
        <div className="rs-card-text">
          {story.badge ? <span className="rs-badge">{story.badge}</span> : null}
          {story.title ? (
            <h5 className="rs-card-title">{story.title}</h5>
          ) : null}
          {story.desc ? <p className="rs-card-desc">{story.desc}</p> : null}
          {story.full ? <p className="rs-card-full">{story.full}</p> : null}
        </div>
        <a
          href={story.href}
          className="rs-arrow"
          aria-label={story.title}
          data-i18n-title="rs_view_story"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </a>
      </div>
    </div>
  );
}
