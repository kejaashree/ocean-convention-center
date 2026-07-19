import React from "react";
import styles from "./FormField.module.css";

type FieldType = "text" | "email" | "tel" | "date" | "number" | "textarea" | "select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  /** Required when type is "select". */
  options?: SelectOption[];
}

/**
 * FormField
 *
 * Shared primitive covering every input type InquiryForm needs (text,
 * email, tel, date, number, textarea, select) behind one consistent
 * label/required-indicator/error-message contract, so that pattern isn't
 * hand-rolled eight separate times inside InquiryForm.tsx. Genuinely
 * reusable — nothing about this component is Ocean Convention Center or
 * even venue-specific.
 *
 * Accessibility: label is always a real <label htmlFor>, never a
 * placeholder standing in for one. Error messages are linked via
 * aria-describedby and announced through aria-invalid, so screen reader
 * users get the same validation feedback sighted users see via the red
 * error text — not conveyed by color alone.
 */
export function FormField({
  id,
  name,
  label,
  type,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  options,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  const sharedProps = {
    id,
    name,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": errorId,
    className: `${styles.input} ${error ? styles.inputError : ""}`,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredIndicator} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === "textarea" && (
        <textarea {...sharedProps} value={value} onChange={onChange} rows={5} placeholder={placeholder} />
      )}

      {type === "select" && (
        <select {...sharedProps} value={value} onChange={onChange}>
          <option value="">Select an event type</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {type !== "textarea" && type !== "select" && (
        <input {...sharedProps} type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}

      {error && (
        <p id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
