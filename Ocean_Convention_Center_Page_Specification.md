# Ocean Convention Center — Page Specification
### Production-Ready Implementation Blueprint
Path: `/ocean-convention-center` · Brand: Aldovia Resort & Convention

---

## 0. How to Use This Document

This is the single source of truth for building the page. It synthesizes:
- The Web Developer Assignment brief (business goal, deliverables, evaluation criteria)
- The reverse-engineered Aldovia design system (confirmed + estimated tokens)
- Venue photography analysis (5 supplied images)
- The Ocean Convention Center data sheet (dimensions, capacity, seating configs)

Every section below states **what to build, why, with what content, and how it behaves** — no code, so any frontend engineer (or another instance of Claude, in a later session) can implement it without re-deriving decisions.

---

## 1. Business Goal (governs every decision below)

Primary KPI: **inquiries/bookings from event planners, corporates, and organisers.**
Every section must either (a) build credibility/desire, or (b) reduce friction toward the inquiry form. Nothing on this page is decorative-only.

---

## 2. Page-Level Requirements

| Requirement | Spec |
|---|---|
| URL | `/ocean-convention-center` |
| Meta title pattern | Match sitewide convention: `"[Feature] in Bangalore | [Descriptor] at Aldovia Resort"` — e.g. `"Ocean Convention Center in Bangalore | Pillar-less Convention Venue at Aldovia"` |
| Meta description | ~155 chars, same tone as other pages (see `/convention` meta) — factual, keyword-forward, no hype |
| Og:image | New crop from Image 1 (hero) at `1200x630`, matching the site's existing `q_auto,f_jpg,w_1200,h_630,c_fill` Cloudinary transform pattern |
| Header/Footer | Reuse the site's existing global header and footer components unmodified — do not fork them. This page is a child of the existing nav (`Events → Convention Center`), not a standalone microsite |
| Marquee | Inherit the sitewide announcement marquee if one is currently active (e.g. the "Swiss Town Square renovation" notice) — do not suppress it on this page |

---

## 3. Information Architecture (section-by-section)

Order, per the assignment's suggested structure, adjusted using the image analysis findings:

1. Hero
2. About the Venue
3. Capacity & Layout
4. Amenities & Services
5. Gallery
6. Event Types Hosted
7. Inquiry / Booking CTA (form)

Each section spec follows.

---

### 3.1 Hero

**Purpose:** Establish scale and premium positioning in under 3 seconds. First impression must say "this is a serious venue," not "this is a hotel banquet hall."

