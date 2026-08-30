import { localized, type AboutJoinContent } from "@/lib/api/pages";

/* API `join` block, and nothing else — see AboutHero. The link target is not
   part of the payload, so it stays as the legacy markup has it; the banner
   renders its image only once the API sends one. */
export default function JoinUs({
  data,
  lang = "ar",
}: {
  data?: AboutJoinContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const button = localized(data?.button_text, lang);
  const image = data?.image_url;

  if (!title && !description && !button && !image) return null;

  return (
    <section className="join-us-section">
      {" "}
      <div className="join-us-banner-about">
        {" "}
        {image ? (
          <img src={image} alt="" className="join-us-bg-about" />
        ) : null}{" "}
        <div className="join-us-content text-center">
          {" "}
          {title ? <h2 className="join-us-title">{title}</h2> : null}{" "}
          {description ? <p className="join-us-desc">{description}</p> : null}{" "}
          {button ? (
            <a href="#" className="btn btn-dark-green join-us-btn">
              {" "}
              <span>{button}</span>{" "}
              <i className="fa-solid fa-angle-left arrow"></i>{" "}
            </a>
          ) : null}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
