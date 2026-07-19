import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import styles from "./BrandIntro.module.css";

/**
 * BrandIntro
 *
 * A short, brand-led entrance sequence shown once per browser tab before
 * the page settles into its normal state. The swan lockup fades/scales
 * in on a Wet Earth panel, a single Beeswax rule draws itself beneath it,
 * the tagline ("Where Grace Finds You" — Brand Guidelines Section 1)
 * fades up, then the whole panel dissolves to reveal the Hero underneath.
 *
 * This exists purely to make the first ~2.5 seconds on the page feel
 * considered, the same way the swan mark and tagline are used as the
 * opening beat of the print brand guidelines themselves — it is not
 * required for the page to function and adds no content of its own,
 * which is why it's `aria-hidden` throughout.
 *
 * STEP MACHINE
 * `step` is a plain integer rather than named union states — each step
 * only ever turns ONE thing on (logo, then rule, then tagline, then
 * exit), so a linear 0-5 counter is easier to follow than a branching
 * phase name and avoids any chance of two effects fighting over the same
 * state value.
 *   0 — mounted, panel visible, nothing animated in yet
 *   1 — logo fades/scales in
 *   2 — gold rule draws
 *   3 — tagline fades up
 *   4 — hold (fully settled, brief pause so it can be read)
 *   5 — exiting (panel fades + releases)
 *   6 — done (component unmounts, returns null)
 *
 * ACCESSIBILITY
 * - Respects prefers-reduced-motion via useReducedMotion, the same hook
 *   every other animation in this project uses: when active, the intro
 *   is skipped entirely (step jumps straight to 6) rather than merely
 *   speeding up, per the project's existing "final state, not fast
 *   animation" convention (see useScrollReveal, useCountUp).
 * - Never traps a user: a click, tap, or keypress anywhere jumps
 *   straight to the exit step. The visually-present "Skip intro" button
 *   gives the same escape hatch explicitly and receives focus on mount,
 *   so keyboard users land on an actionable control immediately rather
 *   than tabbing into content still hidden behind the panel.
 * - Body scroll is locked for the intro's short duration, the same
 *   pattern GlobalHeader's MobileNav already uses for its overlay.
 * - Shown once per browser tab (sessionStorage, not localStorage) — a
 *   fresh tab/window sees it again, but repeated refreshes during a
 *   review session don't replay it every time. To force it on every
 *   load (e.g. for a demo), delete the sessionStorage.setItem call
 *   inside the effect below.
 */

/**
 * Exported so other components can check "is the intro about to play"
 * without duplicating this string — Hero reads it to decide whether to
 * hold its own entrance animation until BrandIntro's exit, or start
 * immediately when the intro has already been seen this session.
 */
export const INTRO_SESSION_KEY = "aldovia-intro-seen";
const FINAL_STEP = 6;

// Delay (ms, from mount) at which each step begins. Durations of the
// visual transition themselves live in BrandIntro.module.css, not here —
// same split of "trigger timing in the hook/component, visual values in
// the CSS module" that useScrollReveal already establishes.
const STEP_DELAYS = [0, 150, 900, 1400, 2400, 2400, 3000];

// SSR-safe layout effect: useLayoutEffect on the client (fires before
// paint, so a "seen this session" skip never flashes the panel even for
// a single frame), falls back to useEffect during server rendering where
// useLayoutEffect would otherwise warn.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function BrandIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasSkipped = useRef(false);

  // Skip straight to "done" before first paint if reduced motion is on
  // or this tab has already seen the intro this session.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) {
      setStep(FINAL_STEP);
      return;
    }
    if (typeof window !== "undefined" && window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1") {
      setStep(FINAL_STEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Drive the step sequence forward on a fixed schedule. Each callback
  // uses the functional setState form and only ever moves `step` forward
  // (Math.max) — this guarantees that even if the reduced-motion/
  // already-seen layout effect above has already jumped straight to
  // FINAL_STEP by the time one of these fires, a stale timer can never
  // regress the panel back into a visible step.
  useEffect(() => {
    const timers = STEP_DELAYS.map((delay, index) =>
      window.setTimeout(() => setStep((current) => Math.max(current, index)), delay)
    );
    return () => timers.forEach(window.clearTimeout);
    // Runs once on mount; the skip handler below is the only other way
    // `step` changes ahead of this schedule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark this tab session as having seen the intro once it finishes.
  useEffect(() => {
    if (step === FINAL_STEP && typeof window !== "undefined") {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    }
  }, [step]);

  // Lock body scroll for the intro's duration.
  useEffect(() => {
    if (step >= FINAL_STEP) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [step]);

  // Focus the skip button once, as soon as the intro first appears, so
  // keyboard users have an immediate, actionable target instead of
  // tabbing into content still hidden behind the panel. Deliberately NOT
  // re-run on every later `step` change — doing so would yank focus back
  // to this button on each animation beat, which would be disorienting
  // for keyboard and screen-reader users, not helpful.
  const hasFocused = useRef(false);
  useEffect(() => {
    if (step < FINAL_STEP && !hasFocused.current) {
      hasFocused.current = true;
      skipButtonRef.current?.focus();
    }
  }, [step]);

  function skip() {
    if (hasSkipped.current || step >= 5) return;
    hasSkipped.current = true;
    setStep(5);
    window.setTimeout(() => setStep(FINAL_STEP), 550);
  }

  // Click/tap/keypress anywhere skips — the intro is decorative, never a
  // gate the user must wait out.
  useEffect(() => {
    if (step >= 5) return;
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (step >= FINAL_STEP) return null;

  return (
    <div
      className={`${styles.overlay} ${step === 5 ? styles.exiting : ""}`}
      aria-hidden="true"
    >
      <div className={styles.mark}>
        {/* Cream colourway — this panel is a dark (Wet Earth) surface,
            matching the same background-rule the header/footer already
            follow (Brand Guidelines Section 2.4). Decorative, so alt="". */}
        <img
          src="/assets/logo/aldovia-lockup-cream.png"
          alt=""
          className={`${styles.logo} ${step >= 1 ? styles.visible : ""}`}
        />
        <span className={`${styles.rule} ${step >= 2 ? styles.visible : ""}`} />
        <p className={`${styles.tagline} ${step >= 3 ? styles.visible : ""}`}>
          Where Grace Finds You
        </p>
      </div>

      <button
        ref={skipButtonRef}
        type="button"
        className={styles.skipButton}
        onClick={skip}
      >
        Skip intro
      </button>
    </div>
  );
}
