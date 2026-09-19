import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفريق | Sawt Team",
  description:
    "صناع الأثر.. تعرّف على الفريق خلف منصة صوت — التصميم والتسويق والإدارة والمونتاج.",
};

/* Metadata-only layout, kept from when page.tsx was a Client Component. It is
   a Server Component again now (the filter state moved into <TeamListing />),
   so this could move back — left here so /team and /team/[id] keep declaring
   their titles in the same two places. Renders children untouched. */
export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
