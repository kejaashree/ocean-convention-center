import React, { useEffect, useRef } from "react";
import { primaryNav } from "../../../data/navigation";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  openSection: string | null;
  onToggleSection: (label: string) => void;
  /** Ref to the hamburger toggle button, so we can return focus to it on close. */
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * Full-screen mobile nav overlay, structurally separate from DesktopNav
 * (not a CSS-hidden duplicate), matching the dual-markup pattern confirmed
 * on the live site.
 *
 * FIXED (PR review, Accessibility #2 — Critical): previously, links inside
 * this panel stayed in the Tab order even while the panel was visually
 * off-screen (translateX(100%)), so keyboard users would tab into
 * invisible navigation before reaching real page content. `inert` now
 * removes the whole subtree from the tab order and from find-in-page /
 * screen-reader traversal whenever the panel is closed. Focus also now
 * moves into the panel on open and back to the toggle button on close,
 * which is expected behavior for a full-screen nav overlay.
 */
export function MobileNav({
  isOpen,
  onClose,
  openSection,
  onToggleSection,
  toggleButtonRef,
}: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    } else {
      toggleButtonRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}
      // `inert` removes this entire subtree from tab order, screen-reader
      // virtual cursor, and find-in-page while closed — @types/react 18.3
      // (this project's installed version, per the frozen tech spec)
      // types `inert` as boolean, confirmed by an actual tsc run during
      // the Project Integration Review, which caught an earlier version
      // of this line incorrectly using a string-typed cast.
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      <ul className={styles.mobileNavList}>
        {primaryNav.map((item, index) => (
          <li key={item.label} className={styles.mobileNavItem}>
            {item.subItems ? (
              <>
                <button
                  type="button"
                  className={styles.mobileNavSectionToggle}
                  aria-expanded={openSection === item.label}
                  onClick={() => onToggleSection(item.label)}
                >
                  {item.label}
                  <span
                    className={`${styles.chevron} ${
                      openSection === item.label ? styles.chevronOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <ul
                  className={`${styles.mobileSubNavList} ${
                    openSection === item.label ? styles.mobileSubNavListOpen : ""
                  }`}
                >
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <a
                        href={subItem.href}
                        className={styles.mobileSubNavLink}
                        onClick={onClose}
                      >
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={item.href}
                className={styles.mobileNavLink}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={onClose}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <a href="#inquiry-form" className={styles.mobileCta} onClick={onClose}>
        Get in Touch
      </a>
    </div>
  );
}
