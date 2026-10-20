"use client";
import { useCallback, useEffect, useState } from "react";
import { follow, isFollowing, unfollow, useFollows } from "@/lib/follows";
import { isLoggedIn } from "@/lib/auth-state";
import { pushNotification } from "@/lib/notifications";
import { t } from "@/lib/translations";
import { type NewsletterNotice } from "@/components/site/NewsletterToast";
import LoginRequiredDialog from "@/components/site/LoginRequiredDialog";

/* Makes the home creator cards' "متابعة +" pills work. Owl clones every slide
   as plain DOM, so React can't own those buttons: one document listener
   handles any `.cc-follow` click, and every pill (clones included) is
   re-marked `.is-following` whenever the followed list changes. Same flow
   as the profile page's button (CreatorProfileHero): a guest gets the
   "sign in first" dialog, a member follows / unfollows through lib/follows.

   Signing in from that dialog returns to this section (/#creators), not the
   top of the page. The browser's own jump to the anchor happens before the
   page has settled (sliders, images), so it is repeated once everything has
   loaded — unless the visitor has started scrolling by then. */

/* the home slider and the /creators, /creators/all grids */
const SCOPES = [".creators-carousel2", ".cr-creators-grid"];
const pills = (attr = "[data-uuid]") =>
  SCOPES.map((scope) => `${scope} .cc-follow${attr}`).join(", ");
const PILLS = pills();
const ANCHOR = "creators";

function markPills(followed: Set<string>) {
  document.querySelectorAll<HTMLButtonElement>(PILLS).forEach((pill) => {
    const on = followed.has(pill.dataset.uuid || "");
    pill.classList.toggle("is-following", on);
    pill.setAttribute("aria-pressed", String(on));
  });
}

export default function CreatorFollowWiring() {
  const { creators } = useFollows();
  const [notice, setNotice] = useState<NewsletterNotice | null>(null);
  const closeNotice = useCallback(() => setNotice(null), []);

  // back from sign-in: land on the section once the page has settled
  useEffect(() => {
    if (window.location.hash !== `#${ANCHOR}`) return;
    let userScrolled = false;
    const stop = () => (userScrolled = true);
    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchmove", stop, opts);
    window.addEventListener("keydown", stop, { once: true });
    const land = () => {
      if (!userScrolled) document.getElementById(ANCHOR)?.scrollIntoView({ block: "start" });
    };
    const timers: number[] = [];
    const settle = () => [0, 400, 1000].forEach((ms) => timers.push(window.setTimeout(land, ms)));
    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", settle);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  // Owl builds its clones after the first paint — mark again once it has
  useEffect(() => {
    const followed = new Set(creators.map((c) => c.uuid));
    markPills(followed);
    const late = window.setTimeout(() => markPills(followed), 600);
    return () => window.clearTimeout(late);
  }, [creators]);

  useEffect(() => {
    const onClick = async (event: MouseEvent) => {
      const pill = (event.target as Element | null)?.closest<HTMLButtonElement>(PILLS);
      if (!pill) return;
      event.preventDefault();
      if (!isLoggedIn()) {
        setNotice({ kind: "error", message: t("follow_login_required") });
        return;
      }
      if (pill.getAttribute("aria-busy") === "true") return;
      const uuid = pill.dataset.uuid || "";
      const name = pill.dataset.name || "";
      const twins = document.querySelectorAll<HTMLButtonElement>(
        pills(`[data-uuid="${CSS.escape(uuid)}"]`),
      );
      twins.forEach((b) => b.setAttribute("aria-busy", "true"));
      try {
        if (isFollowing(uuid)) {
          await unfollow(uuid);
        } else {
          const count = Number(pill.dataset.followers);
          await follow({
            uuid,
            name,
            avatar: pill.dataset.avatar || null,
            followers: pill.dataset.followers && Number.isFinite(count) ? count : null,
          });
          pushNotification({ kind: "follow", params: { name }, href: "/account#creators" });
        }
      } catch (error) {
        console.warn("[follow] request failed:", error);
      } finally {
        twins.forEach((b) => b.removeAttribute("aria-busy"));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return notice ? (
    <LoginRequiredDialog
      next={`${window.location.pathname}${window.location.search}#${ANCHOR}`}
      onClose={closeNotice}
    />
  ) : null;
}
