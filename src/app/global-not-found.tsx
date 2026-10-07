import type { Metadata, Viewport } from "next";
import DocumentShell from "@/components/DocumentShell";
import NotFoundContent from "@/components/site/NotFoundContent";

/* The site-wide 404. With `output: 'export'` this becomes out/404.html, which
   the host serves for any path that has no file — once public_html/.htaccess
   points there (`ErrorDocument 404 /404.html`); without that line Hostinger
   shows its own page instead.

   A global-not-found (next.config → experimental.globalNotFound), not a
   not-found.tsx: a root not-found is a boundary inside the root layout, so
   Next attaches its CSS to EVERY route — style.css would then land on the
   auth pages and /content, whose own sheets clash with it (see CLAUDE.md, CSS
   groups). This file is its own entry, so its CSS stays on 404.html. It
   bypasses the root layout, hence DocumentShell. */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | Sawt Platform",
};

export default function GlobalNotFound() {
  return (
    <DocumentShell>
      <NotFoundContent />
    </DocumentShell>
  );
}
