"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck } from "@/components/ui/icons";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import ContentStep, { type ContentFields } from "./ContentStep";
import CreatorSteps from "./CreatorSteps";
import PersonalStep, {
  type PersonalErrors,
  type PersonalFields,
} from "./PersonalStep";
import SocialStep, { type SocialFields, type SocialRow } from "./SocialStep";
import WizardNav from "@/components/collaborate/WizardNav";
import {
  CREATOR_STEPS,
  DEFAULT_SOCIAL_ROWS,
  SOCIAL_PLATFORMS,
  VIDEO_MAX_BYTES,
  VIDEO_TYPES,
} from "./creator-form-data";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The "صانع محتوى" application: "التالي" swaps the step in place instead of
   navigating, "السابق" walks back, and step 1's "الغاء" leaves for
   /collaborate — the type picker this flow was opened from.
   All three steps' values live here so they survive the step changes; nothing
   is submitted to a backend yet, same as every other form on the site. */
export default function CreatorWizard() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const wizard = useRef<HTMLDivElement>(null);
  const router = useRouter();
  /* row ids only have to be unique within this list, so a counter is enough */
  const nextRowId = useRef(DEFAULT_SOCIAL_ROWS.length);

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

  const [social, setSocial] = useState<SocialFields>({
    rows: DEFAULT_SOCIAL_ROWS.map((platform, i) => ({
      id: i,
      platform,
      url: "",
    })),
    notes: "",
    video: null,
    videoError: null,
    agree: false,
  });
  const [agreeError, setAgreeError] = useState(false);

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

  /* Step 1 is the only one with required fields; the rest of the form is
     optional apart from the join-terms tick on the last step. */
  function validatePersonal() {
    const errors: PersonalErrors = {};
    if (!personal.name.trim()) errors.name = "الرجاء إدخال الاسم الكامل.";
    if (!personal.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
    const email = personal.email.trim();
    if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
    else if (!EMAIL_RE.test(email))
      errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (index === 0 && !validatePersonal()) return;
    if (index < CREATOR_STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    if (!social.agree) {
      setAgreeError(true);
      return;
    }
    setDone(true);
  }

  /* Both the file input and a drop share this: reject anything outside the
     rules printed under the zone, otherwise keep the file. */
  function acceptVideo(picked: File | undefined) {
    if (!picked) return;
    if (!VIDEO_TYPES.includes(picked.type)) {
      setSocial((s) => ({ ...s, video: null, videoError: "type" }));
      return;
    }
    if (picked.size > VIDEO_MAX_BYTES) {
      setSocial((s) => ({ ...s, video: null, videoError: "size" }));
      return;
    }
    setSocial((s) => ({ ...s, video: picked, videoError: null }));
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
      <CreatorSteps index={index} />

      {index === 0 && (
        <PersonalStep
          values={personal}
          errors={personalErrors}
          onChange={(patch) => {
            setPersonal((v) => ({ ...v, ...patch }));
            // the message goes as soon as they retype
            setPersonalErrors((e) => {
              const next = { ...e };
              for (const key of Object.keys(patch)) {
                delete next[key as keyof PersonalErrors];
              }
              return next;
            });
          }}
        />
      )}

      {index === 1 && (
        <ContentStep
          values={content}
          onChange={(patch) => setContent((v) => ({ ...v, ...patch }))}
        />
      )}

      {index === 2 && (
        <SocialStep
          values={social}
          agreeError={agreeError}
          onChange={(patch) => {
            setSocial((v) => ({ ...v, ...patch }));
            if (patch.agree) setAgreeError(false);
          }}
          onAddRow={() =>
            setSocial((v) => ({
              ...v,
              rows: [
                ...v.rows,
                {
                  id: nextRowId.current++,
                  // first platform that has no row yet, else the first one
                  platform:
                    SOCIAL_PLATFORMS.find(
                      (p) => !v.rows.some((r) => r.platform === p.value),
                    )?.value ?? SOCIAL_PLATFORMS[0].value,
                  url: "",
                },
              ],
            }))
          }
          onRemoveRow={(id) =>
            setSocial((v) => ({ ...v, rows: v.rows.filter((r) => r.id !== id) }))
          }
          onRowChange={(id, patch: Partial<SocialRow>) =>
            setSocial((v) => ({
              ...v,
              rows: v.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)),
            }))
          }
          onVideo={acceptVideo}
        />
      )}

      <WizardNav
        index={index}
        total={CREATOR_STEPS.length}
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
