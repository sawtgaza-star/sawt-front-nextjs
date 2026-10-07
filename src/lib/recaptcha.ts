/* =========================================================
   Google reCAPTCHA v3 behind an "أنا لست روبوت" checkbox.

   The public forms (the collaboration wizards, the creator join modal, the
   media booking, the course subscription and the donation draft) show a
   checkbox before they send. The key is a v3 key — Google won't draw its own
   v2 box for it ("Invalid key type") — so the box is ours: ticking it asks
   Google for a v3 token for that form's action, and the form sends it as
   `recaptcha_token`; the API verifies it with the secret key.

   A token is single-use and expires after two minutes: while the box stays
   ticked the token is refreshed quietly, and a form resets (unticks) its
   widget after every attempt, so the next send needs a fresh tick.
   ========================================================= */

import { getCurrentLang, t } from "./translations";

/** The production site key (public by design — it ships in the page).
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY overrides it for another environment. */
const SITE_KEY = "6LcwZN4tAAAAAMpSFfoWd7ULRgC9vE5uCyFPardZ";

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || SITE_KEY;

export type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

/** Tokens live two minutes; refresh well before that. */
const REFRESH_MS = 90_000;
/* v3 tokens carry the action they were fetched for, and the API refuses one
   minted for another form ("رمز reCAPTCHA لا يخص هذا النموذج"). One entry per
   form/request — the values must match the API's names exactly. */
export const RECAPTCHA_ACTIONS = {
  creatorJoin: "creators_join",
  collaborateCreator: "collaborate_creator",
  collaborateSponsorship: "collaborate_sponsorship",
  collaboratePartnership: "collaborate_partnership",
  collaborateOther: "collaborate_other",
  mediaConsultation: "media_consultation",
  courseSubscribe: "course_subscribe",
  courseWaitlist: "course_waitlist",
  supportRequest: "support_request",
  supportProof: "support_proof",
  supportContact: "support_contact",
  supportPaypal: "support_paypal",
  supportCheckout: "support_checkout",
} as const;

export type RecaptchaAction = (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS];

let loading: Promise<Grecaptcha> | null = null;

export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loading) return loading;

  loading = new Promise<Grecaptcha>((resolve, reject) => {
    let lang = "ar";
    try {
      lang = getCurrentLang() === "en" ? "en" : "ar";
    } catch {}

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&hl=${lang}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const grecaptcha = (window as any).grecaptcha as Grecaptcha;
      grecaptcha.ready(() => resolve(grecaptcha));
    };
    script.onerror = () => {
      loading = null; // the next widget tries again
      script.remove();
      reject(new Error("reCAPTCHA script failed to load"));
    };
    document.head.appendChild(script);

    /* Google's floating badge is hidden: the checkbox carries the reCAPTCHA
       logo and its Privacy - Terms links, the attribution Google asks for in
       its place. Injected here because the forms live in every CSS group. */
    if (!document.getElementById("sawt-recaptcha-badge")) {
      const style = document.createElement("style");
      style.id = "sawt-recaptcha-badge";
      style.textContent = ".grecaptcha-badge { visibility: hidden !important; }";
      document.head.appendChild(style);
    }
  });

  return loading;
}

/** A fresh token for a request that has no widget of its own (the later
    steps of a flow send one too) — null if Google can't be reached, so the
    request still goes and the API decides. */
