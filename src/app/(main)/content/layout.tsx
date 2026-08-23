import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محتوانا | Our Content",
  description:
    "خلف كل محتوى تشاهده وتسمعه فريق من المختصين في تكنولوجيا المعلومات والإنتاج الإعلامي — استعرض محتوى صوت وأكثره مشاهدة.",
};

/* Metadata-only layout. page.tsx is a Client Component (it holds the category
   and sort state), and Next.js reads `metadata` from Server Components only —
   so the tab title for this route lives here. Renders children untouched. */
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
