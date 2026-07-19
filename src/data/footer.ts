import type { FooterLinkColumn, SocialLink } from "../types/venue.types";

/**
 * Source: confirmed footer structure from the design-system audit —
 * 4-column sitemap (Stay / Events / Discover / Contact). Distinct from
 * primaryNav in navigation.ts: "Discover" and "Contact" have no header-nav
 * equivalent, and the footer's "Events" column includes Ocean Convention
 * Center directly rather than nesting it under a flyout, since a footer
 * has no room for hover/flyout interaction.
 */
export const footerColumns: FooterLinkColumn[] = [
  {
    title: "Stay",
    links: [
      { label: "Rooms", href: "/rooms" },
      { label: "Experiences & Packages", href: "/experiences" },
      { label: "Dining", href: "/dining" },
      { label: "Activities", href: "/activities" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Weddings", href: "/wedding" },
      { label: "Corporate Events", href: "/corporate" },
      { label: "Venues", href: "/venues" },
      { label: "Ocean Convention Center", href: "/ocean-convention-center" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "The Aldovia Story", href: "/about-us" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Get in Touch", href: "/ocean-convention-center#inquiry-form" },
    ],
  },
];

/**
 * Source: confirmed social row from the design-system audit (Instagram,
 * Facebook, LinkedIn, YouTube, Threads, X). Hrefs are "#" placeholders,
 * not guessed handles — a fabricated but plausible-looking URL risks
 * silently resolving to an unrelated real account if ever shipped as-is.
 * Replace with the client's actual social URLs once provided.
 */
export const socialLinks: SocialLink[] = [
  { platform: "Instagram", href: "#", icon: "instagram.svg" },
  { platform: "Facebook", href: "#", icon: "facebook.svg" },
  { platform: "LinkedIn", href: "#", icon: "linkedin.svg" },
  { platform: "YouTube", href: "#", icon: "youtube.svg" },
  { platform: "Threads", href: "#", icon: "threads.svg" },
  { platform: "X", href: "#", icon: "x.svg" },
];
