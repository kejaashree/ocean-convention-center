import type { AmenityItem } from "../types/venue.types";

/**
 * Source: Ocean Convention Center Details sheet (confirmed items) plus
 * standard convention-venue categories not covered by the sheet
 * (placeholder items — explicitly permitted by the assignment brief for
 * gaps like this, per the content spec Section 3.4). Do not present the
 * placeholder items as verified fact to the client without sign-off; the
 * `status` field exists specifically so the UI doesn't quietly blur that
 * distinction.
 */
export const amenities: AmenityItem[] = [
  {
    label: "State-of-the-Art AV Systems",
    description:
      "Modern audiovisual equipment built into the venue, supporting large-scale conferences and expos.",
    icon: "av-system.svg",
    status: "confirmed",
  },
  {
    label: "Flexible Seating Configurations",
    description:
      "Theater, cocktails, classroom, and cluster layouts, reconfigured to match your event format.",
    icon: "seating.svg",
    status: "confirmed",
  },
  {
    label: "Dedicated Function Space",
    description:
      "A purpose-built hall separate from the resort's guest areas, reserved exclusively for your event.",
    icon: "function-space.svg",
    status: "confirmed",
  },
  {
    label: "Premium Catering & Dining",
    description:
      "Access to Ocean Dining and in-house catering. Menu details available on request — to be confirmed with our events team.",
    icon: "catering.svg",
    status: "placeholder",
  },
  {
    label: "On-Site Accommodation",
    description:
      "Guest rooms available on-property for multi-day events. Room block policy to be confirmed with our events team.",
    icon: "accommodation.svg",
    status: "placeholder",
  },
  {
    label: "Dedicated Event Support",
    description:
      "A coordination team to help plan and run your event on the day. Scope of support to be confirmed with our events team.",
    icon: "support-team.svg",
    status: "placeholder",
  },
];
