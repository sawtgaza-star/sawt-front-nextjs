"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { mountRecaptcha, resetRecaptcha, type RecaptchaAction } from "@/lib/recaptcha";

/* The "أنا لست روبوت" box (lib/recaptcha). The form owns the state through
   useRecaptcha() — `token` is null until the box is ticked, and again once it
   is unticked — and locks its send button on it. `reset()` after every
   attempt: the API spends a token the moment it checks one. */
export function useRecaptcha(action: RecaptchaAction) {
  const [token, setToken] = useState<string | null>(null);
  const widget = useRef<number | null>(null);

  const reset = useCallback(() => {
    setToken(null);
    resetRecaptcha(widget.current);
  }, []);

  return { action, token, setToken, widget, reset };
}

export type RecaptchaState = ReturnType<typeof useRecaptcha>;

export default function Recaptcha({ captcha }: { captcha: RecaptchaState }) {
  const host = useRef<HTMLDivElement>(null);
  const { action, setToken, widget } = captcha;

  useEffect(() => {
    if (!host.current) return;
    const dispose = mountRecaptcha(host.current, setToken, (id) => {
      widget.current = id;
    }, action);
    return () => {
      dispose();
      // a box that is gone can't vouch for the next send
      setToken(null);
    };
  }, [action, setToken, widget]);

  return (
    <div
      ref={host}
      className="sawt-recaptcha"
      style={{ display: "flex", justifyContent: "flex-start", margin: "16px 0" }}
    />
  );
}
