import React, { useRef, useState } from "react";
import { seatingConfigs } from "../../data/seatingConfigs";
import styles from "./SeatingConfigurator.module.css";

/**
 * SeatingConfigurator
 *
 * Replaces the static seating-config grid with an interactive tab panel:
 * pick a layout, see its capacity and a one-line brief update instantly.
 * Same underlying data as before (seatingConfigs) — this only changes how
 * it's browsed, from "scan six cards" to "compare layouts one at a time,"
 * which is closer to how a planner actually decides between formats.
 *
 * Built as a standard WAI-ARIA tabs pattern (role="tablist"/"tab"/
 * "tabpanel", roving tabindex, arrow-key navigation) rather than a plain
 * button row, so it's still fully operable by keyboard and announced
 * correctly by a screen reader — not just a mouse/visual interaction.
 */
export function SeatingConfigurator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = seatingConfigs[activeIndex];

  const focusTab = (index: number) => {
    const wrapped = (index + seatingConfigs.length) % seatingConfigs.length;
    setActiveIndex(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(seatingConfigs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.configurator}>
      <div
        className={styles.tabList}
        role="tablist"
        aria-label="Seating configuration"
        onKeyDown={handleKeyDown}
      >
        {seatingConfigs.map((config, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={config.name}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`seating-tab-${config.name}`}
              aria-selected={isActive}
              aria-controls="seating-tabpanel"
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={styles.tabIcon}
                aria-hidden="true"
                style={{ "--icon-url": `url(/assets/icons/seating/${config.icon})` } as React.CSSProperties}
              />
              <span className={styles.tabLabel}>{config.name}</span>
              <span className={styles.tabCap}>
                {config.capacity !== null ? config.capacity.toLocaleString() : "On request"}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={styles.display}
        role="tabpanel"
        id="seating-tabpanel"
        aria-labelledby={`seating-tab-${active.name}`}
        tabIndex={0}
      >
        <span className={styles.displayLabel}>{active.name}</span>
        <span
          className={active.capacity !== null ? styles.displayNum : styles.displayNumUnavailable}
        >
          {active.capacity !== null ? active.capacity.toLocaleString() : "Not offered"}
        </span>
        <p className={styles.displayDesc}>{active.description}</p>
      </div>
    </div>
  );
}
