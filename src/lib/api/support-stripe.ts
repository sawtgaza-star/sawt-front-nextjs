/* =========================================================
   The donation wizard's Stripe hand-off (base + error shape: ./client), for
   an electronic platform that is Stripe.

     POST /stripe/donations/checkout  { amount, interval, return_url, cancel_url }
          → 201 { id, approval_url, type, interval, reference }

   `interval` is one_time | monthly | yearly (the API falls back to one_time).
   The caller sends the donor on to `approval_url` (Stripe Checkout); Stripe
   brings them back to return_url (paid) or cancel_url (backed out) — the
   page they left from.
   ========================================================= */

import { getToken } from "@/lib/auth-state";
import { apiFetch } from "./client";

type StripeSession = {
  id?: string;
  approval_url?: string;
  type?: string;
  interval?: string;
  reference?: string;
};

export type StripeCheckout = {
  approvalUrl: string;
  sessionId?: string;
  reference?: string;
};

export async function createStripeCheckout(input: {
  amount: number;
  interval: "one_time" | "monthly" | "yearly";
  return_url: string;
  cancel_url: string;
}): Promise<StripeCheckout> {
  const payload = await apiFetch<StripeSession & { data?: StripeSession }>(
    "/stripe/donations/checkout",
    { method: "POST", body: input, token: getToken() },
  );

  // answered flat today; read a `data` envelope too, like the other endpoints
  const session = payload?.data ?? payload;
  const approvalUrl = session?.approval_url || "";
  if (!approvalUrl) throw new Error("stripe checkout answered without an approval_url");
  return { approvalUrl, sessionId: session?.id, reference: session?.reference };
}
