// @ts-nocheck
/* eslint-disable */
import { localized } from "@/lib/api/pages";
import type { HomeStories } from "@/lib/api/home";
import { splitHeading } from "./home-text";

/* The API's `stories` block. Each card maps straight onto the legacy slots:

     badge          -> .rs-badge      ("غزة")
     headline       -> .rs-card-title
     footer_subtitle-> .rs-card-desc  (the one-line standfirst)
     excerpt        -> .rs-card-full

   `stories.view_all` is also in the payload but is NOT rendered: this section
   has no "view all" button in the design — its second column is the story
   submission box — and adding one would be a redesign. The /stories listing is
   reached from the nav.

   The form still posts nowhere, exactly as in the legacy site, and its
   placeholder keeps its `data-i18n-placeholder` key: that is chrome the API
   doesn't send, and an attribute is not something React fights over. */

function StoryCard({ story }) {
  return (
    <div className="item">
      {" "}
      <div className="rs-card">
        {" "}
        {story.image ? (
          <img className="rs-card-bg" src={story.image} alt="" />
        ) : null}{" "}
        <div className="rs-card-info">
          {" "}
          <div className="rs-card-text">
            {" "}
            {story.badge ? (
              <span className="rs-badge">{story.badge}</span>
            ) : null}{" "}
            {story.headline ? (
              <h5 className="rs-card-title">{story.headline}</h5>
            ) : null}{" "}
            {story.subtitle ? (
              <p className="rs-card-desc">{story.subtitle}</p>
            ) : null}{" "}
            {story.excerpt ? (
              <p className="rs-card-full">{story.excerpt}</p>
            ) : null}{" "}
          </div>{" "}
          <a
            href={story.href}
            className="rs-arrow"
            aria-label={story.headline}
            data-i18n-title="rs_view_story"
          >
            {" "}
            <i className="fa-solid fa-arrow-left"></i>{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default function RealStories({
  data,
  lang = "ar",
}: {
  data?: HomeStories;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);
  const description = localized(data?.description, lang);
  const badge = localized(data?.badge, lang);

  const stories = (Array.isArray(data?.items) ? data.items : []).map((item) => ({
    key: item.uuid || item.id,
    image: item.cover_image,
    badge: localized(item.badge, lang),
    headline: localized(item.headline, lang),
    subtitle: localized(item.footer_subtitle, lang),
    excerpt: localized(item.excerpt, lang),
    /* /stories/{uuid} — the detail endpoint resolves the uuid only, so a row
       without one is not linkable (see lib/api/stories) */
    href: item.uuid ? `/stories/${item.uuid}` : "#",
  }));

  if (!title && !description && !stories.length) return null;

  return (
    <>
      <section className="real-stories-section py-5">
        {" "}
        <div className="container">
          {" "}
          <div className="row g-4 align-items-center">
            {" "}
            {/*  Slider column  */}{" "}
            <div className="col-lg-7 order-2 order-lg-2">
              {" "}
              <div className="owl-carousel real-stories-carousel">
                {" "}
                {stories.map((story, index) => (
                  <StoryCard key={story.key ?? index} story={story} />
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {/*  Text + comment column  */}{" "}
            <div className="col-lg-5 order-1 order-lg-1">
              {" "}
              <div className="rs-intro">
                {" "}
                {title ? (
                  <h2 className="rs-title fw-bold">
                    {" "}
                    <span>{titleHead}</span>{" "}
                    <span className="rs-title-word">{titleTail}</span>{" "}
                  </h2>
                ) : null}{" "}
                {description ? <p className="rs-desc">{description}</p> : null}{" "}
                {badge ? (
                  <div className="rs-count">
                    {" "}
                    <span className="rs-count-icon">
                      {" "}
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.333 3c2.46-.003 4.836.887 6.667 2.5V21a10.07 10.07 0 0 0-6.667-2.5c-1.562 0-2.343 0-2.688-.22a1.16 1.16 0 0 1-.424-.425C2 17.51 2 16.895 2 15.663v-9.26c0-1.428 0-2.141.549-2.72c.548-.579 1.11-.609 2.234-.668Q5.056 3 5.333 3m13.334 0A10.07 10.07 0 0 0 12 5.5V21a10.07 10.07 0 0 1 6.667-2.5c1.562 0 2.343 0 2.688-.22c.207-.133.291-.218.424-.425c.221-.345.221-.96.221-2.192v-9.26c0-1.428 0-2.141-.549-2.72s-1.11-.609-2.234-.668Q18.944 3 18.667 3"></path> </svg>
                      </i>{" "}
                    </span>{" "}
                    <span className="rs-count-text">{badge}</span>{" "}
                  </div>
                ) : null}{" "}
                <form className="rs-comment-box" onSubmit={() => { return false; }}>
                  {" "}
                  <textarea className="rs-input" rows={4} placeholder="شاركنا قصتك" data-i18n-placeholder="realstories_input_placeholder"></textarea>{" "}
                  <button type="submit" className="rs-send" aria-label="إرسال">
                    {" "}
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"></path> </svg>
                    </i>{" "}
                  </button>{" "}
                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
