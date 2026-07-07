import { forwardRef, useRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Scrollable.module.css";
import { ArrowIcon } from "../Icon";

export type ScrollableOrientation = "horizontal" | "vertical";

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Figma "Horizontal" toggle. Defaults to "horizontal" (Figma's own default demo). */
  orientation?: ScrollableOrientation;
  /**
   * Figma "Mobile" variant — adds prev/next arrow buttons that scroll by
   * `scrollStep` px. Only meaningful for `orientation="horizontal"` (Figma
   * never showed a vertical+arrows combination).
   */
  arrows?: boolean;
  /** px scrolled per arrow click (smooth-scrolled). Defaults to 200. */
  scrollStep?: number;
  className?: string;
}

/**
 * A scroll container with a styled scrollbar (thin track + rounded thumb,
 * darkening on press) instead of the browser's default chrome. Design source:
 * Figma node 40:5256 ("Utilities/Scrollable"), horizontal/vertical x
 * default/press x mobile(arrows).
 *
 * Styled via `scrollbar-color`/`scrollbar-width` (Firefox) and
 * `::-webkit-scrollbar-*` (Chrome/Safari/Edge) on a real `overflow: auto`
 * container — native scrolling (wheel, trackpad, touch, keyboard) all keep
 * working, nothing is reimplemented. The "Press" state maps directly to the
 * browser's own `::-webkit-scrollbar-thumb:active`, no JS needed. Exact
 * thumb/track colors aren't exposed by Figma's variable data (baked into
 * flattened SVG assets, not bound Figma variables) — matched by eye against the
 * screenshots to icon-default (default thumb, confirmed once via a bound
 * variable), icon-active (press thumb), and bg-surface-disabled (track).
 */
export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(function Scrollable(
  { children, orientation = "horizontal", arrows = false, scrollStep = 200, className, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const showArrows = arrows && orientation === "horizontal";

  function scrollBy(amount: number) {
    innerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className={styles.wrapper}>
      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollBy(-scrollStep)}
          aria-label="Scroll back"
        >
          <ArrowIcon direction="prev" size={20} />
        </button>
      )}
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={[styles.scrollable, styles[orientation], className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollBy(scrollStep)}
          aria-label="Scroll forward"
        >
          <ArrowIcon direction="next" size={20} />
        </button>
      )}
    </div>
  );
});
