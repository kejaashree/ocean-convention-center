import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import { EyebrowLabel } from "../../components/ui/EyebrowLabel/EyebrowLabel";
import { StatBlock } from "../../components/ui/StatBlock/StatBlock";
import { INTRO_SESSION_KEY } from "../../components/intro/BrandIntro/BrandIntro";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { StatBlockData } from "../../types/venue.types";
import styles from "./Hero.module.css";

/**
 * How long BrandIntro's own exit takes (mount -> fully faded), so Hero's
 * entrance can begin exactly as the intro panel finishes dissolving
 * rather than racing it or leaving a dead gap. Kept as a local constant
 * rather than importing BrandIntro's internal timing, since the exact
 * number here is a Hero-side animation decision, not something BrandIntro
 * needs to expose as part of its own contract.
 */
const INTRO_HANDOFF_DELAY_MS = 2500;

const heroStats: StatBlockData[] = [
  { value: 25000, suffix: "", label: "Sq Ft" },
  { value: 3000, suffix: "", label: "Seater" },
  { value: 0, isText: true, textValue: "Pillar-less", label: "Design" },
];

/**
 * Hero
 *
 * Per the content specification (Section 3.1): establishes scale and
 * premium positioning immediately. Background is a static architectural
 * photograph (not autoplay video, unlike the homepage) — a still,
 * symmetrical shot reads stronger for a B2B/event-planner audience who
 * want to see the room, not be sold a mood.
 *
 * Image asset: replace `/assets/images/hero/ocean-hall-theater-3000.jpg`
 * with the optimized, multi-size WebP/JPEG set per the performance
 * checklist. This is the page's designated LCP element — it must load
 * eagerly, not lazily.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  // False on first render (both server and client) so there's no
  // hydration mismatch; flipped true client-side once it's time for the
  // headline/subtext/CTAs/stats to fade up. Content is always in the
  // markup regardless — this only ever toggles a CSS class, so it never
  // gates what's actually readable if JS is slow or disabled.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEntered(true);
      return;
    }
    const introAlreadySeen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    const timer = window.setTimeout(
      () => setEntered(true),
      introAlreadySeen ? 0 : INTRO_HANDOFF_DELAY_MS
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className={styles.hero} aria-label="Ocean Convention Center introduction">
      <div className={styles.imageWrapper}>
        {/*
          A single <img srcSet> can only vary by width, not by format — it
          has no mechanism to skip a format the browser can't decode. Real
          WebP-with-JPEG-fallback requires <picture><source type="..."> so
          browsers without WebP support fall through to the <img> below.
        */}
        <picture>
          <source
            type="image/webp"
            srcSet="
              /assets/images/hero/ocean-hall-theater-3000-640.webp 640w,
              /assets/images/hero/ocean-hall-theater-3000-1024.webp 1024w,
              /assets/images/hero/ocean-hall-theater-3000-1920.webp 1920w
            "
            sizes="100vw"
          />
          <img
            src="/assets/images/hero/ocean-hall-theater-3000-1920.jpg"
            srcSet="
              /assets/images/hero/ocean-hall-theater-3000-640.jpg 640w,
              /assets/images/hero/ocean-hall-theater-3000-1024.jpg 1024w,
              /assets/images/hero/ocean-hall-theater-3000-1920.jpg 1920w
            "
            sizes="100vw"
            alt="Empty Ocean Convention Center hall set in theatre-style seating for 3,000, pillar-less design"
            className={styles.heroImage}
            // fetchPriority requires React 18.3+ / @types/react with DOM
            // lib update; if the project's React version predates that,
            // drop this prop and set the equivalent via a <link rel="preload">
            // for the hero image in the document head instead.
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`${styles.content} ${entered ? styles.entered : ""}`}>
        <EyebrowLabel onDark>Ocean Convention Center</EyebrowLabel>

        <h1 className={styles.headline}>
          Grand Enough for 3,000. <br className={styles.lineBreak} />
          Precise Enough for One.
        </h1>

        <p className={styles.subtext}>
          A purpose-built, pillar-less convention venue with seating for up to 3,000 — 10
          minutes from Kempegowda International Airport.
        </p>

        <div className={styles.ctaGroup}>
          <Button
            href="#inquiry-form"
            variant="primary"
            onClick={(event) => handleAnchorScroll(event, "inquiry-form")}
          >
            Request a Proposal
          </Button>
          <Button
            href="#gallery"
            variant="secondary"
            onClick={(event) => handleAnchorScroll(event, "gallery")}
          >
            View the Venue
          </Button>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollCue}
        onClick={() => scrollToId("about-venue")}
        aria-label="Scroll to learn more"
      >
        <span className={styles.scrollCueLabel}>Swipe Up</span>
        <span className={styles.scrollCueIcon} aria-hidden="true" />
      </button>

      <div className={`${styles.statRow} ${entered ? styles.entered : ""}`}>
        {heroStats.map((stat) => (
          <StatBlock key={stat.label} stat={stat} onDark />
        ))}
      </div>
    </section>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleAnchorScroll(
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  id: string
) {
  event.preventDefault();
  scrollToId(id);
}
