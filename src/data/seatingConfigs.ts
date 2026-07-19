import type { SeatingConfig } from "../types/venue.types";

/**
 * Source: Ocean Convention Center Details sheet's "Seating Layout" card.
 * U-Shape and Boardroom are included with capacity: null, matching the
 * source sheet's "–" — deliberately kept in the list rather than omitted,
 * so the grid honestly communicates "not offered" rather than silently
 * hiding those two configurations.
 */
export const seatingConfigs: SeatingConfig[] = [
  {
    name: "Theater",
    capacity: 3000,
    icon: "theater.svg",
    description:
      "Rows facing a single stage — the default for keynotes, general sessions, and large-format conferences.",
  },
  {
    name: "Cocktails",
    capacity: 3000,
    icon: "cocktails.svg",
    description:
      "Open floor with standing lounges and bar stations — built for galas, product launches, and evening receptions.",
  },
  {
    name: "Classroom",
    capacity: 1200,
    icon: "classroom.svg",
    description:
      "Tabled rows facing forward — suited to training sessions, workshops, and certification programs.",
  },
  {
    name: "Cluster",
    capacity: 1200,
    icon: "cluster.svg",
    description:
      "Round tables grouped across the floor — the format for gala dinners and networking-heavy events.",
  },
  {
    name: "U-Shape",
    capacity: null,
    icon: "ushape.svg",
    description:
      "An open-front table arrangement for smaller, discussion-led sessions. Not offered at the venue's current scale.",
  },
  {
    name: "Boardroom",
    capacity: null,
    icon: "boardroom.svg",
    description:
      "A closed, single-table layout for executive meetings. Not offered at the venue's current scale.",
  },
];
