import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./InputText.module.css";
import {
  AlertErrorIcon,
  AlertInfoIcon,
  AlertWarningIcon,
  CheckIcon,
  type IconTone,
} from "../Icon";
import { Link } from "../Link";

/**
 * Prefix/suffix icons switch to the "disabled" icon tone when the field is disabled
 * or read-only (Figma Dev Mode groups both states under the same disabled-tinted icon
 * asset). Only applies to elements that accept a `tone` prop (our own Icon
 * components); anything else passes through unchanged.
 */
function withAffixTone(node: ReactNode, tone: IconTone): ReactNode {
  // Only clone custom components (our Icon set), never raw DOM tags — cloning a plain
  // <span>/<svg> etc. with `tone` would leak it onto the DOM as an invalid attribute.
  if (isValidElement(node) && typeof node.type !== "string") {
    return cloneElement(node as ReactElement<{ tone?: IconTone }>, { tone });
  }
  return node;
}

/**
 * Prefix/suffix also support a plain text value (Figma "Assets/Prefix" / "Assets/Suffix"
 * — Text variant, e.g. a "$" currency prefix or "cm" unit suffix): bodyMg/Semibold,
 * secondary color, right-aligned. Icon elements are left untouched.
 */
function renderAffixContent(node: ReactNode): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    return <span className={styles.affixLabel}>{node}</span>;
  }
  return node;
}

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
   * Text shown below the input with an info icon. This is the default/lowest-priority
   * alert line message — overridden by `warningText`, `successText`, then `error`.
   */
  infoText?: ReactNode;
  /**
   * Warning message (Figma AlertLine "warning" state) — yellow caution icon/text.
   * Overridden by `error` when both are set.
   */
  warningText?: ReactNode;
  /**
   * Success / "correct info" message (Figma AlertLine "correct info" state) — green
   * check icon/text. Overridden by `warningText` or `error` when set.
   */
  successText?: ReactNode;
  /**
   * Error message. Truthy value switches the field into its error visual state
   * (red border/background) and takes over the alert line with this message + an
   * error icon — the highest-priority of the four alert line states.
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
    warningText,
    successText,
    error,
    size = "large",
    wrapperClassName,
    id,
    className,
    required,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpTextId = `${inputId}-help`;
  const alertId = `${inputId}-alert`;

  // Alert line has 4 mutually-exclusive states in Figma (error / warning / correct info
  // / info) — priority order matches severity: error wins, then warning, then success,
  // then the default info message.
  const alertState = error
    ? ("error" as const)
    : warningText
      ? ("warning" as const)
      : successText
        ? ("success" as const)
        : infoText
          ? ("info" as const)
          : null;
  const alertMessage = error ?? warningText ?? successText ?? infoText;
  const showAlertLine = alertState !== null;

  const describedBy =
    [helpText ? helpTextId : null, showAlertLine ? alertId : null].filter(Boolean).join(" ") ||
    undefined;

  if (import.meta.env.DEV && !label && !rest["aria-label"] && !rest["aria-labelledby"]) {
    // eslint-disable-next-line no-console
    console.warn(
      "[KNKY UI] InputText: no `label` was passed and no `aria-label`/`aria-labelledby` " +
        "either — screen reader users won't know what this field is for. `placeholder` " +
        "alone isn't a substitute for an accessible name.",
    );
  }

  const isDisabledOrReadOnly = Boolean(rest.disabled || rest.readOnly);
  const renderedPrefix = renderAffixContent(
    isDisabledOrReadOnly ? withAffixTone(prefix, "disabled") : prefix,
  );
  const renderedSuffix = renderAffixContent(
    isDisabledOrReadOnly ? withAffixTone(suffix, "disabled") : suffix,
  );

  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
      {(label || action) && (
        <div className={styles.labelGroup}>
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={inputId} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
              </label>
            )}
            {action && (
              <Link href={action.href} onClick={action.onClick}>
                {action.label}
              </Link>
            )}
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
        {prefix && <span className={styles.affix}>{renderedPrefix}</span>}
        <input
          ref={ref}
          id={inputId}
          className={[styles.input, className].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          {...rest}
        />
        {suffix && <span className={styles.affix}>{renderedSuffix}</span>}
      </div>

      {showAlertLine && (
        <div className={styles.alertLine} id={alertId}>
          {alertState === "error" && (
            <AlertErrorIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-critical-element)"
            />
          )}
          {alertState === "warning" && (
            <AlertWarningIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-caution-element)"
            />
          )}
          {alertState === "success" && (
            <CheckIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-success-element)"
            />
          )}
          {alertState === "info" && (
            <AlertInfoIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-link)"
            />
          )}
          <p
            className={[
              styles.alertText,
              alertState === "error" ? styles.errorText : null,
              alertState === "warning" ? styles.warningText : null,
              alertState === "success" ? styles.successText : null,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {alertMessage}
          </p>
        </div>
      )}
    </div>
  );
});
