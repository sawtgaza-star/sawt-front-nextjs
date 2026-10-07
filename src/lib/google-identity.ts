/* =========================================================
   Google Identity Services — "تسجيل الدخول باستخدام google".

   The API signs a visitor in from the ID token Google hands the page (the
   "credential", POST /auth/social/google), and names the OAuth client to ask
   for it in GET /auth/providers. Google only opens its account picker from a
   click on its own button, so GoogleSignInButton lays that button, invisible,
   over the site's: the visitor sees the legacy design and clicks Google.

   The script is loaded once, and initialize() is called once per client id —
   GIS keeps a single callback, so it calls whichever handler the mounted
   button registered last.
   ========================================================= */

import { getCurrentLang } from "./translations";

type CredentialResponse = { credential?: string };

type ButtonOptions = {
  type: "standard";
  theme: "outline";
  size: "large";
  text: "signin_with" | "continue_with";
  shape: "pill";
  width: number;
  locale: string;
};

export type GoogleId = {
  initialize: (options: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    ux_mode: "popup";
    auto_select: boolean;
    cancel_on_tap_outside: boolean;
  }) => void;
  renderButton: (parent: HTMLElement, options: ButtonOptions) => void;
  prompt: () => void;
};

const SCRIPT_URL = "https://accounts.google.com/gsi/client";

let loading: Promise<GoogleId> | null = null;
let initializedFor: string | null = null;
let onCredential: ((credential: string) => void) | null = null;

export function loadGoogleIdentity(): Promise<GoogleId> {
  if (loading) return loading;

  loading = new Promise<GoogleId>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const id = (window as any).google?.accounts?.id as GoogleId | undefined;
      if (id) resolve(id);
      else reject(new Error("Google Identity Services loaded without google.accounts.id"));
    };
    script.onerror = () => {
      loading = null; // the next button tries again
      script.remove();
      reject(new Error("Google Identity Services failed to load"));
    };
    document.head.appendChild(script);
  });

  return loading;
}

/** Points Google's callback at `handler` (initializing GIS for `clientId` the
    first time) and answers the API to draw a button with. */
export async function prepareGoogleSignIn(
  clientId: string,
  handler: (credential: string) => void,
): Promise<GoogleId> {
  const id = await loadGoogleIdentity();
  onCredential = handler;
  if (initializedFor !== clientId) {
    id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.credential) onCredential?.(response.credential);
      },
      ux_mode: "popup",
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    initializedFor = clientId;
  }
  return id;
}

/** Drops the handler of a button that has gone, so a late answer from Google
    doesn't reach an unmounted page. */
export function releaseGoogleSignIn(handler: (credential: string) => void): void {
  if (onCredential === handler) onCredential = null;
}

export function googleLocale(): string {
  try {
    return getCurrentLang() === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}
