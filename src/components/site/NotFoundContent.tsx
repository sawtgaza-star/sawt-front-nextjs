import "@/styles/not-found-shell.css";
import "@/styles/not-found.css";
import LegacyInit from "@/components/LegacyInit";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

/* Body of the site-wide 404 (src/app/not-found.tsx). style.css/search.css come
   in through not-found-shell.css's @imports, not direct imports: imported
   directly, Next 15's export left them out of 404.html (their chunk is shared
   with (main)/layout and only the `_not-found` entry listed it), so the navbar
   rendered unstyled.

   The page sits under the root layout only, not (main)'s, so it loads that
   group's CSS and renders the footer itself. The <header> shell must exist on
   mount: initHeaderPin() (lib/legacy-main) wraps SiteNav's bars into
   `.header-bar`. */
export default function NotFoundContent() {
  return (
    <>
      <LegacyInit page="not-found" />
      <header className="nf-header">
        <SiteNav />
      </header>
      <main className="nf-page container">
        <img
          className="nf-image"
          src="/assets/images/not-found-404.webp"
          alt="404"
          width={1400}
          height={788}
        />
        <h1 className="nf-title" data-i18n="nf_title">
          يبدو إن الصوت ضاع في الطريق:(
        </h1>
        <p className="nf-desc" data-i18n="nf_desc">
          يبدو أن الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله.
        </p>
        <a href="/" className="nf-back">
          <span data-i18n="nf_back">العودة للرئيسية</span>
          <i className="fa-solid fa-angle-left"></i>
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
