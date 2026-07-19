import React from "react";
import type { GalleryImage } from "../../../types/venue.types";
import styles from "./GalleryGrid.module.css";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  /**
   * Drives the per-thumbnail staggered reveal. Passed down as a plain
   * boolean from Gallery.tsx's own useScrollReveal call, rather than
   * this component calling the hook itself — keeps GalleryGrid fully
   * presentational and reusable (any consumer can pass true/false; it
   * has no opinion on *why* it became visible). Defaults to true so the
   * component still renders correctly if used standalone without a
   * parent orchestrating reveal timing.
   */
  isVisible?: boolean;
}

/**
 * GalleryGrid
 *
 * Pure presentation component — no internal state, no knowledge of what
 * "opening" an image means. Renders the desktop/tablet thumbnail grid and
 * forwards clicks upward via `onImageClick`; all lightbox state lives in
 * Gallery.tsx via useLightbox, per the ownership split for this section.
 *
 * Each thumbnail is a real <button>, not a clickable <div>, so it's
 * reachable and activatable by keyboard without any extra wiring.
 */
export function GalleryGrid({ images, onImageClick, isVisible = true }: GalleryGridProps) {
  return (
    <ul className={`${styles.grid} ${isVisible ? styles.gridVisible : ""}`}>
      {images.map((image, index) => (
        <li key={image.id} className={styles.gridItem} style={{ "--stagger-index": index } as React.CSSProperties}>
          <button
            type="button"
            className={styles.thumbnailButton}
            onClick={() => onImageClick(index)}
            aria-label={`View larger image: ${image.alt}`}
          >
            <img
              src={image.thumbnail}
              alt={image.alt}
              className={styles.thumbnail}
              loading="lazy"
              decoding="async"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
