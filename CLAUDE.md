# CLAUDE.md — Sawt (صوت غزة)

Next.js 15 (App Router) + TypeScript + Bootstrap 5 migration of a legacy static Arabic RTL site.
**Golden rule: pixel-parity with the legacy design.** The CSS in `src/styles/legacy/` is the source of truth — never "clean it up" or rename classes without an explicit request.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must always pass with zero errors before delivering
npm start
```

## Architecture

```
src/app/
  layout.tsx            # <html lang="ar" dir="rtl">, Bootstrap CSS, icon CDNs
  (main)/               # loads style.css + search.css + owl CSS
    page.tsx            # home = composition of src/components/home/*
    about/page.tsx
  content/              # loads content.css (NOT style.css — intentional, see CSS groups)
  (auth)/               # loads password.css; pages use <AuthShell>
src/components/
  site/    SiteNav, SiteFooter, JoinModal, AuthShell   # shared chrome
  home/    HeroHeader + 9 section components           # home page sections
  ui/      Button, IconInput, icons.tsx                # reusable primitives
  LegacyInit.tsx        # boots legacy JS per page (mirrors old <script> tags)
src/lib/
  translations.ts       # AR/EN i18n (DOM-based via data-i18n attrs) — ported verbatim
  owl-sliders.ts        # home sliders: ORIGINAL Owl Carousel configs (jQuery). Do not re-port to Swiper — that was tried and reverted per the owner's request.
  legacy-*.ts           # ported legacy scripts (main, search, login, verification, home inline, content inline)
public/assets/          # images (28MB), fonts, videos — legacy names incl. Arabic filenames
```

## Critical conventions

1. **i18n**: every user-visible string has `data-i18n="key"` and a fallback Arabic text child. `initTranslate()` swaps text by mutating the DOM. When adding markup, add keys to BOTH `ar` and `en` dicts in `src/lib/translations.ts`. Do not convert this to React-state i18n unless asked.
2. **LegacyInit**: each page renders `<LegacyInit page="..." />` which dynamically imports Bootstrap JS + the page's legacy modules. New interactive markup that legacy scripts target must keep the exact ids/classes they query (`#togglePassword`, `.otp-input`, `#joinModal`, `.language-btn`, carousels' class names, etc.).
3. **CSS groups**: `style.css`, `content.css`, `password.css` all define `body/html/*` and clash. That's why:
   - route groups load different CSS,
   - internal links between groups are plain `<a>` (full reload), and only `/` ↔ `/about` use `<Link>` (in `SiteNav`).
   Deduplicating the CSS (extracting the shared chunk) is the prerequisite for full `<Link>` navigation.
4. **Converted pages** carry `// @ts-nocheck` + `/* eslint-disable */` on purpose (legacy inline styles like `"start !important"` break CSSProperties types). New hand-written components should be fully typed.
5. **Owl sliders** (home) need jQuery on `window` — `owl-sliders.ts` handles that. Content page uses Swiper (that's what the legacy site used there).

## Reusable primitives (extend these, don't duplicate markup)

- `ui/Button` — variants: `primary` (btn-submit-green), `readMore`, `viewProfile`; renders `<a>` when `href` given.
- `ui/IconInput` — auth input with leading icon + optional `toggleId` password eye (wired by `legacy-login.ts`).
- `ui/icons.tsx` — IconMail, IconPassword, IconUser, IconCalendar, IconEye, IconVideo, IconUsers, IconBook (extracted from legacy SVGs).
- Data-driven sections done so far: `LatestNews` (NewsCard), `TeamSection` (TeamCard), `PlatformSections` (PlatformCard).

## Roadmap / TODO (in priority order)

1. **Images**: `public/assets/images` is 28MB (tea.png 3.8MB, Yamal.png 3.6MB…). Compress in place (same names/formats), then migrate `<img>` → `next/image` — EXCEPT images whose `src` is mutated by legacy JS (`.user-avatar`, `.avatar-indicator*` in the Reviews/opinions flow).
2. **Fonts**: convert `public/assets/fonts/*.ttf` (2.6MB) to woff2 and update the `@font-face` in `style.css`/`password.css`; add `font-display: swap`.
3. **Continue componentization**: `ContentCreators` (flip cards), `RealStories`, `Reviews` sections are still monolithic converted JSX — apply the same Card + data-array pattern.
4. **CSS dedup**: extract shared rules from content.css/password.css vs style.css, then switch remaining nav links to `<Link>`.
5. **Interactivity to React state**: comments/likes (Reviews), join-modal stepper — currently legacy DOM scripts; port to useState components (keep identical behavior).
6. **SEO**: per-page `metadata` (all pages currently titled "Sawt"); add descriptions, OG tags.
7. **Forms**: wire auth forms + newsletter to a real backend/API (currently no-op, as in the legacy site).

## Known legacy quirks (intentionally preserved)

- `member1..5.jpg` in TeamSection are broken paths in the ORIGINAL site too — kept as-is; replace when real photos exist.
- `#backToTop` button is referenced by legacy JS but doesn't exist in the markup (null-guarded).
- Some nav links (`الفريق`, `صناع المحتوى`…) are `href="#"` — no pages exist for them yet.

## Verification checklist before any delivery

`npm run build` passes → start server → all 8 routes return 200 → home has 4 `.owl-carousel` blocks → language toggle works both ways → auth pages show promo side + working password eye/OTP.
