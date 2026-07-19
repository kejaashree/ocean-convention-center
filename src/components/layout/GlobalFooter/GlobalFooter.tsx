import React from "react";
import { footerColumns, socialLinks } from "../../../data/footer";
import { utilityContact } from "../../../data/navigation";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import styles from "./GlobalFooter.module.css";

/**
 * GlobalFooter
 *
 * Per the recovery audit's confirmed structure: 4-column sitemap, a
 * secondary text-based logo, full address, dual phone/email, the
 * "Formerly known as Clarks Exotica..." legacy-name disclosure, a full
 * social row, and a copyright line.
 *
 * Deliberately a single component, not split into subcomponents the way
 * GlobalHeader was — that split was justified by genuine interactive
 * complexity (flyouts, mobile accordion, scroll-triggered shrink). This
 * is static markup with no internal state beyond the reveal below, so one
 * file is the right size.
 *
 * Address and legacy-name text are sourced from the design-system audit's
 * confirmed footer content, not invented here.
 *
 * NOTE: the footer originally shipped with no scroll-reveal, on the
 * reasoning that global chrome (like the header) shouldn't animate the
 * same way page content sections do. That was a deliberate call at the
 * time — reversed here per an explicit "footer reveal" request in the
 * animation enhancement pass, not an oversight being corrected.
 */
export function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} ${revealClassName}`} ref={ref}>
        <div className={styles.topRow}>
          <div className={styles.brandColumn}>
            <a href="/" className={styles.logo} aria-label="Aldovia — Home">
              {/* Off-white/cream colourway per Brand Guidelines Section 2.4
                  ("use the off-white logo on dark backgrounds") — this
                  footer sits on --color-venue-navy (dark). Header uses the
                  brown colourway instead, for its light background. */}
              <img
                src="/assets/logo/aldovia-lockup-cream.png"
                alt="Aldovia Resort &amp; Convention"
                className={styles.logoImage}
              />
            </a>
            <p className={styles.legacyNote}>
              Formerly known as Clarks Exotica Convention Resort &amp; Spa
            </p>
            <address className={styles.address}>
              Aldovia Resort &amp; Convention, Devanahalli, Bengaluru, Karnataka, India
            </address>
          </div>

          <nav aria-label="Footer" className={styles.columnsGrid}>
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <ul className={styles.columnLinks}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.columnLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.contactRow}>
          <a href={`tel:${formatPhoneNumber(utilityContact.hotelPhone)}`} className={styles.contactLink}>
            {utilityContact.hotelPhone} (Hotel)
          </a>
          <a href={`tel:${formatPhoneNumber(utilityContact.salesPhone)}`} className={styles.contactLink}>
            {utilityContact.salesPhone} (Sales)
          </a>
          <a href={`mailto:${utilityContact.email}`} className={styles.contactLink}>
            {utilityContact.email}
          </a>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>&copy; {currentYear} Aldovia Heritage. All rights reserved.</p>

          <ul className={styles.socialRow} aria-label="Aldovia on social media">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={`Aldovia on ${social.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    aria-hidden="true"
                    className={styles.socialIcon}
                    style={{ "--icon-url": `url(/assets/icons/social/${social.icon})` } as React.CSSProperties}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
