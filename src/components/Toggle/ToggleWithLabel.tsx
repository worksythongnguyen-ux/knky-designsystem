import { forwardRef, useId, type ReactNode } from "react";
import styles from "./ToggleWithLabel.module.css";
import { Toggle, type ToggleProps } from "./Toggle";
import { HelpText } from "../HelpText";

export interface ToggleWithLabelProps extends ToggleProps {
  label: ReactNode;
  /** Optional line under the row (Figma "Help text" variant), rendered via HelpText. */
  helpText?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Toggle + label row, with an optional help text line underneath. Design source:
 * Figma node 2006:2881 ("Toggle with label").
 */
export const ToggleWithLabel = forwardRef<HTMLInputElement, ToggleWithLabelProps>(
  function ToggleWithLabel({ label, helpText, id, wrapperClassName, disabled, ...rest }, ref) {
    const generatedId = useId();
    const toggleId = id ?? generatedId;

    return (
      <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
        <div className={styles.row}>
          <Toggle ref={ref} id={toggleId} disabled={disabled} {...rest} />
          <label
            htmlFor={toggleId}
            className={[styles.label, disabled ? styles.labelDisabled : null]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        </div>
        {helpText && (
          <HelpText indent={false} className={styles.helpTextIndent}>
            {helpText}
          </HelpText>
        )}
      </div>
    );
  },
);
