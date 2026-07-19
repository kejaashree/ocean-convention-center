import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import type { GalleryImage } from "../../../types/venue.types";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: GalleryImage[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Lightbox
 *
 * Reusable, content-agnostic full-screen image viewer. All state (which
 * image, open/closed) and keyboard shortcuts (Escape, arrow keys) are
 * owned by useLightbox and passed in as props — this component only owns
 * concerns that are inherently tied to its own rendered DOM:
 *
 *  - the Tab-focus trap (which specific buttons exist here, wrapping Tab
 *    between the first and last one) — this depends on Lightbox's own
 *    markup, so it can't live in a generic hook the way open/close state can
 *  - body-scroll lock while open — a standard modal responsibility, kept
 *    self-contained here so any consumer can drop in <Lightbox /> without
 *    having to remember to lock scroll themselves
 *  - moving focus onto itself when it opens
 *
 * Stays mounted in the DOM even while closed (rather than returning null)
 * so the fade transition can play in both directions; `inert` removes it
 * from the tab order and accessibility tree while closed, same fix
 * pattern applied to GlobalHeader's MobileNav previously.
 */
export function Lightbox({ images, activeIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeImage = images[activeIndex];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Tab-focus trap: while open, wrap Tab/Shift+Tab between the first and
  // last focusable element inside the dialog rather than letting focus
  // escape to the page behind it.
  useEffect(() => {
    if (!isOpen) return;

    function handleTabTrap(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTabTrap);
    return () => document.removeEventListener("keydown", handleTabTrap);
  }, [isOpen]);

  if (!activeImage) return null;

  const overlayClassName = [
    styles.overlay,
    isOpen ? styles.overlayOpen : "",
    prefersReducedMotion ? styles.noTransition : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={dialogRef}
      className={overlayClassName}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${activeImage.alt}`}
      // `inert` removes this entire subtree from tab order, screen-reader
      // virtual cursor, and find-in-page while closed — @types/react 18.3
      // (this project's installed version, per the frozen tech spec)
      // types `inert` as boolean, confirmed by an actual tsc run during
      // the Project Integration Review, which caught an earlier version
      // of this line incorrectly using a string-typed cast.
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close image viewer" />

      <div className={styles.content}>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {images.length > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={onPrev}
            aria-label="Previous image"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
        )}

        <figure className={styles.figure}>
          <img
            key={activeImage.id}
            src={activeImage.full}
            alt={activeImage.alt}
            className={styles.image}
            decoding="async"
          />
          <figcaption className={styles.caption}>
            {activeIndex + 1} of {images.length}
          </figcaption>
        </figure>

        {images.length > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={onNext}
            aria-label="Next image"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        )}
      </div>
    </div>
  );
}
