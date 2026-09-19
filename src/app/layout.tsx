import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "@/styles/tokens.css";
import "@/styles/animations.css";
import "@/styles/i18n.css";
import PageAnimations from "@/components/PageAnimations";

/* The design tokens call for Rubik (`var(--fontFamily-text, Rubik)`); nothing
   defined that variable, so every rule using it fell back to the page font.
   next/font downloads and self-hosts the files at build time — no runtime CDN —
   and exposes the family as the token below. The arabic subset is required: the
   pills and everything else on this site are Arabic. */
const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--fontFamily-text",
});

/* The title here doubles as the home page's: (main)/page.tsx is a Client
   Component, and Next.js reads `metadata` from Server Components only, so `/`
   has nowhere of its own to declare one. Every other route sets its own title
   (in its page.tsx, or a metadata-only layout.tsx where the page is a client
   one), so this default is only ever seen on `/`. */
/* The tab icon comes from the `icon.svg` file convention, not from `icons`
   here: this pointed at /assets/images/icon.png, which doesn't exist, so every
   tab fell back to the browser's globe. `src/app/icon.svg` (منصة صوت's olive
   branch) covers the whole site; /media, /incubator and /courses each drop
   their own icon.svg next to their route so a section's tab wears its own
   mark. */
export const metadata: Metadata = {
  title: "منصة صوت | Sawt Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={rubik.variable}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        {/* Cairo — the family every `font-family: "cairo"` in the legacy CSS
            asks for. It sits here instead of as an @import at the top of
            style.css / password.css because an @import only counts while it is
            the first rule of its sheet: the CSS bundler concatenates a route
            group into one file, so any stylesheet ordered ahead of style.css
            killed the import silently and the site fell back to the browser
            default. A <link> is immune to that, is discovered by the preload
            scanner instead of only after style.css parses, and covers the auth
            pages (password.css) from the same place. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </head>
      <body dir="rtl" suppressHydrationWarning>
        {/* Starts the page-entrance animation before first paint; skipped for
            reduced-motion users (see styles/animations.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("sawt-anim");document.body.classList.add("sawt-page-in")}}catch(e){}',
          }}
        />
        {/* Applies the saved language's direction before first paint. The SSR
            markup is always ar/rtl, so without this an English visitor sees the
            whole page flip RTL→LTR once initTranslate() runs after hydration.
            For any non-Arabic language it also masks the translatable text
            (.i18n-pending, see styles/i18n.css) so the Arabic fallbacks never
            paint while the page chunk loads; initTranslate() lifts the mask the
            moment the English strings are in place, and the timeout below is a
            safety net for the case where that never happens (JS disabled/failed). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var l=localStorage.getItem("lang")||"ar";var d=l==="ar"?"rtl":"ltr";var r=document.documentElement;r.setAttribute("dir",d);r.setAttribute("lang",l);document.body.setAttribute("dir",d);if(l!=="ar"){r.classList.add("i18n-pending");setTimeout(function(){r.classList.remove("i18n-pending")},2500)}}catch(e){}',
          }}
        />
        {/* Marks the document as signed-in before first paint. The top bar
            ships BOTH variants (guest CTAs + account/notification icons) and
            style.css shows one of them off this class — so switching state
            costs no JS on the critical path, no hydration mismatch and no
            flash of the wrong navbar. See lib/auth-state.ts. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("sawt_auth")==="1"){document.documentElement.classList.add("sawt-authed")}}catch(e){}',
          }}
        />
        <PageAnimations />
        {children}
      </body>
    </html>
  );
}
