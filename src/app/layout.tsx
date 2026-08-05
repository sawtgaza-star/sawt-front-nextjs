import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "@/styles/animations.css";
import PageAnimations from "@/components/PageAnimations";

export const metadata: Metadata = {
  title: "Sawt",
  icons: { icon: "/assets/images/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
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
        <PageAnimations />
        {children}
      </body>
    </html>
  );
}
