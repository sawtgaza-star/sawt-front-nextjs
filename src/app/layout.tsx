import type { Metadata, Viewport } from "next";
import DocumentShell from "@/components/DocumentShell";

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
/* iOS Safari zooms the page in when an input under 16px gets focus, which
   throws the mobile layout off. `maximumScale: 1` stops that auto-zoom; iOS
   still lets the visitor pinch-zoom manually. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "منصة صوت | Sawt Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell>{children}</DocumentShell>;
}
