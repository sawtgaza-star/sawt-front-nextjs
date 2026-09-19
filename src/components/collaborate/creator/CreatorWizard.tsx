"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { submitCreatorApplication } from "@/lib/api/collaborate-forms";
import type { FieldErrors } from "@/lib/api/client";
import ContentStep, {
  type ContentErrors,
  type ContentFields,
} from "./ContentStep";
import CreatorSteps from "./CreatorSteps";
import PersonalStep, {
  type PersonalErrors,
  type PersonalFields,
} from "./PersonalStep";
import SocialStep, { type SocialErrors } from "./SocialStep";
import { useSocialRows } from "./use-social-rows";
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
import { CREATOR_STEPS } from "./creator-form-data";
import { checkContent, checkPersonal, checkSocial } from "./creator-checks";

/* Which step owns each box the API can flag, so a rejection puts the visitor
   back where the box it names actually is. Everything unlisted — `full_name`,
   `email`, `phone`, `country_code` — belongs to step 1, which is also the
   right place to land when the API rejects without naming a field at all. */
const STEP_BY_FIELD: Record<string, number> = {
  content_types: 1,
  followers_count: 1,
  content_bio: 1,
  socials: 2,
  additional_notes: 2,
  attachment: 2,
  terms_accepted: 2,
};

/** The step-1 box a flagged field belongs to, for the note under it. */
const PERSONAL_FIELD: Record<string, keyof PersonalErrors> = {
  full_name: "name",
  email: "email",
  phone: "phone",
  country_code: "phone",
};

/* The "صانع محتوى" application: "التالي" swaps the step in place instead of
   navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes, and the
   last step's "تسليم الطلب" POSTs the lot to /pages/collaborate/creator
   (lib/api/collaborate-forms). Nothing is checked against the API's rules
   first — it validates every field and answers in Arabic, and what it says is
   what the wizard shows: the boxes on step 1 under themselves, everything else
   in the panel above the footer, with the step moved to the first one flagged. */
export default function CreatorWizard() {
  const [index, setIndex] = useState(0);
  const form = useCollaborateForm();
  const done = form.done !== null;
  const wizard = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [personal, setPersonal] = useState<PersonalFields>({
    name: "",
    dial: "+970",
    phone: "",
    email: "",
  });
  const [personalErrors, setPersonalErrors] = useState<PersonalErrors>({});

  const [content, setContent] = useState<ContentFields>({
    categories: [],
    followers: "",
    about: "",
  });
  const [contentErrors, setContentErrors] = useState<ContentErrors>({});
  const [socialErrors, setSocialErrors] = useState<SocialErrors>({});

  /* step 3 keeps its own state — the rows, the video and the terms tick */
  const {
    social,
    agreeError,
    setAgreeError,
    change: changeSocial,
    addRow,
    removeRow,
    changeRow,
    acceptVideo,
  } = useSocialRows();

  // A new step renders with its Arabic fallback text, so re-apply the saved
  // language to the fresh keys (same as the checkout wizard), and put the
  // progress card back in view.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
    if (index > 0 || done) {
      wizard.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index, done]);

  /* Every box of every step is required (creator-checks), so the step is
     checked before it is left and the last one before it is sent. The
     join-terms tick is checked here rather than there: it is a control of its
     own, with its own flag. */
  function validateStep() {
    if (index === 0) return passes(checkPersonal(personal), setPersonalErrors);
    if (index === 1) return passes(checkContent(content), setContentErrors);

    const ok = passes(checkSocial(social), setSocialErrors);
    if (!social.agree) setAgreeError(true);
    return ok && social.agree;
  }

  function next() {
    if (!validateStep()) return;
    if (index < CREATOR_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    void send();
  }

  async function send() {
    const flagged = await form.submit(() =>
      submitCreatorApplication({
        fullName: personal.name,
        email: personal.email,
        phone: personal.phone,
        countryCode: personal.dial,
        contentTypes: content.categories,
        followersCount: content.followers,
        contentBio: content.about,
        socials: social.rows.map((row) => ({
          platform: row.platform,
          url: row.url,
        })),
        additionalNotes: social.notes,
        termsAccepted: social.agree,
        attachment: social.video,
      }),
    );
    if (flagged) showRejection(flagged);
  }

  /** Put the notes the API sent under the step-1 boxes they name, and move to
      the earliest step it flagged so the visitor is looking at one of them. */
  function showRejection(flagged: FieldErrors) {
    setPersonalErrors(rejectedFields(flagged, PERSONAL_FIELD));
    setIndex(rejectedStep(flagged, STEP_BY_FIELD));
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
      <CreatorSteps index={index} />

      {index === 0 && (
        <PersonalStep
          values={personal}
          errors={personalErrors}
          onChange={(patch) => {
            setPersonal((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setPersonalErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 1 && (
        <ContentStep
          values={content}
          errors={contentErrors}
          onChange={(patch) => {
            setContent((v) => ({ ...v, ...patch }));
            // the message goes as soon as they answer the box
            setContentErrors((e) => clearTouched(e, patch));
          }}
        />
      )}

      {index === 2 && (
        <SocialStep
          values={social}
          errors={socialErrors}
          agreeError={agreeError}
          onChange={(patch) => {
            changeSocial(patch);
            setSocialErrors((e) => clearTouched(e, patch));
          }}
          onAddRow={addRow}
          onRemoveRow={removeRow}
          onRowChange={(id, patch) => {
            changeRow(id, patch);
            if (patch.url !== undefined) setSocialErrors((e) => ({ ...e, rows: undefined }));
          }}
          onVideo={acceptVideo}
        />
      )}

      <WizardAlert messages={form.messages} />

      <WizardNav
        index={index}
        total={CREATOR_STEPS.length}
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
