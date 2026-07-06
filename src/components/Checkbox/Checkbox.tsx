import { forwardRef, useLayoutEffect, useRef, type InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Figma "Small screen" variant. "small" = 18px (mobile), defaults to "large" (16px, desktop). */
  size?: "large" | "small";
  /** Validation error state (red border/fill) — prop-driven, not a native browser state. */
  error?: boolean;
  /** Dash/partial-selection visual. Applied via the native `indeterminate` DOM property (no HTML attribute exists for it), so it always overrides `checked` visually while true. */
  indeterminate?: boolean;
}

/**
 * A single checkbox. Design source: Figma node 37:3692 ("checkbox"), 5 states x 3
 * check values x 2 screen sizes. Built on a real `<input type="checkbox">` so
 * keyboard/mouse/native form behavior (including indeterminate) all come from the
 * platform — visuals are driven by native CSS pseudo-classes, only `error` is a prop.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = "large", error = false, indeterminate = false, className, disabled, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  // Deliberately no dependency array: re-applied on every render, not just when
  // `indeterminate` changes value. Browsers clear the native `indeterminate` DOM
  // property automatically on every user click (part of the checkbox's built-in
  // activation behavior) — if a parent cycles through unchecked -> indeterminate
  // -> checked -> unchecked and the `indeterminate` prop happens to read the same
  // boolean across two renders in a row, an effect gated on `[indeterminate]`
  // would skip re-syncing and the DOM could keep showing both the tick and the
  // dash at once. Running unconditionally keeps the DOM always matching the prop.
  useLayoutEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  });

  return (
    <span
      className={[styles.wrapper, styles[size], error ? styles.error : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type="checkbox"
        disabled={disabled}
        className={styles.input}
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className={styles.box}>
        <svg className={styles.tick} viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path
            d="M1 5L4.5 8.5L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className={styles.minus} viewBox="0 0 12 2" fill="none" aria-hidden="true">
          <rect width="12" height="2" rx="1" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
});
