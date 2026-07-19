import type { DimensionRow } from "../types/venue.types";

/**
 * Source: Ocean Convention Center Details sheet (client-supplied,
 * unmodified). Kept as data, not inlined in the component, since this is
 * exactly the kind of structured, repeatable, client-owned content flagged
 * in the project architecture doc as a CMS-readiness candidate — venue
 * dimensions can change with renovation/expansion.
 */
export const dimensions: DimensionRow[] = [
  {
    space: "Ocean Convention Center",
    area: "25,000 sq ft",
    width: "100 ft",
    length: "250 ft",
    height: "30 ft",
  },
  {
    space: "Pre Function Area",
    area: "7,176 sq ft",
    width: "24 ft",
    length: "299 ft",
    height: "16 ft",
  },
  {
    space: "Ocean Dining",
    area: "9,048 sq ft",
    width: "58 ft",
    length: "156 ft",
    height: "9 ft",
  },
  {
    space: "Ocean Lawn",
    area: "13,668 sq ft",
    width: "102 ft",
    length: "134 ft",
    height: "N/A",
  },
];
