import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "آخر أخبارنا | Sawt News",
  description:
    "صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً لمن لا صوت له — تابع آخر الأخبار.",
};

/* Metadata-only layout. page.tsx is a Client Component (it holds the pager
   state), and Next.js reads `metadata` from Server Components only — so the
   listing's tab title lives here. /news/[id] overrides it with its own
   generateMetadata. Renders children untouched. */
export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
