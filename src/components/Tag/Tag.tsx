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
  /**
   * Called when the close icon is activated (only rendered when `selected`). If
   * omitted, clicking the close icon just falls through to the tag's own
   * `onClick` instead of doing nothing — see the click handler below.
   */
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
 * Note: the "#" prefix is always the muted text-disabled tone, in every state —
 * a deliberate two-tone look next to the label, which stays text-primary (same
 * as the no-prefix type) until the whole tag is disabled, at which point both
 * dim together. Confirmed via a close-up screenshot after an earlier pass
 * wrongly read them as the same shade (see Tag.module.css comments).
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
            // Only intercept the click when there's a distinct remove action —
            // otherwise let it bubble up to the tag's own onClick, so a
            // toggleable-filter Tag (onClick only, no onRemove) stays fully
            // clickable everywhere, including on top of the close icon, instead
            // of the icon silently swallowing the click and doing nothing.
            if (onRemove) {
              event.stopPropagation();
              onRemove();
            }
          }}
          disabled={disabled}
          aria-label={onRemove ? "Remove" : undefined}
          tabIndex={onRemove ? 0 : -1}
        >
          <CloseIcon size={20} tone={disabled ? "disabled" : "default"} />
        </button>
      )}
    </span>
  );
});
