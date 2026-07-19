import { useCallback, useEffect, useRef, useState } from "react";

interface UseLightboxReturn {
  isOpen: boolean;
  activeIndex: number;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

/**
 * useLightbox
 *
 * Owns all lightbox interaction logic, independent of how it's triggered
 * (GalleryGrid thumbnail click or GalleryCarousel slide tap both call the
 * same `open`) and independent of how it's rendered (the Lightbox
 * component only needs to read the returned state/actions as props).
 *
 * Responsibilities kept here, deliberately not in the Lightbox component:
 *  - open/closed state and active index, with wrap-around next/prev
 *  - global keyboard shortcuts while open (Escape to close, arrow keys
 *    to navigate) — this is interaction *logic*, testable independent of
 *    any particular DOM structure
 *  - capturing the element that had focus at the moment `open` was
 *    called, so `close` can return focus to it — the same return-focus
 *    pattern used by GlobalHeader's MobileNav, centralized here instead
 *    of re-derived per consumer
 *
 * Deliberately NOT here: the Tab-focus trap within the open lightbox
 * (which specific elements are focusable, wrapping Tab between them) —
 * that depends on the Lightbox component's own rendered DOM structure,
 * so it lives in Lightbox.tsx itself, matching "Lightbox remains a
 * reusable UI component" — a component that owns its own internal DOM
 * concerns, driven by state this hook provides.
 */
export function useLightbox(itemCount: number): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number) => {
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocusedElement.current?.focus();
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close, next, prev]);

  return { isOpen, activeIndex, open, close, next, prev };
}
