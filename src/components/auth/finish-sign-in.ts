import type { AuthSession } from "@/lib/api/auth";
import {
  safeNext,
  saveSession,
  setSocialAvatar,
  setSocialProvider,
  type SocialProvider,
} from "@/lib/auth-state";
import { markLoggedIn } from "@/components/site/login-flash";
import { pushNotification } from "@/lib/notifications";

/** The end of every sign-in (email or Google): keep the session, park the
    API's "تم تسجيل الدخول بنجاح." for the page we land on — this one is about
    to go — and leave the auth CSS group with a full reload, not a <Link> (see
    the CSS-groups convention in CLAUDE.md), back to the page that sent the
    visitor here (a course's waiting list…). The reload also lets the pre-paint
    script in layout.tsx pick up the new flag and render the signed-in top bar.
    `social` marks a Google/Facebook sign-in, with the account photo it came
    with (lib/api/auth). */
export function finishSignIn(
  session: AuthSession,
  message: string,
  social?: { provider: SocialProvider; avatar: string | null },
): void {
  saveSession(session);
  if (social) {
    setSocialProvider(social.provider);
    setSocialAvatar(social.avatar);
  }
  // the bell's "تسجيل دخول إلى حسابك" — see lib/notifications
  pushNotification({ kind: "login" }, session.user?.id);
  markLoggedIn(message);
  window.location.href = safeNext(new URLSearchParams(window.location.search).get("next"));
}
