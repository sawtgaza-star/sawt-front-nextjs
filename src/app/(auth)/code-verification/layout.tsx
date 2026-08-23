import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "التحقق من الرمز | Code Verification",
};

/* Metadata-only layout — page.tsx carries "use client" and Next.js reads
   `metadata` from Server Components only. Renders children untouched. */
export default function CodeVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
