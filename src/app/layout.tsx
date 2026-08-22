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

export const metadata: Metadata = {
  title: "Sawt",
  icons: { icon: "/assets/images/icon.png" },
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
