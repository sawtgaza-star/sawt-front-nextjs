// @ts-nocheck
"use client";
/* eslint-disable */
import "@/styles/creators.css";
import { useState } from "react";
import LegacyInit from "@/components/LegacyInit";
import CreatorsHero from "@/components/creators/CreatorsHero";
import CreatorCard from "@/components/creators/CreatorCard";
import SiteFooter from "@/components/site/SiteFooter";
import JoinModal from "@/components/site/JoinModal";

/* Full, paginated listing of every content creator — the "عرض الكل" target
   from CreatorsGrid. Reuses the breadcrumb hero + the shared CreatorCard. */
const PER_PAGE = 15;
const ALL_CREATORS = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  photo: "/assets/images/محمود زعيتر 2.png",
  name: "محمود عبد الله زعيتر",
  role: "ممثل مسرحية",
  followers: "31.4K متابع",
}));

/* Build the visible page list: first page, last page, and a window around the
   current page, with "…" filling any gaps (e.g. 1 2 3 … 10). */
function buildPages(current, total) {
  const delta = 1;
  const pages = [];
  let prev = 0;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      if (prev && i - prev > 1) pages.push("dots-" + prev);
      pages.push(i);
      prev = i;
    }
  }
  return pages;
}

export default function Page() {
  const totalPages = Math.ceil(ALL_CREATORS.length / PER_PAGE);
  const [page, setPage] = useState(1);

  const start = (page - 1) * PER_PAGE;
  const pageItems = ALL_CREATORS.slice(start, start + PER_PAGE);

  const goTo = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rendered right-to-left (descending) to match the RTL design: 10 … 3 2 1.
  const pages = buildPages(page, totalPages).reverse();

  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorsHero />
      <main>
        <section className="content-section cr-grid-section">
          <div className="container">
            <div className="cr-creators-grid">
              {pageItems.map((c) => (
                <CreatorCard key={c.id} item={c} />
              ))}
            </div>

            <nav className="cr-pagination" aria-label="pagination">
              {/* laid out LTR to match the RTL mock: « ‹ 10 … 3 2 1 › » */}
              <button
                type="button"
                className="cr-page-btn cr-page-nav"
                onClick={() => goTo(totalPages)}
                disabled={page === totalPages}
                aria-label="last page"
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
              <button
                type="button"
                className="cr-page-btn cr-page-nav"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                aria-label="next page"
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>

              {pages.map((p) =>
                typeof p === "number" ? (
                  <button
                    key={p}
                    type="button"
                    className={"cr-page-btn" + (p === page ? " active" : "")}
                    onClick={() => goTo(p)}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={p} className="cr-page-dots">
                    ..
                  </span>
                )
              )}

              <button
                type="button"
                className="cr-page-btn cr-page-nav"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                aria-label="previous page"
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
              <button
                type="button"
                className="cr-page-btn cr-page-nav"
                onClick={() => goTo(1)}
                disabled={page === 1}
                aria-label="first page"
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JoinModal />
    </div>
  );
}
