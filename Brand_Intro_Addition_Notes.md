# Brand Intro — Addition Notes

### What was added, why, and what a reviewer/integrator needs to know

## What changed

Two new files, two edited files:

- **New:** `src/components/intro/BrandIntro/BrandIntro.tsx` + `.module.css`
- **Edited:** `pages/ocean-convention-center/index.tsx` — mounts `<BrandIntro />`
  as the first element, before `<GlobalHeader />`.
- **Edited:** `src/sections/Hero/Hero.tsx` + `.module.css` — added a staggered
  fade-up entrance for the headline/subtext/CTAs/stat row, timed to hand off
  from BrandIntro's exit rather than firing at the same instant (which would
  look like the content was just sitting there, static, under the panel).

No existing component's public behavior changed. `Hero` still renders the
exact same markup; it just fades in over ~700ms starting from the moment
BrandIntro clears (or immediately, if the intro is skipped/already seen/
reduced-motion is on).

## What it does

A brief, once-per-tab opening sequence on a Wet Earth panel: the swan lockup
(cream colourway, matching the brand's own dark-background rule) fades and
scales in, a single Beeswax rule draws itself beneath it, the tagline "Where
Grace Finds You" fades up, holds briefly, then the whole panel dissolves into
the Hero. Total runtime ~2.8s if allowed to play out in full.

## Why it's safe to merge

- **Reduced motion:** checked via the project's existing `useReducedMotion`
  hook — when active, the intro never renders at all (skips straight to its
  "done" state before first paint, via `useLayoutEffect`).
- **Never blocks the user:** a click, tap, or keypress anywhere skips
  immediately. A visible "Skip intro" button gets keyboard focus on mount.
- **Once per browser tab:** gated on `sessionStorage`, not `localStorage` —
  a fresh tab sees it again; repeated refreshes during a review/QA session
  don't replay it every time. To force it on every load for a demo, delete
  the `sessionStorage.setItem` call in `BrandIntro.tsx`.
- **No new dependencies.** Pure React state + CSS transitions, same pattern
  as every other animation in this project (`useScrollReveal`, `useCountUp`).
- **No layout impact once done.** Returns `null` after its sequence —
  doesn't reserve space, doesn't shift anything below it.

## Known trade-offs / follow-ups (flagged, not solved here)

- The overlay is `aria-hidden`, which means a screen reader's virtual cursor
  could technically still reach header/nav content sitting behind it during
  the ~2.8s window, even though it's not sighted-visible. A full focus trap
  (cycling Tab back to the skip button) would close this gap entirely — not
  implemented here since the window is short and the skip button already
  receives focus immediately; flagged as a candidate for a follow-up a11y
  pass, same as the tokens.css reconciliation flags its own open items.
- `INTRO_HANDOFF_DELAY_MS` in `Hero.tsx` (2500ms) is a hand-tuned constant
  matched to BrandIntro's own exit timing (`STEP_DELAYS`, in
  `BrandIntro.tsx`). If BrandIntro's timing is ever changed, this constant
  should be updated to match — they're intentionally kept as two separate,
  named constants rather than one shared value, since the two files
  shouldn't otherwise depend on each other's internals.
