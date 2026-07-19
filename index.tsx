import Head from "next/head";
import { BrandIntro } from "../../src/components/intro/BrandIntro/BrandIntro";
import { GlobalHeader } from "../../src/components/layout/GlobalHeader/GlobalHeader";
import { GlobalFooter } from "../../src/components/layout/GlobalFooter/GlobalFooter";
import { Hero } from "../../src/sections/Hero/Hero";
import { AboutVenue } from "../../src/sections/AboutVenue/AboutVenue";
import { SpaceBlueprint } from "../../src/sections/SpaceBlueprint/SpaceBlueprint";
import { CapacityLayout } from "../../src/sections/CapacityLayout/CapacityLayout";
import { Amenities } from "../../src/sections/Amenities/Amenities";
import { Gallery } from "../../src/sections/Gallery/Gallery";
import { EventTypes } from "../../src/sections/EventTypes/EventTypes";
import { InquiryForm } from "../../src/sections/InquiryForm/InquiryForm";

/**
 * /ocean-convention-center
 *
 * Assembles every section built over the course of this project, in the
 * order established by the content specification (Section 3), plus one
 * addition: Hero -> About the Venue -> The Blueprint (SpaceBlueprint,
 * promoted out of Capacity & Layout as its own full-bleed mid-page
 * section — see that file's comment) -> Capacity & Layout -> Amenities &
 * Services -> Gallery -> Event Types Hosted -> Inquiry/Booking Form,
 * wrapped by the shared GlobalHeader and GlobalFooter used across the
 * rest of the Aldovia site.
 *
 * <main id="main-content"> is the target of GlobalHeader's skip link
 * ("Skip to main content") — that link has existed since the Header/Hero
 * PR review, but its target never existed anywhere until this file was
 * created. Every section's in-page anchor target (#about-venue,
 * #space-blueprint, #capacity-layout, #amenities, #gallery, #event-types,
 * #inquiry-form) and every button/link that scrolls to one of them
 * (Hero's two CTAs, GlobalHeader's "Get in Touch", GlobalFooter's footer
 * links) only resolves correctly once all sections exist together on one
 * page, which is what this file provides for the first time.
 *
 * Meta title pattern follows the convention established in the content
 * specification (Section 2). Full SEO checklist items (Open Graph tags,
 * structured data, canonical URL) remain a separate, larger task — not
 * undertaken here, since that goes beyond closing this integration gap.
 *
 * <BrandIntro /> is mounted first, ahead of GlobalHeader, so it's the
 * first thing in DOM order and receives focus immediately on load (see
 * its own file for the full sequence/accessibility rationale). It
 * renders `null` once its sequence finishes or is skipped, so it never
 * affects layout — everything below it mounts and behaves exactly as it
 * did before this was added.
 */
export default function OceanConventionCenterPage() {
  return (
    <>
      <Head>
        <title>Ocean Convention Center in Bangalore | Pillar-less Convention Venue at Aldovia</title>
        <meta
          name="description"
          content="A purpose-built, pillar-less convention venue at Aldovia Resort with seating for up to 3,000 — 10 minutes from Kempegowda International Airport."
        />
        {/* Brand favicon (swan mark, cropped from the brand guidelines'
            primary lockup) — replaces the default Next.js icon, which was
            otherwise the first thing visible in any browser tab. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <BrandIntro />

      <GlobalHeader />

      <main id="main-content">
        <Hero />
        <AboutVenue />
        <SpaceBlueprint />
        <CapacityLayout />
        <Amenities />
        <Gallery />
        <EventTypes />
        <InquiryForm />
      </main>

      <GlobalFooter />
    </>
  );
}
