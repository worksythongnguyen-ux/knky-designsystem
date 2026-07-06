import type { HTMLAttributes, ReactNode } from "react";
import styles from "./HelpText.module.css";

export interface HelpTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  /**
   * Figma's own default instance is indented 24px (sized to sit under a checkbox/
   * radio + label row). Set to `false` for flush/non-indented usage elsewhere.
   */
  indent?: boolean;
}

/**
 * Small secondary text used to explain a nearby control. Design source: Figma node
 * 37:3932 ("Utilities/Helptext"). Used under Checkbox/CheckboxWithLabel, but can be
 * reused anywhere a supplementary text line is needed.
 */
export function HelpText({ children, indent = true, className, ...rest }: HelpTextProps) {
  return (
    <p
      className={[styles.helpText, indent ? styles.indent : null, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </p>
  );
}
