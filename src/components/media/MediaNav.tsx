import { IconMediaLogo } from "./media-icons";

/* صوت ميديا's own navbar — a white rounded card floating over the hero's peach
   wash, with "العودة لمنصة صوت" sitting above it (outside the card, as in the
   design). Deliberately NOT SiteNav: this page gets the reduced agency bar.
   Below lg everything past the brand collapses into the Bootstrap drawer. */
export default function MediaNav() {
  return (
    <div className="sm-nav-wrap">
      <div className="container">
        <div className="sm-nav-back-row">
          <a className="sm-nav-back" href="/">
            <span data-i18n="sm_nav_back">العودة لمنصة صوت</span>
          </a>
        </div>

        <nav className="sm-nav">
          <a className="sm-nav-brand" href="/media">
            <IconMediaLogo />
            <span data-i18n="sm_brand">صوت ميديا</span>
          </a>

          <button
            className="sm-nav-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#smNav"
            aria-label="القائمة"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H14ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H10C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4H20Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          <div className="sm-nav-menu collapse" id="smNav">
            <ul className="sm-nav-links">
              <li>
                <a href="#sm-about" data-i18n="sm_nav_about">
                  عن صوت ميديا
                </a>
              </li>
              <li>
                <a href="#sm-works" data-i18n="sm_nav_works">
                  أعمالنا
                </a>
              </li>
              <li>
                <a href="#sm-services" data-i18n="sm_nav_services">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#sm-process" data-i18n="sm_nav_process">
                  منهجيتنا
                </a>
              </li>
            </ul>

            {/* RTL: first child sits on the right, so this reads
                [En] [ابدأ مشروعك] right-to-left, matching the design. */}
            <div className="sm-nav-actions">
              <button
                type="button"
                className="language-btn sm-nav-lang"
                aria-label="تغيير اللغة"
              >
                <span data-i18n="auth_lang_label">En</span>
              </button>
              <a className="sm-nav-cta" href="#sm-consult" data-i18n="sm_cta_start">
                ابدأ مشروعك
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
