"use client";

/* Shared pager — the cr-* button design first used by the creators listing.
   DOM order is authored LTR (« ‹ 10 … 3 2 1 › ») because .cr-pagination forces
   direction: ltr to match the RTL mock. */

/* Visible page list: first, last, and a window around the current page, with
   "…" filling any gaps (e.g. 1 2 3 … 10). */
function buildPages(current: number, total: number): Array<number | string> {
  const delta = 1;
  const pages: Array<number | string> = [];
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

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = buildPages(page, totalPages).reverse();

  return (
    <nav className="cr-pagination" aria-label="pagination">
      <button
        type="button"
        className="cr-page-btn cr-page-nav"
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        aria-label="last page"
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        type="button"
        className="cr-page-btn cr-page-nav"
        onClick={() => onChange(page + 1)}
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
            className={
              "cr-page-btn" +
              (p === page ? " active" : "") +
              /* the current page's neighbours — the only entries narrow
                 screens can drop without losing first/last/current */
              (p !== page && p !== 1 && p !== totalPages
                ? " cr-page-adjacent"
                : "")
            }
            onClick={() => onChange(p)}
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
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="previous page"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        type="button"
        className="cr-page-btn cr-page-nav"
        onClick={() => onChange(1)}
        disabled={page === 1}
        aria-label="first page"
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </nav>
  );
}
