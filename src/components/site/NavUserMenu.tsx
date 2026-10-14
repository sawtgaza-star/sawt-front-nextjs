"use client";
/* Signed-in top bar: the [avatar · أهلاً، أحمد ˅] pill and the menu it opens —
   the user's name and email, then الملف الشخصي / محفوظاتي / الإعدادات and,
   under a rule, تسجيل الخروج.

   Rendered for guests too (hidden by `.nav-authed-only`, like the rest of the
   signed-in half of the bar — see lib/auth-state.ts). Strings go through tr():
   the name arrives after initTranslate() has walked the page, so a data-i18n
   node here would never be visited. */

import { useEffect, useRef, useState } from "react";
import {
  IconNavAccount,
  IconNavBookmark,
  IconNavChevronDown,
  IconNavLogout,
  IconNavSettings,
} from "@/components/ui/icons";
import { useAccountUser } from "@/components/account/account-user";
import { useLang } from "@/lib/use-lang";
import NavAccountAvatar from "./NavAccountAvatar";
import NavLogoutButton from "./NavLogoutButton";

/* /account picks its tab off the hash (AccountContent). There is no "saved"
   tab yet — محفوظاتي opens the followed-creators tab, the closest one. */
const ITEMS = [
  { key: "nav_menu_profile", href: "/account#profile", Icon: IconNavAccount },
  { key: "nav_menu_saved", href: "/account#creators", Icon: IconNavBookmark },
  { key: "nav_menu_settings", href: "/account#settings", Icon: IconNavSettings },
];

export function firstName(name: string | undefined): string {
  return (name || "").trim().split(/\s+/)[0] || "";
}

export default function NavUserMenu() {
  const { user } = useAccountUser();
  const { tr } = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  // `user` is undefined on the server and on the hydrating render, so the
  // greeting (whose language only the browser knows) is never part of the
  // server markup.
  const hello = user ? tr("nav_hello").replace("{name}", firstName(user.name)) : "";

  return (
    <div className="nav-user nav-authed-only" ref={rootRef}>
      <button
        type="button"
        className={"nav-user-pill" + (open ? " is-open" : "")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <NavAccountAvatar />
        <span className="nav-user-hello">{hello}</span>
        <IconNavChevronDown />
      </button>

      {open ? (
        <div className="nav-user-menu" role="menu">
          <div className="nav-user-head">
            <span className="nav-user-head-avatar">
              <NavAccountAvatar />
            </span>
            <span className="nav-user-head-text">
              <span className="nav-user-name">{user?.name}</span>
              <span className="nav-user-email">{user?.email}</span>
            </span>
          </div>
          {ITEMS.map(({ key, href, Icon }) => (
            <a className="nav-user-item" role="menuitem" href={href} key={key} onClick={() => setOpen(false)}>
              <Icon />
              <span>{tr(key)}</span>
            </a>
          ))}
          <div className="nav-user-sep" />
          <NavLogoutButton className="nav-user-item nav-user-logout">
            <IconNavLogout />
            <span>{tr("nav_logout")}</span>
          </NavLogoutButton>
        </div>
      ) : null}
    </div>
  );
}
