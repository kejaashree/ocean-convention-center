import React from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { Card } from "../../components/ui/Card/Card";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { amenities } from "../../data/amenities";
import styles from "./Amenities.module.css";

/**
 * Amenities
 *
 * Per the content specification (Section 3.4): answers the unstated
 * question every corporate planner has — "what's actually included?".
 * Placeholder copy is explicitly permitted here by the assignment brief
 * for items the data sheet doesn't cover (catering specifics,
 * accommodation, event support) — those items render with a visible "To
 * be confirmed" cue rather than being presented as settled fact, per the
 * `status` field on each amenities.ts entry.
 *
 * Rendered as a single .map() over Card instances, same pattern as
 * CapacityLayout's seating grid — no dedicated AmenityCard component,
 * since this is the only place that markup is used.
 */
export function Amenities() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="amenities"
      className={styles.amenities}
      aria-labelledby="amenities-heading"
    >
      <div className={styles.inner} ref={ref}>
        <SectionHeading
          id="amenities-heading"
          eyebrow="Amenities & Services"
          title="Everything the Event Needs, Built In"
          supportingText="From audiovisual to accommodation, here's what comes with the venue."
          align="center"
          className={`${styles.heading} ${revealClassName}`}
        />

        <ul className={styles.amenityGrid}>
          {amenities.map((amenity, index) => (
            <Card
              key={amenity.label}
              as="li"
              className={`${styles.amenityCard} ${isVisible ? styles.amenityCardVisible : ""}`}
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <span
                className={styles.icon}
                aria-hidden="true"
                style={{ "--icon-url": `url(/assets/icons/amenities/${amenity.icon})` } as React.CSSProperties}
              />
              <div className={styles.amenityContent}>
                <h3 className={styles.amenityLabel}>{amenity.label}</h3>
                <p className={styles.amenityDescription}>{amenity.description}</p>
                {amenity.status === "placeholder" && (
                  <span className={styles.placeholderBadge}>To Be Confirmed</span>
                )}
              </div>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
