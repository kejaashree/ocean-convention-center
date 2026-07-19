import React from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import type { StatBlockData } from "../../../types/venue.types";
import styles from "./StatBlock.module.css";

interface StatBlockProps {
  stat: StatBlockData;
  onDark?: boolean;
}

/**
 * A single stat: large number (count-up animated on scroll into view) or
 * static text, with a tracked-caps label beneath. Matches the confirmed
 * homepage pattern ("70 Acres", "5,000+ Capacity").
 */
export function StatBlock({ stat, onDark = false }: StatBlockProps) {
  const { ref, value } = useCountUp({ end: stat.isText ? 0 : stat.value });

  const combinedClassName = [styles.statBlock, onDark ? styles.onDark : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName} ref={ref as React.RefObject<HTMLDivElement>}>
      <span className={styles.value} aria-hidden={stat.isText ? undefined : "true"}>
        {stat.isText ? stat.textValue : `${value.toLocaleString()}${stat.suffix ?? ""}`}
      </span>
      {/* A screen-reader-only accessible version avoids announcing the
          animation's in-progress intermediate values. */}
      {!stat.isText && (
        <span className={styles.srOnly}>
          {stat.value.toLocaleString()}
          {stat.suffix ?? ""}
        </span>
      )}
      <span className={styles.label}>{stat.label}</span>
    </div>
  );
}