export async function getRecaptchaToken(action: RecaptchaAction): Promise<string | null> {
  try {
    const grecaptcha = await loadRecaptcha();
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch (error) {
    console.warn("[recaptcha]", error);
    return null;
  }
}

/* The checkbox's look — Google's v2 "I'm not a robot" box (304×78, grey
   frame, logo + Privacy - Terms), which mirrors itself under dir="rtl".
   Injected once, like the badge rule, because the forms live in different
   CSS groups. */
const BOX_CSS = `
.sawt-rc{display:flex;align-items:center;width:304px;max-width:100%;min-height:78px;
  padding:0 8px 0 12px;background:#f9f9f9;border:1px solid #d3d3d3;border-radius:3px;
  box-shadow:0 0 4px 1px rgba(0,0,0,.08);box-sizing:border-box;
  font-family:Roboto,helvetica,arial,sans-serif;color:#000;text-align:start}
[dir="rtl"] .sawt-rc{padding:0 12px 0 8px}
.sawt-rc-main{flex:1;display:flex;align-items:center;gap:12px;min-width:0}
.sawt-rc-box{position:relative;flex:none;width:28px;height:28px;padding:0;margin:0;
  background:#fff;border:2px solid #c1c1c1;border-radius:2px;cursor:pointer;box-sizing:border-box}
.sawt-rc-box:hover{border-color:#b2b2b2;box-shadow:inset 0 1px 1px -1px rgba(0,0,0,.2)}
.sawt-rc-box:focus-visible{outline:none;border-color:#4d90fe}
.sawt-rc-box[aria-busy="true"],.sawt-rc-box[aria-checked="true"]{
  border-color:transparent;background:transparent;box-shadow:none;cursor:default}
.sawt-rc-box[aria-busy="true"]::after{content:"";position:absolute;inset:-2px;border-radius:50%;
  border:4px solid #4a90e2;border-right-color:transparent;border-bottom-color:transparent;
  animation:sawt-rc-spin .8s linear infinite}
@keyframes sawt-rc-spin{to{transform:rotate(360deg)}}
.sawt-rc-box svg{display:none;position:absolute;left:-4px;top:-6px;width:34px;height:34px}
.sawt-rc-box[aria-checked="true"] svg{display:block}
.sawt-rc-text{display:flex;flex-direction:column;min-width:0}
.sawt-rc-label{font-size:14px;line-height:17px;color:#000}
.sawt-rc-error{font-size:11px;line-height:14px;color:#d93025;margin-top:2px}
.sawt-rc-error:empty{display:none}
.sawt-rc-brand{flex:none;display:flex;flex-direction:column;align-items:center;
  width:70px;padding:8px 0 6px;color:#555;text-align:center}
.sawt-rc-logo{width:32px;height:32px;display:block;margin-bottom:2px}
.sawt-rc-name{font-size:10px;line-height:12px;color:#555;font-family:Roboto,helvetica,arial,sans-serif}
.sawt-rc-links{font-size:8px;line-height:10px;color:#555;white-space:nowrap}
.sawt-rc-links a{color:#555;text-decoration:none}
.sawt-rc-links a:hover{text-decoration:underline}
`;

function injectBoxCss() {
  if (document.getElementById("sawt-recaptcha-box")) return;
  const style = document.createElement("style");
  style.id = "sawt-recaptcha-box";
  style.textContent = BOX_CSS;
  document.head.appendChild(style);
}

/* Google's green tick, drawn over the (then hidden) box. */
const CHECK_SVG =
  '<svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M7 18.5l7 7L28 9" stroke="#009e55" stroke-width="4" stroke-linecap="square"/></svg>';

const LOGO_URL = "https://www.gstatic.com/recaptcha/api2/logo_48.png";

/* Live widgets by id, so resetRecaptcha() can untick one. */
const resetters = new Map<number, () => void>();
let nextId = 1;

/** Draws the "أنا لست روبوت" checkbox into `host` and reports its token —
    a v3 token for `action` once the box is ticked, null while it is unticked
    (or when Google can't be reached). Answers a disposer that removes it. */
export function mountRecaptcha(
  host: HTMLElement,
  onToken: (token: string | null) => void,
  onWidget: ((widgetId: number | null) => void) | undefined,
  action: RecaptchaAction,
): () => void {
  let disposed = false;
  let checked = false;
  let busy = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const id = nextId++;

  injectBoxCss();
  // warm the script up so the tick answers fast
  loadRecaptcha().catch((error) => console.warn("[recaptcha]", error));

  const root = document.createElement("div");
  root.className = "sawt-rc";
  root.innerHTML = `
    <div class="sawt-rc-main">
      <button type="button" class="sawt-rc-box" role="checkbox" aria-checked="false">${CHECK_SVG}</button>
      <span class="sawt-rc-text">
        <span class="sawt-rc-label" data-i18n="rc_label"></span>
        <span class="sawt-rc-error" role="alert"></span>
      </span>
    </div>
    <div class="sawt-rc-brand">
      <img class="sawt-rc-logo" src="${LOGO_URL}" alt="" width="32" height="32" />
      <span class="sawt-rc-name">reCAPTCHA</span>
      <span class="sawt-rc-links">
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" data-i18n="rc_privacy"></a>
        -
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" data-i18n="rc_terms"></a>
      </span>
    </div>`;
  const box = root.querySelector<HTMLButtonElement>(".sawt-rc-box")!;
  const errorLine = root.querySelector<HTMLElement>(".sawt-rc-error")!;
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n!);
  });
  box.setAttribute("aria-label", t("rc_label"));
  host.appendChild(root);

  // the texts follow the language button through data-i18n; the label doesn't
  const relabel = () => box.setAttribute("aria-label", t("rc_label"));
  document.addEventListener("langchange", relabel);

  function paint() {
    box.setAttribute("aria-checked", String(checked));
    box.setAttribute("aria-busy", String(busy));
  }

  function untick() {
    clearTimeout(timer);
    checked = false;
    busy = false;
    paint();
    onToken(null);
  }

  /* Asks Google for a token; `quiet` is the background refresh of a box that
     is already ticked (its token stays usable until the new one lands). */
  function fetchToken(quiet: boolean) {
    if (!quiet) {
      busy = true;
      errorLine.textContent = "";
      paint();
    }
    loadRecaptcha()
      .then((grecaptcha) => grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }))
      .then((token) => {
        if (disposed || (quiet && !checked)) return;
        checked = true;
        busy = false;
        paint();
        onToken(token);
        clearTimeout(timer);
        timer = setTimeout(() => fetchToken(true), REFRESH_MS);
      })
      .catch((error) => {
        if (disposed) return;
        console.warn("[recaptcha]", error);
        untick();
        errorLine.textContent = t("rc_error");
      });
  }

  box.addEventListener("click", () => {
    if (checked || busy) return;
    fetchToken(false);
  });

  resetters.set(id, untick);
  onWidget?.(id);

  return () => {
    disposed = true;
    clearTimeout(timer);
    resetters.delete(id);
    document.removeEventListener("langchange", relabel);
    root.remove();
    onWidget?.(null);
  };
}

/** Unticks a widget after a send: the API spends a token the moment it
    checks one, so the next send needs a fresh tick. */
export function resetRecaptcha(widgetId: number | null): void {
  if (widgetId === null) return;
  resetters.get(widgetId)?.();
}
