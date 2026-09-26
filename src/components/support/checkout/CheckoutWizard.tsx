"use client";
import { useEffect, useRef, useState } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { localized } from "@/lib/api/pages";
import { useSupportCategory } from "@/lib/api/use-support-category";
import { useLang } from "@/lib/use-lang";
import { markDonationComplete } from "../donation-complete";
import CheckoutNav from "./CheckoutNav";
import CheckoutSteps from "./CheckoutSteps";
import ContactStep, { type ContactEmailError } from "./ContactStep";
import DonationProof from "./DonationProof";
import PaymentPlatforms from "./PaymentPlatforms";
import TransferDetails from "./TransferDetails";
import { CHECKOUT_SCREENS, resolveStepLabels } from "./checkout-steps-data";
import { DEFAULT_PLATFORM } from "./payment-platforms-data";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The donation wizard: "التالي" swaps the screen in place instead of
   navigating, and "السابق" walks back — out of the first screen it leaves for
   /support/methods, the page the flow came from. "اتمام العملية" on the last
   screen needs the contact e-mail, then hands off to /support.
   The chosen platform and that e-mail live here so they survive the screen
   changes.
   Step labels, the counter and the button labels come from GET /support/
   methods/category/{key} for the `?method=` picked on /support/methods; the
   wizard works on its built-in copy until (or unless) that answer lands. */
export default function CheckoutWizard() {
  const [index, setIndex] = useState(0);
  const [platform, setPlatform] = useState(DEFAULT_PLATFORM);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<ContactEmailError | null>(null);
  const wizard = useRef<HTMLDivElement>(null);
  const { page } = useSupportCategory();
  const { lang } = useLang();

  const stepLabels = resolveStepLabels(page?.wizard?.steps, lang);
  const progress = localized(page?.wizard?.progress_label, lang);
  const nextText = localized(page?.labels?.continue, lang);
  const submitText = localized(page?.labels?.submit, lang);
  const backText = localized(page?.labels?.back, lang);

  const screen = CHECKOUT_SCREENS[index];
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

  /* Last screen: block the hand-off until there is a usable address, then
     raise the flag <DonationToast /> is waiting for on /support. Plain
     navigation, like every other link that crosses a CSS group. */
  function finish() {
    const value = email.trim();
    if (!value) {
      setEmailError("required");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setEmailError("invalid");
      return;
    }
    setEmailError(null);
    markDonationComplete();
    window.location.href = "/support";
  }

  return (
    <div className="sp-wizard" ref={wizard}>
      <CheckoutSteps
        current={screen.current}
        done={screen.done}
        counter={screen.counter}
        labels={stepLabels}
        progress={progress}
      />

      {screen.value === "platform" && (
        <PaymentPlatforms value={platform} onChange={setPlatform} />
      )}
      {screen.value === "transfer" && <TransferDetails />}
      {screen.value === "proof" && <DonationProof />}
      {screen.value === "contact" && (
        <ContactStep
          email={email}
          onEmailChange={(value) => {
            setEmail(value);
            setEmailError(null); // the message goes as soon as they retype
          }}
          error={emailError}
        />
      )}

      <CheckoutNav
        prevHref={first ? "/support/methods" : undefined}
        backText={backText}
        onPrev={first ? undefined : () => setIndex((i) => i - 1)}
        onNext={last ? finish : () => setIndex((i) => i + 1)}
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
