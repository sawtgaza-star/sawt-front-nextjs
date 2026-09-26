import { localized } from "@/lib/api/pages";
import type { IncubatorJoinContent } from "@/lib/api/incubator-page";
import { PLACEHOLDER } from "./incubator-page-view";

/* "ابدأ رحلتك مع حاضنة صوت" — the API's `join_cta` block on the home page's
   JoinUs banner (join-us-* classes from style.css, which the (main) layout
   loads); the mock's flat olive overlay is layered by .inc-join in
   incubator.css. #inc-join is where the navbar's "انضم للحاضنة" lands. */
export default function IncubatorJoin({
  data,
  lang,
}: {
  data?: IncubatorJoinContent;
  lang: string;
}) {
  const title = localized(data?.title, lang);
  const desc = localized(data?.description, lang);
  const button = localized(data?.button?.label, lang);
  if (!title && !desc && !button) return null;

  return (
    <section className="inc-join join-us-section position-relative" id="inc-join">
      <div className="join-us-banner">
        <img src={data?.image_url || PLACEHOLDER.join} alt="" className="join-us-bg" />
        <div className="join-us-content text-center">
          {title ? <h2 className="join-us-title">{title}</h2> : null}
          {desc ? <p className="join-us-desc">{desc}</p> : null}
          {button ? (
            <a className="btn btn-dark-green join-us-btn" href="#">
              <span>{button}</span>
              <i className="fa-solid fa-angle-left arrow"></i>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
