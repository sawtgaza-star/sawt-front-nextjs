import { IconCalendar } from "@/components/ui/icons";
import type { NewsItem } from "./news-data";

/* Single news card — the home slider card, extracted so the /news listing
   renders exactly the same markup. Keep classNames/data-i18n keys untouched. */
export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="item">
      <div className="card h-100 news-card">
        <img src={item.img} className="card-img-top" alt={item.alt} />
        <div className="card-body">
          <h5 className="card-title fw-bold" data-i18n={item.titleKey}>{item.title}</h5>
          <p className="card-text font-md-18" style={{ fontWeight: "500", color: "rgba(109, 109, 109, 1)" }} data-i18n="news_desc">
            نشارككم آخر تحديثات صانع المحتوى في غزة، حيث نعمل على إبراز قصص المبدعين وإيصال صوتهم.
          </p>
        </div>
        <div className="card-footer bg-white border-0 d-flex font-16 text-dark pb-3 fw-bold">
          <span>
            <i style={{ color: "rgba(109, 109, 109, 1)" }}><IconCalendar /></i>{" "}
            <span data-i18n="news_date" style={{ color: "rgba(109, 109, 109, 1)" }}>5 مارس 2026</span>
          </span>
          <span className="readmore">
            <a href={item.href ?? "#"}>
              <span style={{ color: "rgba(76, 92, 55, 1)" }} data-i18n="read_more">اقرأ المزيد</span>
              <i className="fa-solid fa-angle-left me-2 ms-1 arrow" style={{ color: "rgba(76, 92, 55, 1)" }}></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
