"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck } from "@/components/ui/icons";
import WizardNav from "@/components/collaborate/WizardNav";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import ContactStep, { type ContactErrors, type ContactFields } from "./ContactStep";
import IdeaStep, { type IdeaFields } from "./IdeaStep";
import OtherSteps from "./OtherSteps";
import { FILE_MAX_BYTES, FILE_TYPES, OTHER_STEPS } from "./other-form-data";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The "تعاون آخر" application: "التالي" swaps the step in place instead of
   navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   Both steps' values live here so they survive the step changes; nothing is
   submitted to a backend yet, same as every other form on the site. */
export default function OtherWizard() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
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

  /* Step 1 is the only one with required fields — the idea, the attachment and
     the notes are all optional in the mock. */
  function validateContact() {
    const errors: ContactErrors = {};
    if (!contact.name.trim())
      errors.name = "الرجاء إدخال الأسم / اسم المؤسسة.";
    const email = contact.email.trim();
    if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
    else if (!EMAIL_RE.test(email))
      errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
    if (!contact.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (index === 0 && !validateContact()) return;
    if (index < OTHER_STEPS.length - 1) {
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
      <OtherSteps index={index} />

      {index === 0 && (
        <ContactStep
          values={contact}
          errors={contactErrors}
          onChange={(patch) => {
            setContact((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setContactErrors((e) => {
              const next = { ...e };
              for (const key of Object.keys(patch)) {
                delete next[key as keyof ContactErrors];
              }
              return next;
            });
          }}
        />
      )}

      {index === 1 && (
        <IdeaStep
          values={idea}
          onChange={(patch) => setIdea((v) => ({ ...v, ...patch }))}
          onFile={acceptFile}
        />
      )}

      <WizardNav
        index={index}
        total={OTHER_STEPS.length}
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
