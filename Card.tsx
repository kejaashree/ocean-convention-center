import React from "react";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /**
   * BRAND RECONCILIATION: grand_guidelines.md states cards are "flat,
   * minimal-shadow surfaces on First Light background," with shadow
   * reserved "only for elevated cards/modals" (Section 10's own
   * --shadow-none/--shadow-soft split). "default" is therefore now the
   * FLAT treatment (no shadow, subtle border for edge definition) —
   * previously "default" carried a shadow and "flush" was the flat one.
   * "flush" now carries the shadow instead, for the rare elevated/modal
   * case the brand explicitly calls out as the exception, not the norm.
   * No consumer in the project currently passes an explicit `variant`
   * prop, so this swap changes zero call sites — every existing card
   * automatically picks up the brand-correct flat treatment.
   */
  variant?: "default" | "flush";
  /** Centers content — used for stat-style cards like the seating config grid. */
  align?: "left" | "center";
  className?: string;
  /** Forwarded so a Card can be used as the root of a <li> item, etc. */
  as?: "div" | "li";
}

/**
 * Card
 *
 * Generic container primitive, per the frontend architecture blueprint's
 * note that seating-config, amenity, and event-type cards should all
 * "extend/inherit the site's existing generic Card component" rather than
 * each being built standalone. First consumer is CapacityLayout's seating
 * configuration grid; Amenities and EventTypes reuse this unchanged when
 * those sections are built.
 */
export function Card({
  children,
  variant = "default",
  align = "left",
  className = "",
  as = "div",
  ...rest
}: CardProps) {
  const Tag = as;
  const combinedClassName = [
    styles.card,
    variant === "flush" ? styles.flush : "",
    align === "center" ? styles.center : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={combinedClassName} {...rest}>
      {children}
    </Tag>
  );
}
