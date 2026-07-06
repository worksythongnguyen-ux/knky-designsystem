import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Tag.module.css";
import { CloseIcon } from "../Icon";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "prefix"> {
  children: ReactNode;
  /** Figma "Type=has prefix" — renders a "#" before the label. */
  hasPrefix?: boolean;
  /** Figma "State=selected" — shows a close (X) icon and a darker selected background. */
  selected?: boolean;
  /**
   * Figma "State=disabled" — dims the tag and disables the close icon. Prop-driven
   * (not the native `disabled` attribute) since a Tag is a `<span>`, not a form
   * element — this mirrors ButtonGroup/SectionTitle elsewhere in this library.
   */
  disabled?: boolean;
  /** Called when the close icon is activated (only rendered when `selected`). */
  onRemove?: () => void;
  className?: string;
}

/**
 * Small interactive keyword/filter chip. Design source: Figma node 157:3292
 * ("Tag"), 2 types x 5 states. Renders as a `<span>` (not a `<button>`) so the
 * close icon can be a real, correctly-nested `<button>` — spread `tabIndex`/
 * `role`/`onClick` via the rest props if the tag itself needs to be a focusable
 * control (e.g. a toggleable filter); `:hover`/`:focus-visible` styling is wired
 * up regardless.
 *
 * Note: per Figma, the "has prefix" type's label text always stays
 * text-secondary, even when disabled (only the "#" prefix and the plain
 * "default" type's label dim to text-disabled) — confirmed directly from the
 * Dev Mode codegen's conditional branches, not an oversight.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { children, hasPrefix = false, selected = false, disabled = false, onRemove, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={[styles.tag, selected ? styles.selected : null, disabled ? styles.disabled : null, className]
        .filter(Boolean)
        .join(" ")}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {hasPrefix && <span className={styles.prefix}>#</span>}
      <span className={styles.label}>{children}</span>
      {selected && (
        <button
          type="button"
          className={styles.close}
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
        >
          <CloseIcon size={20} tone={disabled ? "disabled" : "default"} />
        </button>
      )}
    </span>
  );
});
