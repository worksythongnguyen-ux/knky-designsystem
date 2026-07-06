import { forwardRef, type LiHTMLAttributes, type ReactNode } from "react";
import styles from "./SelectItem.module.css";
import { CheckIcon } from "../Icon";

export interface SelectItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Main label text (Figma: bodyMg/Semibold). */
  label: ReactNode;
  /** Optional secondary line under the label (Figma: bodySm/Regular, secondary color). */
  helperText?: ReactNode;
  /** Icon shown before the label (Figma "Prefix" variant). Named `prefixIcon` to avoid
   * colliding with the native `prefix` HTML attribute on `LiHTMLAttributes`. */
  prefixIcon?: ReactNode;
  /** Fills the row and shows a trailing check icon (Figma "selected" state). */
  selected?: boolean;
  disabled?: boolean;
  /**
   * Keyboard-highlighted state for combobox/listbox usage (Figma "focus" state) —
   * separate from `selected` since a list can have a keyboard-active row that isn't
   * the chosen value yet.
   */
  active?: boolean;
}

/**
 * A single row inside a select / action list. Design source: Figma node 118:2380
 * ("Assets/Action list/Items"), Type=Default. Used as the building block for
 * InputSelect's dropdown, grouped with SectionTitle when options are grouped.
 */
export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>(function SelectItem(
  { label, helperText, prefixIcon, selected = false, disabled = false, active = false, className, ...rest },
  ref,
) {
  return (
    <li ref={ref} aria-disabled={disabled || undefined} className={styles.item} {...rest}>
      <div
        className={[
          styles.content,
          selected ? styles.selected : null,
          disabled ? styles.disabled : null,
          active ? styles.active : null,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {prefixIcon && <span className={styles.prefix}>{prefixIcon}</span>}
        <div className={styles.labelGroup}>
          <p className={styles.label}>{label}</p>
          {helperText && <p className={styles.helperText}>{helperText}</p>}
        </div>
        {selected && <CheckIcon size={20} className={styles.check} />}
      </div>
    </li>
  );
});
