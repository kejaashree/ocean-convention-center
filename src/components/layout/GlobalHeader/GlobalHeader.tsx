import React, { useEffect, useRef, useState } from "react";
import { UtilityBar } from "./UtilityBar";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import styles from "./GlobalHeader.module.css";

/**
 * GlobalHeader
 *
 * Post-review version: now a thin orchestrator. UtilityBar, DesktopNav, and
 * MobileNav were extracted into their own components (previously inlined
 * here as one 247-line file) per the PR review's component-architecture
 * finding — each is independently testable and matches the "one
 * component, one folder" convention from the project architecture doc.
 *
 * This component is intended to live in src/components/layout/GlobalHeader
 * and be imported, unmodified, by every page — including the Ocean
 * Convention Center page it was built for.
 */
export function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileNavOpen]);

  // Lock body scroll while the mobile nav overlay is open.
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  return (
    <>
      {/* Skip link — first focusable element on the page, required for
          keyboard users to bypass the nav on every page load. */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <UtilityBar />

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logo} aria-label="Aldovia — Home">
            {/* Full primary lockup (swan + wordmark), brown colourway —
                per Brand Guidelines Section 2.4 ("use the brown logo on
                light backgrounds"), which is what this header sits on
                (--color-bg-primary). The off-white/cream colourway is
                used instead wherever the surface is dark (see
                GlobalFooter, which sits on --color-venue-navy). */}
            <img
              src="/assets/logo/aldovia-lockup-brown.png"
              alt="Aldovia Resort &amp; Convention"
              className={styles.logoImage}
            />
          </a>

          <DesktopNav />

          <button
            ref={mobileToggleRef}
            type="button"
            className={styles.mobileMenuToggle}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <span className={styles.hamburgerIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        openSection={openMobileSection}
        onToggleSection={(label) =>
          setOpenMobileSection((current) => (current === label ? null : label))
        }
        toggleButtonRef={mobileToggleRef}
      />
    </>
  );
}
