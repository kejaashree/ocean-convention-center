import React from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./AboutVenue.module.css";

/**
 * Client-supplied copy from the Ocean Convention Center data sheet, quoted
 * verbatim per the content specification (Section 3.2) — this is already
 * on-brand copy provided by the client, not placeholder, so it is not
 * rewritten and is inlined here rather than split into a data file, since
 * it's a single fixed paragraph rather than a repeatable/list structure.
 */
const ABOUT_COPY =
  "A purpose-built pillar-less convention venue crafted for large gatherings, industry expos, and high-impact conferences with seamless service and scale. Equipped with state-of-the-art audiovisual systems, flexible seating configurations, and dedicated function space. The hall connects to premium dining areas and hospitality zones, ensuring all attendees experience comfort alongside functionality.";

/**
 * AboutVenue
 *
 * Per the content specification (Section 3.2): establishes what the venue
 * actually is, in the brand's own stated words, directly after the Hero's
 * visual impression. Image 2 (the exterior shot) is placed here rather
 * than in the Hero — this is the section that grounds "here is the actual
 * building" before the page moves into capacity numbers.
 *
 * Image asset: replace the placeholder path below with the optimized,
 * multi-size asset set once available in public/assets/images/venue/,
 * per the missing-files list from the project recovery audit. This image
 * is below-the-fold, so unlike the Hero it should be lazy-loaded, not
 * given loading priority.
 */
export function AboutVenue() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="about-venue"
      className={styles.aboutVenue}
      aria-labelledby="about-venue-heading"
    >
      <div className={styles.inner} ref={ref}>
        <div className={`${styles.imageColumn} ${revealClassName}`}>
          <img
            src="/assets/images/venue/ocean-exterior-daylight.jpg"
            alt="Exterior view of Ocean Convention Center building at Aldovia Resort, Bangalore"
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={`${styles.copyColumn} ${revealClassName}`}>
          <SectionHeading
            id="about-venue-heading"
            eyebrow="About the Venue"
            title="Grand Convention Destination"
            className={styles.heading}
          />
          <p className={styles.bodyText}>{ABOUT_COPY}</p>
        </div>
      </div>
    </section>
  );
}
