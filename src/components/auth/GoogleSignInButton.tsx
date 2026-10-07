"use client";
/* "تسجيل الدخول باستخدام google" on /login and /register.

   The legacy button stays exactly as it was; Google's own button (lib/
   google-identity) is drawn over it at near-zero opacity and stretched to
   its size, so the click the visitor makes on "our" button is Google's and
   opens the account picker. Google answers with an ID token, handed to
   `onCredential` — the page signs in with it.

   The overlay is drawn only when GET /auth/providers names an enabled client;
   with Google switched off there the button isn't shown at all. Keyboard users
   land on the legacy button underneath — Enter there asks Google for One Tap,
   the one prompt it allows without its own button. */

import { useEffect, useRef, useState } from "react";
import { IconGoogle } from "@/components/ui/icons";
import { fetchAuthProviders } from "@/lib/api/auth";
import {
  googleLocale,
  prepareGoogleSignIn,
  releaseGoogleSignIn,
  type GoogleId,
} from "@/lib/google-identity";

type Props = {
  onCredential: (credential: string) => void;
  /** The button was used but Google can't be reached (or isn't configured). */
  onUnavailable: () => void;
};

type Status = "loading" | "ready" | "failed" | "off";

/** Google draws its button at most 400px wide. */
const GOOGLE_MAX_WIDTH = 400;

export default function GoogleSignInButton({ onCredential, onUnavailable }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const overlay = useRef<HTMLDivElement>(null);
  const google = useRef<GoogleId | null>(null);

  // Google keeps one callback for the page; it reads the latest prop through this.
  const latest = useRef(onCredential);
  latest.current = onCredential;

  useEffect(() => {
    const controller = new AbortController();
    const handler = (credential: string) => latest.current(credential);
    let observer: ResizeObserver | undefined;
    let sizer: ResizeObserver | undefined;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    /* (Re)draws Google's button to the overlay's width, then scales it so it
       covers the whole legacy button — the iframe takes the click anywhere. */
    const draw = () => {
      const host = overlay.current;
      const id = google.current;
      if (!host || !id || stopped) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;

      host.replaceChildren();
      const inner = document.createElement("div");
      inner.style.cssText = "position:absolute;top:0;left:0;transform-origin:0 0";
      host.appendChild(inner);
      id.renderButton(inner, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
        width: Math.min(GOOGLE_MAX_WIDTH, Math.round(width)),
        locale: googleLocale(),
      });

      /* Google sizes its iframe after it loads; scale once it has a size.
         One that never gets one was refused — most often a 403 because this
         origin isn't among the client's "Authorized JavaScript origins" — so
         the click falls through to the legacy button, which then says so. */
      sizer?.disconnect();
      sizer = new ResizeObserver(() => {
        const drawn = inner.getBoundingClientRect();
        if (!drawn.width || !drawn.height) return;
        inner.style.transform = `scale(${width / drawn.width}, ${height / drawn.height})`;
      });
      sizer.observe(inner);
      clearTimeout(watchdog);
      watchdog = setTimeout(() => {
        // Google's placeholder div is sized either way; the iframe (which
        // takes the click) stays 0×0 when the origin is refused
        const frame = inner.querySelector("iframe");
        if (stopped || (frame && frame.getBoundingClientRect().width)) return;
        console.warn(
          "[google-signin] Google didn't draw its button — is",
          window.location.origin,
          "an Authorized JavaScript origin of the OAuth client?",
        );
        setStatus("failed");
      }, 8000);
    };

    fetchAuthProviders(controller.signal)
      .then(async ({ google: provider }) => {
        if (!provider.enabled || !provider.clientId) {
          setStatus("off");
          return;
        }
        google.current = await prepareGoogleSignIn(provider.clientId, handler);
        if (stopped) return;
        setStatus("ready");
        draw();
        if (overlay.current && typeof ResizeObserver !== "undefined") {
          observer = new ResizeObserver(() => draw());
          observer.observe(overlay.current);
        }
      })
      .catch((error) => {
        if (stopped || error?.name === "AbortError") return;
        console.warn("[google-signin]", error);
        setStatus("failed");
      });

    // Google's text sits under the overlay unseen, but keep its language right
    document.addEventListener("langchange", draw);

    return () => {
      stopped = true;
      controller.abort();
      observer?.disconnect();
      sizer?.disconnect();
      clearTimeout(watchdog);
      document.removeEventListener("langchange", draw);
      releaseGoogleSignIn(handler);
    };
  }, []);

  if (status === "off") return null;

  /* Reached only when the click didn't land on Google's button: from the
     keyboard, or before/without it. */
  const onClick = () => {
    if (status === "ready" && google.current) google.current.prompt();
    else if (status === "failed") onUnavailable();
  };

  return (
    <div style={{ position: "relative" }}>
      <button type="button" className="btn btn-social-media btn-google" onClick={onClick}>
        {" "}
        <i className="social-icon">
          <IconGoogle />
        </i>{" "}
        <span data-i18n="auth_google">تسجيل الدخول باستخدام google</span>{" "}
      </button>
      <div
        ref={overlay}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          opacity: 0.01,
          display: status === "ready" ? "block" : "none",
        }}
      />
    </div>
  );
}
