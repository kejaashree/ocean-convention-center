import type { AppProps } from "next/app";
import { Fraunces, Public_Sans } from "next/font/google";
// Global CSS (tokens.css, breakpoints.css) can ONLY be imported here in
// Next.js Pages Router — importing global (non-Module) CSS from any other
// file throws a build error. Before this file existed, tokens.css and
// breakpoints.css were never imported anywhere in the project: every
// var(--color-...), var(--space-...), etc. reference across every
// component would have resolved to nothing, because the :root custom
// properties defining them were never actually loaded into the page.
import "../src/styles/tokens.css";
import "../src/styles/breakpoints.css";

/**
 * Font strategy
 * -------------
 * The brand's real typefaces (Lust Text / Area Normal) are Adobe Fonts —
 * a paid, license-gated kit that isn't available for this take-home, so
 * --font-display / --font-body in tokens.css were previously resolving
 * to their generic fallbacks (Georgia / system-ui) with nothing in
 * between. That's a visible design-fidelity gap: headings and body text
 * were rendering in a completely different typeface family than the
 * brand specifies.
 *
 * Fix: self-host close, freely-licensed stand-ins via next/font (zero
 * external network requests, no CLS/layout shift, no reliance on Adobe's
 * CDN being reachable) and slot them in as the fallback tier — so the
 * page reads as an elegant display-serif/clean-sans pairing today, and
 * upgrades automatically to the real Lust Text / Area Normal the moment
 * an Adobe Fonts kit ID is added (see tokens.css for exactly where).
 *  - Fraunces:   a high-contrast display serif, same register as Lust
 *                Text (editorial, warm, not a geometric serif like Georgia)
 *  - Public Sans: a clean, neutral grotesque in the same family as Area
 *                 Normal, with the weight range (400-800) the brand scale needs
 */
const displayFallback = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-fallback",
  display: "swap",
});

const bodyFallback = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-body-fallback",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${displayFallback.variable} ${bodyFallback.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
