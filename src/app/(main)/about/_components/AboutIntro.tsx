import "@/styles/about-intro.css";
import { localized, type AboutIntroContent } from "@/lib/api/pages";

/** The "من نحن" artwork (public/assets/images) — trees on its left, empty on
    its right, which is where the copy goes. */
export const INTRO_IMAGE = "/assets/images/قسم من نحن 3.jpg.jpeg";

/* API `intro` block, and nothing else — see AboutHero for why there is no
   built-in copy and no data-i18n key left in this file. The section and its
   text render only if the API actually sent them. The artwork is fixed and
   spans the section, with the text laid over its empty side on desktop and
   under it on smaller screens (styles/about-intro.css); the API's
   `image_url` is not drawn. */
export default function AboutIntro({
  data,
  lang = "ar",
}: {
  data?: AboutIntroContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const body = localized(data?.body, lang);

  if (!title && !body) return null;

  return (
    <section>
      {" "}
      <div
        className="about-sec container"
        style={{ marginTop: "50px", zIndex: 1 }}
      >
        {" "}
        <div className="about-intro-banner">
          {" "}
          <img src={INTRO_IMAGE} alt="" className="about-intro-img" />{" "}
          <div className="row">
            {" "}
            <div className="col-12 col-lg-6 about-sec-content" dir="rtl">
              {" "}
              {title ? <h2 className="about-sec-title">{title}</h2> : null}{" "}
              {body ? <p className="about-sec-desc">{body}</p> : null}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
