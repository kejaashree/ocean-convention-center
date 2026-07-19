import type { GalleryImage } from "../types/venue.types";

/**
 * Order matches the narrative sequence from the image analysis: exterior
 * (arrival) → empty hall scale (x2) → banquet in-use (x2). All five images
 * are shown here even though Images 1 and 2 also appear in Hero and
 * AboutVenue respectively — planners often skip straight to the gallery
 * without reading section copy, so it needs to be self-sufficient on its
 * own, per the content specification's explicit recommendation.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "exterior",
    thumbnail: "/assets/images/venue/ocean-exterior-daylight-thumb.jpg",
    full: "/assets/images/venue/ocean-exterior-daylight-full.jpg",
    alt: "Exterior view of Ocean Convention Center building at Aldovia Resort, Bangalore",
  },
  {
    id: "hall-theater",
    thumbnail: "/assets/images/venue/ocean-hall-theater-3000-thumb.jpg",
    full: "/assets/images/venue/ocean-hall-theater-3000-full.jpg",
    alt: "Empty Ocean Convention Center hall set in theatre-style seating for 3,000, pillar-less design",
  },
  {
    id: "hall-wide",
    thumbnail: "/assets/images/venue/ocean-hall-wide-empty-thumb.jpg",
    full: "/assets/images/venue/ocean-hall-wide-empty-full.jpg",
    alt: "Wide view of the empty Ocean Convention Center hall showing full pillar-less span",
  },
  {
    id: "banquet-floral",
    thumbnail: "/assets/images/venue/ocean-banquet-floral-thumb.jpg",
    full: "/assets/images/venue/ocean-banquet-floral-full.jpg",
    alt: "Ocean Convention Center set up for a banquet event with round tables and floral centerpieces",
  },
  {
    id: "banquet-ceiling",
    thumbnail: "/assets/images/venue/ocean-banquet-ceiling-detail-thumb.jpg",
    full: "/assets/images/venue/ocean-banquet-ceiling-detail-full.jpg",
    alt: "Ocean Convention Center banquet setup showing folded ceiling detail and ambient lighting",
  },
  {
    id: "banquet-grand-hall",
    thumbnail: "/assets/images/venue/ocean-banquet-grand-hall-thumb.jpg",
    full: "/assets/images/venue/ocean-banquet-grand-hall-full.jpg",
    alt: "Ocean Convention Center set for a full banquet with round tables, navy linens, and starlit ceiling detail down the length of the hall",
  },
];
