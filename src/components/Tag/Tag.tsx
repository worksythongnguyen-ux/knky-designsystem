import { forwardRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
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
 * close icon can be a real, correctly-nested `<button>`.
 *
 * Figma defines Focus as one of the tag's own base states (independent of any
 * specific onClick use case, matching the component's own description: "Tags
 * represent a set of interactive... keywords"), so the tag is always
 * keyboard-focusable (`tabIndex=0`, `role="button"`) unless disabled — not
 * conditional on `onClick` being passed. Enter/Space both activate it, matching
 * how a real `<button>` behaves.
 *
 * Note: per Figma screenshots (the Dev Mode codegen's per-instance color
 * branches turned out to be inconsistent/unreliable here), the "has prefix"
 * type's "#" and label are BOTH text-secondary normally, and BOTH dim to
 * text-disabled when disabled — no two-tone contrast between the "#" and the
 * label, and disabled always wins regardless of type.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    children,
    hasPrefix = false,
    selected = false,
    disabled = false,
    onRemove,
    onClick,
    onKeyDown,
    className,
    ...rest
  },
  ref,
) {
  const isInteractive = !disabled;

  function handleClick(event: MouseEvent<HTMLSpanElement>) {
    if (disabled) return;
    onClick?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    onKeyDown?.(event);
    if (isInteractive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      (event.currentTarget as HTMLSpanElement).click();
    }
  }

  return (
    <span
      ref={ref}
      className={[
        styles.tag,
        selected ? styles.selected : null,
        disabled ? styles.disabled : null,
        isInteractive ? styles.clickable : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-disabled={disabled || undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {hasPrefix && <span className={styles.prefix}>#</span>}
      <span className={styles.label}>{children}</span>
      {selected && (
        <button
          type="button"
          className={styles.close}
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
          disabled={disabled}
          aria-label="Remove"
        >
          <CloseIcon size={20} tone={disabled ? "disabled" : "default"} />
        </button>
      )}
    </span>
  );
});
