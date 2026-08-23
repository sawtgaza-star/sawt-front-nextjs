import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفريق | Sawt Team",
  description:
    "صناع الأثر.. تعرّف على الفريق خلف منصة صوت — التصميم والتسويق والإدارة والمونتاج.",
};

/* Metadata-only layout. page.tsx is a Client Component (it holds the active
   filter), and Next.js reads `metadata` from Server Components only — so the
   listing's tab title lives here. /team/[id] overrides it with its own
   generateMetadata. Renders children untouched. */
export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
