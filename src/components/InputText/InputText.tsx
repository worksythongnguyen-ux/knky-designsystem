import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./InputText.module.css";
import { AlertErrorIcon, AlertInfoIcon } from "../Icon";

export interface InputTextAction {
  /** Text of the small link shown to the right of the label (e.g. "Forgot password?"). */
  label: string;
  /** Renders the action as an <a> when set. */
  href?: string;
  onClick?: () => void;
}

export interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
  /** Field label, shown above the input. */
  label?: ReactNode;
  /** Small helper text shown under the label, above the input. */
  helpText?: ReactNode;
  /** Optional link/action shown next to the label (Figma: "link" sub-action). */
  action?: InputTextAction;
  /** Icon or element shown at the start of the input. */
  prefix?: ReactNode;
  /** Icon or element shown at the end of the input. */
  suffix?: ReactNode;
  /**
   * Text shown below the input with an info icon. Ignored when `error` is set — the
   * error message takes over that space instead.
   */
  infoText?: ReactNode;
  /**
   * Error message. Truthy value switches the field into its error visual state
   * (red border/background) and replaces `infoText` with this message + an error icon.
   */
  error?: ReactNode;
  /**
   * Figma "Screen size" variant. "small" matches the mobile spec (taller box, 16px
   * input text to avoid iOS auto-zoom-on-focus). Defaults to "large" (desktop).
   */
  size?: "large" | "small";
  /** className applied to the outer wrapper (label + input box + alert line). */
  wrapperClassName?: string;
}

/**
 * Single-line text field. Design source: Figma node 112:4385 ("input-text"), 8 states x
 * 2 screen sizes. Hover/focus/filled/disabled/read-only are handled purely via native
 * CSS states (:hover, :focus-within, :not(:placeholder-shown), :disabled, :read-only) —
 * only `error` needs to be passed explicitly, since it's a validation result rather than
 * a browser-native input state.
 */
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  {
    label,
    helpText,
    action,
    prefix,
    suffix,
    infoText,
    error,
    size = "large",
    wrapperClassName,
    id,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpTextId = `${inputId}-help`;
  const alertId = `${inputId}-alert`;
  const showAlertLine = Boolean(error || infoText);

  const describedBy =
    [helpText ? helpTextId : null, showAlertLine ? alertId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
      {(label || action) && (
        <div className={styles.labelGroup}>
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={inputId} className={styles.label}>
                {label}
              </label>
            )}
            {action &&
              (action.href ? (
                <a href={action.href} className={styles.action}>
                  {action.label}
                </a>
              ) : (
                <button type="button" onClick={action.onClick} className={styles.action}>
                  {action.label}
                </button>
              ))}
          </div>
          {helpText && (
            <p id={helpTextId} className={styles.helpText}>
              {helpText}
            </p>
          )}
        </div>
      )}

      <div
        className={[styles.box, styles[size], error ? styles.error : null]
          .filter(Boolean)
          .join(" ")}
      >
        {prefix && <span className={styles.affix}>{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          className={[styles.input, className].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {suffix && <span className={styles.affix}>{suffix}</span>}
      </div>

      {showAlertLine && (
        <div className={styles.alertLine} id={alertId}>
          {error ? (
            <AlertErrorIcon size={16} className={styles.alertIcon} color="var(--knky-color-status-critical-element)" />
          ) : (
            <AlertInfoIcon size={16} className={styles.alertIcon} />
          )}
          <p className={[styles.alertText, error ? styles.errorText : null].filter(Boolean).join(" ")}>
            {error || infoText}
          </p>
        </div>
      )}
    </div>
  );
});
