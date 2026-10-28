"use client";
import "@/styles/creators.css";
import { useSyncExternalStore } from "react";
import { usePageParam } from "@/lib/use-page-param";
import LegacyInit from "@/components/LegacyInit";
import CreatorsHero from "@/components/creators/CreatorsHero";
import CreatorCard from "@/components/home/CreatorCard";
import CreatorFollowWiring from "@/components/home/CreatorFollowWiring";
import CreatorPopWiring from "@/components/home/CreatorPopWiring";
import "@/styles/home-creator-card.css";
import { CreatorsGridSkeleton } from "@/components/creators/CreatorsSkeleton";
import { creatorCards } from "@/components/creators/creator-cards";
import JoinModal from "@/components/site/JoinModal";
import { useAllCreators } from "@/lib/api/use-creators-page";
import { useLang } from "@/lib/use-lang";

/* Full, paginated listing of every content creator — the "عرض الكل" target
   from CreatorsGrid. Reuses the breadcrumb hero + the shared CreatorCard.

   The roster comes from GET /pages/creators/all, one request per page — ten
   cards on desktop, six on a phone. The pager is the API's: `meta.last_page`
   decides how many pages there are, so a click fetches rather than slices.
   The header renders throughout — SiteNav lives inside it — and paints the
   payload's own hero, which that endpoint answers alongside the cards. */
const PER_PAGE_DESKTOP = 10;
const PER_PAGE_MOBILE = 6;
/* the phone breakpoint the creators grid itself switches at */
const MOBILE_MEDIA = "(max-width: 767.98px)";

/* Page size for the current viewport, kept live across resizes. On the server
   (and the hydration pass) it is `null`, so the fetch waits for the real
   value instead of loading a desktop page and refetching on a phone. */
function subscribeViewport(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_MEDIA);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function usePerPage(): number | null {
  return useSyncExternalStore(
    subscribeViewport,
    () => (window.matchMedia(MOBILE_MEDIA).matches ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP),
    () => null,
  );
}

/* How many cards the first page currently holds — the skeleton's count before
   `meta` is known; after that it is the size of the page being fetched. */
const FIRST_PAGE_CARDS = 8;

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
  const [page, setPage] = usePageParam();
  const { lang } = useLang();
  const perPage = usePerPage();
  const { page: data, meta, loading } = useAllCreators(page, perPage);

  const totalPages = meta.last_page ?? 1;
  const pageItems = creatorCards(data?.creators, lang);
  const followLabel = lang === "en" ? "Follow" : "متابعة";
  const unfollowLabel = lang === "en" ? "Unfollow" : "إلغاء المتابعة";

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
        {/* id: sign-in from a card's "متابعة" comes back to #creators */}
        <section id="creators" className="content-section cr-grid-section position-relative">
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
              <CreatorsGridSkeleton
                count={
                  typeof meta.total === "number" && perPage
                    ? Math.max(0, Math.min(perPage, meta.total - (page - 1) * perPage))
                    : FIRST_PAGE_CARDS
                }
              />
            ) : (
              <>
                <div className="cr-creators-grid">
                  {pageItems.map((c) => (
                    <CreatorCard
                      key={c.key}
                      creator={c}
                      dir={lang === "en" ? "ltr" : "rtl"}
                      followLabel={followLabel}
                      unfollowLabel={unfollowLabel}
                    />
                  ))}
                </div>
                {/* keyed by page: the grid is rebuilt on every page change,
                    so the new cards' pills are marked and their pop-out
                    layers laid again */}
                <CreatorFollowWiring key={`follow-${page}`} />
                <CreatorPopWiring key={`pop-${page}`} />
              </>
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
