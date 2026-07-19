# Ocean Convention Center — Frontend Architecture Blueprint
### Lead Frontend Architect Handoff Document
Path: `/ocean-convention-center` · Companion to: `Ocean_Convention_Center_Page_Specification.md`

---

## 0. Scope of This Document

The prior spec defined **what** goes on the page (content, copy, images, business rationale). This document defines **how it's built**: structure, hierarchy, behavior, and the checklists a build should be graded against before ship. Any developer picking this up cold should be able to build the page from this document alone, cross-referencing the content spec only for copy/asset details.

---

## 1. Final Page Structure

Locked sequence, top to bottom:

```
1. Global Header (inherited, unmodified)
2. Announcement Marquee (inherited, conditional — only if sitewide notice is active)
3. Hero
4. About the Venue
5. Capacity & Layout
6. Amenities & Services
7. Gallery
8. Event Types Hosted
9. Inquiry / Booking Form  ← primary conversion point
10. Global Footer (inherited, unmodified)
```

No section is optional in the MVP build. If time-constrained, Amenities and Event Types are the two sections that could be compressed (combined into one shorter "What's Included" block) without breaking the page's core sales logic — Hero, Capacity, Gallery, and the Form are non-negotiable.

---

## 2. UX Flow

The page has exactly one desired outcome: **a submitted inquiry.** The flow is designed with two paths to that outcome — a fast path for decided visitors, and a full path for evaluators.

**Fast path (decided visitor):**
`Land on Hero → click "Request a Proposal" → anchor-scroll directly to Form → submit`

**Full path (evaluating visitor):**
`Land on Hero (scale impression) → About (what is this, credibility) → Capacity (do the numbers work for my event) → Amenities (what's included) → Gallery (visual proof) → Event Types (self-identification: "this is for people like me") → Form (submit)`

**Design implication:** the Hero's primary CTA must be present and functional independent of scroll position — it is the fast-path's only interaction point, so it needs to work as a jump-link even before any other section has rendered. Do not gate it behind a "scroll to reveal" animation.

**Secondary flow — phone/email:** a meaningful share of B2B/event-planner inquiries for a venue this size will come by phone, not form. Phone/email must be visible and copy-pasteable in **two places**: the global header (already inherited) and directly beside the form (per content spec). Never bury contact info behind a "click to reveal" interaction.

**Drop-off risk points to design against:**
- Capacity section — if numbers are hard to scan (bad table UX on mobile), planners bounce here. This section gets the most responsive-design attention of any non-hero section.
- Form — every additional required field measurably lowers completion. Field list in the content spec is already minimized; do not add fields during build without a stated reason.

---

## 3. Component Hierarchy

Text-based component tree. Names are illustrative — align with the client's actual existing naming conventions once source access is available.

