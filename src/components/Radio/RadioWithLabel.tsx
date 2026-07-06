import { forwardRef, useId, type ReactNode } from "react";
import styles from "./RadioWithLabel.module.css";
import { Radio, type RadioProps } from "./Radio";
import { HelpText } from "../HelpText";

export interface RadioWithLabelProps extends RadioProps {
  label: ReactNode;
  /** Optional line under the row (Figma "Help text" variant), rendered via HelpText. */
  helpText?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Radio + label row, with an optional help text line underneath. Design source:
 * Figma node 145:2992 ("Radio button with label").
 */
export const RadioWithLabel = forwardRef<HTMLInputElement, RadioWithLabelProps>(
  function RadioWithLabel({ label, helpText, id, wrapperClassName, disabled, ...rest }, ref) {
    const generatedId = useId();
    const radioId = id ?? generatedId;

    return (
      <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
        <div className={styles.row}>
          <Radio ref={ref} id={radioId} disabled={disabled} {...rest} />
          <label
            htmlFor={radioId}
            className={[styles.label, disabled ? styles.labelDisabled : null]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        </div>
        {helpText && <HelpText>{helpText}</HelpText>}
      </div>
    );
  },
);
