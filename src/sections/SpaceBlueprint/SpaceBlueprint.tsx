import React, { useState } from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { StatBlock } from "../../components/ui/StatBlock/StatBlock";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./SpaceBlueprint.module.css";

/**
 * SpaceBlueprint
 *
 * Promotes the floor plan from a quiet sub-block inside Capacity & Layout
 * (where it was easy to scroll past between a table and a card grid) to
 * its own full-bleed, dark mid-page section — the same "onDark" treatment
 * StatBlock and EyebrowLabel already support but nothing on this page had
 * used yet. Placed between About the Venue and Capacity & Layout: right
 * where a planner has just finished reading what the venue is and is
 * about to start scanning numbers, this is the beat that shows them the
 * shape of the place before the table gives them the digits.
 *
 * Still deliberately NOT an architectural site plan — same honesty
 * constraint as the block this replaces: the client data sheet gives each
 * zone's width/length/height, not how the four zones actually sit next to
 * each other on the property, so all four are drawn as same-scale
 * footprints for comparison, not as an invented adjacency layout.
 *
 * What's new versus the version this replaces:
 *  - A total-footprint StatBlock (54,892 sq ft), summed here from the same
 *    zones array the diagram renders — one array, so the stat and the
 *    shapes can never disagree with each other.
 *  - The legend rows are buttons, not static list items: hovering or
 *    focusing one highlights its footprint in the diagram, so the
 *    numbers-to-shape connection is something the reader does, not just
 *    reads.
 *  - Each bar draws itself on (stroke animates in) when the section
 *    scrolls into view, via useScrollReveal — a deliberate variant on the
 *    site's standard fade-up, appropriate here because it reads as the
 *    plan being sketched rather than just faded onto the page. Skipped
 *    entirely under prefers-reduced-motion, same as every other animation
 *    on this page, since useScrollReveal already reports isVisible=true
 *    immediately in that case.
 */

const FEET_TO_PX = 1.3;
const BASELINE_Y = 300;

interface Zone {
  id: number;
  name: string;
  widthFt: number;
  lengthFt: number;
  areaSqFt: number;
  outdoor?: boolean;
}

const zones: Zone[] = [
  { id: 1, name: "Convention Center", widthFt: 100, lengthFt: 250, areaSqFt: 25000 },
  { id: 2, name: "Pre Function Area", widthFt: 24, lengthFt: 299, areaSqFt: 7176 },
  { id: 3, name: "Ocean Dining", widthFt: 58, lengthFt: 156, areaSqFt: 9048 },
  { id: 4, name: "Ocean Lawn", widthFt: 102, lengthFt: 134, areaSqFt: 13668, outdoor: true },
];

const totalSqFt = zones.reduce((sum, zone) => sum + zone.areaSqFt, 0);

const GAP = 28;
const START_X = 40;

const bars = zones.reduce<Array<Zone & { x: number; y: number; w: number; h: number; perimeter: number }>>(
  (acc, zone) => {
    const previous = acc[acc.length - 1];
    const x = previous ? previous.x + previous.w + GAP : START_X;
    const w = zone.widthFt * FEET_TO_PX;
    const h = zone.lengthFt * FEET_TO_PX;
    const y = BASELINE_Y - h;
    return [...acc, { ...zone, x, y, w, h, perimeter: 2 * (w + h) }];
  },
  []
);
const viewBoxWidth = bars[bars.length - 1].x + bars[bars.length - 1].w + START_X;

export function SpaceBlueprint() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""].filter(Boolean).join(" ");

  return (
    <section id="space-blueprint" className={styles.spaceBlueprint} aria-labelledby="space-blueprint-heading">
      <div className={`${styles.inner} ${revealClassName}`} ref={ref}>
        <SectionHeading
          id="space-blueprint-heading"
          eyebrow="The Blueprint"
          title="Four Spaces, Drawn to Scale"
          supportingText="Hover a space below to see it highlighted in the diagram — everything here is shown at the same scale, so size differences are real, not stylized."
          align="center"
          onDark
          className={styles.heading}
        />

        <StatBlock
          onDark
          stat={{ value: totalSqFt, suffix: " sq ft", label: "Combined footprint, all four spaces" }}
        />

        <div className={styles.diagramRow}>
          <svg
            viewBox={`0 0 ${viewBoxWidth} 340`}
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
            aria-hidden="true"
          >
            <line x1="20" y1={BASELINE_Y} x2={viewBoxWidth - 20} y2={BASELINE_Y} className={styles.baseline} />
            {bars.map((zone) => (
              <g key={zone.id}>
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx={2}
                  className={[
                    styles.zoneRect,
                    zone.outdoor ? styles.zoneRectOutdoor : "",
                    activeZone === zone.id ? styles.zoneRectActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    {
                      "--perimeter": zone.perimeter,
                    } as React.CSSProperties
                  }
                />
                <circle
                  cx={zone.x + zone.w / 2}
                  cy={zone.y + Math.min(zone.h, 26)}
                  r={11}
                  className={[styles.numberBadge, activeZone === zone.id ? styles.numberBadgeActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                />
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + Math.min(zone.h, 26) + 4}
                  textAnchor="middle"
                  className={styles.numberText}
                >
                  {zone.id}
                </text>
              </g>
            ))}
          </svg>

          <ol className={styles.legend}>
            {zones.map((zone) => (
              <li key={zone.id}>
                <button
                  type="button"
                  className={[styles.legendRow, activeZone === zone.id ? styles.legendRowActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setActiveZone(zone.id)}
                  onMouseLeave={() => setActiveZone(null)}
                  onFocus={() => setActiveZone(zone.id)}
                  onBlur={() => setActiveZone(null)}
                >
                  <span className={styles.legendNumber} aria-hidden="true">
                    {zone.id}
                  </span>
                  <span className={styles.legendText}>
                    <strong>{zone.name}</strong>
                    <span className={styles.legendDims}>
                      {zone.widthFt} × {zone.lengthFt} ft · {zone.areaSqFt.toLocaleString()} sq ft
                      {zone.outdoor ? " · outdoor" : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.caption}>
          A schematic comparison of relative size and shape, not an architectural site plan — exact
          adjacency and walking distances are confirmed with the venue team during planning.
        </p>
      </div>
    </section>
  );
}
