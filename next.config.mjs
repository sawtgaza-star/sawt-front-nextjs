import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Static export for `next build` only. Under `next dev`, output: 'export'
  // makes any dynamic segment not listed by generateStaticParams() crash with
  // "missing param … required with output: export" instead of rendering the
  // 404 — the dev server throws before `dynamicParams = false` is consulted.
  // The deployed site is unaffected: the host serves out/404.html for those.
  output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
  // A build run while `npm run dev` is up must not write into the dev server's
  // .next (it then serves missing chunks and keeps recompiling): set
  // NEXT_DIST_DIR=.next-verify for such a check build. Default unchanged.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // src/app/global-not-found.tsx → out/404.html, isolated from other routes' CSS
    globalNotFound: true,
  },
});

export default nextConfig;
