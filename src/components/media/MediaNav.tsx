import { IconMediaLogo } from "./media-icons";
import MediaNavMobile from "./MediaNavMobile";
import { MEDIA_NAV_LINKS } from "./media-nav-data";

/* صوت ميديا's own navbar — a white rounded card floating over the hero's peach
   wash, with "العودة لمنصة صوت" sitting above it (outside the card, as in the
   design). Deliberately NOT SiteNav: this page gets the reduced agency bar.
   Below lg the bar keeps only the brand and the burger, which opens the
   full-screen panel MediaNavMobile owns.

   The links are anchors into /media's sections, so a page that is not /media
   (the works listing) passes `base="/media"` to send them back there first. */
export default function MediaNav({ base = "" }: { base?: string }) {
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

          <MediaNavMobile base={base} />

          <div className="sm-nav-menu">
            <ul className="sm-nav-links">
              {MEDIA_NAV_LINKS.map((l) => (
                <li key={l.key}>
                  <a href={base + l.href} data-i18n={l.key}>
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* RTL: first child sits on the right, so this reads
                [En] [ابدأ مشروعك] right-to-left, matching the design. The CTA
                is the one item that leaves the page rather than jumping to a
                section — it opens /media/contact. */}
            <div className="sm-nav-actions">
              <button
                type="button"
                className="language-btn sm-nav-lang"
                aria-label="تغيير اللغة"
              >
                <span data-i18n="auth_lang_label">En</span>
              </button>
              <a className="sm-nav-cta" href="/media/contact" data-i18n="sm_cta_start">
                ابدأ مشروعك
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
