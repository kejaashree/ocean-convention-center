import type { EventTypeItem } from "../types/venue.types";

/**
 * Standard event categories for a hall this size. Only "Large-format
 * Weddings" has indirect confirmation (the About Us page references
 * grand weddings filling the resort grounds) — the other five are
 * reasonable, industry-standard placeholder entries pending direct client
 * confirmation, per the content specification's explicit allowance for
 * placeholder copy in this section.
 */
export const eventTypes: EventTypeItem[] = [
  { label: "Conferences & Conventions", status: "placeholder" },
  { label: "Product Launches", status: "placeholder" },
  { label: "Trade Shows & Exhibitions", status: "placeholder" },
  { label: "Corporate Offsites & Town Halls", status: "placeholder" },
  { label: "Award Ceremonies & Galas", status: "placeholder" },
  { label: "Large-Format Weddings", status: "confirmed" },
];
