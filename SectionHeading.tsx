import React from "react";
import { EyebrowLabel } from "../EyebrowLabel/EyebrowLabel";
import styles from "./SectionHeading.module.css";

type HeadingLevel = "h2" | "h3";

interface SectionHeadingProps {
  /** The main heading text. */
  title: string;
  /** Optional small tracked-caps label rendered above the title (reuses EyebrowLabel). */
  eyebrow?: string;
  /** Optional supporting sentence rendered below the title. */
  supportingText?: string;
  /**
   * Heading level for correct document outline. Defaults to "h2" — every
   * top-level page section (About, Capacity, Amenities, etc.) should use
   * h2 so the page has exactly one h1 (the Hero headline) followed by a
   * logical, sequential h2 per section, per the SEO/accessibility
   * checklists in the frontend architecture blueprint. Pass "h3" only for
   * a heading nested inside a section that already has its own h2.
   */
  level?: HeadingLevel;
  /**
   * Set true when this heading sits on a photographic/dark background
   * (mirrors the same "onDark" pattern used by EyebrowLabel and
   * StatBlock). Defaults to false since most sections sit on
   * --color-bg-primary.
   */
  onDark?: boolean;
  /** Aligns the heading block. Defaults to "left"; "center" is used for sections without a paired image. */
  align?: "left" | "center";
  /**
   * Id applied directly to the heading element. Pass this whenever the
   * parent <section> uses aria-labelledby to reference this heading,
   * rather than duplicating the heading text elsewhere in the DOM.
   */
  id?: string;
  className?: string;
}

/**
 * SectionHeading
 *
 * The shared eyebrow-label + heading + optional supporting-sentence
 * pattern used at the top of every content section on the page (About,
 * Capacity, Amenities, Gallery, Event Types, Inquiry). Built once here so
 * every section gets the same type rhythm and heading hierarchy instead of
 * five near-duplicate implementations.
 */
export function SectionHeading({
  title,
  eyebrow,
  supportingText,
  level = "h2",
  onDark = false,
  align = "left",
  id,
  className = "",
}: SectionHeadingProps) {
  const HeadingTag = level;

  const wrapperClassName = [
    styles.wrapper,
    align === "center" ? styles.center : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClassName = [styles.title, onDark ? styles.onDark : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      {eyebrow && <EyebrowLabel onDark={onDark}>{eyebrow}</EyebrowLabel>}
      <HeadingTag id={id} className={titleClassName}>
        {title}
      </HeadingTag>
      {supportingText && (
        <p className={`${styles.supportingText} ${onDark ? styles.onDark : ""}`}>
          {supportingText}
        </p>
      )}
    </div>
  );
}
