import { localized, type AboutIntroContent } from "@/lib/api/pages";

/* API `intro` block, and nothing else — see AboutHero for why there is no
   built-in copy and no data-i18n key left in this file. The section, its text
   and its image column each render only if the API actually sent them. */
export default function AboutIntro({
  data,
  lang = "ar",
}: {
  data?: AboutIntroContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const body = localized(data?.body, lang);
  const image = data?.image_url;

  if (!title && !body && !image) return null;

  return (
    <section>
      {" "}
      <div
        className="about-sec container"
        style={{ marginTop: "50px", zIndex: 1 }}
      >
        {" "}
        <div className="row align-items-center">
          {" "}
          <div className="col-12 col-lg-6 about-sec-content" dir="rtl">
            {" "}
            {title ? <h2 className="about-sec-title">{title}</h2> : null}{" "}
            {body ? <p className="about-sec-desc">{body}</p> : null}{" "}
          </div>{" "}
          {image ? (
            <div className="col-12 col-lg-6 mt-4 about-sec-img-col">
              {" "}
              <div className="about-sec-img-wrapper">
                {" "}
                <img src={image} alt="" className="about-sec-img" />{" "}
                {/* The logo badge is chrome pinned to the corner of the photo,
                    so it goes wherever the photo goes. */}
                <div className="member-card about-sec-leaf" dir="rtl">
                  {" "}
                  <img
                    src="/assets/images/شعار صوت اخضر.svg"
                    alt=""
                    width="100"
                    height="100"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
