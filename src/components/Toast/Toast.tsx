import type { ReactNode } from "react";
import styles from "./Toast.module.css";
import { AlertErrorIcon, AlertInfoIcon, AlertWarningIcon, CheckIcon, CloseIcon } from "../Icon";
import { Button } from "../Button";

export type ToastState = "success" | "warning" | "error" | "info";

export interface ToastProps {
  children: ReactNode;
  /** Design source: Figma "State" (success/warning/error/info — Figma spells
   * "sucess" as a typo; the public prop uses the correct spelling). */
  state?: ToastState;
  /** Label for the optional secondary action button (Figma "Type=has action"). Omit to get the plain "default" type. */
  action?: ReactNode;
  onAction?: () => void;
  /** Called when the close (X) icon is activated. */
  onClose?: () => void;
  className?: string;
}

const STATUS_ICON: Record<ToastState, ReactNode> = {
  success: <CheckIcon size={20} color="var(--knky-color-status-success-element)" />,
  warning: <AlertWarningIcon size={20} color="var(--knky-color-status-caution-element)" />,
  error: <AlertErrorIcon size={20} color="var(--knky-color-status-critical-element)" />,
  info: <AlertInfoIcon size={20} color="var(--knky-color-status-info-element)" />,
};

/**
 * Non-disruptive feedback message. Design source: Figma node 156:2296 ("toast"),
 * 4 states x 2 types (default / has action). Purely presentational — stacking,
 * positioning, and auto-dismiss timing are left to the consumer (e.g. a toast
 * manager/portal), matching the scope of the Figma component itself.
 *
 * The action button reuses `Button` (variant="secondary", size="tiny") and the
 * close icon reuses `Button` (variant="tertiary", size="tiny", icon-only) —
 * Figma's own layer names ("button - secondary" / "button - tertiary") point
 * directly at those existing components, and the tiny/secondary padding+shadow
 * already matches Toast's action button pixel-for-pixel.
 */
export function Toast({ children, state = "success", action, onAction, onClose, className }: ToastProps) {
  return (
    <div className={[styles.toast, className].filter(Boolean).join(" ")}>
      <span className={[styles.iconBadge, styles[state]].filter(Boolean).join(" ")}>
        {STATUS_ICON[state]}
      </span>
      <p className={styles.label}>{children}</p>
      {action && (
        <Button variant="secondary" size="tiny" onClick={onAction}>
          {action}
        </Button>
      )}
      <Button variant="tertiary" size="tiny" icon={<CloseIcon />} aria-label="Close" onClick={onClose} />
    </div>
  );
}
