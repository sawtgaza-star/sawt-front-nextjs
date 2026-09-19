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
import { submitSponsorshipApplication } from "@/lib/api/collaborate-forms";
import type { FieldErrors } from "@/lib/api/client";
import ExtrasStep, {
  type ExtrasErrors,
  type ExtrasFields,
} from "./ExtrasStep";
import FundingSteps from "./FundingSteps";
import OrgStep, { type OrgErrors, type OrgFields } from "./OrgStep";
import SupportStep, {
  type SupportErrors,
  type SupportFields,
} from "./SupportStep";
import {
  FILE_MAX_BYTES,
  FILE_TYPES,
  FUNDING_STEPS,
} from "./funding-form-data";
import { checkExtras, checkOrg, checkSupport } from "./funding-checks";

/* Which step owns each box the API can flag, so a rejection puts the visitor
   back where the box it names actually is. Everything unlisted — the contact
   boxes the flow opens with — belongs to step 1, which is also the right place
   to land when the API rejects without naming a field at all. */
const STEP_BY_FIELD: Record<string, number> = {
  support_types: 1,
  organization_bio: 1,
  conditions_notes: 2,
  additional_notes: 2,
  attachment: 2,
};

/** The step-1 box a flagged field belongs to, for the note under it. */
const ORG_FIELD: Record<string, keyof OrgErrors> = {
  company_name: "org",
  email: "email",
  phone: "phone",
  country_code: "phone",
  website: "site",
};

/* The "رعاية أو تمويل" application: "التالي" swaps the step in place instead
   of navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes, and the
   last step's "تسليم الطلب" POSTs the lot to /pages/collaborate/sponsorship
   (lib/api/collaborate-forms) — the API's name for this flow. Nothing is
   checked against its rules first: it validates every field and answers in
   Arabic, and what it says is what the wizard shows — the boxes on step 1
   under themselves, everything else in the panel above the footer, with the
   step moved to the first one flagged. */
export default function FundingWizard() {
  const [index, setIndex] = useState(0);
  const form = useCollaborateForm();
  const done = form.done !== null;
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
  const [supportErrors, setSupportErrors] = useState<SupportErrors>({});
  const [extrasErrors, setExtrasErrors] = useState<ExtrasErrors>({});

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

  /* Every box of every step is required (funding-checks), so the step is
     checked before it is left and the last one before it is sent. */
  function validateStep() {
    if (index === 0) return passes(checkOrg(org), setOrgErrors);
    if (index === 1) return passes(checkSupport(support), setSupportErrors);
    return passes(checkExtras(extras), setExtrasErrors);
  }

  function next() {
    if (!validateStep()) return;
    if (index < FUNDING_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    void send();
  }

  async function send() {
    const flagged = await form.submit(() =>
      submitSponsorshipApplication({
        companyName: org.org,
        email: org.email,
        phone: org.phone,
        countryCode: org.dial,
        website: org.site,
        supportTypes: support.types,
        organizationBio: support.about,
        conditionsNotes: extras.terms,
        additionalNotes: extras.notes,
        attachment: extras.file,
      }),
    );
    if (flagged) showRejection(flagged);
  }

  /** Put the notes the API sent under the step-1 boxes they name, and move to
      the earliest step it flagged so the visitor is looking at one of them. */
  function showRejection(flagged: FieldErrors) {
    setOrgErrors(rejectedFields(flagged, ORG_FIELD));
    setIndex(rejectedStep(flagged, STEP_BY_FIELD));
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
        <WizardDone message={form.done} />
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
            setOrgErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 1 && (
        <SupportStep
          values={support}
          errors={supportErrors}
          onChange={(patch) => {
            setSupport((v) => ({ ...v, ...patch }));
            // the message goes as soon as they answer the box
            setSupportErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 2 && (
        <ExtrasStep
          values={extras}
          errors={extrasErrors}
          onChange={(patch) => {
            setExtras((v) => ({ ...v, ...patch }));
            setExtrasErrors((e) => clearTouched(e, patch));
          }}
          onFile={acceptFile}
        />
      )}

      <WizardAlert messages={form.messages} />

      <WizardNav
        index={index}
        total={FUNDING_STEPS.length}
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
