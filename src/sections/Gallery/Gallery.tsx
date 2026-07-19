import React from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { GalleryGrid } from "../../components/gallery/GalleryGrid/GalleryGrid";
import { GalleryCarousel } from "../../components/gallery/GalleryCarousel/GalleryCarousel";
import { Lightbox } from "../../components/gallery/Lightbox/Lightbox";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useLightbox } from "../../hooks/useLightbox";
import { galleryImages } from "../../data/galleryImages";
import styles from "./Gallery.module.css";

/**
 * Gallery
 *
 * Per the content specification (Section 3.5): visual proof — this is the
 * section that owns all gallery state (per the requirement that Gallery.tsx
 * owns state, GalleryGrid/GalleryCarousel stay presentational, useLightbox
 * owns interaction logic, Lightbox stays a reusable UI component).
 *
 * `id="gallery"` resolves Hero's existing "View the Venue" CTA
 * (`href="#gallery"`), which has been pointing at a section that didn't
 * exist until now.
 *
 * Note on the desktop/mobile split: useMediaQuery is SSR-safe and returns
 * `false` on first render (matching useReducedMotion's same pattern), so
 * on a server-rendered page this will render GalleryCarousel first and
 * swap to GalleryGrid after hydration on desktop viewports. This is a
 * deliberate, known trade-off of doing the split in JS rather than CSS —
 * flagging it here rather than treating it as invisible, since a
 * flash-of-wrong-layout on slow connections is a real (if minor) UX cost
 * worth knowing about before this ships.
 */
export function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const lightbox = useLightbox(galleryImages.length);

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section id="gallery" className={styles.gallery} aria-labelledby="gallery-heading">
      <div className={styles.inner} ref={ref}>
        <SectionHeading
          id="gallery-heading"
          eyebrow="The Venue"
          title="See It for Yourself"
          align="center"
          className={`${styles.heading} ${revealClassName}`}
        />

        <div>
          {isDesktop ? (
            <GalleryGrid images={galleryImages} onImageClick={lightbox.open} isVisible={isVisible} />
          ) : (
            <GalleryCarousel images={galleryImages} onImageClick={lightbox.open} isVisible={isVisible} />
          )}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        activeIndex={lightbox.activeIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
      />
    </section>
  );
}
