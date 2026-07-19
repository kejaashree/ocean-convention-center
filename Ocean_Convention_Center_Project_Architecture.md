# Ocean Convention Center — Project Architecture
### Framework, Folder Structure & Conventions
Companion to: `Ocean_Convention_Center_Page_Specification.md` and `Ocean_Convention_Center_Frontend_Architecture_Blueprint.md`

---

## 0. Method

Every decision below is justified against **observed evidence from the live Aldovia site**, not generic best practice. Where no direct evidence exists, it's marked "Estimated / best-practice default" rather than presented as a confirmed match to the client's actual stack.

---

## 1. Framework Recommendation

**Recommendation: React, via Next.js (or a Next.js-compatible static/SSG setup).**

Evidence from the live-site audit supporting this:

| Observed behavior | What it implies |
|---|---|
| Room cards show a transient "Loading rooms" state before content populates | Client-side data fetching after initial render — consistent with a React SPA/hydration pattern, not a plain server-rendered PHP/static site |
| Two structurally distinct nav markups ship in the HTML (desktop nav + separate mobile accordion nav, not just CSS-hidden duplicates) | Component-driven conditional rendering — a signature of component-framework output (React/Vue), not hand-authored templates |
| Consistent, repeatable card patterns across pages (testimonial, award, bio, room) with identical structure but different data | Strongly suggests a component library already exists internally — i.e., this is already a componentized codebase, and a new page should slot into that pattern, not introduce a different one |
| Contact form fields are not present in static-fetched markup | Form is client-rendered — same conclusion as the room-loading behavior |

