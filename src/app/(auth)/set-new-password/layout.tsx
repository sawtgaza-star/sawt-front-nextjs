import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعيين كلمة مرور جديدة | Set New Password",
};

/* Metadata-only layout — page.tsx carries "use client" and Next.js reads
   `metadata` from Server Components only. Renders children untouched. */
export default function SetNewPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
