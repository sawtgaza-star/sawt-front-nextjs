import { IconCalendar } from "@/components/ui/icons";
import type { NewsItem } from "./news-data";

/* Single news card — the home slider card, extracted so the /news listing
   renders exactly the same markup. Keep classNames/data-i18n keys untouched.

   Every row now comes from the API — GET /pages/home for the slider,
   GET /pages/blogs for the listing and the related strip — already in the
   reader's language, so the copy is rendered as plain text: a `data-i18n` on
   text React owns is what makes applyTranslations() fight React (see
   AboutHero). `titleKey` survives on the type for a row that still wants the
   translator, and `data-i18n` is attached only when such a key is present.

   "اقرأ المزيد" is the exception, and stays chrome with its `read_more` key:
   the listing payload carries no label for it (see blog-cards). */
export default function NewsCard({ item }: { item: NewsItem }) {
  const readMore = item.readMore;

  return (
    <div className="item">
      <div className="card h-100 news-card">
        {/* src="" would make the browser re-request the page as an image */}
        {item.img ? (
          <img src={item.img} className="card-img-top" alt={item.alt} />
        ) : null}
        <div className="card-body">
          <h5 className="card-title fw-bold" data-i18n={item.titleKey}>{item.title}</h5>
          <p className="card-text font-md-18" style={{ fontWeight: "500", color: "rgba(109, 109, 109, 1)" }}>
            {item.desc}
          </p>
        </div>
        <div className="card-footer bg-white border-0 d-flex font-16 text-dark pb-3 fw-bold">
          <span>
            <i style={{ color: "rgba(109, 109, 109, 1)" }}><IconCalendar /></i>{" "}
            <span style={{ color: "rgba(109, 109, 109, 1)" }}>{item.date}</span>
          </span>
          <span className="readmore">
            <a href={item.href ?? "#"}>
              <span style={{ color: "rgba(76, 92, 55, 1)" }} data-i18n={readMore ? undefined : "read_more"}>
                {readMore ?? "اقرأ المزيد"}
              </span>
              <i className="fa-solid fa-angle-left me-2 ms-1 arrow" style={{ color: "rgba(76, 92, 55, 1)" }}></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
