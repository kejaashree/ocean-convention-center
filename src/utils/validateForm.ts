import type { InquiryFormData, InquiryFormErrors } from "../types/venue.types";

/**
 * Minimal, defensible email format check — not a full RFC 5322
 * implementation (those are a well-known trap of false negatives on valid
 * addresses). Good enough to catch obvious typos without being overly
 * strict about edge-case-valid addresses.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Accepts digits, spaces, parentheses, hyphens, and an optional leading
 * "+", with at least 7 digits total — permissive enough for
 * international formats without rejecting legitimate numbers over a
 * narrow country-specific pattern.
 */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,}$/;

/**
 * validateForm
 *
 * Pure function: given the current form values, returns an errors object
 * with only the fields that currently fail validation. Required fields
 * match the content spec's InquiryForm requirement list exactly — Full
 * Name, Company, Email, Phone, and Expected Guest Count are required;
 * Event Date, Event Type, and Message are optional, matching the content
 * spec's explicit "(required)" / "(optional)" annotations per field.
 */
export function validateForm(values: InquiryFormData): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.company.trim()) {
    errors.company = "Company or organisation is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.guestCount.trim()) {
    errors.guestCount = "Expected guest count is required.";
  } else {
    const parsed = Number(values.guestCount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      errors.guestCount = "Enter a valid number of guests.";
    }
  }

  return errors;
}
