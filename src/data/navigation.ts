import type { NavItem } from "../types/venue.types";

/**
 * Primary navigation, matching the structure confirmed during the live-site
 * audit: Home / Stay / Events / Convention Center / Discover, with "Stay"
 * and "Events" as flyout/mega-menu parents pairing an icon with each
 * sub-item label.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Stay",
    href: "/rooms",
    subItems: [
      { label: "Rooms", href: "/rooms", icon: "bed.svg" },
      { label: "Experiences & Packages", href: "/experiences", icon: "star.svg" },
      { label: "Dining", href: "/dining", icon: "forkknife.svg" },
      { label: "Activities", href: "/activities", icon: "activity.svg" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    subItems: [
      { label: "Weddings", href: "/wedding", icon: "wedding.svg" },
      { label: "Corporate Events", href: "/corporate", icon: "corporate.svg" },
      { label: "Venues", href: "/venues", icon: "venue.svg" },
      {
        label: "Ocean Convention Center",
        href: "/ocean-convention-center",
        icon: "venue.svg",
      },
    ],
  },
  {
    // OPEN QUESTION (carried from content spec, restated here so it's
    // visible at the code level, not just buried in a doc): this item and
    // the "Ocean Convention Center" entry nested under Events both exist
    // right now. Resolve with the client whether /convention and
    // /ocean-convention-center are meant to coexist, redirect, or merge
    // before this ships — do not treat this as a settled decision.
    label: "Convention Center",
    href: "/convention",
  },
  {
    label: "Discover",
    href: "/about-us",
  },
];

export const utilityContact = {
  hotelPhone: "+91 80 3507 7000",
  salesPhone: "+91 80 3101 3831",
  email: "info@aldovia.in",
};
