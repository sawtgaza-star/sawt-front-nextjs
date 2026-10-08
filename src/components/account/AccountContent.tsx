"use client";
/* /account — "حسابي". Reached from the account icon in the signed-in top bar.

   Three tabs, addressed by the URL hash so a link (or a notification) can open
   one directly: #profile (default), #creators, #settings — with #password and
   #privacy as the settings sub-views. A guest is sent to sign in and brought
   back here.

   The <header> shell is not conditional: SiteNav lives in it and
   initHeaderPin() wraps its bars right after mount (see CreatorsHero). */

import { useEffect, useState } from "react";
import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { isLoggedIn, loginHref } from "@/lib/auth-state";
import { useFollows } from "@/lib/follows";
import { useLang } from "@/lib/use-lang";
import { useAccountUser } from "./account-user";
import ProfileTab from "./ProfileTab";
import CreatorsTab from "./CreatorsTab";
import SettingsTab, { type SettingsView } from "./SettingsTab";

type Tab = "profile" | "creators" | "settings";
type Route = { tab: Tab; view: SettingsView };

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "acc_tab_profile" },
  { id: "creators", label: "acc_tab_creators" },
  { id: "settings", label: "acc_tab_settings" },
];

function routeFromHash(hash: string): Route {
  switch (hash.replace(/^#/, "")) {
    case "creators":
      return { tab: "creators", view: "account" };
    case "settings":
      return { tab: "settings", view: "account" };
    case "password":
      return { tab: "settings", view: "password" };
    case "privacy":
      return { tab: "settings", view: "privacy" };
    default:
      return { tab: "profile", view: "account" };
  }
}

function hashOf(route: Route): string {
  if (route.tab !== "settings") return route.tab;
  return route.view === "account" ? "settings" : route.view;
}

export default function AccountContent() {
  const { tr } = useLang();
  const { user, save } = useAccountUser();
  const follows = useFollows();
  const [route, setRoute] = useState<Route>({ tab: "profile", view: "account" });

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace(loginHref("/account"));
      return;
    }
    const sync = () => setRoute(routeFromHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function go(next: Route) {
    setRoute(next);
    history.replaceState(null, "", `#${hashOf(next)}`);
  }

  return (
    <>
      <header className="acc-header">
        <SiteNav />
        <nav className="acc-breadcrumb container" aria-label="breadcrumb">
          <BreadcrumbHome />
          <i className="fa-solid fa-angle-left mx-2 arrow" aria-hidden="true"></i>
          <span className="acc-breadcrumb-current">{tr("acc_breadcrumb")}</span>
        </nav>
      </header>

      <main className="acc-main container">
        <div className="acc-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={route.tab === tab.id}
              className={"acc-tab" + (route.tab === tab.id ? " is-active" : "")}
              onClick={() => go({ tab: tab.id, view: "account" })}
            >
              {tr(tab.label)}
            </button>
          ))}
        </div>

        {user ? (
          <>
            {route.tab === "profile" ? (
              <ProfileTab
                user={user}
                followingCount={follows.length}
                onEdit={() => go({ tab: "settings", view: "account" })}
                onShowCreators={() => go({ tab: "creators", view: "account" })}
              />
            ) : null}
            {route.tab === "creators" ? <CreatorsTab creators={follows} /> : null}
            {route.tab === "settings" ? (
              <SettingsTab
                view={route.view}
                onView={(view) => go({ tab: "settings", view })}
                user={user}
                onSave={save}
              />
            ) : null}
          </>
        ) : (
          <div className="acc-loading" aria-busy="true" />
        )}
      </main>
    </>
  );
}
