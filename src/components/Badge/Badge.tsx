import type { ReactNode } from "react";
import styles from "./Badge.module.css";
import { Progress, type ProgressState } from "../Progress";

export type BadgeType = "default" | "info" | "success" | "critical" | "warning";
export type BadgeState = "default" | "completed" | "processing" | "incomplete";

export interface BadgeProps {
  label: ReactNode;
  /** Color scheme. Defaults to "default" (neutral gray). */
  type?: BadgeType;
  /** "default" = label only. The other three add a Progress icon before the label. */
  state?: BadgeState;
  className?: string;
}

const PROGRESS_STATE_BY_BADGE_STATE: Record<Exclude<BadgeState, "default">, ProgressState> = {
  completed: "complete",
  processing: "processing",
  incomplete: "incomplete",
};

/**
 * Small status pill. Design source: Figma node 140:1924 ("Badge"), 5 types x 4
 * states (20 variants). The completed/processing/incomplete states reuse the
 * Progress component (Figma node 140:1927, "Assets/Progress") for the leading
 * icon, colored to match the badge's own type via Progress's
 * `--knky-progress-color` custom property.
 */
export function Badge({ label, type = "default", state = "default", className }: BadgeProps) {
  const hasIcon = state !== "default";

  return (
    <span
      className={[styles.badge, styles[type], hasIcon ? styles.withIcon : styles.noIcon, className]
        .filter(Boolean)
        .join(" ")}
    >
      {hasIcon && (
        <Progress state={PROGRESS_STATE_BY_BADGE_STATE[state]} className={styles.progress} />
      )}
      <span className={styles.label}>{label}</span>
    </span>
  );
}
