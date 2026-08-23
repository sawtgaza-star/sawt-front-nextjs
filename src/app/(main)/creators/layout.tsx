import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صناع المحتوى | Content Creators",
  description:
    "تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله حكاية.",
};

/* Metadata-only layout. page.tsx carries "use client", and Next.js reads
   `metadata` from Server Components only — so the tab title for this route
   lives here. /creators/all and /creators/[id] override it with their own.
   Renders children untouched. */
export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
