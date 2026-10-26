// @ts-nocheck
/* eslint-disable */
import { localized, localizedHtml } from "@/lib/api/pages";
import type { HomeStories } from "@/lib/api/home";
import { splitHeading } from "./home-text";
import RichText from "@/components/ui/RichText";
import StoryShareForm from "./StoryShareForm";

/* The API's `stories` block. Each card maps straight onto the legacy slots:

     badge          -> .rs-badge      ("غزة")
     headline       -> .rs-card-title
     footer_subtitle-> .rs-card-desc  (the one-line standfirst)
     excerpt        -> .rs-card-full

   `stories.view_all` is also in the payload but is NOT rendered: this section
   has no "view all" button in the design — its second column is the story
   submission box — and adding one would be a redesign. The /stories listing is
   reached from the nav.

   The submission box is <StoryShareForm /> (POST /pages/stories/share) —
   the only client leaf here; this section stays directive-free. */

function StoryCard({ story }) {
  return (
    <div className="item">
      {" "}
      <div className="rs-card">
        {" "}
        {story.image ? (
          <img loading="lazy" decoding="async" className="rs-card-bg" src={story.image} alt="" />
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
              <RichText as="p" className="rs-card-desc" html={story.subtitle} />
            ) : null}{" "}
            {story.excerpt ? (
              <RichText as="p" className="rs-card-full" html={story.excerpt} />
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
  const description = localizedHtml(data?.description, lang);
  const badge = localized(data?.badge, lang);

  const stories = (Array.isArray(data?.items) ? data.items : []).map((item) => ({
    key: item.uuid || item.id,
    image: item.cover_image,
    badge: localized(item.badge, lang),
    headline: localized(item.headline, lang),
    subtitle: localizedHtml(item.footer_subtitle, lang, { oneLine: true }),
    excerpt: localizedHtml(item.excerpt, lang, { oneLine: true }),
    /* /stories/{uuid} — the detail endpoint resolves the uuid only, so a row
       without one is not linkable (see lib/api/stories) */
    href: item.uuid ? `/stories/${item.uuid}` : "#",
  }));

  if (!title && !description && !stories.length) return null;

  return (
    <>
      <section className="real-stories-section py-5" id="real-stories">
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
                {description ? <RichText as="p" className="rs-desc" html={description} /> : null}{" "}
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
                <StoryShareForm />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
