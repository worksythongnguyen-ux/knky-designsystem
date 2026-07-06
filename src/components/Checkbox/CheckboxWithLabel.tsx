import { forwardRef, useId, type ReactNode } from "react";
import styles from "./CheckboxWithLabel.module.css";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { HelpText } from "../HelpText";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label: ReactNode;
  /** Optional line under the row (Figma "Help text" variant), rendered via HelpText. */
  helpText?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Checkbox + label row, with an optional help text line underneath. Design source:
 * Figma node 37:3769 ("Checkbox with label").
 */
export const CheckboxWithLabel = forwardRef<HTMLInputElement, CheckboxWithLabelProps>(
  function CheckboxWithLabel({ label, helpText, id, wrapperClassName, disabled, ...rest }, ref) {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    return (
      <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
        <div className={styles.row}>
          <Checkbox ref={ref} id={checkboxId} disabled={disabled} {...rest} />
          <label
            htmlFor={checkboxId}
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
