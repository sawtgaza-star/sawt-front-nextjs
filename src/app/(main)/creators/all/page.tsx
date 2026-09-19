"use client";
import "@/styles/creators.css";
import { useState } from "react";
import LegacyInit from "@/components/LegacyInit";
import CreatorsHero from "@/components/creators/CreatorsHero";
import CreatorCard from "@/components/creators/CreatorCard";
import { CreatorsGridSkeleton } from "@/components/creators/CreatorsSkeleton";
import { creatorCards } from "@/components/creators/creator-cards";
import JoinModal from "@/components/site/JoinModal";
import { useAllCreators } from "@/lib/api/use-creators-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

/* Full, paginated listing of every content creator — the "عرض الكل" target
   from CreatorsGrid. Reuses the breadcrumb hero + the shared CreatorCard.

   The roster comes from GET /pages/creators/all, one request per page of
   fifteen. The pager is the API's: `meta.last_page` decides how many pages
   there are, so a click fetches rather than slices. The header renders
   throughout — SiteNav lives inside it — and paints the payload's own hero,
   which that endpoint answers alongside the cards. */
const PER_PAGE = 15;

/* Build the visible page list: first page, last page, and a window around the
   current page, with "…" filling any gaps (e.g. 1 2 3 … 10). */
function buildPages(current: number, total: number): (number | string)[] {
  const delta = 1;
  const pages: (number | string)[] = [];
  let prev = 0;
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      if (prev && i - prev > 1) pages.push("dots-" + prev);
      pages.push(i);
      prev = i;
    }
  }
  return pages;
}

export default function Page() {
  const [page, setPage] = useState(1);
  const { lang } = useLang();
  const { page: data, meta, loading } = useAllCreators(page, PER_PAGE);

  const totalPages = meta.last_page ?? 1;
  const pageItems = creatorCards(data?.creators, lang, {
    experienceTitle: localized(data?.labels?.experience_title, lang),
    followersSuffix: localized(data?.labels?.followers_suffix, lang),
  });

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rendered right-to-left (descending) to match the RTL design: 10 … 3 2 1.
  const pages = buildPages(page, totalPages).reverse();

  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorsHero data={data?.hero} lang={lang} loading={!data && loading} />
      <main>
        <section className="content-section cr-grid-section position-relative">
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-creators-grid-section"
            alt="Olive Branch"
          />
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-bottom-creators-grid-section"
            alt="Olive Branch"
          />

          <div className="container">
            {loading ? (
              <CreatorsGridSkeleton count={PER_PAGE} />
            ) : (
              <div className="cr-creators-grid">
                {pageItems.map((c) => (
                  <CreatorCard key={c.key} item={c} translated />
                ))}
              </div>
            )}

            {totalPages > 1 ? (
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
                  ),
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
            ) : null}
          </div>
        </section>
      </main>
      <JoinModal />
    </div>
  );
}
