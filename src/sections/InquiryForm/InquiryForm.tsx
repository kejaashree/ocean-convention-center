import React, { useEffect, useState } from "react";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { FormField } from "../../components/ui/FormField/FormField";
import { Button } from "../../components/ui/Button/Button";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { validateForm } from "../../utils/validateForm";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { utilityContact } from "../../data/navigation";
import { eventTypes } from "../../data/eventTypes";
import type { InquiryFormData, InquiryFormErrors } from "../../types/venue.types";
import styles from "./InquiryForm.module.css";

const INITIAL_VALUES: InquiryFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  eventType: "",
  message: "",
};

const EVENT_TYPE_OPTIONS = eventTypes.map((item) => ({ value: item.label, label: item.label }));

/**
 * InquiryForm
 *
 * Per the content specification (Section 3.7): "the money moment" — the
 * page's entire KPI depends on this section converting. Owns all form
 * state locally (values, errors, submission status) via useState; no
 * dedicated hook, since this is the only form in the project and
 * extracting hook logic for a single consumer would be an unnecessary
 * abstraction, per this section's own dependency analysis.
 *
 * Form submission is currently simulated (a timeout, not a real network
 * call) — wiring this to an actual lead-capture system is explicitly
 * called out as a client-dev-team integration task in the content spec's
 * Section 9, not something resolvable from the assignment brief alone.
 */
export function InquiryForm() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [values, setValues] = useState<InquiryFormData>(INITIAL_VALUES);
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Incremented only on a failed submit attempt (never on ordinary
  // per-field error-clearing during typing) — see the effect below for
  // why this needs to be a separate signal from `errors` itself.
  const [failedSubmitCount, setFailedSubmitCount] = useState(0);

  const revealClassName = [styles.revealable, isVisible ? styles.revealed : ""]
    .filter(Boolean)
    .join(" ");

  // Move focus to the first invalid field, but only right after a failed
  // submit attempt — gated on failedSubmitCount rather than `errors`
  // directly, because `errors` also changes on ordinary per-field
  // clearing while typing (see handleChange), and re-firing this on
  // every one of those would yank focus toward a *different* still-
  // invalid field while the person is mid-correction on the current one.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (failedSubmitCount === 0) return;
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      document.getElementById(firstErrorField)?.focus();
    }
  }, [failedSubmitCount]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error the moment the person starts correcting it,
    // rather than making them wait for a full re-submit to see it clear.
    setErrors((current) => {
      if (!current[name as keyof InquiryFormData]) return current;
      const next = { ...current };
      delete next[name as keyof InquiryFormData];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setFailedSubmitCount((count) => count + 1);
      return;
    }

    setIsSubmitting(true);
    // Placeholder for the real lead-capture integration (CRM/email
    // forwarding) — see the integration recommendation in the content
    // spec. Simulated here so the success-state UX can be built and
    // reviewed now, without a backend dependency.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  return (
    <section id="inquiry-form" className={styles.inquiryForm} aria-labelledby="inquiry-form-heading">
      <div className={styles.inner} ref={ref}>
        <SectionHeading
          id="inquiry-form-heading"
          eyebrow="Get in Touch"
          title="Plan Your Event"
          supportingText="Tell us about your event and our team will follow up with a proposal."
          className={`${styles.heading} ${revealClassName}`}
        />

        <div className={`${styles.layout} ${revealClassName}`}>
          <aside className={styles.contactSidebar} aria-label="Direct contact details">
            <p className={styles.sidebarLabel}>Prefer to talk directly?</p>
            <a href={`tel:${formatPhoneNumber(utilityContact.hotelPhone)}`} className={styles.contactLink}>
              {utilityContact.hotelPhone}
              <span className={styles.contactLinkTag}>Hotel</span>
            </a>
            <a href={`tel:${formatPhoneNumber(utilityContact.salesPhone)}`} className={styles.contactLink}>
              {utilityContact.salesPhone}
              <span className={styles.contactLinkTag}>Sales</span>
            </a>
            <a href={`mailto:${utilityContact.email}`} className={styles.contactLink}>
              {utilityContact.email}
            </a>
          </aside>

          {isSuccess ? (
            <div className={styles.successState} role="status">
              <h3 className={styles.successHeading}>Thank you — we&apos;ve received your inquiry.</h3>
              <p className={styles.successBody}>
                Our events team will follow up with a proposal shortly. If your event is coming up
                quickly, feel free to call the Sales line above directly.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGrid}>
                <FormField
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  type="text"
                  required
                  value={values.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                />
                <FormField
                  id="company"
                  name="company"
                  label="Company / Organisation"
                  type="text"
                  required
                  value={values.company}
                  onChange={handleChange}
                  error={errors.company}
                />
                <FormField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <FormField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  required
                  value={values.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <FormField
                  id="eventDate"
                  name="eventDate"
                  label="Event Date"
                  type="date"
                  value={values.eventDate}
                  onChange={handleChange}
                  error={errors.eventDate}
                />
                <FormField
                  id="guestCount"
                  name="guestCount"
                  label="Expected Guest Count"
                  type="number"
                  required
                  value={values.guestCount}
                  onChange={handleChange}
                  error={errors.guestCount}
                />
                <FormField
                  id="eventType"
                  name="eventType"
                  label="Event Type"
                  type="select"
                  value={values.eventType}
                  onChange={handleChange}
                  options={EVENT_TYPE_OPTIONS}
                  error={errors.eventType}
                />
              </div>

              <FormField
                id="message"
                name="message"
                label="Additional Details"
                type="textarea"
                value={values.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Tell us more about your event..."
              />

              <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Sending..." : "Request a Proposal"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