**Why Next.js specifically over plain React/CRA/Vite:** the assignment explicitly requires a **live URL** and values SEO ("business sense," meta/discoverability implied by the brief's "drive inquiries" goal). Next.js gives static generation (fast, SEO-friendly, good Core Web Vitals per the performance checklist) while still supporting the client-side interactivity patterns already observed on the live site (async gallery, form). If the actual Aldovia site turns out to run on something else (evidence doesn't confirm the specific framework, only that it's component-driven and does client-side rendering), this recommendation should be revisited — flag this as an open question for the client's dev team, same as the other unconfirmed items in the content spec.

**If Next.js isn't viable for hosting/deployment reasons:** Vite + React Router is the fallback, sacrificing built-in SSG/SEO ergonomics but keeping the same component architecture below intact.

---

## 2. Folder Structure

```
ocean-convention-center/
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── pages/                          (or app/ for Next.js App Router)
│   │   └── ocean-convention-center/
│   │       ├── index.tsx                — page composition only, imports sections
│   │       └── metadata.ts              — SEO meta object (title, description, OG data)
│   │
│   ├── sections/                       — one file per page section, per the IA in the content spec
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── Hero.module.css
│   │   │   └── Hero.test.tsx
│   │   ├── AboutVenue/
│   │   ├── CapacityLayout/
│   │   ├── Amenities/
│   │   ├── Gallery/
│   │   ├── EventTypes/
│   │   └── InquiryForm/
│   │
│   ├── components/                     — shared, reusable across sections AND across the wider site
│   │   ├── ui/                         — generic, content-agnostic primitives
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── StatBlock/
│   │   │   ├── EyebrowLabel/
│   │   │   ├── SectionHeading/
│   │   │   └── FormField/
│   │   ├── gallery/                    — gallery-specific composite components
│   │   │   ├── GalleryGrid/
│   │   │   ├── GalleryCarousel/
│   │   │   └── Lightbox/
│   │   └── layout/
│   │       ├── GlobalHeader/            — placeholder/import point if reusing site's existing header
│   │       ├── GlobalFooter/            — same
│   │       └── AnnouncementMarquee/     — same
│   │
│   ├── data/                            — structured content, separated from components per the CMS-readiness note in the spec
│   │   ├── dimensions.ts               — the 4-row dimensions table data
│   │   ├── seatingConfigs.ts           — theater/cocktails/classroom/cluster data
│   │   ├── amenities.ts
│   │   ├── eventTypes.ts
│   │   └── galleryImages.ts            — ordered per the image-analysis sequence, includes alt text
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.ts          — fade-up on scroll-into-view, shared by every section
│   │   ├── useCountUp.ts               — stat-block number animation
│   │   ├── useLightbox.ts              — open/close/next/prev state + focus trap + Escape key
│   │   ├── useReducedMotion.ts         — reads prefers-reduced-motion, gates all animation hooks above
│   │   └── useMediaQuery.ts            — breakpoint detection where CSS alone isn't sufficient (e.g. swapping Gallery ↔ GalleryCarousel components, not just CSS reflow)
│   │
│   ├── utils/
│   │   ├── formatPhoneNumber.ts
│   │   ├── validateForm.ts             — shared validation logic for InquiryForm
│   │   └── imageSrcSet.ts              — generates responsive srcset strings for the image optimization checklist
│   │
│   ├── styles/
│   │   ├── tokens.css                  — all design tokens as CSS custom properties (see Section 4)
│   │   ├── globals.css                 — resets, base typography, applied site-wide
│   │   └── breakpoints.css             — shared breakpoint values, single source of truth
│   │
│   └── types/
│       └── venue.types.ts              — TypeScript interfaces: SeatingConfig, DimensionRow, GalleryImage, InquiryFormData, etc.
│
├── .eslintrc / .prettierrc
├── next.config.js  (or vite.config.ts)
├── tsconfig.json
└── package.json
```

**Why `sections/` is separated from `components/ui/`:** the live site clearly reuses generic primitives (stat-block, card, icon+label pattern) across completely different pages — About Us, Rooms, homepage all share the same building blocks. Mirroring that separation (generic, reusable `ui/` vs. page-specific `sections/`) means this page's Hero/Capacity/Gallery sections can borrow the same `<StatBlock>`, `<Button>`, `<Card>` the rest of the site already uses, rather than each page reinventing its own version — which is exactly the "does this feel native to the site" evaluation criterion from the assignment.

**Why `data/` is separated from components:** flagged explicitly in the content spec — dimensions, seating configs, and amenities are prime candidates for future CMS management since venue specs can change (renovation, expansion). Keeping this data in typed, isolated files now means swapping a hardcoded import for a CMS fetch later is a one-file change, not a component rewrite.

---

## 3. Component Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Component files/folders | PascalCase, matches component name exactly | `Hero/Hero.tsx` |
| CSS Module files | Same name as component + `.module.css` | `Hero.module.css` |
| CSS class names inside modules | camelCase (CSS Modules auto-scopes, so BEM-style prefixing is unnecessary) | `.heroContent`, `.ctaGroup` |
| Custom hooks | `use` + PascalCase | `useCountUp.ts` |
| Data files | camelCase, plural if array-based | `seatingConfigs.ts` |
| CSS custom properties (tokens) | kebab-case, namespaced by category | `--color-venue-navy`, `--space-lg`, `--radius-md` |
| Reused vs. net-new components | No special naming distinction — a `<Button>` imported from the existing site codebase should never be renamed on arrival (e.g. don't rename to `<OceanButton>`) — preserves the "this is a native part of the site" requirement at the code level, not just visually |

**Why CSS Modules over BEM or a raw global stylesheet:** the live site shows no evidence of a global utility-class framework (no Tailwind-style atomic classes visible in any fetched markup — content-driven class names weren't exposed at all via the read-only text fetch, but the *component-repetition pattern* — same card structure with different data across five+ pages — points to scoped, component-level styling rather than a giant shared stylesheet). CSS Modules keep each component's styles co-located and scoped, preventing this new page's styles from ever leaking into or colliding with the rest of the site — a real risk given this page is being integrated into an existing, actively-maintained codebase per the integration recommendation in the content spec.

---

## 4. CSS Architecture

**Approach: CSS Modules + a single shared `tokens.css` of custom properties.**

```
styles/
├── tokens.css        — single source of truth for all design tokens (Section 4 of the
│                        prior blueprint, restated here as actual CSS custom properties)
├── globals.css        — resets, base font stack, base link/heading styles
└── breakpoints.css    — shared min-width values, imported wherever media queries are needed
```

**Why not Tailwind:** nothing in the observed markup, class-repetition patterns, or component structure suggests an atomic-CSS framework is currently in use on the live site — the audit found structural repetition (same card shape, same section rhythm) but no evidence of utility-class-driven markup. Introducing Tailwind for just this one page would mean shipping a second, unrelated styling paradigm inside an otherwise-consistent codebase — directly working against the "should not feel like the user left the brand" requirement, which extends to code architecture consistency for whoever maintains this after handoff.

**Why not styled-components/CSS-in-JS:** adds a runtime dependency and bundle-size cost with no evidence the existing site uses this pattern. CSS Modules achieve the same scoping benefit at build-time, zero runtime cost — better aligned with the performance checklist's Core Web Vitals goals.

**Token file is the integration seam:** if/when the client shares the real brand-guideline hex values and font names, `tokens.css` is the **only file that needs to change** — every component references tokens (`var(--color-venue-navy)`), never hardcoded values. This directly resolves the biggest open risk flagged across all prior documents: the color/type values are currently estimates.

---

## 5. Asset Organization

```
public/
└── assets/
    ├── images/
    │   ├── hero/
    │   │   └── ocean-hall-theater-3000.jpg        (Image 1, multiple responsive sizes)
    │   ├── venue/
    │   │   ├── ocean-exterior-daylight.jpg         (Image 2)
    │   │   ├── ocean-hall-wide-empty.jpg           (Image 5)
    │   │   ├── ocean-banquet-floral.jpg            (Image 3)
    │   │   └── ocean-banquet-ceiling-detail.jpg    (Image 4)
    │   └── textures/
    │       └── navy-gold-carpet-pattern.jpg        (used as EventTypeCard background per the spec)
    │
    └── icons/
        ├── seating/
        │   ├── theater.svg
        │   ├── cocktails.svg
        │   ├── classroom.svg
        │   └── cluster.svg
        └── amenities/
            ├── av-system.svg
            ├── catering.svg
            └── accommodation.svg
```

**Why descriptive, hyphenated filenames instead of `image1.jpg` / `image2.jpg`:** directly required by the SEO checklist ("descriptive, keyword-relevant filenames") from the prior blueprint. It also makes the `data/galleryImages.ts` file self-documenting — a developer reading the data file can tell what each image is without opening it.

**Why `icons/seating/` and `icons/amenities/` are split by usage context, not dumped in one flat `icons/` folder:** matches the live site's own icon-naming pattern observed during the design-system audit — `bed.svg`, `forkknife.svg`, `activity.svg` etc. are semantically named per nav item, one file per concept. Grouping by usage context here just extends that same discipline to a larger icon set specific to this page.

**Image format:** all photographic assets (hero, venue, textures) should be processed into WebP with JPEG fallback at build time, per the performance checklist — store the source high-res originals separately (e.g. in a `raw/` folder excluded from the deployed `public/` output) and generate optimized variants via the build pipeline rather than hand-exporting multiple sizes.

---

## 6. Reusable Utilities

| Utility | Purpose | Why it's shared, not inline |
|---|---|---|
| `useScrollReveal` | Fade-up-on-scroll animation hook | Used identically by every section (Hero excluded) per the animation plan — one hook, one implementation, avoids seven near-duplicate `IntersectionObserver` setups |
| `useCountUp` | Powers the stat-block number animation in both Hero and Capacity sections | Same animation logic needed in two different places — a single hook prevents drift between the two instances |
| `useLightbox` | Gallery open/close/navigate state, focus trap, Escape-key handling | Accessibility-critical logic (keyboard nav, focus trap) is easy to get subtly wrong twice — centralizing it in one hook means the accessibility checklist only needs to be verified once |
| `useReducedMotion` | Reads the OS-level `prefers-reduced-motion` setting | Every animation hook above depends on this — centralizing avoids seven separate `matchMedia` checks scattered through the codebase |
| `useMediaQuery` | JS-level breakpoint detection | Needed specifically for the Gallery ↔ GalleryCarousel **component swap** (not just CSS reflow, per the architecture blueprint) — CSS alone can't conditionally mount a different React component |
| `formatPhoneNumber` | Consistent phone number display/tel-link formatting | Used in both the global header (inherited) and the InquirySection's ContactSidebar — keeping formatting logic in one place prevents the two from silently drifting apart in format |
| `validateForm` | Shared validation rules for the InquiryForm fields | Keeps required-field logic, email/phone format checks, and error messaging consistent and testable in isolation from the form's rendering code |
| `imageSrcSet` | Generates `srcset`/`sizes` attribute strings from a base image path | Directly implements the performance checklist's responsive-image requirement; centralizing avoids manually typing srcset strings per image, which is error-prone and hard to update later |

---

## 7. Why This Overall Structure Follows the Existing Aldovia Site

Summary of the throughline, since every choice above is justified individually — restating the pattern as a whole:

1. **Component reuse over page-specific one-offs** — the live site visibly reuses card, stat-block, and icon-plus-label patterns across at least four different pages (homepage, About Us, Rooms, nav). This structure mirrors that by putting shared primitives in `components/ui/` and only page-specific composition in `sections/`.
2. **Client-rendered, data-driven sections** — the "Loading rooms" async state and JS-rendered contact form both point to a component framework with client-side data fetching, which is why this architecture recommends React/Next.js and separates `data/` from presentation components (CMS-ready).
3. **Structurally distinct mobile components, not just CSS hiding** — the live site's dual desktop/mobile nav markup is mirrored directly in this architecture's Gallery ↔ GalleryCarousel split, using `useMediaQuery` to swap components rather than relying on CSS alone.
4. **Semantic, descriptive asset naming** — the live site's icon files (`bed.svg`, `forkknife.svg`) are named for what they represent, not generic placeholders; this asset structure extends that same convention to the new page's images and icons.
5. **A single token file as the color/type source of truth** — because the brand's real values are still unconfirmed (per every prior document's open-questions log), the architecture is deliberately built so that resolving that one open question later touches exactly one file, not a page-wide find-and-replace.

---

*This document completes the pre-build reference set alongside the content specification and the frontend architecture blueprint. The next phase is either (a) resolving the open questions log before final asset/copy lock, or (b) beginning component implementation directly against this structure.*
