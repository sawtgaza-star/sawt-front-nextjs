"use client";
import { useEffect, useRef, useState } from "react";
import { ApiError } from "@/lib/api/client";
import {
  fetchSupportMethod,
  type SupportMethod,
} from "@/lib/api/support-methods";
import {
  createSupportRequest,
  submitSupportContact,
  uploadSupportProof,
} from "@/lib/api/support-requests";
import { useSupportCategory } from "@/lib/api/use-support-category";
import { markDonationComplete } from "../donation-complete";
import {
  EMPTY_PROOF,
  contactPayload,
  parseAmount,
  validateProof,
  type ProofErrors,
  type ProofValues,
} from "./checkout-flow";
import { CHECKOUT_SCREENS } from "./checkout-steps-data";
import {
  EMPTY_CONTACT,
  validateContact,
  type ContactDetails,
  type ContactErrors,
  type ContactField,
} from "./contact-data";
import { CURRENCIES } from "./currencies-data";

const FALLBACK_ERROR = "حدث خطأ غير متوقع. حاول مرة أخرى.";

/* Everything the donation wizard keeps between screens, and the API calls
   behind its forward button:

     screen 1  platform  POST /support/requests (when /support handed over an
                         amount — else it is opened on screen 3)
     screen 2  transfer  GET  /support/methods/{uuid}
     screen 3  proof     POST /support/requests/{uuid}/proof
     screen 4  contact   POST /support/requests/{uuid}/contact → /support

   The platforms come only from the category (GET /support/methods/category/
   {key}); without it (outage, no `?method=`) there is nothing to pick and the
   forward button stays locked on screen 1. */
export function useCheckoutFlow() {
  const { page, loading } = useSupportCategory();
  const methods = page?.category?.methods ?? [];

  const [index, setIndex] = useState(0);
  const [platform, setPlatform] = useState("");
  const [detail, setDetail] = useState<SupportMethod | null>(null);
  const [proof, setProof] = useState<ProofValues>(EMPTY_PROOF);
  const [proofErrors, setProofErrors] = useState<ProofErrors>({});
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  /* the open draft, and the proof already sent to it (not re-sent on a
     back-and-forth that changed nothing) */
  const request = useRef<{ uuid: string; method: string } | null>(null);
  const sentProof = useRef<ProofValues | null>(null);
  const handedAmount = useRef(NaN);

  // nothing picked yet (or an unknown pick) → the first platform
  const listed = methods.find((m) => m.uuid === platform) ?? methods[0] ?? null;
  const method = detail?.uuid === listed?.uuid ? detail : listed;
  const screen = CHECKOUT_SCREENS[index];

  // the amount picked on /support (carried through /support/methods)
  useEffect(() => {
    const amount = parseAmount(
      new URLSearchParams(window.location.search).get("amount"),
    );
    handedAmount.current = amount;
    if (!Number.isNaN(amount)) {
      setProof((p) => (p.amount ? p : { ...p, amount: String(amount) }));
    }
  }, []);

  // the platform's full details for "بيانات التحويل", and its currency
  useEffect(() => {
    if (!listed) return;
    const code = listed.account?.currency;
    if (code && CURRENCIES.some((c) => c.value === code)) {
      setProof((p) => (p.currency ? p : { ...p, currency: code }));
    }
    const controller = new AbortController();
    fetchSupportMethod(listed.uuid, controller.signal)
      .then((found) => found && setDetail(found))
      .catch((caught) => {
        if (caught?.name !== "AbortError") {
          console.warn("[support/checkout] using the category's copy:", caught);
        }
      });
    return () => controller.abort();
  }, [listed?.uuid]); // eslint-disable-line react-hooks/exhaustive-deps

  async function openRequest(amount: number, currency: string): Promise<string> {
    if (request.current && request.current.method === method!.uuid) {
      return request.current.uuid;
    }
    const uuid = await createSupportRequest({
      method_uuid: method!.uuid,
      amount,
      currency: currency || undefined,
    });
    request.current = { uuid, method: method!.uuid };
    sentProof.current = null;
    return uuid;
  }

  /* Runs one screen's call with the button busy; a failure keeps the donor on
     the screen with the server's message. */
  async function run(call: () => Promise<void>): Promise<boolean> {
    setBusy(true);
    setError("");
    try {
      await call();
      return true;
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : FALLBACK_ERROR);
      if (!(caught instanceof ApiError)) console.error(caught);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    if (busy) return;
    setError("");

    if (screen.value === "platform" && method) {
      // opening the draft early is a nicety — screen 3 opens it anyway, so a
      // failure here never blocks the donor
      const amount = handedAmount.current;
      if (!Number.isNaN(amount)) {
        await openRequest(amount, proof.currency).catch((caught) =>
          console.warn("[support/checkout] draft left for screen 3:", caught),
        );
      }
    }

    if (screen.value === "proof") {
      const errors = validateProof(proof);
      setProofErrors(errors);
      if (Object.keys(errors).length) return;
      if (method) {
        const ok = await run(async () => {
          const amount = parseAmount(proof.amount);
          const uuid = await openRequest(amount, proof.currency);
          const same = sentProof.current;
          if (
            proof.file &&
            !(same && same.file === proof.file && same.amount === proof.amount &&
              same.currency === proof.currency)
          ) {
            await uploadSupportProof(uuid, {
              amount,
              currency: proof.currency,
              files: [proof.file],
            });
            sentProof.current = proof;
          }
        });
        if (!ok) return;
      }
    }

    if (screen.value === "contact") {
      const errors = validateContact(contact);
      setContactErrors(errors);
      if (Object.keys(errors).length) return;
      if (method && request.current) {
        const uuid = request.current.uuid;
        const ok = await run(() => submitSupportContact(uuid, contactPayload(contact)));
        if (!ok) return;
      }
      // the flag <DonationToast /> waits for on /support; plain navigation,
      // like every other link that crosses a CSS group
      markDonationComplete();
      window.location.href = "/support";
      return;
    }

    setIndex((i) => i + 1);
  }

  return {
    page,
    methods,
    method,
    loading,
    index,
    screen,
    busy,
    error,
    platform: method?.uuid ?? platform,
    setPlatform,
    proof,
    proofErrors,
    contact,
    contactErrors,
    next,
    back: () => {
      setError("");
      setIndex((i) => i - 1);
    },
    changeProof(patch: Partial<ProofValues>, clear: keyof ProofErrors) {
      setProof((p) => ({ ...p, ...patch }));
      setProofErrors((e) => ({ ...e, [clear]: undefined }));
    },
    rejectFile(reason: "type" | "size") {
      setProof((p) => ({ ...p, file: null }));
      setProofErrors((e) => ({ ...e, file: reason }));
    },
    changeContact(field: ContactField, value: string) {
      setContact((c) => ({ ...c, [field]: value }));
      // a field's message goes as soon as they retype it
      setContactErrors((e) => (field in e ? { ...e, [field]: undefined } : e));
    },
  };
}
