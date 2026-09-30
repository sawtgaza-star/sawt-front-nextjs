/* The wizard's state across the PayPal round trip. Leaving for PayPal is a
   full page load, so what screen 1 collected (platform, amount, currency, the
   open draft) is parked in sessionStorage and picked up again when PayPal
   sends the donor back to /support/checkout?paypal=success|cancel. */

import { useEffect } from "react";
import { createPaypalOrder } from "@/lib/api/support-paypal";
import { parseAmount, type ProofValues } from "./checkout-flow";

const KEY = "sawt-paypal-pending";

export type PaypalPending = {
  method: string;
  amount: string;
  currency: string;
  /** the draft support request opened on screen 1, if any */
  request?: string;
  orderId?: string;
  reference?: string;
};

export type PaypalOutcome = "success" | "cancel";

export function savePaypalPending(pending: PaypalPending) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(pending));
  } catch {
    /* storage disabled — the donor lands back on screen 1 with empty fields */
  }
}

/* Reads the parked state and clears it in the same breath (one-shot, like
   donation-complete), so a reload of the returned page doesn't replay it. */
export function consumePaypalPending(): PaypalPending | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed.method === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Where PayPal should send the donor back: this page, same category. */
export function paypalReturnUrl(outcome: PaypalOutcome): string {
  const url = new URL(window.location.href);
  const method = url.searchParams.get("method") || "electronic";
  return `${url.origin}${url.pathname}?${new URLSearchParams({ method, paypal: outcome })}`;
}

/** `?paypal=` of the current URL, if PayPal just sent the donor back. */
export function readPaypalOutcome(): PaypalOutcome | null {
  const value = new URLSearchParams(window.location.search).get("paypal");
  return value === "success" || value === "cancel" ? value : null;
}

/* Drops PayPal's return params (paypal, token, PayerID) from the address bar,
   keeping `?method=`, so a reload starts the wizard fresh. */
export function clearPaypalParams() {
  const url = new URL(window.location.href);
  ["paypal", "token", "PayerID", "ba_token", "subscription_id"].forEach((p) =>
    url.searchParams.delete(p),
  );
  window.history.replaceState(null, "", url.pathname + url.search);
}

/* Opens the PayPal order for screen 1's amount + currency, parks the wizard's
   state for the way back, and answers the URL to send the donor to. */
export async function startPaypalCheckout(
  method: string,
  proof: ProofValues,
  request?: string,
): Promise<string> {
  const order = await createPaypalOrder(method, {
    amount: parseAmount(proof.amount),
    currency: proof.currency,
    interval: "one_time",
    return_url: paypalReturnUrl("success"),
    cancel_url: paypalReturnUrl("cancel"),
  });
  savePaypalPending({
    method,
    amount: proof.amount,
    currency: proof.currency,
    request,
    orderId: order.orderId,
    reference: order.reference,
  });
  return order.approvalUrl;
}

/* Once, on mount: if PayPal just sent the donor back, tidy the URL and hand
   the outcome + parked state to the wizard. */
export function usePaypalReturn(
  onReturn: (outcome: PaypalOutcome, pending: PaypalPending | null) => void,
) {
  useEffect(() => {
    const outcome = readPaypalOutcome();
    if (!outcome) return;
    clearPaypalParams();
    onReturn(outcome, consumePaypalPending());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
