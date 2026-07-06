import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Figma "Small screen" variant. "small" = 18px (mobile), defaults to "large" (16px, desktop). */
  size?: "large" | "small";
  /** Validation error state (red border/fill) — prop-driven, not a native browser state. */
  error?: boolean;
}

/**
 * A single radio button. Design source: Figma node 145:2874 ("Radio button"), 5
 * states x 2 check values x 2 screen sizes. Built on a real
 * `<input type="radio">` — pass a shared `name` to group multiple Radios so only
 * one can be selected, exactly like native HTML radio groups.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { size = "large", error = false, className, disabled, ...rest },
  ref,
) {
  return (
    <span
      className={[styles.wrapper, styles[size], error ? styles.error : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className={styles.input}
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className={styles.circle}>
        <svg className={styles.tick} viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path
            d="M1 5L4.5 8.5L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
});
