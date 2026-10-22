import { localized, type AboutJoinContent, localizedHtml } from "@/lib/api/pages";
import RichText from "@/components/ui/RichText";

/* API `join` block, and nothing else — see AboutHero. The link target is not
   part of the payload: the button opens "ادعم صوت" (/support). The banner
   renders its image only once the API sends one. */
export default function JoinUs({
  data,
  lang = "ar",
}: {
  data?: AboutJoinContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const description = localizedHtml(data?.description, lang);
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
          {description ? <RichText as="p" className="join-us-desc" html={description} /> : null}{" "}
          {button ? (
            <a href="/support" className="btn btn-dark-green join-us-btn">
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
