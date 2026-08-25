"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck } from "@/components/ui/icons";
import WizardNav from "@/components/collaborate/WizardNav";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import ExtrasStep, { type ExtrasFields } from "./ExtrasStep";
import FundingSteps from "./FundingSteps";
import OrgStep, { type OrgErrors, type OrgFields } from "./OrgStep";
import SupportStep, { type SupportFields } from "./SupportStep";
import {
  FILE_MAX_BYTES,
  FILE_TYPES,
  FUNDING_STEPS,
} from "./funding-form-data";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The "رعاية أو تمويل" application: "التالي" swaps the step in place instead
   of navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes; nothing
   is submitted to a backend yet, same as every other form on the site. */
export default function FundingWizard() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const wizard = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [org, setOrg] = useState<OrgFields>({
    org: "",
    email: "",
    site: "",
    dial: "+970",
    phone: "",
  });
  const [orgErrors, setOrgErrors] = useState<OrgErrors>({});

  const [support, setSupport] = useState<SupportFields>({
    types: [],
    about: "",
  });

  const [extras, setExtras] = useState<ExtrasFields>({
    terms: "",
    notes: "",
    file: null,
    fileError: null,
  });

  // A new step renders with its Arabic fallback text, so re-apply the saved
  // language to the fresh keys (same as the creator wizard), and put the
  // progress card back in view.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
    if (index > 0 || done) {
      wizard.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index, done]);

  /* Step 1 is the only one with required fields — the support offer and the
     attachments are both optional in the mock. */
  function validateOrg() {
    const errors: OrgErrors = {};
    if (!org.org.trim()) errors.org = "الرجاء إدخال اسم الشركة / المؤسسة.";
    const email = org.email.trim();
    if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
    else if (!EMAIL_RE.test(email))
      errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
    if (!org.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
    setOrgErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (index === 0 && !validateOrg()) return;
    if (index < FUNDING_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    setDone(true);
  }

  /* Reject anything outside the rules printed under the drop zone, otherwise
     keep the file. */
  function acceptFile(picked: File | undefined) {
    if (!picked) return;
    if (!FILE_TYPES.includes(picked.type)) {
      setExtras((s) => ({ ...s, file: null, fileError: "type" }));
      return;
    }
    if (picked.size > FILE_MAX_BYTES) {
      setExtras((s) => ({ ...s, file: null, fileError: "size" }));
      return;
    }
    setExtras((s) => ({ ...s, file: picked, fileError: null }));
  }

  if (done) {
    return (
      <div className="cl-wizard" ref={wizard}>
        <div className="cl-done">
          <span className="cl-done-icon" aria-hidden="true">
            <IconCircleCheck />
          </span>
          <h3 className="cl-done-title" data-i18n="collab_done_title">
            تم استلام طلبك بنجاح
          </h3>
          <p className="cl-done-desc" data-i18n="collab_done_desc">
            سيتم التواصل معك خلال 3-5 أيام عمل بعد استلام الطلب.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cl-wizard" ref={wizard}>
      <FundingSteps index={index} />

      {index === 0 && (
        <OrgStep
          values={org}
          errors={orgErrors}
          onChange={(patch) => {
            setOrg((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setOrgErrors((e) => {
              const next = { ...e };
              for (const key of Object.keys(patch)) {
                delete next[key as keyof OrgErrors];
              }
              return next;
            });
          }}
        />
      )}

      {index === 1 && (
        <SupportStep
          values={support}
          onChange={(patch) => setSupport((v) => ({ ...v, ...patch }))}
        />
      )}

      {index === 2 && (
        <ExtrasStep
          values={extras}
          onChange={(patch) => setExtras((v) => ({ ...v, ...patch }))}
          onFile={acceptFile}
        />
      )}

      <WizardNav
        index={index}
        total={FUNDING_STEPS.length}
        onBack={
          index === 0
            ? () => router.push("/collaborate")
            : () => setIndex((i) => i - 1)
        }
        onNext={next}
      />
    </div>
  );
}
