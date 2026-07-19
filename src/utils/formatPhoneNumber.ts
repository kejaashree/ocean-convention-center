/**
 * formatPhoneNumber
 *
 * Strips whitespace from a phone number for use in a `tel:` href, e.g.
 * formatPhoneNumber("+91 80 3507 7000") -> "+918035077000".
 *
 * This exact transform has been duplicated inline in UtilityBar.tsx and
 * MobileNav.tsx since the Header build (`.replace(/\s/g, "")`), flagged as
 * tech debt in the recovery audit with the explicit note that it should be
 * resolved once a third call site appeared. InquiryForm is that third
 * call site. Per the InquiryForm dependency analysis: this utility is
 * created and used here; retrofitting UtilityBar/MobileNav to also call it
 * is left as a separate, explicit cleanup decision rather than bundled
 * into this section's build, since that would mean modifying two
 * already-shipped, already-reviewed files outside this task's scope.
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s/g, "");
}
