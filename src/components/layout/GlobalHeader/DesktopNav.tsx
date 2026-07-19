import React, { useEffect, useRef, useState } from "react";
import { primaryNav } from "../../../data/navigation";
import type { NavItem } from "../../../types/venue.types";
import styles from "./DesktopNav.module.css";

/**
 * Desktop primary nav with flyout mega-menus for "Stay" and "Events".
 *
 * FIXED (PR review, Accessibility #1 — Critical): flyouts previously only
 * opened on mouse hover. The trigger button had aria-expanded/aria-haspopup
 * set but no onClick or onFocus handler, so keyboard users could never see
 * sub-items — the ARIA was promising support that didn't exist. Flyouts
 * now open on click, on keyboard focus, and on hover, and close on
 * Escape, outside click, or focus genuinely leaving the item (checked via
 * relatedTarget so moving focus between the trigger and its own flyout
 * links doesn't prematurely close it).
 */
export function DesktopNav() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenItem(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenItem(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleItemBlur(event: React.FocusEvent<HTMLLIElement>, label: string) {
    // Only close if focus is moving somewhere outside this specific <li>
    // (i.e. not to the trigger button or one of its own flyout links).
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpenItem((current) => (current === label ? null : current));
    }
  }

  return (
    <nav aria-label="Primary" className={styles.desktopNav} ref={navRef}>
      <ul className={styles.navList}>
        {primaryNav.map((item) => {
          const isOpen = openItem === item.label;
          const flyoutId = `flyout-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <li
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => item.subItems && setOpenItem(item.label)}
              onMouseLeave={() => item.subItems && setOpenItem(null)}
              onBlur={(event) => handleItemBlur(event, item.label)}
            >
              <NavTrigger
                item={item}
                isOpen={isOpen}
                flyoutId={flyoutId}
                onToggle={() => setOpenItem((current) => (current === item.label ? null : item.label))}
                onFocus={() => item.subItems && setOpenItem(item.label)}
              />
              {item.subItems && (
                <FlyoutMenu id={flyoutId} item={item} isOpen={isOpen} />
              )}
            </li>
          );
        })}
      </ul>
      <a href="#inquiry-form" className={styles.ctaNavItem}>
        Get in Touch
      </a>
    </nav>
  );
}

function NavTrigger({
  item,
  isOpen,
  flyoutId,
  onToggle,
  onFocus,
}: {
  item: NavItem;
  isOpen: boolean;
  flyoutId: string;
  onToggle: () => void;
  onFocus: () => void;
}) {
  if (!item.subItems) {
    return (
      <a href={item.href} className={styles.navLink}>
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={styles.navLink}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={flyoutId}
      onClick={onToggle}
      onFocus={onFocus}
    >
      {item.label}
    </button>
  );
}

function FlyoutMenu({ id, item, isOpen }: { id: string; item: NavItem; isOpen: boolean }) {
  if (!item.subItems) return null;

  return (
    <div id={id} role="menu" className={`${styles.flyout} ${isOpen ? styles.flyoutOpen : ""}`}>
      <ul className={styles.flyoutList}>
        {item.subItems.map((subItem) => (
          <li key={subItem.label} role="none">
            <a href={subItem.href} className={styles.flyoutLink} role="menuitem">
              <span
                className={styles.flyoutIcon}
                aria-hidden="true"
                style={{ "--icon-url": `url(/assets/icons/nav/${subItem.icon})` } as React.CSSProperties}
              />
              {subItem.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
