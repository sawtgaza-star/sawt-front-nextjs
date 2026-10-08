import type { Metadata } from "next";
import "@/styles/account.css";
import LegacyInit from "@/components/LegacyInit";
import AccountContent from "@/components/account/AccountContent";

export const metadata: Metadata = {
  title: "حسابي | Sawt",
  description: "ملفك الشخصي في صوت، صناع المحتوى الذين تتابعهم، وإعدادات حسابك.",
  robots: { index: false },
};

/* /account — the signed-in user's own page. Server Component shell; all of it
   reads the browser-side session, so it lives in <AccountContent />. */
export default function Page() {
  return (
    <div className="acc-page">
      <LegacyInit page="account" />
      <AccountContent />
    </div>
  );
}
