"use client";
/* The only client boundary on /support/methods: GET /support/methods (hero,
   section heading, the method cards) and one `lang` subscription, handed
   down as props. An outage leaves `page` null: the hero keeps its built-in
   copy and the cards show the empty line; the translator runs once
   more when the body arrives, for the reason given in <SupportContent />. */

import { useEffect } from "react";
import { useSupportMethods } from "@/lib/api/use-support-methods";
import { useLang } from "@/lib/use-lang";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { PaymentMethodsSkeleton } from "../SupportSkeleton";
import MethodsHero from "./MethodsHero";
import PaymentMethods from "./PaymentMethods";

export default function MethodsContent() {
  const { page, loading } = useSupportMethods();
  const { lang } = useLang();

  useEffect(() => {
    if (!loading) applyTranslations(getCurrentLang());
  }, [loading]);

  return (
    <>
      <MethodsHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <PaymentMethodsSkeleton />
        ) : (
          <PaymentMethods data={page ?? undefined} lang={lang} />
        )}
      </main>
    </>
  );
}
