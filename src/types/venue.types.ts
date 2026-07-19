/**
 * Shared type definitions.
 * Extend this file as later sections (Capacity, Gallery, InquiryForm) are built.
 */

export interface NavSubItem {
  label: string;
  href: string;
  /** Icon filename, matching the live site's icon-plus-label nav pattern (e.g. "bed.svg"). */
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Present only on flyout/mega-menu parents like "Stay" and "Events". */
  subItems?: NavSubItem[];
}

export interface StatBlockData {
  /** Numeric portion of the stat, animated via useCountUp. */
  value: number;
  /** Optional suffix rendered after the animated number, e.g. "+" or " SQ FT". */
  suffix?: string;
  /** For non-numeric stats like "PILLAR-LESS", set isText and provide `label` only. */
  isText?: boolean;
  textValue?: string;
  label: string;
}

/**
 * One row of the Ocean Convention Center dimensions table, sourced from
 * the client-supplied Ocean Convention Center Details sheet.
 */
export interface DimensionRow {
  /** Space name, e.g. "Ocean Convention Center", "Pre Function Area". */
  space: string;
  /** Total area, formatted for display, e.g. "25,000 sq ft". */
  area: string;
  width: string;
  length: string;
  /** Height, formatted for display. Use "N/A" for spaces without a ceiling height (e.g. Ocean Lawn). */
  height: string;
}

/**
 * One seating layout option from the Ocean Convention Center Details
 * sheet's "Seating Layout" card (Theater, Cocktails, Classroom, Cluster,
 * U-Shape, Boardroom).
 */
export interface SeatingConfig {
  /** Configuration name, e.g. "Theater". */
  name: string;
  /**
   * Max capacity for this configuration. Set to null for configurations
   * the venue data sheet marks as unavailable ("–"), e.g. U-Shape/Boardroom
   * for this venue — keeps "no data" distinct from "zero capacity".
   */
  capacity: number | null;
  /** Icon filename, matching the sitewide icon-plus-label convention. */
  icon: string;
  /**
   * One-line description of who/what this layout suits — surfaced in the
   * interactive configurator. Presentational copy, not part of the
   * client's source data sheet.
   */
  description: string;
}

/**
 * One item in the Amenities & Services grid. Per the content specification
 * (Section 3.4), some amenities are directly confirmed by the Ocean
 * Convention Center data sheet (AV systems, flexible seating, dedicated
 * function space) while others are placeholder pending client sign-off
 * (catering specifics, accommodation access, event-support team) — the
 * `status` field keeps that distinction visible in the UI rather than
 * presenting assumptions as verified fact.
 */
export interface AmenityItem {
  label: string;
  description: string;
  /** Icon filename, matching the sitewide icon-plus-label convention. */
  icon: string;
  status: "confirmed" | "placeholder";
}

/**
 * One image in the Ocean Convention Center gallery. Two sizes are tracked
 * explicitly rather than a single srcset string: `thumbnail` for the
 * GalleryGrid/GalleryCarousel presentation, `full` for the Lightbox's
 * larger view — keeping the two concerns (grid density vs. full-detail
 * viewing) as distinct, intentional asset choices rather than one image
 * scaled down via CSS.
 */
export interface GalleryImage {
  id: string;
  thumbnail: string;
  full: string;
  alt: string;
}

/**
 * One card in the Event Types Hosted grid. Per the content specification
 * (Section 3.6), this list is placeholder — standard for a hall this size
 * but not directly confirmed by the Ocean Convention Center data sheet
 * (Large-format Weddings is the one exception, cross-referenced against
 * the About Us page's mention of grand weddings). Cards render against a
 * shared background texture rather than per-item photography, so unlike
 * AmenityItem this carries no `description` or `icon` field — same
 * "confirmed" | "placeholder" status pattern as AmenityItem, reused
 * rather than inventing a parallel convention.
 */
export interface EventTypeItem {
  label: string;
  status: "confirmed" | "placeholder";
}

/**
 * Values collected by the Inquiry / Booking form (content spec Section
 * 3.7). All fields are strings, including guestCount and eventDate — kept
 * as raw string input values (matching what native <input> elements
 * actually produce) rather than parsed number/Date types, with parsing
 * left to submission-time validation, not the form state shape itself.
 */
export interface InquiryFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
  message: string;
}

/** Per-field validation error messages, keyed the same as InquiryFormData. Absent key = no error. */
export type InquiryFormErrors = Partial<Record<keyof InquiryFormData, string>>;

/** One column of the footer's 4-column sitemap (Stay / Events / Discover / Contact). */
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

/** One entry in the footer's social row. */
export interface SocialLink {
  platform: string;
  href: string;
  /** Icon filename, matching the sitewide icon-plus-label convention. */
  icon: string;
}
