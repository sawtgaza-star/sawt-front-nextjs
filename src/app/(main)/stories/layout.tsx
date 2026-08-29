import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قصص النجاح | Sawt",
  description:
    "قصص حقيقية وثّقتها منصة صوت ونقلتها إلى العالم، لتكون صوتاً لمن لا صوت له.",
};

/* Metadata-only layout, same arrangement as the news listing: page.tsx is a
   Client Component (it holds the pager state) and Next.js reads `metadata`
   from Server Components only. /stories/[id] overrides it with its own
   generateMetadata. Renders children untouched. */
export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
