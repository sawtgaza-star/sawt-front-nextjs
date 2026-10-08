"use client";
/* The bell in the signed-in top bar (and its copy in the phone drawer) and the
   panel it opens: "الإشعارات" + close, "تحديد الكل كمقروء", then the list —
   unread rows tinted with a dot and a bold title — or the empty state.

   Rendered strings go through `tr()` (useLang) rather than data-i18n: the panel
   mounts after initTranslate() has walked the page, see lib/use-lang. The bell
   button itself keeps its data-i18n-title like the account icon beside it.

   The list is browser-local for now — see lib/notifications. */

import { useEffect, useRef, useState } from "react";
import { IconNavBell } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";
import {
  markAllRead,
  markRead,
  timeAgo,
  useNotifications,
  type SawtNotification,
} from "@/lib/notifications";
import { IconEmptyBell, NotificationIcon } from "./notification-icons";
import "@/styles/nav-notifications.css";

type Props = {
  /** Same contract as NavLogoutButton: the drawer group is already
      `.nav-authed-only`, so it passes just `nav-icon-btn`. */
  className?: string;
};

function fill(text: string, params?: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => params?.[key] ?? "");
}

export default function NavNotifications({
  className = "nav-icon-btn nav-authed-only",
}: Props) {
  const { lang, tr } = useLang();
  const items = useNotifications();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  // Outside click / Escape close the panel.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openItem(item: SawtNotification) {
    markRead(item.id);
    if (item.href) window.location.href = item.href;
  }

  return (
    <div className={"nav-notif " + className.replace("nav-icon-btn", "").trim()} ref={rootRef}>
      <button
        type="button"
        className="nav-icon-btn"
        aria-label="الإشعارات"
        title="الإشعارات"
        data-i18n-title="nav_notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <IconNavBell />
        {unread > 0 ? (
          <span className="nav-bell-badge">{unread > 9 ? "9+" : unread}</span>
        ) : null}
      </button>

      {open ? (
        <div className="nav-notif-panel" role="dialog" aria-label={tr("nav_notifications")}>
          <div className="nav-notif-head">
            <div className="nav-notif-head-row">
              <h3 className="nav-notif-title">{tr("nav_notifications")}</h3>
              <button
                type="button"
                className="nav-notif-close"
                aria-label={tr("notif_close")}
                onClick={() => setOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {unread > 0 ? (
              <button type="button" className="nav-notif-markall" onClick={markAllRead}>
                {tr("notif_mark_all")}
              </button>
            ) : null}
          </div>

          {items.length === 0 ? (
            <div className="nav-notif-empty">
              <span className="nav-notif-empty-icon">
                <IconEmptyBell />
              </span>
              <p className="nav-notif-empty-title">{tr("notif_empty_title")}</p>
              <p className="nav-notif-empty-desc">{tr("notif_empty_desc")}</p>
            </div>
          ) : (
            <ul className="nav-notif-list">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={"nav-notif-item" + (item.read ? "" : " is-unread")}
                    onClick={() => openItem(item)}
                  >
                    <span className="nav-notif-icon">
                      <NotificationIcon kind={item.kind} />
                    </span>
                    <span className="nav-notif-body">
                      <span className="nav-notif-item-title">
                        {fill(tr(`notif_${item.kind}_title`), item.params)}
                        {item.read ? null : <span className="nav-notif-dot" aria-hidden="true" />}
                      </span>
                      <span className="nav-notif-item-desc">
                        {fill(tr(`notif_${item.kind}_desc`), item.params)}
                      </span>
                      <span className="nav-notif-time">{timeAgo(item.at, lang)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
