"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck } from "@/components/ui/icons";
import WizardNav from "@/components/collaborate/WizardNav";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import CompanyStep, { type CompanyErrors, type CompanyFields } from "./CompanyStep";
import FilesStep, { type FilesFields } from "./FilesStep";
import NatureStep, { type NatureFields } from "./NatureStep";
import PartnershipSteps from "./PartnershipSteps";
import {
  FILE_MAX_BYTES,
  FILE_TYPES,
  PARTNERSHIP_STEPS,
} from "./partnership-form-data";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The "شراكة استراتيجية" application: "التالي" swaps the step in place instead
   of navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes; nothing
   is submitted to a backend yet, same as every other form on the site. */
export default function PartnershipWizard() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const wizard = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [company, setCompany] = useState<CompanyFields>({
    company: "",
    email: "",
    site: "",
    dial: "+970",
    phone: "",
  });
  const [companyErrors, setCompanyErrors] = useState<CompanyErrors>({});

  const [nature, setNature] = useState<NatureFields>({
    types: [],
    about: "",
  });

  const [files, setFiles] = useState<FilesFields>({
    notes: "",
    file: null,
    fileError: null,
  });

  // A new step renders with its Arabic fallback text, so re-apply the saved
  // language to the fresh keys (same as the other two wizards), and put the
  // progress card back in view.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
    if (index > 0 || done) {
      wizard.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index, done]);

  /* Step 1 is the only one with required fields — the partnership types and
     the attachments are both optional in the mock. */
  function validateCompany() {
    const errors: CompanyErrors = {};
    if (!company.company.trim())
      errors.company = "الرجاء إدخال اسم الشركة / المؤسسة.";
    const email = company.email.trim();
    if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
    else if (!EMAIL_RE.test(email))
      errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
    if (!company.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
    setCompanyErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (index === 0 && !validateCompany()) return;
    if (index < PARTNERSHIP_STEPS.length - 1) {
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
      setFiles((s) => ({ ...s, file: null, fileError: "type" }));
      return;
    }
    if (picked.size > FILE_MAX_BYTES) {
      setFiles((s) => ({ ...s, file: null, fileError: "size" }));
      return;
    }
    setFiles((s) => ({ ...s, file: picked, fileError: null }));
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
      <PartnershipSteps index={index} />

      {index === 0 && (
        <CompanyStep
          values={company}
          errors={companyErrors}
          onChange={(patch) => {
            setCompany((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setCompanyErrors((e) => {
              const next = { ...e };
              for (const key of Object.keys(patch)) {
                delete next[key as keyof CompanyErrors];
              }
              return next;
            });
          }}
        />
      )}

      {index === 1 && (
        <NatureStep
          values={nature}
          onChange={(patch) => setNature((v) => ({ ...v, ...patch }))}
        />
      )}

      {index === 2 && (
        <FilesStep
          values={files}
          onChange={(patch) => setFiles((v) => ({ ...v, ...patch }))}
          onFile={acceptFile}
        />
      )}

      <WizardNav
        index={index}
        total={PARTNERSHIP_STEPS.length}
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
