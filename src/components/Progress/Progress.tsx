import styles from "./Progress.module.css";

export type ProgressState = "complete" | "processing" | "incomplete";

export interface ProgressProps {
  /** "complete" = filled square dot, "processing" = ring + diagonal slash, "incomplete" = empty ring. */
  state?: ProgressState;
  className?: string;
}

/**
 * Small status-progress indicator. Design source: Figma node 140:1927
 * ("Assets/Progress"), 3 states. Renders in `currentColor` so it automatically
 * matches whatever text color its parent sets — confirmed via Figma reusing this
 * exact icon with 5 different colors inside Badge (gray/blue/green/red/yellow),
 * always matching the badge label's own color. Standalone (outside Badge) it
 * falls back to icon-default gray, matching the Assets/Progress frame's own
 * default demo.
 */
export function Progress({ state = "complete", className }: ProgressProps) {
  return (
    <span className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {state === "complete" && <span className={styles.dot} aria-hidden="true" />}
      {state === "processing" && (
        <svg className={styles.icon} viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <circle cx="4" cy="4" r="3.375" stroke="currentColor" strokeWidth="1.25" />
          <line
            x1="1.5"
            y1="1.5"
            x2="6.5"
            y2="6.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      )}
      {state === "incomplete" && (
        <svg className={styles.icon} viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <circle cx="4" cy="4" r="3.375" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}
    </span>
  );
}
