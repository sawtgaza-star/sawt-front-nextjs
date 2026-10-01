"use client";
import { useEffect, useRef } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { localized } from "@/lib/api/pages";
import { useLang } from "@/lib/use-lang";
import CheckoutNav from "./CheckoutNav";
import CheckoutSteps from "./CheckoutSteps";
import ContactStep from "./ContactStep";
import DonationAmountFields from "./DonationAmountFields";
import DonationProof from "./DonationProof";
import PaymentPlatforms from "./PaymentPlatforms";
import CheckoutSkeleton from "./CheckoutSkeleton";
import TransferDetails from "./TransferDetails";
import { CHECKOUT_SCREENS, resolveStepLabels } from "./checkout-steps-data";
import { useCheckoutFlow } from "./use-checkout-flow";
import { RemixiconCss } from "@/components/ui/CdnStylesheets";

/* The donation wizard: "التالي" swaps the screen in place instead of
   navigating, and "السابق" walks back — out of the first screen it leaves for
   /support/methods, the page the flow came from. The values, validation and
   API calls behind each screen live in useCheckoutFlow; this component only
   lays the screens out.
   Step labels, the counter and the button labels come from GET /support/
   methods/category/{key} for the `?method=` picked on /support/methods; a
   skeleton stands in while that request is in flight. */
export default function CheckoutWizard() {
  const flow = useCheckoutFlow();
  const { page, index, screen, busy, error } = flow;
  const wizard = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  const stepLabels = resolveStepLabels(page?.wizard?.steps, lang);
  const progress = localized(page?.wizard?.progress_label, lang);
  const nextText = localized(page?.labels?.continue, lang);
  const submitText = localized(page?.labels?.submit, lang);
  const backText = localized(page?.labels?.back, lang);

  const first = index === 0;
  const last = index === CHECKOUT_SCREENS.length - 1;

  // A new screen renders with its Arabic fallback text, so re-apply the saved
  // language to the fresh keys (same as CreatorCollaborations), and put the
  // progress bar back in view.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
    if (index > 0) {
      wizard.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index, page]);

  // validation messages mount after the page was translated
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
  }, [flow.proofErrors, flow.contactErrors]);

  if (flow.loading) return <CheckoutSkeleton />;

  return (
    <div className="sp-wizard" ref={wizard}>
      <RemixiconCss />
      <CheckoutSteps
        current={screen.current}
        done={screen.done}
        counter={screen.counter}
        labels={stepLabels}
        progress={progress}
      />

      {screen.value === "platform" && (
        <PaymentPlatforms
          value={flow.platform}
          onChange={flow.setPlatform}
          methods={flow.methods}
          lang={lang}
        >
          {flow.electronic && (
            <DonationAmountFields
              proof={flow.proof}
              onChange={flow.changeProof}
              errors={flow.proofErrors}
            />
          )}
        </PaymentPlatforms>
      )}
      {screen.value === "transfer" && (
        <TransferDetails method={flow.method} lang={lang} />
      )}
      {screen.value === "proof" && (
        <DonationProof
          proof={flow.proof}
          onChange={flow.changeProof}
          onFileError={flow.rejectFile}
          errors={flow.proofErrors}
          withAmount={!flow.electronic}
        />
      )}
      {screen.value === "contact" && (
        <ContactStep
          contact={flow.contact}
          onChange={flow.changeContact}
          errors={flow.contactErrors}
        />
      )}

      {/* the server's own (Arabic) message when a step's call fails */}
      {error && (
        <p className="sp-wizard-error" role="alert">
          {error}
        </p>
      )}

      <CheckoutNav
        prevHref={first ? "/support/methods" : undefined}
        backText={backText}
        onPrev={first ? undefined : flow.back}
        onNext={flow.next}
        busy={busy || (screen.value === "platform" && !flow.method)}
        nextLabel={
          last ? submitText || "اتمام العملية" : nextText || undefined
        }
        nextLabelKey={
          last ? (submitText ? "" : "checkout_finish") : nextText ? "" : undefined
        }
        nextArrow={!last}
      />
    </div>
  );
}
