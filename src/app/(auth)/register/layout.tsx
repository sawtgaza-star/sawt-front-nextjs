import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل حساب جديد | Create Account",
};

/* Metadata-only layout — page.tsx carries "use client" and Next.js reads
   `metadata` from Server Components only. Renders children untouched. */
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
