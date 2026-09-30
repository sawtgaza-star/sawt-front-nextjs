/* =========================================================
   The donation wizard's writes (base + error shape: ./client). A guest may
   run them; the request stays a draft until the contact step.

     POST /support/requests                  { method_uuid, amount, currency }
                                             → { data: { uuid, … } }
     POST /support/requests/{uuid}/proof     multipart: amount, currency, proofs[]
     POST /support/requests/{uuid}/contact   { contact_preference, contact_value,
                                               donor_email, donor_phone,
                                               donor_name, notes }

   `amount` is required when opening the request ("يجب إدخال المبلغ أو اختيار
   باقة"), and `contact_preference` on the contact step ("يجب اختيار وسيلة
   التواصل"); a 422 surfaces the server's own Arabic message.
   ========================================================= */

import { apiFetch } from "./client";

type Envelope<T> = { message?: string; data?: T };

export type ContactPreference = "email" | "whatsapp";

type RequestData = { uuid?: string; request?: { uuid?: string } };

const requestPath = (uuid: string) =>
  `/support/requests/${encodeURIComponent(uuid)}`;

/** Opens the draft and answers its uuid — the guest's only key to it, so it
    is kept in wizard state only, never put on the URL. */
export async function createSupportRequest(input: {
  method_uuid: string;
  amount: number;
  currency?: string;
}): Promise<string> {
  const payload = await apiFetch<Envelope<RequestData>>("/support/requests", {
    method: "POST",
    body: input,
  });
  const uuid = payload?.data?.uuid || payload?.data?.request?.uuid || "";
  if (!uuid) throw new Error("support request answered without a uuid");
  return uuid;
}

export async function uploadSupportProof(
  uuid: string,
  input: { amount: number; currency: string; files: File[] },
): Promise<void> {
  const form = new FormData();
  form.append("amount", String(input.amount));
  form.append("currency", input.currency);
  input.files.forEach((file) => form.append("proofs[]", file));
  await apiFetch(`${requestPath(uuid)}/proof`, { method: "POST", body: form });
}

export async function submitSupportContact(
  uuid: string,
  input: {
    contact_preference: ContactPreference;
    contact_value: string;
    donor_email: string;
    donor_phone?: string;
    donor_name?: string;
    notes?: string;
  },
): Promise<void> {
  await apiFetch(`${requestPath(uuid)}/contact`, { method: "POST", body: input });
}