```
<OceanConventionCenterPage>
├── <GlobalHeader />                          [inherited — no changes]
├── <AnnouncementMarquee />                    [inherited, conditional render]
│
├── <HeroSection>
│   ├── <HeroBackgroundImage src={image1} />
│   ├── <HeroScrim />                          [gradient overlay, CSS only]
│   ├── <HeroContent>
│   │   ├── <EyebrowLabel text="OCEAN CONVENTION CENTER" />
│   │   ├── <HeroHeadline />
│   │   ├── <HeroSubtext />
│   │   └── <HeroCTAGroup>
│   │       ├── <ButtonPrimary label="Request a Proposal" onClick={scrollToForm} />
│   │       └── <ButtonSecondary label="View the Venue" onClick={scrollToGallery} />
│   │   </HeroCTAGroup>
│   ├── <ScrollCueIndicator />                 [reused from homepage]
│   └── <StatBlockRow>                         [reused component]
│       ├── <StatBlock value="25,000" label="SQ FT" />
│       ├── <StatBlock value="3,000" label="SEATER" />
│       └── <StatBlock value="PILLAR-LESS" label="DESIGN" />
│   </StatBlockRow>
├── </HeroSection>
│
├── <AboutVenueSection>
│   ├── <SectionImage src={image2} alt="..." />
│   └── <SectionCopyBlock>
│       ├── <SectionHeading text="Grand Convention Destination" />
│       └── <BodyText>{aboutCopy}</BodyText>
│   </SectionCopyBlock>
├── </AboutVenueSection>
│
├── <CapacityLayoutSection>
│   ├── <SectionHeading text="Capacity & Layout" />
│   ├── <SectionImage src={image5} />           [side/background support image]
│   ├── <DimensionsTable data={dimensionsData} />
│   │   └── <DimensionsTableRow />              [x4, one per space]
│   └── <SeatingConfigGrid>
│       ├── <SeatingConfigCard config="Theater" capacity="3000" icon="theater.svg" />
│       ├── <SeatingConfigCard config="Cocktails" capacity="3000" icon="cocktails.svg" />
│       ├── <SeatingConfigCard config="Classroom" capacity="1200" icon="classroom.svg" />
│       └── <SeatingConfigCard config="Cluster" capacity="1200" icon="cluster.svg" />
│   </SeatingConfigGrid>
├── </CapacityLayoutSection>
│
├── <AmenitiesSection>
│   ├── <SectionHeading text="Amenities & Services" />
│   └── <AmenityIconGrid>
│       └── <AmenityIconCard />                 [x6, icon + label + short description]
│   </AmenityIconGrid>
├── </AmenitiesSection>
│
├── <GallerySection>
│   ├── <SectionHeading text="The Venue" />
│   ├── <GalleryGrid>                           [desktop/tablet]
│   │   └── <GalleryThumbnail src={} alt={} onClick={openLightbox} />  [x5]
│   ├── <GalleryCarousel>                       [mobile — swap component, not just CSS reflow]
│   │   └── <GalleryCarouselSlide />             [x5]
│   └── <Lightbox isOpen={} activeIndex={} onClose={} onNext={} onPrev={} />
├── </GallerySection>
│
├── <EventTypesSection>
│   ├── <SectionHeading text="Built for Every Kind of Gathering" />
│   └── <EventTypeCardGrid>
│       └── <EventTypeCard label="..." backgroundTexture="navy-gold-pattern" />  [x6]
│   </EventTypeCardGrid>
├── </EventTypesSection>
│
├── <InquirySection id="inquiry-form">          [anchor target for CTAs]
│   ├── <SectionHeading text="Plan Your Event" />
│   ├── <ContactSidebar>                         [desktop: sidebar / mobile: above form]
│   │   ├── <PhoneLink label="Hotel" number="+91 80 3507 7000" />
│   │   ├── <PhoneLink label="Sales" number="+91 80 3101 3831" />
│   │   └── <EmailLink address="info@aldovia.in" />
│   └── <InquiryForm>
│       ├── <FormField type="text" name="fullName" required />
│       ├── <FormField type="text" name="company" required />
│       ├── <FormField type="email" name="email" required />
│       ├── <FormField type="tel" name="phone" required />
│       ├── <FormField type="date" name="eventDate" />
│       ├── <FormField type="number" name="guestCount" required />
│       ├── <FormField type="select" name="eventType" options={eventTypesList} />
│       ├── <FormField type="textarea" name="message" />
│       ├── <ButtonPrimary type="submit" label="Request a Proposal" />
│       └── <FormSuccessState />                 [conditional render post-submit]
│   </InquiryForm>
├── </InquirySection>
│
└── <GlobalFooter />                             [inherited — no changes]
```

**Reused vs. net-new components:**

