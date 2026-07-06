import { forwardRef, type ReactNode, type Ref } from "react";
import styles from "./Link.module.css";

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
      {icon && <span className={styles.icon}>{icon}</span>}
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
