import React from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { Card } from "../../components/ui/Card/Card";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { eventTypes } from "../../data/eventTypes";
import styles from "./EventTypes.module.css";

/**
 * EventTypes
 *
 * Per the content specification (Section 3.6): helps the visitor
 * self-identify — "this venue is for people like me." Cards render
 * against a shared background texture (the signature navy/gold carpet
 * pattern identified in the image analysis) rather than per-item
 * photography, since only two in-use photos exist for six event
 * categories — matching the content spec's explicit instruction to avoid
 * requiring photography that doesn't exist yet.
 *
 * Placeholder items (five of six) render with the same "To Be Confirmed"
 * treatment already established in Amenities, reusing that visual
 * language rather than inventing a second one.
 */
export function EventTypes() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="event-types"
      className={styles.eventTypes}
      aria-labelledby="event-types-heading"
    >
      <div className={styles.inner} ref={ref}>
        <SectionHeading
          id="event-types-heading"
          eyebrow="Event Types Hosted"
          title="Built for Every Kind of Gathering"
          align="center"
          className={`${styles.heading} ${revealClassName}`}
        />

        <ul className={styles.grid}>
          {eventTypes.map((eventType, index) => (
            <Card
              key={eventType.label}
              as="li"
              align="center"
              className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`}
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <span className={styles.label}>{eventType.label}</span>
              {eventType.status === "placeholder" && (
                <span className={styles.placeholderBadge}>To Be Confirmed</span>
              )}
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
