import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./SectionTitle.module.css";

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  /** Section heading text (Figma: bodyLg/Regular, secondary color). */
  label: ReactNode;
  /** Optional secondary line under the label. */
  helperText?: ReactNode;
  /** Shows a top border divider — use for every section after the first one in a grouped list. */
  divider?: boolean;
}

/**
 * Heading row used to group items in a select / action list. Design source: Figma
 * node 126:3360 ("Assets/Action list/section title").
 */
export function SectionTitle({ label, helperText, divider = false, className, ...rest }: SectionTitleProps) {
  return (
    <div
      className={[styles.sectionTitle, divider ? styles.divider : null, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div>
        <p className={styles.label}>{label}</p>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    </div>
  );
}
