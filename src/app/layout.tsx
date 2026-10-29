import type { Metadata, Viewport } from "next";
import DocumentShell from "@/components/DocumentShell";
import NetworkErrorScreen from "@/components/site/NetworkErrorScreen";
import BackToTop from "@/components/site/BackToTop";
import ScrollRestorer from "@/components/site/ScrollRestorer";
import SessionKeepAlive from "@/components/site/SessionKeepAlive";
import BrokenImageGuard from "@/components/site/BrokenImageGuard";
import OffscreenAnimPause from "@/components/site/OffscreenAnimPause";
/* no nested body scroller + off-screen animations paused (phones) */
import "@/styles/mobile-scroll.css";

/* The title here doubles as the home page's: (main)/page.tsx is a Client
   Component, and Next.js reads `metadata` from Server Components only, so `/`
   has nowhere of its own to declare one. Every other route sets its own title
   (in its page.tsx, or a metadata-only layout.tsx where the page is a client
   one), so this default is only ever seen on `/`. */
/* The tab icon comes from the file conventions, not from `icons` here: this
   pointed at /assets/images/icon.png, which doesn't exist, so every tab fell
   back to the browser's globe. The site icon is the round صوت profile badge
   (the account's profile picture, cropped to its circle): `src/app/icon.png`
   (512, transparent outside the circle), `favicon.ico` (48/32/16 — what
   Google's result snippet and older clients fetch) and `apple-icon.png` (180,
   opaque). /media, /incubator and /courses each drop their own icon.svg next
   to their route so a section's tab wears its own mark. */
/* iOS Safari zooms the page in when an input under 16px gets focus, which
   throws the mobile layout off. `maximumScale: 1` stops that auto-zoom; iOS
   still lets the visitor pinch-zoom manually. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/* The link preview (WhatsApp, iMessage, Safari suggestions, X…): with no
   og:image at all, those apps picked the first big photo on the page — a
   creator's portrait. `opengraph-image.jpg` / `twitter-image.jpg` next to this
   file (the صوت Facebook cover, whole, 1600×640) are applied to every route
   by Next's file convention; `metadataBase` makes their URLs absolute, which
   the scrapers require. NEXT_PUBLIC_SITE_URL can point a staging build at its
   own host. */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sawtgaza.com"),
  title: "منصة صوت | Sawt Platform",
  openGraph: {
    siteName: "منصة صوت | Sawt Platform",
    type: "website",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell>
      {children}
      <BackToTop />
      <ScrollRestorer />
      <OffscreenAnimPause />
      <SessionKeepAlive />
      <BrokenImageGuard />
      <NetworkErrorScreen />
    </DocumentShell>
  );
}
