"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import WizardAlert from "@/components/collaborate/WizardAlert";
import WizardDone from "@/components/collaborate/WizardDone";
import WizardNav from "@/components/collaborate/WizardNav";
import {
  clearTouched,
  passes,
  rejectedFields,
  rejectedStep,
  useCollaborateForm,
} from "@/components/collaborate/use-collaborate-form";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { submitPartnershipApplication } from "@/lib/api/collaborate-forms";
import type { FieldErrors } from "@/lib/api/client";
import CompanyStep, { type CompanyErrors, type CompanyFields } from "./CompanyStep";
import FilesStep, { type FilesFields } from "./FilesStep";
import NatureStep, {
  type NatureErrors,
  type NatureFields,
} from "./NatureStep";
import PartnershipSteps from "./PartnershipSteps";
import {
  FILE_MAX_BYTES,
  FILE_TYPES,
  PARTNERSHIP_STEPS,
} from "./partnership-form-data";
import { checkCompany, checkNature } from "./partnership-checks";

/* Which step owns each box the API can flag, so a rejection puts the visitor
   back where the box it names actually is. Everything unlisted — the contact
   boxes the flow opens with — belongs to step 1, which is also the right place
   to land when the API rejects without naming a field at all. */
const STEP_BY_FIELD: Record<string, number> = {
  partnership_types: 1,
  partnership_goal: 1,
  additional_notes: 2,
  attachment: 2,
};

/** The step-1 box a flagged field belongs to, for the note under it. */
const COMPANY_FIELD: Record<string, keyof CompanyErrors> = {
  company_name: "company",
  email: "email",
  phone: "phone",
  country_code: "phone",
  website: "site",
};

/* The "شراكة استراتيجية" application: "التالي" swaps the step in place instead
   of navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes, and the
   last step's "تسليم الطلب" POSTs the lot to /pages/collaborate/partnership
   (lib/api/collaborate-forms). Nothing is checked against the API's rules
   first: it validates every field and answers in Arabic, and what it says is
   what the wizard shows — the boxes on step 1 under themselves, everything
   else in the panel above the footer, with the step moved to the first one
   flagged. */
export default function PartnershipWizard() {
  const [index, setIndex] = useState(0);
  const form = useCollaborateForm();
  const done = form.done !== null;
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
  const [natureErrors, setNatureErrors] = useState<NatureErrors>({});

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

  /* Every box of the first two steps is required (partnership-checks), so the
     step is checked before it is left. Step 3 has nothing required on it — the
     company profile and the extra notes are both optional — so "تسليم الطلب"
     goes straight out. */
  function validateStep() {
    if (index === 0) return passes(checkCompany(company), setCompanyErrors);
    if (index === 1) return passes(checkNature(nature), setNatureErrors);
    return true;
  }

  function next() {
    if (!validateStep()) return;
    if (index < PARTNERSHIP_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    void send();
  }

  async function send() {
    const flagged = await form.submit(() =>
      submitPartnershipApplication({
        companyName: company.company,
        email: company.email,
        phone: company.phone,
        countryCode: company.dial,
        website: company.site,
        partnershipTypes: nature.types,
        partnershipGoal: nature.about,
        additionalNotes: files.notes,
        attachment: files.file,
      }),
    );
    if (flagged) showRejection(flagged);
  }

  /** Put the notes the API sent under the step-1 boxes they name, and move to
      the earliest step it flagged so the visitor is looking at one of them. */
  function showRejection(flagged: FieldErrors) {
    setCompanyErrors(rejectedFields(flagged, COMPANY_FIELD));
    setIndex(rejectedStep(flagged, STEP_BY_FIELD));
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
        <WizardDone message={form.done} />
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
            setCompanyErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 1 && (
        <NatureStep
          values={nature}
          errors={natureErrors}
          onChange={(patch) => {
            setNature((v) => ({ ...v, ...patch }));
            // the message goes as soon as they answer the box
            setNatureErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 2 && (
        <FilesStep
          values={files}
          onChange={(patch) => setFiles((v) => ({ ...v, ...patch }))}
          onFile={acceptFile}
        />
      )}

      <WizardAlert messages={form.messages} />

      <WizardNav
        index={index}
        total={PARTNERSHIP_STEPS.length}
        pending={form.pending}
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
