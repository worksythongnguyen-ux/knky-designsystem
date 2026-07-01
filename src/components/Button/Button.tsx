import React from "react";
import styles from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Content rendered inside the button, e.g. "Save", "Delete", "Confirm" */
  children: React.ReactNode;
  /** If true, the button fills the full width of its container */
  fullWidth?: boolean;
};

/**
 * Button (primary)
 *
 * Used for primary actions in the interface: "Save", "Add", "Confirm"...
 * Per the Figma usage description: only use another button style if
 * an action needs more or less visual emphasis than this one.
 *
 * Design source: Figma node 75:11225 ("button - primary")
 */
export function Button({
  children,
  fullWidth = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  const classNames = [
    styles.button,
    disabled ? styles.disabled : "",
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classNames} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
