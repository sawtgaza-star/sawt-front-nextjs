import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "كل صناع المحتوى | All Content Creators",
  description:
    "القائمة الكاملة لصنّاع المحتوى في منصة صوت — تصفّح كل المبدعين صفحة بصفحة.",
};

/* Metadata-only layout. page.tsx is a Client Component (it holds the pager
   state), and Next.js reads `metadata` from Server Components only — so this
   listing's tab title lives here instead of inheriting /creators'. Renders
   children untouched. */
export default function AllCreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
