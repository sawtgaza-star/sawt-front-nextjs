"use client";
import { useEffect, useRef, useState } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import CheckoutNav from "./CheckoutNav";
import CheckoutSteps from "./CheckoutSteps";
import DonationProof from "./DonationProof";
import PaymentPlatforms from "./PaymentPlatforms";
import TransferDetails from "./TransferDetails";
import { CHECKOUT_SCREENS } from "./checkout-steps-data";
import { DEFAULT_PLATFORM } from "./payment-platforms-data";

/* The donation wizard: "الانتقال إلى المنصة والمتابعة" swaps the screen in
   place instead of navigating, and "السابق" walks back — out of the first
   screen it leaves for /support/methods, the page the flow came from.
   The chosen platform lives here so it survives the screen changes. */
export default function CheckoutWizard() {
  const [index, setIndex] = useState(0);
  const [platform, setPlatform] = useState(DEFAULT_PLATFORM);
  const wizard = useRef<HTMLDivElement>(null);

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
  }, [index]);

  return (
    <div className="sp-wizard" ref={wizard}>
      <CheckoutSteps
        current={screen.current}
        done={screen.done}
        counter={screen.counter}
      />

      {screen.value === "platform" && (
        <PaymentPlatforms value={platform} onChange={setPlatform} />
      )}
      {screen.value === "transfer" && <TransferDetails />}
      {screen.value === "proof" && <DonationProof />}

      <CheckoutNav
        prevHref={first ? "/support/methods" : undefined}
        onPrev={first ? undefined : () => setIndex((i) => i - 1)}
        onNext={last ? undefined : () => setIndex((i) => i + 1)}
      />
    </div>
  );
}
