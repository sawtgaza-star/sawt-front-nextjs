/* The wizard's form values between screens, and the pure helpers that check
   them and shape them for the API (./use-checkout-flow does the calls). */

import { COUNTRIES } from "@/lib/countries";
import type { ContactPreference } from "@/lib/api/support-requests";
import type { ContactDetails } from "./contact-data";

/* "إثبات تبرعك" */
export interface ProofValues {
  amount: string;
  currency: string;
  file: File | null;
}

export interface ProofErrors {
  amount?: "required";
  currency?: "required";
  file?: "required" | "type" | "size";
}

export const EMPTY_PROOF: ProofValues = { amount: "", currency: "", file: null };

/** A usable amount (> 0), or NaN. */
export function parseAmount(value: string | null | undefined): number {
  const amount = Number(String(value ?? "").trim());
  return Number.isFinite(amount) && amount > 0 ? amount : NaN;
}

/* The receipt is required for every platform. */
export function validateProof(proof: ProofValues): ProofErrors {
  const errors: ProofErrors = {};
  if (Number.isNaN(parseAmount(proof.amount))) errors.amount = "required";
  if (!proof.currency) errors.currency = "required";
  if (!proof.file) errors.file = "required";
  return errors;
}

/* "التواصل" → POST /support/requests/{uuid}/contact. WhatsApp wins as the
   preferred channel when a number was given; otherwise the e-mail (always
   present — it is required). */
export function contactPayload(contact: ContactDetails) {
  const dial = COUNTRIES.find((c) => c.c === contact.country)?.d ?? "+970";
  const digits = contact.whatsapp.replace(/\D/g, "").replace(/^0+/, "");
  const phone = digits ? dial + digits : "";
  const email = contact.email.trim();
  const preference: ContactPreference = phone ? "whatsapp" : "email";

  return {
    contact_preference: preference,
    contact_value: phone || email,
    donor_email: email,
    donor_phone: phone || undefined,
    donor_name: contact.name.trim() || undefined,
    notes: contact.notes.trim() || undefined,
  };
}
