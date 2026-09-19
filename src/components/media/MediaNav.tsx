"use client";

import { useMediaNavbar } from "@/lib/api/use-media-navbar";
import { useLang } from "@/lib/use-lang";
import { resolveMediaNav } from "./media-nav-data";
import MediaNavMobile from "./MediaNavMobile";
import "@/styles/nav-skeleton.css";

/* صوت ميديا's own navbar — a white rounded card floating over the hero's peach
   wash, with "العودة لمنصة صوت" sitting above it (outside the card, as in the
   design). Deliberately NOT SiteNav: this page gets the reduced agency bar.
   Below lg the bar keeps only the brand and the burger, which opens the
   full-screen panel MediaNavMobile owns.

   Its copy is GET /layout/media/navbar's alone (see ./media-nav-data) — the
   client boundary is here so the request is made once for both halves and the
   drawer gets the resolved view model as a prop. As in SiteNav, the bar is not
   swapped for a skeleton wholesale: the card is on screen from the first paint
   and only its text is drawn as bars (styles/nav-skeleton.css), which also
   keeps the `.language-btn` a single node — initTranslate() binds it once.

   The links are anchors into /media's sections, so a page that is not /media
   (the works listing) passes `base="/media"` to send them back there first. */
export default function MediaNav({ base = "" }: { base?: string }) {
  const { lang } = useLang();
  const { data, loading } = useMediaNavbar();
  const nav = resolveMediaNav(data, lang);

  return (
    <div className="sm-nav-wrap">
      <div className="container">
        <div className="sm-nav-back-row">
          <a className="sm-nav-back" href={nav.back.href}>
            {loading ? (
              <span className="nsk-line" style={{ width: "112px" }} />
            ) : (
              <span>{nav.back.label}</span>
            )}
          </a>
        </div>

        <nav className="sm-nav">
          {/* The mark and the wordmark are both the API's; with no logo in the
              payload the <img> is skipped rather than rendered with an empty
              src. The 57×59 box is the design's — see `.sm-nav-brand img`. */}
          <a className="sm-nav-brand" href="/media">
            {loading ? (
              <>
                <span
                  className="nsk-logo"
                  style={{ width: "57px", height: "59px" }}
                />
                <span className="nsk-line" style={{ width: "86px" }} />
              </>
            ) : (
              <>
                {nav.logoUrl ? (
                  <img
                    src={nav.logoUrl}
                    alt={nav.siteName}
                    width="57"
                    height="59"
                  />
                ) : null}
                <span>{nav.siteName}</span>
              </>
            )}
          </a>

          <MediaNavMobile base={base} nav={nav} loading={loading} />

          <div className="sm-nav-menu">
            <ul className="sm-nav-links">
              {loading
                ? ["96px", "58px", "62px", "66px"].map((width, index) => (
                    <li key={index}>
                      <span className="nsk-line" style={{ width }} />
                    </li>
                  ))
                : nav.links.map((link) => (
                    <li key={link.key}>
                      <a href={base + link.href}>{link.label}</a>
                    </li>
                  ))}
            </ul>

            {/* RTL: first child sits on the right, so this reads
                [En] [ابدأ مشروعك] right-to-left, matching the design. The CTA
                is the one item that leaves the page rather than jumping to a
                section — it opens /media/contact. */}
            <div className="sm-nav-actions">
              {/* Never remounted: `.language-btn` is what initTranslate()
                  binds the AR/EN toggle to, once, on page load. */}
              <button
                type="button"
                className="language-btn sm-nav-lang"
                aria-label="تغيير اللغة"
              >
                {loading ? (
                  <span className="nsk-lang" />
                ) : (
                  <span>{nav.langLabel}</span>
                )}
              </button>
              {loading ? (
                <span
                  className="nsk-cta"
                  style={{ width: "130px", height: "38px" }}
                />
              ) : (
                <a className="sm-nav-cta" href={nav.cta.href}>
                  {nav.cta.label}
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
