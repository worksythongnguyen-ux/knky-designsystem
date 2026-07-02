import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./Button.module.css";
import { ArrowIcon, LoadingIcon } from "../Icon";

/**
 * "criticalSecondary" is Figma's Critical component's "Secondary" sub-type (node
 * 33:443) — a white/no-border button with red text, for a less visually heavy
 * destructive action than the solid "critical" fill.
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "critical" | "criticalSecondary";

/**
 * Figma names these "screenSize" variants Tiny / Large / Small — note the
 * confusing scale: Tiny (28px) is the shortest, then Large (36px), then Small
 * (40px, the tallest). Kept as-is to match the Figma component 1:1 rather than
 * renaming to a more intuitive sm/md/lg scale.
 */
export type ButtonSize = "tiny" | "large" | "small";

/**
 * Icons always inherit the button's own text color (white on Primary/Critical,
 * dark on Secondary/Tertiary) rather than using their own tone token — only
 * applied to our own Icon components, never raw DOM elements.
 */
function withCurrentColor(node: ReactNode): ReactNode {
  if (isValidElement(node) && typeof node.type !== "string") {
    return cloneElement(node as ReactElement<{ color?: string }>, { color: "currentColor" });
  }
  return node;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Design source: Figma "button - primary/secondary/tertiary/critical". */
  variant?: ButtonVariant;
  /** Figma "screenSize" — see the {@link ButtonSize} note about the naming/height order. */
  size?: ButtonSize;
  /** Icon shown before the label. If no label (`children`) is passed, the button
   * renders as a square icon-only button. */
  icon?: ReactNode;
  /**
   * Shows a spinner in place of the button's content and disables it. This is the
   * only state that needs a prop — hover/pressed/focus/disabled all come from
   * native CSS states (:hover, :active, :focus-visible, :disabled).
   */
  loading?: boolean;
  /**
   * Appends a down-chevron after the label (Figma "Type = Has options", on
   * Secondary/Tertiary) — use for a button that opens a menu/dropdown of options.
   * Ignored on icon-only buttons.
   */
  hasOptions?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "large",
    icon,
    loading = false,
    hasOptions = false,
    disabled,
    className,
    children,
    type = "button",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const isIconOnly = Boolean(icon) && !children;
  const showOptionsIndicator = hasOptions && !isIconOnly;
  const hasAccessibleName = Boolean(ariaLabel || ariaLabelledBy);

  if (import.meta.env.DEV && isIconOnly && !hasAccessibleName) {
    // eslint-disable-next-line no-console
    console.warn(
      "[KNKY UI] Button: icon-only buttons have no visible text — pass `aria-label` " +
        "(or `aria-labelledby`) so screen reader users know what the button does.",
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        isIconOnly ? styles.iconOnly : null,
        icon && !isIconOnly ? styles.hasIcon : null,
        showOptionsIndicator ? styles.hasOptions : null,
        loading ? styles.loading : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {loading ? (
        <>
          {withCurrentColor(<LoadingIcon size={20} title={isIconOnly ? undefined : "Loading"} />)}
          {/* Keep the original label announced to screen readers while the spinner
              replaces it visually, so a loading text button doesn't lose its name. */}
          {!isIconOnly && children && <span className={styles.visuallyHidden}>{children}</span>}
        </>
      ) : (
        <>
          {icon && withCurrentColor(icon)}
          {children}
          {showOptionsIndicator && <ArrowIcon direction="down" size={20} color="currentColor" />}
        </>
      )}
    </button>
  );
});
