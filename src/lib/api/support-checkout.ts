/* =========================================================
   The /support donation box's PayPal hand-off (base + error shape: ./client).

     POST /support/checkout  { amount, currency, interval, return_url, cancel_url }
                             → { message, data: { type, approval_url, reference } }

   `interval` is one_time | monthly | yearly. The caller sends the donor on to
   `approval_url`; PayPal brings them back to return_url / cancel_url.
   ========================================================= */

import { getToken } from "@/lib/auth-state";
import { apiFetch } from "./client";
import { getRecaptchaToken, RECAPTCHA_ACTIONS } from "../recaptcha";

type Envelope<T> = { message?: string; data?: T };

export type SupportCheckoutInterval = "one_time" | "monthly" | "yearly";

export type SupportCheckout = {
  message: string;
  type?: string;
  approvalUrl: string;
  reference?: string;
};

export async function createSupportCheckout(input: {
  amount: number;
  currency: string;
  interval: SupportCheckoutInterval;
  return_url: string;
  cancel_url: string;
}): Promise<SupportCheckout> {
  const payload = await apiFetch<
    Envelope<{ type?: string; approval_url?: string; reference?: string }>
  >("/support/checkout", {
    method: "POST",
    body: { ...input, recaptcha_token: await getRecaptchaToken(RECAPTCHA_ACTIONS.supportCheckout) },
    token: getToken(),
  });

  const approvalUrl = payload?.data?.approval_url || "";
  if (!approvalUrl) throw new Error("support checkout answered without an approval_url");
  return {
    message: payload?.message ?? "",
    type: payload?.data?.type,
    approvalUrl,
    reference: payload?.data?.reference,
  };
}
