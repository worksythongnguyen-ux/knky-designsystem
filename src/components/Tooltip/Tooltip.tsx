import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

export type TooltipTail = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: ReactNode;
  /** Which side the pointer/tail sticks out from — points toward the anchor
   * element the tooltip is attached to. Design source: Figma "Tail". */
  tail?: TooltipTail;
  className?: string;
}

const TAIL_CLASS: Record<TooltipTail, string> = {
  top: styles.tailTop,
  bottom: styles.tailBottom,
  left: styles.tailLeft,
  right: styles.tailRight,
};

/**
 * Small floating label with a directional pointer. Design source: Figma node
 * 157:2976 ("Tooltip"), 4 tail directions. Purely presentational — this
 * component doesn't handle positioning/anchoring to a trigger element or
 * show/hide timing; wrap it with your own positioning logic (or a library like
 * Floating UI) and toggle its rendering based on hover/focus on the anchor.
 *
 * The tail is a single reusable downward-pointing triangle (matching Figma's
 * "bottom" variant, its unrotated default), rotated per direction with CSS
 * transforms rather than 4 separate drawn shapes.
 */
export function Tooltip({ children, tail = "bottom", className }: TooltipProps) {
  const isSideways = tail === "left" || tail === "right";

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <div className={[styles.content, isSideways ? styles.alignLeft : null].filter(Boolean).join(" ")}>
        <p className={styles.label}>{children}</p>
      </div>
      <svg
        className={[styles.tail, TAIL_CLASS[tail]].filter(Boolean).join(" ")}
        viewBox="0 0 14 9"
        width="14"
        height="9"
        aria-hidden="true"
      >
        {/* Fill drawn separately from the border stroke: the base edge (the one
            that touches the content box) has no stroke, so it blends seamlessly
            into the box instead of showing a doubled-up border line there —
            only the two outward-facing slanted edges get the border. */}
        <path d="M0 0H14L7 9L0 0Z" fill="var(--knky-color-bg-surface)" />
        <path
          d="M0.5 0.5L7 8.5L13.5 0.5"
          fill="none"
          stroke="var(--knky-color-border)"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
