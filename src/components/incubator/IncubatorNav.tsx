import { IconChevronLeftSmall } from "@/components/ui/icons";
import IncubatorNavLinks from "./IncubatorNavLinks";
import IncubatorNavSocial from "./IncubatorNavSocial";

/* The incubator's own navbar — a white floating card over the hero gradient.
   Deliberately NOT SiteNav: the mock gives this page a reduced bar (back to
   the main platform + social on top, brand/links/support CTA below).
   Below lg the card shrinks to brand + burger and everything else moves into
   the drawer, mirroring the main site's phone menu — see incubator.css. */
export default function IncubatorNav() {
  return (
    <div className="inc-nav-wrap">
      <div className="container">
        <div className="inc-nav">
          <div className="inc-nav-top">
            <a className="inc-nav-back" href="/">
              <i className="fa-solid fa-angle-right"></i>
              <span data-i18n="inc_nav_back">العودة لمنصة صوت</span>
            </a>

            <IncubatorNavSocial />
          </div>

          <div className="inc-nav-main">
            <a className="inc-nav-brand" href="/incubator">
              <img
                src="/assets/images/شعار الحاضنة 2 [Vectorized].svg"
                alt="حاضنة صوت"
              />
              <span data-i18n="inc_brand">حاضنة صوت</span>
            </a>

            <button
              className="inc-nav-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#incNav"
              aria-label="القائمة"
            >
              {/* same staggered burger the main site's phone header uses */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H14ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H10C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4H20Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>

            <div className="inc-nav-menu collapse" id="incNav">
              <IncubatorNavLinks />

              {/* RTL: first child sits on the right, so the group reads
                  [En] [انضم للحاضنة] [ادعم طلاب الحاضنة] right-to-left. */}
              <div className="inc-nav-actions">
                <button
                  type="button"
                  className="language-btn inc-nav-lang"
                  aria-label="تغيير اللغة"
                >
                  <span data-i18n="auth_lang_label">En</span>
                </button>
                <a
                  className="inc-nav-join"
                  href="/incubator#inc-join"
                  data-i18n="inc_nav_join"
                >
                  انضم للحاضنة
                </a>
                <a className="inc-nav-cta" href="/support" data-i18n="inc_nav_cta">
                  ادعم طلاب الحاضنة
                </a>
              </div>

              {/* Tail of the collapsed (below-lg) drawer: language row, the CTA
                  pair side by side and the socials. On ≥lg the bar itself owns
                  all three (.inc-nav-actions / .inc-nav-top) and this block is
                  display:none — see incubator.css. */}
              <div className="inc-nav-mobile-extra">
                <div className="inc-nav-mobile-lang">
                  <span data-i18n="nav_language">اللغة</span>
                  <button
                    type="button"
                    className="language-btn inc-nav-mobile-lang-btn"
                    aria-label="تغيير اللغة"
                  >
                    <IconChevronLeftSmall />
                    <span data-i18n="nav_lang_switch">English</span>
                  </button>
                </div>

                {/* RTL: first child sits on the right, as in the design */}
                <div className="inc-nav-mobile-cta">
                  <a
                    className="inc-nav-join"
                    href="/incubator#inc-join"
                    data-i18n="inc_nav_join"
                  >
                    انضم للحاضنة
                  </a>
                  <a
                    className="inc-nav-cta"
                    href="/support"
                    data-i18n="inc_nav_cta"
                  >
                    ادعم طلاب الحاضنة
                  </a>
                </div>

                <div className="inc-nav-mobile-social">
                  <IncubatorNavSocial />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
