// @ts-nocheck
/* eslint-disable */
/* Slide-down mobile search panel (revealed by the mobile search icon). */
export default function MobileSearchPanel() {
  return (
    <div className="mobile-search-panel d-lg-none" id="mobileSearchPanel">
      {" "}
      <form className="mobile-search-form container" role="search">
        {" "}
        <button
          type="button"
          className="mobile-search-close"
          id="mobileSearchClose"
          aria-label="إغلاق"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25em"
            height="1.25em"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              fill="none"
              stroke="rgba(76, 92, 55, 1)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 6l12 12M18 6L6 18"
            ></path>{" "}
          </svg>{" "}
        </button>{" "}
        <input
          type="search"
          className="form-control mobile-search-input"
          id="mobileSearchInput"
          placeholder="ابحث هنا..."
          data-i18n-placeholder="search_placeholder"
          aria-label="بحث"
        />{" "}
        <button
          type="submit"
          className="mobile-search-submit"
          aria-label="بحث"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25em"
            height="1.25em"
            viewBox="0 0 24 24"
          >
            {" "}
            <path d="M0 0h24v24H0z" fill="none"></path>{" "}
            <path
              fill="none"
              stroke="rgba(145, 145, 145, 1)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
            ></path>{" "}
          </svg>{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