**Content:**
- Eyebrow label (tracked-caps, per sitewide pattern): `OCEAN CONVENTION CENTER`
- Headline (serif/display font token): a scale-forward tagline — e.g. *"Grand Enough for 3,000. Precise Enough for One."* (placeholder — replace once brand copywriter signs off; keep the pattern of stating a hard number, matching the brand's "numbers as proof, not adjectives" voice identified in the brand-personality analysis)
- Supporting sentence (1–2 lines, body font): factual, e.g. *"A purpose-built, pillar-less convention venue with seating for up to 3,000 — 10 minutes from Kempegowda International Airport."*
- Primary CTA button: `Request a Proposal` (or `Enquire Now`) — routes to the inquiry form section (in-page anchor scroll)
- Secondary CTA (ghost/text style, matching homepage's "Explore the Resort" pattern): `View the Venue` — scrolls to Gallery

**Visual:**
- Background: **Image 1** (empty theatre-style hall, deep symmetrical perspective) — full-bleed, per the image analysis recommendation
- Overlay: dark gradient scrim bottom-to-top (or left-to-right) at ~30–45% opacity, using `--color-text-primary` as the gradient base — necessary because Image 1's ceiling area is light-toned and text needs contrast
- No autoplay video required here (unlike the homepage) — a static architectural hero photo is stronger for a B2B/event-planner audience who want to *see the room*, not be sold a mood
- Stat strip below the fold-line, reusing the homepage's confirmed stat-block pattern: `25,000 SQ FT` / `3,000 SEATER` / `PILLAR-LESS` — mirrors the homepage's "70 Acres / 5,000+ Capacity" component exactly, so it feels native to the site

**Responsive:**
- Mobile: swap to a cropped/vertical version of Image 1 if available; if not, use `object-fit: cover` with a center-focal-point crop preserving the vanishing-point aisle (the image's key visual anchor)
- Stat strip: 3-column on desktop/tablet, stacks to horizontal-scroll or 1-column on mobile depending on how the homepage's existing stat strip behaves (match it exactly)

---

### 3.2 About the Venue

**Purpose:** Convert the hero's visual impression into stated fact — what this space is, in the brand's own words.

**Content (source: Ocean Convention Center Details sheet):**
> *"Grand Convention Destination — A purpose-built pillar-less convention venue crafted for large gatherings, industry expos, and high-impact conferences with seamless service and scale. Equipped with state-of-the-art audiovisual systems, flexible seating configurations, and dedicated function space. The hall connects to premium dining areas and hospitality zones, ensuring all attendees experience comfort alongside functionality."*

Use this verbatim (it's client-supplied copy, already on-brand) — do not rewrite it. Optionally split into a short lead sentence + expandable body if the design calls for a shorter above-the-fold summary.

**Visual:**
- **Image 2** (exterior) placed here, not in the hero — this section is the natural place to establish "here is the actual building," giving the exterior shot grounding after the interior-drama hero. Matches the recommended gallery narrative (arrival → scale → in-use → detail).
- Layout: image left / text right (or reversed) — a 50/50 split section, consistent with the "About the venue" pattern typically used on hospitality sites and distinct from the full-bleed hero band above it

**Responsive:** Stacks to image-on-top, text-below on mobile/tablet.

---

### 3.3 Capacity & Layout

**Purpose:** This is the section event planners actually scan for hard numbers — treat it as a functional reference, not a marketing block.

**Content — Dimensions table (source: data sheet):**

| Space | Area | Width | Length | Height |
|---|---|---|---|---|
| Ocean Convention Center | 25,000 sq ft | 100 ft | 250 ft | 30 ft |
| Pre Function Area | 7,176 sq ft | 24 ft | 299 ft | 16 ft |
| Ocean Dining | 9,048 sq ft | 58 ft | 156 ft | 9 ft |
| Ocean Lawn | 13,668 sq ft | 102 ft | 134 ft | N/A |

**Content — Seating layout capacities (source: data sheet):**

| Configuration | Capacity |
|---|---|
| Theater | 3,000 |
| Cocktails | 3,000 |
| Classroom | 1,200 |
| Cluster | 1,200 |
| U-Shape | — (not applicable/not offered) |
| Boardroom | — (not applicable/not offered) |

**Component pattern:** Render both tables using the site's existing **card component style** (rounded container, soft shadow per estimated tokens) rather than raw HTML tables — an icon-plus-number treatment (reusing the sitewide stat-block pattern: large number, tracked-caps label) works well for the seating grid specifically, since it mirrors the source data sheet's own layout (icon + number per config).

**Visual:**
- **Image 5** (alternate empty-hall wide shot) as a supporting background or side panel here — reinforces the pillar-less claim visually right where the dimension numbers are being read
- Consider a simple floor-plan-style icon set for Theater/Cocktails/Classroom/Cluster if the brand guidelines include one (check the PDF once available); otherwise use generic seating-layout icons matching the sitewide icon style (flat, single-tone, line-based per confirmed icon inventory)

**Responsive:** Dimension table becomes horizontally scrollable on mobile rather than compressing columns unreadably; seating-config cards go to a 2-column grid on mobile (from 3–4 columns desktop).

---

### 3.4 Amenities & Services

**Purpose:** Answer the unstated question every corporate planner has: *"what's actually included?"*

**Content:** The assignment brief flags this as an area where the data sheet doesn't give exhaustive detail — **placeholder copy is explicitly permitted here** per the brief. Structure as a scannable icon-grid (reusing the sitewide icon-plus-label nav pattern) covering standard convention-venue categories:
- State-of-the-art AV systems *(confirmed — mentioned in data sheet)*
- Flexible seating configurations *(confirmed)*
- Dedicated function space *(confirmed)*
- Premium catering / dining access — tie to the "Ocean Dining" area from the dimensions table *(confirmed area exists; specific catering menu is placeholder)*
- On-site accommodation access (144 guest rooms — sourced from third-party listing data, verify with client before publishing) — **flag as unconfirmed, needs client sign-off**
- Dedicated event support/coordination team — **placeholder, standard for this venue tier**

**Visual:** No new photography needed — this section can be text/icon-led, consistent with how the rest of the Aldovia site treats amenity lists (see Activities page pattern: category + description, no photo per item).

**Responsible flag for the short note:** explicitly call out in your write-up that AV/catering/accommodation *specifics* beyond what the data sheet states are placeholder and should be confirmed with the client before this goes live — this is exactly the kind of trade-off the brief asks you to document.

---

### 3.5 Gallery

**Purpose:** Visual proof — let the room sell itself.

**Order (per image analysis, narrative logic: arrival → scale → in-use → detail):**
1. Image 2 — exterior establishing shot *(if not already used in About the Venue — see note below)*
2. Image 1 — empty hall, theatre setup, full depth *(if not used as hero — see note below)*
3. Image 5 — empty hall, alternate wide angle
4. Image 3 — banquet setup with florals/table settings
5. Image 4 — banquet setup, ceiling detail visible

**Important sequencing note:** Images 1 and 2 are each doing double duty (Hero + About section) in this spec. For the Gallery, either (a) show all 5 again for a complete visual reference in one place — common on hospitality sites where visitors expect a dedicated gallery regardless of what's used above — or (b) show only images 3, 4, 5 in the gallery and treat 1/2 as "already seen." **Recommendation: show all 5.** Planners often skip straight to the gallery without reading the hero/about copy, so the gallery should be self-sufficient.

**Component:** Match the site's likely lightbox/carousel pattern (inferred from the async "Loading rooms" pattern on the Rooms page — the site clearly has a JS-driven media component already; reuse it rather than building a new one). Grid or horizontal-scroll on desktop; single-column swipeable carousel on mobile.

**Alt text (required — flagged explicitly in evaluation criteria):**
- Image 1: "Empty Ocean Convention Center hall set in theatre-style seating for 3,000, pillar-less design"
- Image 2: "Exterior view of Ocean Convention Center building at Aldovia Resort, Bangalore"
- Image 3: "Ocean Convention Center set up for a banquet event with round tables and floral centerpieces"
- Image 4: "Ocean Convention Center banquet setup showing folded ceiling detail and ambient lighting"
- Image 5: "Wide view of the empty Ocean Convention Center hall showing full pillar-less span"

**Known content gap (flag in write-up):** no photos currently cover Pre-Function Area, Ocean Dining, or Ocean Lawn — all three are named, dimensioned spaces in the data sheet but have zero supplied photography. Either request these from the client or clearly scope them out in your short note as a known limitation.

---

### 3.6 Event Types Hosted

**Purpose:** Help the visitor self-identify — "this venue is for people like me."

**Content (placeholder, standard for a hall this size — confirm with client):**
- Conferences & Conventions
- Product Launches
- Trade Shows & Exhibitions
- Corporate Offsites & Town Halls
- Award Ceremonies & Galas
- Large-format Weddings *(cross-reference: the About Us page confirms Aldovia hosts "grand weddings that fill the grounds," so this is a defensible inclusion even without direct data-sheet confirmation)*

**Visual:** Use **Images 3 and 4** (banquet setups) here rather than repeating them only in the gallery — these are the two images that actually show the room *in use*, which is the entire point of this section. A card-per-event-type grid, each card using a shared background texture (e.g. the signature navy/gold carpet pattern identified in the image analysis) rather than a unique photo per card, keeps this section from requiring photography that doesn't exist yet.

**Responsive:** 3-column grid desktop → 2-column tablet → 1-column mobile, matching the Awards-grid pattern already confirmed on the About Us page.

---

### 3.7 Inquiry / Booking CTA — "The Money Moment"

**Purpose:** Convert. This is the section the entire page's KPI depends on. Highest design priority for clarity and lowest-friction interaction.

**Placement:** End of page, but also **anchor-linked from the hero's primary CTA** so a ready-to-inquire visitor never has to scroll past everything else.

**Form fields (recommended — the live site's real contact form is JS-rendered and not inspectable, so this is a defensible industry-standard default, explicitly flagged as an assumption per the earlier design-system audit):**
- Full Name *(required)*
- Company / Organisation *(required)*
- Email *(required)*
- Phone *(required)*
- Event Date (date picker) *(optional)*
- Expected Guest Count (number input) *(required — this is the single most important qualifying field for a venue this size)*
- Event Type (dropdown, populated from Section 3.6's list) *(optional)*
- Message / Additional Details (textarea) *(optional)*
- Submit button: `Request a Proposal` — matches hero CTA copy for consistency

**Supporting content beside/above the form (reduces friction, per evaluation criteria "business sense"):**
- Direct phone numbers, reusing the sitewide dual-number pattern: `+91 80 3507 7000 (Hotel)` / `+91 80 3101 3831 (Sales)` — corporate planners often prefer calling over forms for large-scale bookings; don't hide this behind the form
- Email: `info@aldovia.in` (or a dedicated sales/events address if the client provides one — flag as a question)

**Validation/UX notes:**
- Inline validation, not just on-submit — required for a form this consequential
- Success state: on-page confirmation message, not just a redirect — keep the visitor on-brand rather than dropping them to a generic "thank you" page
- No CAPTCHA friction beyond what's necessary — every added field/step measurably reduces B2B inquiry conversion

**Responsive:** Single-column form on all breakpoints (multi-column forms increase error rates and aren't necessary here) — but the supporting phone/email block moves from a sidebar (desktop) to above-the-form (mobile).

---

## 4. Design Tokens Applied to This Page

Reusing the token set established in the prior design-system audit, refined with the color evidence from the venue photography:

```
COLOR (Estimated — confirm against brand PDF once accessible)
  --color-bg-primary       cream/off-white (site default)
  --color-venue-navy       deep navy — CONFIRMED signature color from carpet/seating
                            in all 5 supplied venue photos (~#1B2A4A estimate)
  --color-venue-gold       warm bronze/gold — CONFIRMED from wall paneling and
                            carpet pattern (~#B08D57 estimate)
  --color-text-primary     charcoal (site default)
  --color-cta              dark charcoal/brown solid (site default button pattern)

TYPOGRAPHY  — inherit site tokens (serif display / sans body / tracked-caps eyebrow)
  No new type scale needed for this page.

SPACING / GRID — inherit site tokens (section-band rhythm, full-bleed sections
  with constrained inner container)

COMPONENTS REUSED FROM SITE (do not rebuild):
  - Global header + mega-menu nav
  - Global footer (4-column sitemap)
  - Stat-block component (hero + capacity section)
  - Card component (amenities, event types, capacity)
  - Icon-plus-label pattern (nav-style icons for amenities list)
  - Marquee/announcement bar (inherit if active)
  - Gallery/lightbox component (reuse whatever powers existing image
    galleries elsewhere on the site, if one exists — otherwise this is
    a net-new component and should be flagged as such in your write-up)

NEW COLOR INTRODUCED: --color-venue-navy and --color-venue-gold are specific
  to this venue's actual photographed identity and are not part of the
  sitewide token set observed elsewhere. Recommend proposing these as an
  approved "venue accent" sub-palette rather than inventing them ad hoc —
  flag this explicitly to the client/brand team.
```

---

## 5. Animation & Interaction Spec

| Element | Behavior |
|---|---|
| Hero | Static image (no video) with scrim overlay; optional subtle Ken Burns zoom (2–3% scale over 8–10s) if matching the site's cinematic tone is desired — keep subtle, this is a B2B page |
| Scroll cue | Reuse the homepage's "SWIPE UP" indicator pattern at the hero's base for consistency |
| Section reveal | Fade-up on scroll for each section (standard, matches the restrained brand tone — no flashy parallax) |
| Stat numbers | Count-up animation on scroll-into-view for the hero stat strip (25,000 / 3,000) — a common, low-risk luxury-site pattern that reinforces the "numbers as proof" brand voice |
| Gallery | Lightbox with fade transition; no autoplay carousel — let the visitor control pacing given these are information-dense images (planners are evaluating, not just browsing) |
| Form | Inline validation states, no full-page reload on submit |

---

## 6. Responsive Breakpoint Behavior Summary

Using the estimated sitewide breakpoints (mobile <640px / tablet 640–1023px / desktop 1024px+):

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | Cropped image, stacked CTAs, 1-col stat strip | Full image, stat strip 3-col | Full image, stat strip 3-col |
| About | Stacked (image top, text bottom) | Stacked or 50/50 | 50/50 split |
| Capacity | Horizontal-scroll tables, 2-col seating cards | 2–3 col seating cards | Full table, 3–4 col seating cards |
| Amenities | 1-col icon list | 2-col grid | 3–4 col grid |
| Gallery | 1-col swipeable carousel | 2-col grid | 3-col grid or full lightbox grid |
| Event Types | 1-col cards | 2-col cards | 3-col cards |
| Form | 1-col, phone/email above form | 1-col, phone/email above form | 1-col form + sidebar phone/email |

---

## 7. Accessibility Checklist

- All 5 images require alt text as specified in Section 3.5 (drafted above)
- Color contrast: verify `--color-venue-navy` text-on-cream and cream-on-navy combinations meet WCAG AA before finalizing button/label colors
- Form: every field needs a programmatically associated `<label>`, not placeholder-only text
- Focus states on all interactive elements (nav, buttons, form fields, gallery lightbox controls)
- Video/animation: if any Ken Burns or count-up animation is used, respect `prefers-reduced-motion`

---

## 8. Open Questions / Assumptions Log

*(Carried forward and consolidated from all prior analysis — resolve before final build)*

1. **Brand PDF values** — exact hex codes and font family names still unconfirmed; page currently built against estimated tokens.
2. **Contact form fields** — the live site's actual form markup is JS-rendered and not inspectable; the field list in Section 3.7 is an industry-standard assumption, not a confirmed match to the existing site's form.
3. **Amenities specifics** — AV brand/specs, catering details, and accommodation-room-block policy are not in the data sheet; using placeholder copy per the brief's explicit allowance.
4. **Accommodation count (144 rooms)** — sourced from a third-party listing (WedMeGood), not from Aldovia's own site or the assignment's data sheet. Needs client confirmation before publishing as fact.
5. **Missing photography** — no images supplied for Pre-Function Area, Ocean Dining, or Ocean Lawn, despite all three being named/dimensioned spaces. Scope decision needed: request more photos, or omit visual coverage of those three spaces.
6. **Gallery/lightbox component** — unclear whether the live Aldovia site already has a reusable gallery component elsewhere (e.g. on a Rooms or Dining subpage) that should be reused, or whether this is net-new for this page.
7. **Dedicated sales email** — using the general `info@aldovia.in` by default; a dedicated events/sales address may exist and would be a better default for the form's recipient.

---

## 9. Integration Recommendation for Client's Dev Team

*(Per assignment deliverable requirement — "how you would recommend integrating this page into the live Aldovia site")*

- Build as a new route under the existing site's routing structure at `/ocean-convention-center`, inheriting the global header/footer/nav components rather than duplicating them — this page should **not** ship as an isolated static build that then needs to be manually reconciled with the live design system.
- Register the page in the existing `Events` mega-menu as a direct child, consistent with how `Convention Center` already appears in the nav — coordinate with the client on whether this new page **replaces** or **supplements** the existing `/convention` route, since both currently exist and may cause content overlap/cannibalization if left unresolved.
- If the client's site uses a CMS for content (room cards being async-loaded suggests some data-driven architecture already exists), the Capacity & Layout tables and Amenities list are strong candidates to be CMS-managed fields rather than hardcoded, since these numbers may change as the venue is renovated/expanded.
- Form submissions should route into whatever lead-capture system the client's sales team already uses (CRM, email forwarding, etc.) — this needs a direct conversation with their dev/ops team before go-live, since it's outside the scope of what's inferable from the public site.

---

*End of specification. This document is the reference for the next phase: content/copy drafting and component build.*
