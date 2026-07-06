import { cloneElement, forwardRef, isValidElement, type ReactElement, type ReactNode, type Ref } from "react";
import styles from "./Link.module.css";

/**
 * Forces the icon to `color: currentColor` so it always matches the Link's own
 * text color (blue for "text", text-primary for "tertiary") and follows it through
 * hover/focus color changes automatically, instead of falling back to the icon's
 * own default gray tone. Same pattern as Button's `withCurrentColor`. Only clones
 * non-DOM elements (our own Icon components) — never a raw <span>/<svg>, which
 * would leak `color` onto the DOM as an invalid attribute.
 */
function withCurrentColor(node: ReactNode): ReactNode {
  if (isValidElement(node) && typeof node.type !== "string") {
    return cloneElement(node as ReactElement<{ color?: string }>, { color: "currentColor" });
  }
  return node;
}

export type LinkVariant = "text" | "tertiary";

export interface LinkProps {
  children: ReactNode;
  /** Figma "Type": "text" (default, blue link) or "tertiary" (muted, text-primary color). */
  variant?: LinkVariant;
  /** Trailing icon (Figma "Include Icon" type). */
  icon?: ReactNode;
  /** Renders as an `<a>` when set; otherwise renders a `<button type="button">`. */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Small inline link/action. Design source: Figma node 31:1689 ("link"), 2 types x
 * 3 states. Used for things like a "Forgot password?" link or the small "Link"
 * sub-action next to a form field's label (InputText/InputSelect `action` prop).
 */
export const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(function Link(
  { children, variant = "text", icon, href, target, rel, onClick, disabled = false, className, ...rest },
  ref,
) {
  const classes = [styles.link, styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className={styles.icon}>{withCurrentColor(icon)}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
});