| Component | Status |
|---|---|
| GlobalHeader, GlobalFooter, AnnouncementMarquee | Reused, unmodified |
| StatBlock / StatBlockRow | Reused (confirmed pattern from homepage) |
| ButtonPrimary / ButtonSecondary | Reused (confirmed pattern from homepage hero) |
| SeatingConfigCard, EventTypeCard, AmenityIconCard | New components, but should extend/inherit the site's existing generic Card component rather than being built standalone |
| GalleryGrid, GalleryCarousel, Lightbox | **Net-new unless an existing gallery component is found elsewhere on the site** — flagged as an open question in the content spec; confirm before building from scratch |
| InquiryForm | Net-new — the live site's actual form is JS-rendered and not inspectable; do not attempt to reverse-engineer it further, build fresh to this spec |
| DimensionsTable | Net-new, simple — no site precedent for tabular data display found during audit |

---

## 4. Responsive Behavior

Breakpoints (estimated from site's dual-markup nav pattern — confirm exact px values once CSS access exists):
`mobile: 0–639px` / `tablet: 640–1023px` / `desktop: 1024px+`

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| HeroSection | Cropped/portrait image, CTAs stack full-width, StatBlockRow → horizontal scroll or 1-col | Full image, CTAs inline, StatBlockRow 3-col | Full image, CTAs inline, StatBlockRow 3-col |
| AboutVenueSection | Image top, copy below, full-width | Same as mobile or 50/50 depending on final art direction | 50/50 split, image left |
| DimensionsTable | Horizontal scroll container (do not compress columns) | Horizontal scroll or full table if space allows | Full static table |
| SeatingConfigGrid | 2-col | 2-col | 4-col |
| AmenityIconGrid | 1-col | 2-col | 3–4 col |
| GallerySection | **Swaps to GalleryCarousel component** (not a CSS reflow of the grid) — swipeable, one image at a time | GalleryGrid, 2-col | GalleryGrid, 3-col |
| EventTypeCardGrid | 1-col | 2-col | 3-col |
| InquiryForm | 1-col fields, ContactSidebar renders above form | 1-col fields, ContactSidebar above form | 1-col fields, ContactSidebar as true sidebar beside form |

**Component-swap note:** Gallery is the one section where mobile isn't just a reflow — it's a different interaction model (swipe carousel vs. grid-click-to-lightbox). Build these as two components sharing the same image data source, not one component with heavy conditional CSS.

---

## 5. Animation Plan

| Element | Trigger | Behavior | Notes |
|---|---|---|---|
| Hero background | Page load | Optional subtle Ken Burns (2–3% scale, 8–10s ease) | Skip if it risks feeling like a stock hospitality site — the still image is already strong. Treat as a nice-to-have, not required. |
| Hero scrim | Page load | Static, no animation | Pure CSS gradient |
| Scroll cue indicator | Page load | Gentle vertical bounce loop | Reuse homepage's existing implementation exactly |
| StatBlock numbers (hero + capacity) | On scroll-into-view | Count-up from 0 to target value, ~1.2s ease-out | Trigger once per session per block, not on every re-scroll |
| Section headings/copy | On scroll-into-view | Fade-up, 20px translate, ~400ms | Standard, applied uniformly to all section entries |
| SeatingConfigCard / AmenityIconCard / EventTypeCard | On scroll-into-view | Staggered fade-up per card (~60ms stagger) | Keep stagger subtle — this is a B2B page, not a showcase site |
| Gallery thumbnails | Hover (desktop only) | Slight scale (1.02–1.04) + shadow lift | Standard card-hover affordance signaling interactivity |
| Lightbox open/close | Click | Fade + slight scale-in, ~250ms | No slide/bounce — keep restrained per brand tone |
| Form fields | Focus | Border-color transition to accent color, ~150ms | Standard, also required for accessibility (visible focus state) |
| Form submit | Click | Button loading-state (spinner or disabled+label change), then success-state swap | Never let the button appear clickable-but-dead during network wait |

**Global rule:** all scroll-triggered and autoplay-style animations (Ken Burns, count-up, fade-up, stagger) must respect `prefers-reduced-motion: reduce` — render final state immediately, no animation, for users with that OS-level setting.

---

## 6. Design Tokens (Consolidated Final Set)

Restating and finalizing the token set from prior analysis — this is the version to hand to whoever implements the stylesheet/theme file.

```
COLOR — Estimated, confirm against brand guidelines PDF before production
  --color-bg-primary        cream/off-white (site default)
  --color-bg-card           white or same cream, low-contrast against bg-primary
  --color-text-primary      deep charcoal
  --color-text-muted        warm grey-brown
  --color-brand-beige       beige-gold (site default, logo/nav)
  --color-brand-brown       deeper brown (site default, secondary logo/cards)
  --color-venue-navy        deep navy — venue-specific accent, CONFIRMED from
                             photography (carpet, seating) across all 5 supplied images
  --color-venue-gold        warm bronze/gold — venue-specific accent, CONFIRMED
                             from wall paneling in photography
  --color-cta               dark charcoal/brown solid fill (site default button)
  --color-focus-ring        accent color, sufficient contrast for visible focus states

TYPOGRAPHY — inherit site tokens, no new type scale
  --font-display             serif/slab-serif (site default)
  --font-body                sans-serif (site default)
  --tracking-eyebrow         ~0.08em, uppercase (site default)

SPACING — inherit site's confirmed vertical section-band rhythm
  --space-xs / sm / md / lg / xl / 2xl   (see content spec Section 6 for scale)

RADIUS — Estimated
  --radius-sm / md / lg

SHADOW — Estimated
  --shadow-card

BREAKPOINTS — Estimated
  --bp-mobile: 640px
  --bp-tablet: 1024px
  --bp-desktop: 1440px
```

**Governance note:** `--color-venue-navy` and `--color-venue-gold` are new tokens not observed elsewhere on the live site. Propose these to the client as an approved "venue sub-palette" rather than a page-specific hack — they'll likely be reusable if other venue-specific pages (e.g. individual wedding lawns) get built later.

---

## 7. Accessibility Checklist

- [ ] All 5 gallery images have descriptive alt text (drafted in content spec, Section 3.5)
- [ ] Decorative-only images (background textures, scrim overlays) use empty `alt=""`, not omitted alt attributes
- [ ] Color contrast for all text-on-image (hero headline on photo) meets WCAG AA — test against the darkest/lightest regions of Image 1, not just the average
- [ ] `--color-venue-navy` and `--color-venue-gold` combinations tested for AA contrast before use in any text/icon context
- [ ] Every form field has a programmatically associated `<label>` — placeholder text is never a substitute for a label
- [ ] Form validation errors are announced to screen readers (`aria-live` region or equivalent), not conveyed by color alone
- [ ] All interactive elements (buttons, nav, gallery controls, form fields) have visible focus states — do not remove default outlines without replacing them
- [ ] Lightbox is keyboard-navigable (Tab, Escape to close, arrow keys to advance) and traps focus while open
- [ ] Carousel/gallery on mobile is swipe-accessible but also has visible next/prev controls for non-touch/assistive input
- [ ] Count-up and Ken Burns animations respect `prefers-reduced-motion`
- [ ] Heading hierarchy is logical and sequential (single H1 for the page — likely the Hero headline — then H2 per major section, no skipped levels)
- [ ] All icons paired with text labels (per the site's confirmed icon-plus-label nav pattern) — icons are never the sole conveyor of meaning
- [ ] Dimensions table uses proper `<table>` markup with `<th>` scope attributes, not div-based fake tables, for screen-reader table navigation

---

## 8. SEO Checklist

- [ ] Single, unique `<title>` tag following the sitewide pattern (see content spec Section 2)
- [ ] Meta description ~155 characters, unique to this page, factual tone matching sitewide voice
- [ ] Single H1 on the page (Hero headline) — no competing H1s in other sections
- [ ] Logical H2/H3 structure per section (About, Capacity, Amenities, Gallery, Event Types, Inquiry)
- [ ] Canonical URL set to `/ocean-convention-center`
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image` (new crop from Image 1), `og:url`, `og:type=website`
- [ ] Twitter Card tags mirroring OG data
- [ ] Structured data: `LocalBusiness` or `EventVenue` schema (schema.org) with capacity, address, and amenity data — strong candidate for rich-result eligibility given the concrete capacity/dimension data available
- [ ] All images use descriptive, keyword-relevant filenames (not `IMG_1234.jpg`) before upload
- [ ] Internal linking: this page should be linked from the homepage's `Events` nav and from the existing `/convention` page (resolve the overlap question flagged in the content spec first)
- [ ] Confirm with client whether this page should supersede or coexist with `/convention` — duplicate/thin-content risk if both remain live with overlapping content and no canonical relationship declared
- [ ] Page load performance (see Section 9) directly affects Core Web Vitals, which affects search ranking — do not treat SEO and performance as separate workstreams

---

## 9. Performance Checklist

- [ ] Hero image (Image 1) served in modern format (WebP/AVIF with JPEG fallback) at multiple responsive sizes via `srcset`/`sizes` — this is the single largest asset on the page and the biggest LCP (Largest Contentful Paint) risk
- [ ] Hero image is the designated LCP element — ensure it is not lazy-loaded (should load eagerly, high priority) since it's above-the-fold
- [ ] All below-the-fold images (About section Image 2, Gallery thumbnails, Event Type card backgrounds) are lazy-loaded
- [ ] Gallery lightbox loads full-resolution images only on open, not preloaded for all 5 at page load
- [ ] Gallery thumbnail grid uses appropriately downscaled image variants, not full-resolution source images shown at thumbnail size
- [ ] Fonts: if new font files are introduced (pending brand PDF confirmation), use `font-display: swap` and preload critical font weights to avoid invisible-text flash
- [ ] Count-up and fade-up animations use CSS transforms/opacity (GPU-accelerated), not layout-triggering properties (avoid animating `width`/`height`/`top`/`left`)
- [ ] Form submission is async (no full-page reload) — reduces perceived latency and preserves scroll position on error
- [ ] Total page weight budget: aim to keep initial load (excluding lazy-loaded gallery/below-fold assets) under a reasonable mobile-friendly threshold — flag to the team if the final build exceeds ~2MB above-the-fold
- [ ] Test Core Web Vitals (LCP, CLS, INP) on both mobile and desktop before ship — the hero's image-heavy design and count-up animations are the two highest-risk elements for these metrics specifically
- [ ] Reserve layout space (explicit width/height or aspect-ratio CSS) for all images and the stat-block/count-up elements to prevent Cumulative Layout Shift as content loads in

---

## 10. Recommended Build Sequence

For a developer picking this up fresh, suggested implementation order (front-loads the highest-risk/highest-impact pieces):

1. Global layout shell — inherit header/footer, confirm they render correctly with no page-specific overrides needed
2. Hero section — highest visual stakes, also the LCP-critical element; get image optimization right here first
3. Inquiry form — second-highest priority since it's the conversion point; build and test in isolation before wiring into page flow
4. Capacity & Layout — the most data-dense section, get the responsive table/card behavior solid early
5. Gallery + Lightbox — the most complex net-new interactive component; budget real time here
6. About, Amenities, Event Types — comparatively straightforward content sections, sequence last
7. Full responsive pass across all breakpoints
8. Accessibility audit against Section 7 checklist
9. Performance audit against Section 9 checklist
10. SEO metadata pass against Section 8 checklist

---

*This document, together with `Ocean_Convention_Center_Page_Specification.md`, constitutes the complete pre-build reference. No further clarification should be required to begin implementation, pending resolution of the open questions logged in the content spec (Section 8 of that document).*
