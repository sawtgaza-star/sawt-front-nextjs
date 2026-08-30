import { localized, type AboutPlatformContent } from "@/lib/api/pages";
import { splitHeading } from "./about-text";

/* API `platform` block, and nothing else — see AboutHero. The heading's accent
   is on its last word ("…لنكون صوتك؟"); see ./about-text. The birds are the
   card's background art, not content, so they stay. */
export default function AboutPlatform({
  data,
  lang = "ar",
}: {
  data?: AboutPlatformContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const image = data?.image_url;
  const [titleHead, titleTail] = splitHeading(title, 1);

  if (!title && !description && !image) return null;

  return (
    <section className="about-the-platform">
      {" "}
      <div className="about-the-platform-card">
        {" "}
        <div className="about-the-platform-card-inner">
          {" "}
          <img
            className="birds-img"
            src="/assets/images/birds.png"
            alt=""
          />{" "}
          <div className="row align-items-center g-0" dir="ltr">
            {" "}
            <div className="col-12 col-lg-5 about-the-platform-content">
              {" "}
              {title ? (
                <h2 className="about-the-platform-question">
                  {titleHead}{" "}
                  <span className="platform-highlight">{titleTail}</span>
                </h2>
              ) : null}{" "}
              {description ? (
                <p className="about-the-platform-desc">{description}</p>
              ) : null}{" "}
            </div>{" "}
            {image ? (
              <div className="col-12 col-lg-7 about-the-platform-visual">
                {" "}
                <img src={image} alt="صوت" className="about-platform-img" />{" "}
              </div>
            ) : null}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
