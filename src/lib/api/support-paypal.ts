/* =========================================================
   The donation wizard's PayPal hand-off (base + error shape: ./client), for
   an electronic platform that is PayPal.

     POST /support/{method_uuid}/paypal/order
          { amount, currency, interval, return_url, cancel_url }
          → { message, data: { type, approval_url, reference, order_id } }

   The caller sends the donor on to `approval_url`; PayPal brings them back
   to return_url (paid) or cancel_url (backed out).
   ========================================================= */

import { getToken } from "@/lib/auth-state";
import { apiFetch } from "./client";

type Envelope<T> = { message?: string; data?: T };

export type PaypalOrder = {
  message: string;
  approvalUrl: string;
  reference?: string;
  orderId?: string;
};

export async function createPaypalOrder(
  methodUuid: string,
  input: {
    amount: number;
    currency: string;
    interval: "one_time" | "monthly" | "yearly";
    return_url: string;
    cancel_url: string;
  },
): Promise<PaypalOrder> {
  const payload = await apiFetch<
    Envelope<{ approval_url?: string; reference?: string; order_id?: string }>
  >(`/support/${encodeURIComponent(methodUuid)}/paypal/order`, {
    method: "POST",
    body: input,
    token: getToken(),
  });

  const approvalUrl = payload?.data?.approval_url || "";
  if (!approvalUrl) throw new Error("paypal order answered without an approval_url");
  return {
    message: payload?.message ?? "",
    approvalUrl,
    reference: payload?.data?.reference,
    orderId: payload?.data?.order_id,
  };
}
