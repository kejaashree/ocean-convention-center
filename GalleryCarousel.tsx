import React, { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "../../../types/venue.types";
import styles from "./GalleryCarousel.module.css";

interface GalleryCarouselProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  /** Same isVisible contract as GalleryGrid — see that component for the full rationale. Defaults to true. */
  isVisible?: boolean;
}

/**
 * GalleryCarousel
 *
 * Mobile's genuinely different interaction model, per the frontend
 * architecture blueprint — a swipeable, one-at-a-time carousel rather than
 * a grid. Still a presentation component: the only state it manages is
 * purely visual (which dot is currently highlighted, tracked via native
 * scroll position) — it does not own or know about lightbox open/closed
 * state, which stays in Gallery.tsx via useLightbox. Tapping the visible
 * slide calls the same `onImageClick` contract GalleryGrid uses.
 *
 * Built on native CSS scroll-snap rather than a carousel library, per the
 * frozen technical specification's "no new dependencies" constraint.
 */
export function GalleryCarousel({ images, onImageClick, isVisible = true }: GalleryCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best
        );
        if (mostVisible.isIntersecting) {
          const index = slideRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveSlide(index);
        }
      },
      { root: track, threshold: 0.6 }
    );

    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [images.length]);

  function scrollToSlide(index: number) {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }

  return (
    <div className={`${styles.carousel} ${isVisible ? styles.carouselVisible : ""}`}>
      <ul className={styles.track} ref={trackRef}>
        {images.map((image, index) => (
          <li
            key={image.id}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className={styles.slide}
          >
            <button
              type="button"
              className={styles.slideButton}
              onClick={() => onImageClick(index)}
              aria-label={`View larger image: ${image.alt}`}
            >
              <img
                src={image.thumbnail}
                alt={image.alt}
                className={styles.slideImage}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.dots} role="tablist" aria-label="Gallery image navigation">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Go to image ${index + 1} of ${images.length}`}
            className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ""}`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
