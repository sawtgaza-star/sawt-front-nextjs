"use client";
/* /account — "حسابي". Reached from the account icon in the signed-in top bar.

   Three tabs, addressed by the URL hash so a link (or a notification) can open
   one directly: #profile (default), #creators, #settings — plus
   #collaborations ("ابرز التعاونات") for a content creator — with #password as
   the settings sub-view (an old #privacy link lands on #settings). A guest is sent to sign in and brought
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
import { ProfileTabSkeleton } from "./AccountSkeleton";
import CreatorsTab from "./CreatorsTab";
import CollaborationsTab from "./CollaborationsTab";
import SettingsTab, { type SettingsView } from "./SettingsTab";

type Tab = "profile" | "collaborations" | "creators" | "settings";
type Route = { tab: Tab; view: SettingsView };

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "acc_tab_profile" },
  // only for a content creator (see `tabs` below)
  { id: "collaborations", label: "acc_tab_collabs" },
  { id: "creators", label: "acc_tab_creators" },
  { id: "settings", label: "acc_tab_settings" },
];

function routeFromHash(hash: string): Route {
  switch (hash.replace(/^#/, "")) {
    case "creators":
      return { tab: "creators", view: "account" };
    case "collaborations":
      return { tab: "collaborations", view: "account" };
    case "settings":
    case "privacy":
      return { tab: "settings", view: "account" };
    case "password":
      return { tab: "settings", view: "password" };
    default:
      return { tab: "profile", view: "account" };
  }
}

function hashOf(route: Route): string {
  if (route.tab !== "settings") return route.tab;
  return route.view === "account" ? "settings" : route.view;
}

export default function AccountContent() {
  const { lang, tr } = useLang();
  const { user, save, saveCollaborations } = useAccountUser();
  const follows = useFollows();
  const followingCount = follows.loaded
    ? follows.creators.length
    : (user?.followingCount ?? 0);
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

  const isCreator = user?.isCreator === true;
  const tabs = TABS.filter((tab) => tab.id !== "collaborations" || isCreator);
  // a #collaborations link opened by someone who isn't a creator: the default tab
  const activeTab: Tab = route.tab === "collaborations" && user && !isCreator ? "profile" : route.tab;

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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={"acc-tab" + (activeTab === tab.id ? " is-active" : "")}
              onClick={() => go({ tab: tab.id, view: "account" })}
            >
              {tr(tab.label)}
            </button>
          ))}
        </div>

        {user ? (
          <>
            {activeTab === "profile" ? (
              <ProfileTab
                user={user}
                followingCount={followingCount}
                onEdit={() => go({ tab: "settings", view: "account" })}
                onShowCreators={() => go({ tab: "creators", view: "account" })}
              />
            ) : null}
            {activeTab === "collaborations" ? (
              <CollaborationsTab
                collaborations={user.collaborations}
                lang={lang}
                tr={tr}
                onSave={saveCollaborations}
              />
            ) : null}
            {activeTab === "creators" ? <CreatorsTab creators={follows.creators} loaded={follows.loaded} expected={followingCount} /> : null}
            {activeTab === "settings" ? (
              <SettingsTab
                view={route.view}
                onView={(view) => go({ tab: "settings", view })}
                user={user}
                onSave={save}
              />
            ) : null}
          </>
        ) : (
          // the stored user isn't read yet (exported HTML, before hydration):
          // the profile tab — the default — with placeholders for its details
          <ProfileTabSkeleton />
        )}
      </main>
    </>
  );
}
