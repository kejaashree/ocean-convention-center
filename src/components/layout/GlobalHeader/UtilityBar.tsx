import React from "react";
import { utilityContact } from "../../../data/navigation";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import styles from "./UtilityBar.module.css";

/**
 * The persistent phone/email bar above the main nav. Extracted as its own
 * component (was previously inlined in GlobalHeader.tsx) so it can be
 * tested and styled in isolation, per the "one component, one folder"
 * convention in the project architecture doc.
 */
export function UtilityBar() {
  return (
    <div className={styles.utilityBar}>
      <div className={styles.utilityBarInner}>
        <a href={`tel:${formatPhoneNumber(utilityContact.hotelPhone)}`}>
          {utilityContact.hotelPhone}
        </a>
        <span className={styles.utilityDivider} aria-hidden="true">
          |
        </span>
        <a href={`tel:${formatPhoneNumber(utilityContact.salesPhone)}`}>
          {utilityContact.salesPhone}
        </a>
        <span className={styles.utilityDivider} aria-hidden="true">
          |
        </span>
        <a href={`mailto:${utilityContact.email}`}>{utilityContact.email}</a>
      </div>
    </div>
  );
}
