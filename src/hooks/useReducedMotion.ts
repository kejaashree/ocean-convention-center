import { useEffect, useState } from "react";

/**
 * useReducedMotion
 *
 * Reads the user's OS-level `prefers-reduced-motion` setting and keeps it
 * in sync if the user changes it mid-session. Every animation hook in this
 * project (useCountUp, useScrollReveal, etc.) should check this before
 * running any transform/opacity animation, per the accessibility
 * checklist in the architecture blueprint.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
