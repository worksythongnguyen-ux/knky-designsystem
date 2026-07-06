import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Validation error state (red track/thumb) — prop-driven, not a native browser state. */
  error?: boolean;
}

/**
 * A single on/off switch. Design source: Figma node 168:3416 ("toggle"), 2 states
 * (Default/Disabled) x 2 values (on/off) x an error variant. Built on a real
 * `<input type="checkbox" role="switch">` so keyboard/mouse/native form behavior
 * all come from the platform — visuals are driven by native CSS pseudo-classes,
 * only `error` is a prop.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { error = false, className, disabled, ...rest },
  ref,
) {
  return (
    <span
      className={[styles.wrapper, error ? styles.error : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className={styles.input}
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className={styles.track} aria-hidden="true" />
      <span className={styles.thumb} aria-hidden="true" />
    </span>
  );
});
