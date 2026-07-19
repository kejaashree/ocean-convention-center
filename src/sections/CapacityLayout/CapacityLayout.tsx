import React from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { DimensionsTable } from "./DimensionsTable";
import { SeatingConfigurator } from "./SeatingConfigurator";
import styles from "./CapacityLayout.module.css";

/**
 * CapacityLayout
 *
 * Per the content specification (Section 3.3): the section event planners
 * actually scan for hard numbers — dimensions and seating configuration
 * capacities, sourced from the client-supplied data sheet.
 *
 * The floor plan that used to live here as a third sub-block has been
 * promoted to its own full-bleed section, SpaceBlueprint, placed earlier
 * in the page (between About the Venue and this section) — see that
 * file's own comment for the reasoning. This section now covers the
 * dimensions table and an interactive seating configurator (swapped in
 * for the earlier static card grid — same data, but browsable one layout
 * at a time instead of scanned all at once).
 */
export function CapacityLayout() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="capacity-layout"
      className={styles.capacityLayout}
      aria-labelledby="capacity-layout-heading"
    >
      <div className={styles.inner} ref={ref}>
        <SectionHeading
          id="capacity-layout-heading"
          eyebrow="Capacity & Layout"
          title="Numbers That Do the Talking"
          supportingText="Every space in the Ocean Convention Center, sized and seated for exactly the kind of gathering you're planning."
          align="center"
          className={`${styles.heading} ${revealClassName}`}
        />

        <div className={`${styles.tableWrapper} ${revealClassName}`}>
          <h3 className={styles.subheading}>Space Dimensions</h3>
          <DimensionsTable />
        </div>

        <div className={`${styles.seatingWrapper} ${revealClassName}`}>
          <h3 className={styles.subheading}>Seating Configurations</h3>
          <SeatingConfigurator />
        </div>
      </div>
    </section>
  );
}
