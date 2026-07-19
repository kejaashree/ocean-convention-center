import React from "react";
import styles from "./EyebrowLabel.module.css";

interface EyebrowLabelProps {
  children: React.ReactNode;
  /** Pass true when rendered over a photographic background (e.g. the Hero). */
  onDark?: boolean;
  className?: string;
}

/**
 * The small, tracked-out uppercase label used consistently sitewide above
 * headlines and stat blocks (e.g. "LUSH GREENERY", "CAPACITY" on the
 * homepage). Kept as its own component since it recurs in Hero, Capacity,
 * and future sections.
 */
export function EyebrowLabel({ children, onDark = false, className = "" }: EyebrowLabelProps) {
  const combinedClassName = [styles.eyebrow, onDark ? styles.onDark : "", className]
    .filter(Boolean)
    .join(" ");

  return <p className={combinedClassName}>{children}</p>;
}
