import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseCountUpOptions {
  /** Target numeric value to count up to. */
  end: number;
  /** Animation duration in ms. Defaults to 1200ms per the animation plan. */
  duration?: number;
  /** Only run once the element scrolls into view. Defaults to true. */
  triggerOnView?: boolean;
}

/**
 * useCountUp
 *
 * Animates a number from 0 to `end` when the returned ref scrolls into
 * view, per the animation plan ("StatBlock numbers ... count-up from 0 to
 * target value, ~1.2s ease-out, trigger once per session per block").
 *
 * Respects prefers-reduced-motion by rendering the final value immediately
 * with no animation.
 */
export function useCountUp({
  end,
  duration = 1200,
  triggerOnView = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    const node = ref.current;
    if (!node || !triggerOnView) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();

    function animate() {
      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic, matches the animation plan's "ease-out" spec
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, triggerOnView, prefersReducedMotion]);

  return { ref, value };
}
