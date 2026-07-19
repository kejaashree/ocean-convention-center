import { useEffect, useState } from "react";

/**
 * useMediaQuery
 *
 * Generic, reusable media-query hook — returns whether the given query
 * currently matches, and stays in sync as the viewport crosses the
 * breakpoint. This is the mechanism behind the Gallery ↔ GalleryCarousel
 * component swap specifically: CSS alone can hide/show elements across a
 * breakpoint, but it can't choose which of two different React components
 * gets mounted. That decision has to happen in JS, which is what this
 * hook is for.
 *
 * SSR-safe: returns `false` on the very first render (before the effect
 * runs), matching the same pattern already used by useReducedMotion, so
 * server-rendered and client-hydrated markup agree on the first paint.
 *
 * Breakpoint values here are literals rather than reading breakpoints.css,
 * per that file's own documented limitation: CSS custom properties can't
 * be evaluated inside a JS matchMedia query string. Keep any query passed
 * to this hook in sync with breakpoints.css by hand.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
