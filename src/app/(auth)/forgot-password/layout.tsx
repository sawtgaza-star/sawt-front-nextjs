import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نسيت كلمة المرور؟ | Forgot Password",
};

/* Metadata-only layout — page.tsx carries "use client" and Next.js reads
   `metadata` from Server Components only. Renders children untouched. */
export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
