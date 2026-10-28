"use client";
import type { ReactNode } from "react";
import { useSupportMethods } from "@/lib/api/use-support-methods";

/* The checkout hero's backdrop: the SAME picture as /support/methods' hero
   (GET /support/methods → `hero.image_url`), so stepping from "طرق الدعم"
   into the wizard keeps the banner. While the request is in flight the hero
   gets `.hero-bg-loading` — a flat ground (hero-loading.css) — so no built-in
   picture flashes first; the bundled collage only stands in once the API
   has answered without one, as on the methods page. The client leaf of
   CheckoutHero: its nav and breadcrumb stay server markup, passed through. */
const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function CheckoutHeroBackdrop({ children }: { children: ReactNode }) {
  const { page, loading } = useSupportMethods();

  return (
    <div
      className={`cr-header py-1${loading ? " hero-bg-loading" : ""}`}
      style={loading ? undefined : { background: `url("${page?.hero?.image_url || HERO_IMAGE}")` }}
    >
      {children}
    </div>
  );
}
