import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  /**
   * Which surface this button sits on. "dark" (default) is for use over
   * photographic/dark backgrounds like the Hero; "light" applies the
   * secondaryOnLight treatment for use in standard content sections
   * (e.g. About, Amenities) where the background is --color-bg-primary.
   * Only affects the "secondary" variant — primary is surface-agnostic.
   */
  surface?: "dark" | "light";
  children: React.ReactNode;
  className?: string;
}

// Supports rendering as either a native <button> (for in-page actions like
// scroll-to-anchor) or an <a> (for real navigation), without duplicating
// the component. This mirrors how the CTAs are used across the site: some
// are links ("Explore the Resort" -> /rooms), some are actions (scroll to
// the inquiry form).
type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  surface = "dark",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const combinedClassName = [
    styles.button,
    variant === "primary" ? styles.primary : styles.secondary,
    variant === "secondary" && surface === "light" ? styles.secondaryOnLight : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={combinedClassName} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type ?? "button"} className={combinedClassName} {...buttonRest}>
      {children}
    </button>
  );
}
