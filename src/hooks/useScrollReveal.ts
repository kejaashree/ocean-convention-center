import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseScrollRevealOptions {
  /**
   * Intersection threshold before the element is considered "in view".
   * 0.2 (20% visible) matches the subtle, non-jumpy reveal specified in
   * the animation plan — low enough to trigger before the element is
   * fully scrolled past, high enough to avoid firing the instant a
   * single pixel enters the viewport.
   */
  threshold?: number;
  /** Only ever reveal once per element, per the animation plan's "trigger once per session" rule. */
  triggerOnce?: boolean;
}

/**
 * useScrollReveal
 *
 * Generic fade-up-on-scroll-into-view hook, used by every page section
 * after the Hero (per the Animation Plan: "Section headings/copy — On
 * scroll-into-view — Fade-up, 20px translate, ~400ms").
 *
 * Usage: attach `ref` to the element you want to animate, then
 * conditionally apply a "revealed" CSS class based on `isVisible`. The
 * actual transform/opacity/transition values live in each consuming
 * component's own CSS module (kept out of this hook) so different
 * sections can share the trigger logic while still owning their own
 * visual treatment.
 *
 * Generic over the target element type — call with the element type you're
 * attaching the ref to (e.g. `useScrollReveal<HTMLDivElement>()`) to avoid
 * needing an unsafe `as` cast at the call site.
 *
 * Respects prefers-reduced-motion: when the user has that setting on,
 * `isVisible` is simply `true` immediately, so consuming components
 * should always render their final, settled state when isVisible is
 * true — never rely on the animation itself to reveal content.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.2,
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Guard for environments without IntersectionObserver (very old
    // browsers, some test runners) — fail open by revealing immediately
    // rather than leaving content permanently hidden.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce, prefersReducedMotion]);

  return { ref, isVisible };
}
