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
import { submitOtherApplication } from "@/lib/api/collaborate-forms";
import type { FieldErrors } from "@/lib/api/client";
import ContactStep, { type ContactErrors, type ContactFields } from "./ContactStep";
import IdeaStep, { type IdeaErrors, type IdeaFields } from "./IdeaStep";
import OtherSteps from "./OtherSteps";
import { FILE_MAX_BYTES, FILE_TYPES, OTHER_STEPS } from "./other-form-data";
import { checkContact, checkIdea } from "./other-checks";

/* Which step owns each box the API can flag, so a rejection puts the visitor
   back where the box it names actually is. Everything unlisted — the contact
   boxes the flow opens with — belongs to step 1, which is also the right place
   to land when the API rejects without naming a field at all. */
const STEP_BY_FIELD: Record<string, number> = {
  collaboration_idea: 1,
  additional_notes: 1,
  attachment: 1,
};

/** The step-1 box a flagged field belongs to, for the note under it. */
const CONTACT_FIELD: Record<string, keyof ContactErrors> = {
  name: "name",
  email: "email",
  phone: "phone",
  country_code: "phone",
};

/* The "تعاون آخر" application: "التالي" swaps the step in place instead of
   navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   Both steps' values live here so they survive the step changes, and step 2's
   "تسليم الطلب" POSTs them to /pages/collaborate/other (lib/api/collaborate-
   forms). Nothing is checked against the API's rules first: it validates every
   field and answers in Arabic, and what it says is what the wizard shows — the
   boxes on step 1 under themselves, everything else in the panel above the
   footer, with the step moved to the first one flagged. */
export default function OtherWizard() {
  const [index, setIndex] = useState(0);
  const form = useCollaborateForm();
  const done = form.done !== null;
  const wizard = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [contact, setContact] = useState<ContactFields>({
    name: "",
    email: "",
    dial: "+970",
    phone: "",
  });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});

  const [idea, setIdea] = useState<IdeaFields>({
    idea: "",
    notes: "",
    file: null,
    fileError: null,
  });
  const [ideaErrors, setIdeaErrors] = useState<IdeaErrors>({});

  // A new step renders with its Arabic fallback text, so re-apply the saved
  // language to the fresh keys (same as the other three wizards), and put the
  // progress card back in view.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
    if (index > 0 || done) {
      wizard.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index, done]);

  /* Every box of both steps is required (other-checks), so the step is checked
     before it is left and the last one before it is sent. */
  function validateStep() {
    return index === 0
      ? passes(checkContact(contact), setContactErrors)
      : passes(checkIdea(idea), setIdeaErrors);
  }

  function next() {
    if (!validateStep()) return;
    if (index < OTHER_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    void send();
  }

  async function send() {
    const flagged = await form.submit(() =>
      submitOtherApplication({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        countryCode: contact.dial,
        collaborationIdea: idea.idea,
        additionalNotes: idea.notes,
        attachment: idea.file,
      }),
    );
    if (flagged) showRejection(flagged);
  }

  /** Put the notes the API sent under the step-1 boxes they name, and move to
      the earliest step it flagged so the visitor is looking at one of them. */
  function showRejection(flagged: FieldErrors) {
    setContactErrors(rejectedFields(flagged, CONTACT_FIELD));
    setIndex(rejectedStep(flagged, STEP_BY_FIELD));
  }

  /* Reject anything outside the rules printed under the drop zone, otherwise
     keep the file. */
  function acceptFile(picked: File | undefined) {
    if (!picked) return;
    if (!FILE_TYPES.includes(picked.type)) {
      setIdea((s) => ({ ...s, file: null, fileError: "type" }));
      return;
    }
    if (picked.size > FILE_MAX_BYTES) {
      setIdea((s) => ({ ...s, file: null, fileError: "size" }));
      return;
    }
    setIdea((s) => ({ ...s, file: picked, fileError: null }));
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
      <OtherSteps index={index} />

      {index === 0 && (
        <ContactStep
          values={contact}
          errors={contactErrors}
          onChange={(patch) => {
            setContact((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setContactErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 1 && (
        <IdeaStep
          values={idea}
          errors={ideaErrors}
          onChange={(patch) => {
            setIdea((v) => ({ ...v, ...patch }));
            // the message goes as soon as they answer the box
            setIdeaErrors((e) => clearTouched(e, patch));
          }}
          onFile={acceptFile}
        />
      )}

      <WizardAlert messages={form.messages} />

      <WizardNav
        index={index}
        total={OTHER_STEPS.length}
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
