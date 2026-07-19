import React from "react";
import { dimensions } from "../../data/dimensions";
import styles from "./DimensionsTable.module.css";

/**
 * DimensionsTable
 *
 * Renders the four-row space dimensions table (Ocean Convention Center,
 * Pre Function Area, Ocean Dining, Ocean Lawn) using real semantic <table>
 * markup with <th scope="col"> column headers, per the accessibility
 * requirement in the content spec: "screen-reader table navigation" needs
 * proper table markup, not a div-grid pretending to be a table.
 *
 * On mobile, the table is wrapped in a horizontally scrollable container
 * rather than compressing columns unreadably, per the responsive spec.
 * A visible scroll affordance (fade edge) hints that more content exists
 * off-screen without relying on the user discovering it by accident.
 */
export function DimensionsTable() {
  return (
    <div className={styles.scrollWrapper} role="region" aria-label="Space dimensions" tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Dimensions for each space within the Ocean Convention Center
        </caption>
        <thead>
          <tr>
            <th scope="col">Space</th>
            <th scope="col">Area</th>
            <th scope="col">Width</th>
            <th scope="col">Length</th>
            <th scope="col">Height</th>
          </tr>
        </thead>
        <tbody>
          {dimensions.map((row) => (
            <tr key={row.space}>
              <th scope="row">{row.space}</th>
              <td>{row.area}</td>
              <td>{row.width}</td>
              <td>{row.length}</td>
              <td>{row.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
