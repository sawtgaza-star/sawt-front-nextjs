import { useCallback, useState } from "react";
import type { NewsletterNotice } from "@/components/site/NewsletterToast";

/* The account forms answer with the site's floating toast (<NewsletterToast />,
   the same panel as the logout one) instead of an inline message. It hides
   itself after a few seconds; every call sets a fresh object, so repeating
   the same message restarts the countdown. Several errors go in one toast,
   a line each (`.acc-page .logout-toast-text` keeps the line breaks). */
export function useAccountToast() {
  const [notice, setNotice] = useState<NewsletterNotice | null>(null);
  const close = useCallback(() => setNotice(null), []);
  const success = useCallback(
    (message: string) => setNotice({ kind: "success", message }),
    [],
  );
  const error = useCallback(
    (messages: string[]) => setNotice({ kind: "error", message: messages.join("\n") }),
    [],
  );
  return { notice, close, success, error };
}
